## 生命周期介绍

<font color=#f00>beforeCreate</font> 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。在当前阶段 data、methods、computed 以及 watch 上的数据和方法都不能被访问

<font color=#f00>created</font> 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。这里没有$el,如果非要想与 Dom 进行交互，可以通过 vm.$nextTick 来访问 Dom

<font color=#f00>beforeMount</font> 在挂载开始之前被调用：相关的 render 函数首次被调用。

<font color=#f00>mounted</font> 在挂载完成后发生，在当前阶段，真实的 Dom 挂载完毕，数据完成双向绑定，可以访问到 Dom 节点

<font color=#f00>beforeUpdate</font> 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁（patch）之前。可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程

<font color=#f00>updated</font> 发生在更新完成之后，当前阶段组件 Dom 已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新，该钩子在服务器端渲染期间不被调用。

<font color=#f00>beforeDestroy</font> 实例销毁之前调用。在这一步，实例仍然完全可用。我们可以在这时进行善后收尾工作，比如清除计时器。

<font color=#f00>destroyed</font> Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。

<font color=#f00>activated</font> keep-alive 专属，组件被激活时调用

<font color=#f00>deactivated</font> keep-alive 专属，组件被销毁时调用

### 异步请求在哪一步发起？

可以在钩子函数 created、beforeMount、mounted 中进行异步请求，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。

如果异步请求不需要依赖 Dom 推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

- 能更快获取到服务端数据，减少页面 loading 时间
- ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性

## 源码分析

因为 Vue 的源码部分包含很多内容，本文只选取生命周期相关的关键性代码进行解析。同时也强烈推荐大家学习 Vue 源码的其他内容，因为这个框架真的很优秀。

### 初始化流程

#### new Vue

从 `new Vue(options)` 开始作为入口，`Vue` 只是一个简单的构造函数，内部是这样的：

```js
function Vue(options) {
  this._init(options)
}
Vue.prototype._init = function(options?: Object) {
  const vm: Component = this
  // a uid
  vm._uid = uid++

  let startTag, endTag
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    startTag = `vue-perf-start:${vm._uid}`
    endTag = `vue-perf-end:${vm._uid}`
    mark(startTag)
  }

  // a flag to avoid this being observed
  vm._isVue = true
  // merge options
  if (options && options._isComponent) {
    // optimize internal component instantiation
    // since dynamic options merging is pretty slow, and none of the
    // internal component options needs special treatment.
    initInternalComponent(vm, options)
  } else {
    vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm)
  }
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    initProxy(vm)
  } else {
    vm._renderProxy = vm
  }
  // expose real self
  vm._self = vm
  initLifecycle(vm)
  initEvents(vm)
  initRender(vm)
  callHook(vm, 'beforeCreate')
  initInjections(vm) // resolve injections before data/props
  initState(vm)
  initProvide(vm) // resolve provide after data/props
  callHook(vm, 'created')

  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    vm._name = formatComponentName(vm, false)
    mark(endTag)
    measure(`vue ${vm._name} init`, startTag, endTag)
  }

  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}
```

进入了 `_init` 函数之后，先初始化了一些属性。

1. `initLifecycle`：初始化一些属性如`$parent，$children`。根实例没有 `$parent，$children` 开始是空数组，直到它的 子组件 实例进入到 `initLifecycle` 时，才会往父组件的 `$children` 里把自身放进去。所以 `$children` 里的一定是组件的实例。
2. `initEvents`：初始化事件相关的属性，如 `_events` 等。
3. `initRender`：初始化渲染相关如 `$createElement`，并且定义了 `$attrs` 和 `$listeners` 为浅层响应式属性。具体可以查看细节章节。并且还定义了`$slots、$scopedSlots`，其中 `$slots` 是立刻赋值的，但是 `$scopedSlots` 初始化的时候是一个 `emptyObject`，直到组件的 `vm._render` 过程中才会通过 `normalizeScopedSlots` 去把真正的 `$scopedSlots` 整合后挂到 `vm` 上。

然后开始第一个生命周期：

```js
callHook(vm, 'beforeCreate')
```

#### beforeCreate 被调用完成

`beforeCreate` 之后

1. 初始化 `inject`
2. 初始化 `state`
   - 初始化 `props`
   - 初始化 `methods`
   - 初始化 `data`
   - 初始化 `computed`
   - 初始化 `watch`
3. 初始化 `provide`

所以在 `data` 中可以使用 `props` 上的值，反过来则不行。

然后进入 `created` 阶段：

```js
callHook(vm, 'created')
```

#### created 被调用完成

调用 `$mount` 方法，开始挂载组件到 `dom` 上。

如果使用了 `runtime-with-compile` 版本，则会把你传入的 `template` 选项，或者 `html` 文本，通过一系列的编译生成 `render` 函数。

- 编译这个 template，生成 ast 抽象语法树。
- 优化这个 ast，标记静态节点。（渲染过程中不会变的那些节点，优化性能）。
- 根据 ast，生成 render 函数。

对应具体的代码就是：

```js
const ast = parse(template.trim(), options)
if (options.optimize !== false) {
  optimize(ast, options)
}
const code = generate(ast, options)
```

如果是脚手架搭建的项目的话，这一步 `vue-cli` 已经帮你做好了，所以就直接进入 `mountComponent` 函数。
那么，确保有了 `render` 函数后，我们就可以往渲染的步骤继续进行了

#### beforeMount 被调用完成

把 渲染组件的函数 定义好，具体代码是：

```js
updateComponent = () => {
  vm._update(vm._render(), hydrating)
}
```

拆解来看，`vm._render` 其实就是调用我们上一步拿到的 `render` 函数生成一个 `vnode`，而 `vm._update` 方法则会对这个 `vnode` 进行 `patch` 操作，帮我们把 `vnode` 通过 `createElm` 函数创建新节点并且渲染到 `dom节点` 中。

接下来就是执行这段代码了，是由 `响应式原理` 的一个核心类 `Watcher` 负责执行这个函数，为什么要它来代理执行呢？因为我们需要在这段过程中去 观察 这个函数读取了哪些响应式数据，将来这些响应式数据更新的时候，我们需要重新执行 `updateComponent` 函数。

如果是更新后调用 `updateComponent` 函数的话，`updateComponent` 内部的 `patch` 就不再是初始化时候的创建节点，而是对新旧 `vnode` 进行 `diff`，最小化的更新到 `dom节点` 上去。具体过程可以看 [diff 算法原理](./diff.md)。

这一切交给 Watcher 完成：

```js
new Watcher(
  vm,
  updateComponent,
  noop,
  {
    before() {
      if (vm._isMounted) {
        callHook(vm, 'beforeUpdate')
      }
    },
  },
  true /* isRenderWatcher */
)
```

注意这里在 `before` 属性上定义了 `beforeUpdate` 函数，也就是说在 `Watcher` 被响应式属性的更新触发之后，重新渲染新视图之前，会先调用 `beforeUpdate` 生命周期。

关于 `Watcher` 和响应式的概念，如果你还不清楚的话，可以阅读[响应式数据原理](./responsiveData.md)。

注意，在 `render` 的过程中，如果遇到了 子组件，则会调用 `createComponent` 函数。

`createComponent` 函数内部，会为子组件生成一个属于自己的构造函数，可以理解为子组件自己的 `Vue` 函数：

```js
Ctor = baseCtor.extend(Ctor)
```

在普通的场景下，其实这就是 `Vue.extend` 生成的构造函数，它继承自 `Vue` 函数，拥有它的很多全局属性。

这里插播一个知识点，除了组件有自己的生命周期外，其实 `vnode` 也有自己的 `生命周期`，只不过我们平常开发的时候是接触不到的。

那么子组件的 `vnode` 会有自己的 `init` 周期，这个周期内部会做这样的事情：

```js
// 创建子组件
const child = createComponentInstanceForVnode(vnode)
// 挂载到 dom 上
child.$mount(vnode.elm)
```

而 `createComponentInstanceForVnode` 内部又做了什么事呢？它会去调用 `子组件` 的构造函数。

```js
new vnode.componentOptions.Ctor(options)
```

构造函数的内部是这样的：

```js
const Sub = function VueComponent(options) {
  this._init(options)
}
```

这个 `_init` 其实就是我们文章开头的那个函数，也就是说，如果遇到 子组件，那么就会优先开始子组件的构建过程，也就是说，从 `beforeCreated` 重新开始。这是一个递归的构建过程。

也就是说，如果我们有 父 -> 子 -> 孙 这三个组件，那么它们的初始化生命周期顺序是这样的：

```js
父 beforeCreate
父 created
父 beforeMount
子 beforeCreate
子 created
子 beforeMount
孙 beforeCreate
孙 created
孙 beforeMount
孙 mounted
子 mounted
父 mounted
```

然后，`mounted` 生命周期被触发。

#### mounted 被调用完成

到此为止，组件的挂载就完成了，初始化的生命周期结束。

### 更新流程

当一个响应式属性被更新后，触发了 `Watcher` 的回调函数，也就是 `vm._update(vm._render())`，在更新之前，会先调用刚才在 `before` 属性上定义的函数，也就是

```js
callHook(vm, 'beforeUpdate')
```

注意，由于 `Vue` 的异步更新机制，`beforeUpdate` 的调用已经是在 `nextTick` 中了。具体代码如下：

```js
nextTick(flushSchedulerQueue)

function flushSchedulerQueue {
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
     // callHook(vm, 'beforeUpdate')
      watcher.before()
    }
 }
}
```

#### beforeUpdate 被调用完成

然后经历了一系列的 `patch、diff` 流程后，组件重新渲染完毕，调用 `updated` 钩子。

注意，这里是对 `watcher` 倒序 `updated` 调用的。

也就是说，假如同一个属性通过 `props` 分别流向 `父 -> 子 -> 孙` 这个路径，那么收集到依赖的先后也是这个顺序，但是触发 `updated` 钩子确是 `孙 -> 子 -> 父` 这个顺序去触发的。

```js
function callUpdatedHooks(queue) {
  let i = queue.length
  while (i--) {
    const watcher = queue[i]
    const vm = watcher.vm
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated')
    }
  }
}
```

#### `updated` 被调用完成

至此，渲染更新流程完毕。

### 销毁流程

在刚刚所说的更新后的 `patch` 过程中，如果发现有组件在下一轮渲染中消失了，比如 `v-for` 对应的数组中少了一个数据。那么就会调用 `removeVnodes` 进入组件的销毁流程。

`removeVnodes` 会调用 `vnode` 的 `destroy` 生命周期，而 `destroy` 内部则会调用我们相对比较熟悉的 `vm.$destroy()`。（`keep-alive` 包裹的子组件除外）
这时，就会调用 `callHook(vm, 'beforeDestroy')`。

#### beforeDestroy 被调用完成

之后就会经历一系列的清理逻辑，清除父子关系、watcher 关闭等逻辑。但是注意，\$destroy 并不会把组件从视图上移除，如果想要手动销毁一个组件，则需要我们自己去完成这个逻辑。

然后，调用最后的 `callHook(vm, 'destroyed')`

#### destroyed 被调用完成

至此，销毁流程完毕。
