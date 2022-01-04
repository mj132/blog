# 说说你对 Redux 的理解？其工作原理？常用中间件？

## 一、是什么

`React`是用于构建用户界面的，帮助我们解决渲染`DOM`的过程

而在整个应用中会存在很多个组件，每个组件的`state`是由自身进行管理，包括组件定义自身的`state`、组件之间的通信通过`props`传递、使用`Context`实现数据共享

如果让每个组件都存储自身相关的状态，理论上来讲不会影响应用的运行，但在开发及后续维护阶段，我们将花费大量精力去查询状态的变化过程

这种情况下，如果将所有的状态进行集中管理，当需要更新状态的时候，仅需要对这个管理集中处理，而不用去关心状态是如何分发到每一个组件内部的

`redux`就是一个实现上述集中管理的容器，遵循三大基本原则：

- 单一数据源
- state 是只读的
- 使用纯函数来执行修改

注意的是，`redux`并不是只应用在`react`中，还与其他界面库一起使用，如`Vue`

## 二、工作原理

`redux`要求我们把数据都放在 `store`公共存储空间

一个组件改变了 `store` 里的数据内容，其他组件就能感知到 `store`的变化，再来取数据，从而间接的实现了这些数据传递的功能

工作流程图如下所示：

![](https://static.vue-js.com/27b2e930-e56b-11eb-85f6-6fac77c0c9b3.png)

根据流程图，可以想象，`React Components` 是借书的用户， `Action Creactor` 是借书时说的话(借什么书)， `Store` 是图书馆管理员，`Reducer` 是记录本(借什么书，还什么书，在哪儿，需要查一下)， `state` 是书籍信息

整个流程就是借书的用户需要先存在，然后需要借书，需要一句话来描述借什么书，图书馆管理员听到后需要查一下记录本，了解图书的位置，最后图书馆管理员会把这本书给到这个借书人

转换为代码是，`React Components` 需要获取一些数据, 然后它就告知 `Store` 需要获取数据，这就是 `Action Creactor` , `Store` 接收到之后去 `Reducer` 查一下， `Reducer` 会告诉 `Store` 应该给这个组件什么数据

## 三、如何使用

### redux

创建一个`store`的公共数据区域

```js
import { createStore } from 'redux' // 引入一个第三方的方法
const store = createStore() // 创建数据的公共存储区域（管理员）
```

还需要创建一个记录本去辅助管理数据，也就是`reducer`，本质就是一个函数，接收两个参数`state`，`action`，返回`state`

```js
// 设置默认值
const initialState = {
  counter: 0,
}

const reducer = (state = initialState, action) => {}
```

然后就可以将记录本传递给`store`，两者建立连接。如下：

```js
const store = createStore(reducer)
```

如果想要获取`store`里面的数据，则通过`store.getState()`来获取当前`state`

```js
console.log(store.getState())
```

下面再看看如何更改`store`里面数据，是通过`dispatch`来派发`action`，通常`action`中都会有`type`属性，也可以携带其他的数据

```js
store.dispatch({
  type: 'INCREMENT',
})

store.dispath({
  type: 'DECREMENT',
})

store.dispatch({
  type: 'ADD_NUMBER',
  number: 5,
})
```

下面再来看看修改`reducer`中的处理逻辑：

```js
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 }
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 }
    case 'ADD_NUMBER':
      return { ...state, counter: state.counter + action.number }
    default:
      return state
  }
}
```

注意，`reducer`是一个纯函数，不需要直接修改`state`

这样派发`action`之后，既可以通过`store.subscribe`监听`store`的变化，如下：

```js
store.subscribe(() => {
  console.log(store.getState())
})
```

在`React`项目中，会搭配`react-redux`进行使用

完整代码如下：

```js
const redux = require('redux')

const initialState = {
  counter: 0,
}

// 创建reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 }
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 }
    case 'ADD_NUMBER':
      return { ...state, counter: state.counter + action.number }
    default:
      return state
  }
}

// 根据reducer创建store
const store = redux.createStore(reducer)

store.subscribe(() => {
  console.log(store.getState())
})

// 修改store中的state
store.dispatch({
  type: 'INCREMENT',
})
// console.log(store.getState());

store.dispatch({
  type: 'DECREMENT',
})
// console.log(store.getState());

store.dispatch({
  type: 'ADD_NUMBER',
  number: 5,
})
// console.log(store.getState());
```

#### 小结

- createStore 可以帮助创建 store
- store.dispatch 帮助派发 action , action 会传递给 store
- store.getState 这个方法可以帮助获取 store 里边所有的数据内容
- store.subscrible 方法订阅 store 的改变，只要 store 发生改变， store.subscrible 这个函数接收的这个回调函数就会被执行

### react-redux

使用`react-redux`分成了两大核心：

- Provider
- connection

#### Provider

在`redux`中存在一个`store`用于存储`state`，如果将这个`store`存放在顶层元素中，其他组件都被包裹在顶层元素之上

那么所有的组件都能够受到`redux`的控制，都能够获取到`redux`中的数据

使用方式如下：

```jsx
<Provider store = {store}>
  <App />
<Provider>
```

#### connection

`connect`方法将`store`上的`getState`和 `dispatch`包装成组件的`props`

导入`conect`如下：

```js
import { connect } from 'react-redux'
```

用法如下：

```js
connect(mapStateToProps, mapDispatchToProps)(MyComponent)
```

可以传递两个参数：

- mapStateToProps

- mapDispatchToProps

#### mapStateToProps

把`redux`中的数据映射到`react`中的`props`中去

如下：

```jsx
const mapStateToProps = (state) => {
  return {
    // prop : state.xxx  | 意思是将state中的某个数据映射到props中
    foo: state.bar,
  }
}
```

组件内部就能够通过`props`获取到`store`中的数据

```js
class Foo extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      // 这样子渲染的其实就是state.bar的数据了
      <div>this.props.foo</div>
    )
  }
}
Foo = connect()(Foo)
export default Foo
```

#### mapDispatchToProps

将`redux`中的`dispatch`映射到组件内部的`props`中

```jsx
const mapDispatchToProps = (dispatch) => {
  // 默认传递参数就是dispatch
  return {
    onClick: () => {
      dispatch({
        type: 'increatment',
      })
    },
  }
}
```

```js
class Foo extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <button onClick={this.props.onClick}>点击increase</button>
  }
}
Foo = connect()(Foo)
export default Foo
```

#### 小结

整体流程图大致如下所示：

![](https://static.vue-js.com/3e47db10-e7dc-11eb-85f6-6fac77c0c9b3.png)

## 四、项目结构

可以根据项目具体情况进行选择，以下列出两种常见的组织结构

### 按角色组织（MVC）

角色如下：

- reducers
- actions
- components
- containers

参考如下：

```js
reducers / todoReducer.js
filterReducer.js
actions / todoAction.js
filterActions.js
components / todoList.js
todoItem.js
filter.js
containers / todoListContainer.js
todoItemContainer.js
filterContainer.js
```

### 按功能组织

使用`redux`使用功能组织项目，也就是把完成同一应用功能的代码放在一个目录下，一个应用功能包含多个角色的代码

`Redux`中，不同的角色就是`reducer`、`actions`和视图，而应用功能对应的就是用户界面的交互模块

参考如下：

```js
todoList / actions.js
actionTypes.js
index.js
reducer.js
filter / actions.js
actionTypes.js
index.js
reducer.js
views / components.js
container.js
```

每个功能模块对应一个目录，每个目录下包含同样的角色文件：

- actionTypes.js 定义 action 类型
- actions.js 定义 action 构造函数
- reducer.js 定义这个功能模块如果响应 actions.js 定义的动作
- views 包含功能模块中所有的 React 组件，包括展示组件和容器组件
- index.js 把所有的角色导入，统一导出

其中`index`模块用于导出对外的接口

```js
import * as actions from './actions.js'
import reducer from './reducer.js'
import view from './views/container.js'

export { actions, reducer, view }
```

导入方法如下：

```js
import { actions, reducer, view as TodoList } from './xxxx'
```

## 五、中间件

### 是什么

中间件（Middleware）是介于应用系统和系统软件之间的一类软件，它使用系统软件所提供的基础服务（功能），衔接网络上应用系统的各个部分或不同的应用，能够达到资源共享、功能共享的目的

在上篇文章中，了解到了`Redux`整个工作流程，当`action`发出之后，`reducer`立即算出`state`，整个过程是一个同步的操作

那么如果需要支持异步操作，或者支持错误处理、日志监控，这个过程就可以用上中间件

`Redux`中，中间件就是放在就是在`dispatch`过程，在分发`action`进行拦截处理，如下图：

![](https://static.vue-js.com/57edf750-e699-11eb-ab90-d9ae814b240d.png)

其本质上是一个函数，对`store.dispatch`方法进行了改造，在发出 `Action`和执行 `Reducer`这两步之间，添加了其他功能

### 常用的中间件

有很多优秀的`redux`中间件，如：

- redux-thunk：用于异步操作
- redux-logger：用于日志记录

上述的中间件都需要通过`applyMiddlewares`进行注册，作用是将所有的中间件组成一个数组，依次执行

然后作为第二个参数传入到`createStore`中

```js
const store = createStore(reducer, applyMiddleware(thunk, logger))
```

#### redux-thunk

`redux-thunk`是官网推荐的异步处理中间件

默认情况下的`dispatch(action)`，`action`需要是一个`JavaScript`的对象

`redux-thunk`中间件会判断你当前传进来的数据类型，如果是一个函数，将会给函数传入参数值（dispatch，getState）

- dispatch 函数用于我们之后再次派发 action
- getState 函数考虑到我们之后的一些操作需要依赖原来的状态，用于让我们可以获取之前的一些状态

所以`dispatch`可以写成下述函数的形式：

```js
const getHomeMultidataAction = () => {
  return (dispatch) => {
    axios.get('http://xxx.xx.xx.xx/test').then((res) => {
      const data = res.data.data
      dispatch(changeBannersAction(data.banner.list))
      dispatch(changeRecommendsAction(data.recommend.list))
    })
  }
}
```

#### redux-logger

如果想要实现一个日志功能，则可以使用现成的`redux-logger`

```js
import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
const logger = createLogger()

const store = createStore(reducer, applyMiddleware(logger))
```

这样我们就能简单通过中间件函数实现日志记录的信息

### 实现原理

首先看看`applyMiddlewares`的源码

```js
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    var store = createStore(reducer, preloadedState, enhancer)
    var dispatch = store.dispatch
    var chain = []

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action),
    }
    chain = middlewares.map((middleware) => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return { ...store, dispatch }
  }
}
```

所有中间件被放进了一个数组`chain`，然后嵌套执行，最后执行`store.dispatch`。可以看到，中间件内部（`middlewareAPI`）可以拿到`getState`和`dispatch`这两个方法

在上面的学习中，我们了解到了`redux-thunk`的基本使用

内部会将`dispatch`进行一个判断，然后执行对应操作，原理如下：

```js
function patchThunk(store) {
  let next = store.dispatch

  function dispatchAndThunk(action) {
    if (typeof action === 'function') {
      action(store.dispatch, store.getState)
    } else {
      next(action)
    }
  }

  store.dispatch = dispatchAndThunk
}
```

实现一个日志输出的原理也非常简单，如下：

```js
let next = store.dispatch

function dispatchAndLog(action) {
  console.log('dispatching:', addAction(10))
  next(addAction(5))
  console.log('新的state:', store.getState())
}

store.dispatch = dispatchAndLog
```

## 参考文献

- https://cn.redux.js.org/docs/introduction/
- https://www.redux.org.cn/docs/basics/Actions.html
- https://lulujianglab.com/posts/%E5%A4%A7%E7%99%BD%E8%AF%9D%E8%A7%A3%E6%9E%90%20Redux%20%E3%80%81%20redux-thunk%20%E3%80%81redux-saga%20%E5%92%8C%20react-redux
- https://www.redux.org.cn/docs/basics/UsageWithReact.html
- https://segmentfault.com/a/1190000010384268
- http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html
