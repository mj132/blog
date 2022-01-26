## 流程概览

上一章[render 阶段](./render.md#流程结尾)我们介绍了，`commitRoot`方法是`commit阶段`工作的起点。`fiberRootNode`会作为传参。

```js
commitRoot(root)
```

在`rootFiber.firstEffect`上保存了一条需要执行`副作用`的`Fiber节点`的单向链表`effectList`，这些`Fiber节点`的`updateQueue`中保存了变化的`props`。

这些`副作用`对应的`DOM操作`在`commit`阶段执行。

除此之外，一些生命周期钩子（比如`componentDidXXX`）、`hook`（比如`useEffect`）需要在`commit`阶段执行。

`commit`阶段的主要工作（即`Renderer`的工作流程）分为三部分：

- before mutation 阶段（执行`DOM`操作前）

- mutation 阶段（执行`DOM`操作）

- layout 阶段（执行`DOM`操作后）

你可以从[这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L2001)看到`commit`阶段的完整代码

在`before mutation阶段`之前和`layout阶段`之后还有一些额外工作，涉及到比如`useEffect`的触发、`优先级相关`的重置、`ref`的绑定/解绑。

这些对我们当前属于超纲内容，为了内容完整性，在这节简单介绍。

### before mutation 之前

`commitRootImpl`方法中直到第一句`if (firstEffect !== null)`之前属于`before mutation`之前。

我们大体看下它做的工作，现在你还不需要理解它们：

```js
do {
  // 触发useEffect回调与其他同步任务。由于这些任务可能触发新的渲染，所以这里要一直遍历执行直到没有任务
  flushPassiveEffects()
} while (rootWithPendingPassiveEffects !== null)

// root指 fiberRootNode
// root.finishedWork指当前应用的rootFiber
const finishedWork = root.finishedWork

// 凡是变量名带lane的都是优先级相关
const lanes = root.finishedLanes
if (finishedWork === null) {
  return null
}
root.finishedWork = null
root.finishedLanes = NoLanes

// 重置Scheduler绑定的回调函数
root.callbackNode = null
root.callbackId = NoLanes

let remainingLanes = mergeLanes(finishedWork.lanes, finishedWork.childLanes)
// 重置优先级相关变量
markRootFinished(root, remainingLanes)

// 清除已完成的discrete updates，例如：用户鼠标点击触发的更新。
if (rootsWithPendingDiscreteUpdates !== null) {
  if (!hasDiscreteLanes(remainingLanes) && rootsWithPendingDiscreteUpdates.has(root)) {
    rootsWithPendingDiscreteUpdates.delete(root)
  }
}

// 重置全局变量
if (root === workInProgressRoot) {
  workInProgressRoot = null
  workInProgress = null
  workInProgressRootRenderLanes = NoLanes
} else {
}

// 将effectList赋值给firstEffect
// 由于每个fiber的effectList只包含他的子孙节点
// 所以根节点如果有effectTag则不会被包含进来
// 所以这里将有effectTag的根节点插入到effectList尾部
// 这样才能保证有effect的fiber都在effectList中
let firstEffect
if (finishedWork.effectTag > PerformedWork) {
  if (finishedWork.lastEffect !== null) {
    finishedWork.lastEffect.nextEffect = finishedWork
    firstEffect = finishedWork.firstEffect
  } else {
    firstEffect = finishedWork
  }
} else {
  // 根节点没有effectTag
  firstEffect = finishedWork.firstEffect
}
```

可以看到，`before mutation`之前主要做一些变量赋值，状态重置的工作。

这一长串代码我们只需要关注最后赋值的`firstEffect`，在`commit`的三个子阶段都会用到他。

### layout 之后

接下来让我们简单看下`layout`阶段执行完后的代码，现在你还不需要理解他们：

```js
const rootDidHavePassiveEffects = rootDoesHavePassiveEffects

// useEffect相关
if (rootDoesHavePassiveEffects) {
  rootDoesHavePassiveEffects = false
  rootWithPendingPassiveEffects = root
  pendingPassiveEffectsLanes = lanes
  pendingPassiveEffectsRenderPriority = renderPriorityLevel
} else {
}

// 性能优化相关
if (remainingLanes !== NoLanes) {
  if (enableSchedulerTracing) {
    // ...
  }
} else {
  // ...
}

// 性能优化相关
if (enableSchedulerTracing) {
  if (!rootDidHavePassiveEffects) {
    // ...
  }
}

// ...检测无限循环的同步任务
if (remainingLanes === SyncLane) {
  // ...
}

// 在离开commitRoot函数前调用，触发一次新的调度，确保任何附加的任务被调度
ensureRootIsScheduled(root, now())

// ...处理未捕获错误及老版本遗留的边界问题

// 执行同步任务，这样同步任务不需要等到下次事件循环再执行
// 比如在 componentDidMount 中执行 setState 创建的更新会在这里被同步执行
// 或useLayoutEffect
flushSyncCallbackQueue()

return null
```

> 你可以在[这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L2195)看到这段代码

主要包括三点内容：

1. `useEffect`相关的处理。

我们会在讲解`layout阶段`时讲解。

2. 性能追踪相关。

源码里有很多和`interaction`相关的变量。它们都和追踪`React`渲染时间、性能相关，在[Profiler API](https://zh-hans.reactjs.org/docs/profiler.html)和[DevTools](https://github.com/facebook/react-devtools/pull/1069)中使用。

> 你可以在这里看到[interaction 的定义](https://gist.github.com/bvaughn/8de925562903afd2e7a12554adcdda16#overview)

3. 在`commit`阶段会触发一些生命周期钩子（如 `componentDidXXX`）和`hook`（如`useLayoutEffect`、`useEffect`）。

在这些回调方法中可能触发新的更新，新的更新会开启新的`render-commit`流程。

我们点击页面中的数字，状态会先变为 0，再在`useLayoutEffect`回调中变为随机数。但在页面上数字不会变为 0，而是直接变为新的随机数。

这是因为`useLayoutEffect`会在`layout阶段`同步执行回调。回调中我们触发了状态更新`setCount(randomNum)`，这会重新调度一个同步任务。

该任务会在在如上`commitRoot`倒数第二行代码处被同步执行。

```js
flushSyncCallbackQueue()
```

所以我们看不到页面中元素先变为 0。

如果换成`useEffect`多点击几次就能看到区别。

在本节正式开始前，让我们复习下这一章到目前为止所学的。

`Renderer`工作的阶段被称为`commit`阶段。`commit`阶段可以分为三个子阶段：

- before mutation 阶段（执行`DOM`操作前）

- mutation 阶段（执行`DOM`操作）

- layout 阶段（执行`DOM`操作后）

本节我们看看`before mutation阶段`（执行`DOM`操作前）都做了什么。

## before mutation 阶段

`before mutation阶段`的代码很短，整个过程就是遍历`effectList`并调用`commitBeforeMutationEffects`函数处理。

> 这部分[源码在这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L2104-L2127)。为了增加可读性，示例代码中删除了不相关的逻辑

```js
// 保存之前的优先级，以同步优先级执行，执行完毕后恢复之前优先级
const previousLanePriority = getCurrentUpdateLanePriority()
setCurrentUpdateLanePriority(SyncLanePriority)

// 将当前上下文标记为CommitContext，作为commit阶段的标志
const prevExecutionContext = executionContext
executionContext |= CommitContext

// 处理focus状态
focusedInstanceHandle = prepareForCommit(root.containerInfo)
shouldFireAfterActiveInstanceBlur = false

// beforeMutation阶段的主函数
commitBeforeMutationEffects(finishedWork)

focusedInstanceHandle = null
```

我们重点关注`beforeMutation`阶段的主函数`commitBeforeMutationEffects`做了什么。

### commitBeforeMutationEffects

大体代码逻辑：

```js
function commitBeforeMutationEffects() {
  while (nextEffect !== null) {
    const current = nextEffect.alternate

    if (!shouldFireAfterActiveInstanceBlur && focusedInstanceHandle !== null) {
      // ...focus blur相关
    }

    const effectTag = nextEffect.effectTag

    // 调用getSnapshotBeforeUpdate
    if ((effectTag & Snapshot) !== NoEffect) {
      commitBeforeMutationEffectOnFiber(current, nextEffect)
    }

    // 调度useEffect
    if ((effectTag & Passive) !== NoEffect) {
      if (!rootDoesHavePassiveEffects) {
        rootDoesHavePassiveEffects = true
        scheduleCallback(NormalSchedulerPriority, () => {
          flushPassiveEffects()
          return null
        })
      }
    }
    nextEffect = nextEffect.nextEffect
  }
}
```

整体可以分为三部分：

1. 处理`DOM节点`渲染/删除后的 `autoFocus`、`blur` 逻辑。

2. 调用`getSnapshotBeforeUpdate`生命周期钩子。

3. 调度`useEffect`。

我们讲解下 2、3 两点。

### 调用 getSnapshotBeforeUpdate

`commitBeforeMutationEffectOnFiber`是`commitBeforeMutationLifeCycles`的别名。

在该方法内会调用`getSnapshotBeforeUpdate`。

> 你可以在[这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberCommitWork.old.js#L222)看到这段逻辑

从`React`v16 开始，`componentWillXXX`钩子前增加了`UNSAFE_`前缀。

究其原因，是因为`Stack Reconciler`重构为`Fiber Reconciler`后，`render阶段`的任务可能中断/重新开始，对应的组件在`render阶段`的生命周期钩子（即`componentWillXXX`）可能触发多次。

这种行为和`React`v15 不一致，所以标记为`UNSAFE_`。

> 更详细的解释参照[这里](https://juejin.im/post/6847902224287285255#comment)

为此，`React`提供了替代的生命周期钩子`getSnapshotBeforeUpdate`。

我们可以看见，`getSnapshotBeforeUpdate`是在`commit阶段`内的`before mutation阶段`调用的，由于`commit阶段`是同步的，所以不会遇到多次调用的问题。

### 调度`useEffect`

在这几行代码内，`scheduleCallback`方法由`Scheduler`模块提供，用于以某个优先级异步调度一个回调函数。

```js
// 调度useEffect
if ((effectTag & Passive) !== NoEffect) {
  if (!rootDoesHavePassiveEffects) {
    rootDoesHavePassiveEffects = true
    scheduleCallback(NormalSchedulerPriority, () => {
      // 触发useEffect
      flushPassiveEffects()
      return null
    })
  }
}
```

在此处，被异步调度的回调函数就是触发`useEffect`的方法`flushPassiveEffects`。

我们接下来讨论`useEffect`如何被异步调度，以及为什么要异步（而不是同步）调度。

### 如何异步调度

在`flushPassiveEffects`方法内部会从全局变量`rootWithPendingPassiveEffects`获取`effectList`。

在[render 阶段](./render.md#effectlist)我们讲到，`effectList`中保存了需要执行副作用的`Fiber节点`。其中副作用包括

- 插入`DOM节点`（Placement）
- 更新`DOM节点`（Update）
- 删除`DOM节点`（Deletion）

除此外，当一个`FunctionComponent`含有`useEffect`或`useLayoutEffect`，他对应的`Fiber节点`也会被赋值`effectTag`。

> 你可以从[这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactHookEffectTags.js)看到`hook`相关的`effectTag`

在`flushPassiveEffects`方法内部会遍历`rootWithPendingPassiveEffects`（即`effectList`）执行`effect`回调函数。

如果在此时直接执行，`rootWithPendingPassiveEffects === null`。

那么`rootWithPendingPassiveEffects`会在何时赋值呢？

在`layout之后`的代码片段中会根据`rootDoesHavePassiveEffects === true?`决定是否赋值`rootWithPendingPassiveEffects`。

```js
const rootDidHavePassiveEffects = rootDoesHavePassiveEffects
if (rootDoesHavePassiveEffects) {
  rootDoesHavePassiveEffects = false
  rootWithPendingPassiveEffects = root
  pendingPassiveEffectsLanes = lanes
  pendingPassiveEffectsRenderPriority = renderPriorityLevel
}
```

所以整个`useEffect`异步调用分为三步：

1. `before mutation阶段`在`scheduleCallback`中调度`flushPassiveEffects`
2. `layout阶段`之后将`effectList`赋值给`rootWithPendingPassiveEffects`
3. `scheduleCallback`触发`flushPassiveEffects`，`flushPassiveEffects`内部遍历`rootWithPendingPassiveEffects`

### 为什么需要异步调用

摘录自`React`文档[effect 的执行时机](https://zh-hans.reactjs.org/docs/hooks-reference.html#timing-of-effects)：

> 与 componentDidMount、componentDidUpdate 不同的是，在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。

可见，`useEffect`异步执行的原因主要是防止同步执行时阻塞浏览器渲染。

