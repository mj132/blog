# 面试官：说说 React render 方法的原理？在什么时候会被触发？如何提高组件渲染效率？

## 一、原理

首先，`render`函数在`react`中有两种形式：

在类组件中，指的是`render`方法：

```jsx
class Foo extends React.Component {
  render() {
    return <h1> Foo </h1>
  }
}
```

在函数组件中，指的是函数组件本身：

```js
function Foo() {
  return <h1> Foo </h1>
}
```

在`render`中，我们会编写`jsx`，`jsx`通过`babel`编译后就会转化成我们熟悉的`js`格式，如下：

```jsx
return (
  <div className='cn'>
    <Header> hello </Header>
    <div> start </div>
    Right Reserve
  </div>
)
```

`babel`编译后：

```js
return React.createElement(
  'div',
  {
    className: 'cn',
  },
  React.createElement(Header, null, 'hello'),
  React.createElement('div', null, 'start'),
  'Right Reserve'
)
```

从名字上来看，`createElement`方法用来创建元素的

在`react`中，这个元素就是虚拟`DOM`树的节点，接收三个参数：

- type：标签
- attributes：标签属性，若无则为 null

- children：标签的子节点

这些虚拟`DOM`树最终会渲染成真实`DOM`

在`render`过程中，`React` 将新调用的 `render`函数返回的树与旧版本的树进行比较，这一步是决定如何更新 `DOM` 的必要步骤，然后进行 `diff` 比较，更新 `DOM`树

## 二、触发时机

`render`的执行时机主要分成了两部分：

- 类组件调用 setState 修改状态

```jsx
class Foo extends React.Component {
  state = { count: 0 }

  increment = () => {
    const { count } = this.state

    const newCount = count < 10 ? count + 1 : count

    this.setState({ count: newCount })
  }

  render() {
    const { count } = this.state
    console.log('Foo render')

    return (
      <div>
        <h1> {count} </h1>
        <button onClick={this.increment}>Increment</button>
      </div>
    )
  }
}
```

点击按钮，则调用`setState`方法，无论`count`是否发生变化，控制台都会输出`Foo render`，证明`render`执行了

- 函数组件通过`useState hook`修改状态

```jsx
function Foo() {
  const [count, setCount] = useState(0)

  function increment() {
    const newCount = count < 10 ? count + 1 : count
    setCount(newCount)
  }

  console.log('Foo render')

  return (
    <div>
      <h1> {count} </h1>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
```

函数组件通过`useState`这种形式更新数据，当数组的值不发生改变了，就不会触发`render`

- 类组件重新渲染

```js
class App extends React.Component {
  state = { name: 'App' }
  render() {
    return (
      <div className='App'>
        <Foo />
        <button onClick={() => this.setState({ name: 'App' })}>Change name</button>
      </div>
    )
  }
}

function Foo() {
  console.log('Foo render')

  return (
    <div>
      <h1> Foo </h1>
    </div>
  )
}
```

只要点击了 `App` 组件内的 `Change name` 按钮，不管 `Foo` 具体实现是什么，都会被重新`render`渲染

- 函数组件重新渲染

```jsx
function App() {
  const [name, setName] = useState('App')

  return (
    <div className='App'>
      <Foo />
      <button onClick={() => setName('aaa')}>{name}</button>
    </div>
  )
}

function Foo() {
  console.log('Foo render')

  return (
    <div>
      <h1> Foo </h1>
    </div>
  )
}
```

可以发现，使用`useState`来更新状态的时候，只有首次会触发`Foo render`，后面并不会导致`Foo render`

## 三、总结

`render`函数里面可以编写`JSX`，转化成`createElement`这种形式，用于生成虚拟`DOM`，最终转化成真实`DOM`

在`React` 中，类组件只要执行了 `setState` 方法，就一定会触发 `render` 函数执行，函数组件使用`useState`更改状态不一定导致重新`render`

组件的`props` 改变了，不一定触发 `render` 函数的执行，但是如果 `props` 的值来自于父组件或者祖先组件的 `state`，在这种情况下，父组件或者祖先组件的 `state` 发生了改变，就会导致子组件的重新渲染

所以，一旦执行了`setState`就会执行`render`方法，`useState` 会判断当前值有无发生改变确定是否执行`render`方法，一旦父组件发生渲染，子组件也会渲染

![](https://static.vue-js.com/229784b0-ecf5-11eb-ab90-d9ae814b240d.png)

## 四、提高组件渲染效率

我们了解到`render`的触发时机，简单来讲就是类组件通过调用`setState`方法， 就会导致`render`，父组件一旦发生`render`渲染，子组件一定也会执行`render`渲染

从上面可以看到，父组件渲染导致子组件渲染，子组件并没有发生任何改变，这时候就可以从避免无谓的渲染，具体实现的方式有如下：

- shouldComponentUpdate
- PureComponent
- React.memo

### shouldComponentUpdate

通过`shouldComponentUpdate`生命周期函数来比对 `state`和 `props`，确定是否要重新渲染

默认情况下返回`true`表示重新渲染，如果不希望组件重新渲染，返回 `false` 即可

### PureComponent

跟`shouldComponentUpdate`原理基本一致，通过对 `props` 和 `state`的浅比较结果来实现 `shouldComponentUpdate`，源码大致如下：

```js
if (this._compositeType === CompositeTypes.PureClass) {
  shouldUpdate = !shallowEqual(prevProps, nextProps) || !shallowEqual(inst.state, nextState)
}
```

`shallowEqual`对应方法大致如下：

```js
const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * is 方法来判断两个值是否是相等的值，为何这么写可以移步 MDN 的文档
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x: mixed, y: mixed): boolean {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } else {
    return x !== x && y !== y
  }
}

function shallowEqual(objA: mixed, objB: mixed): boolean {
  // 首先对基本类型进行比较
  if (is(objA, objB)) {
    return true
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  // 长度不相等直接返回false
  if (keysA.length !== keysB.length) {
    return false
  }

  // key相等的情况下，再去循环比较
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false
    }
  }

  return true
}
```

当对象包含复杂的数据结构时，对象深层的数据已改变却没有触发 `render`

注意：在`react`中，是不建议使用深层次结构的数据

### React.memo

`React.memo`用来缓存组件的渲染，避免不必要的更新，其实也是一个高阶组件，与 `PureComponent` 十分类似。但不同的是， `React.memo` 只能用于函数组件

```jsx
import { memo } from 'react'

function Button(props) {
  // Component code
}

export default memo(Button)
```

如果需要深层次比较，这时候可以给`memo`第二个参数传递比较函数

```jsx
function arePropsEqual(prevProps, nextProps) {
  // your code
  return prevProps === nextProps
}

export default memo(Button, arePropsEqual)
```
### 总结

在实际开发过程中，前端性能问题是一个必须考虑的问题，随着业务的复杂，遇到性能问题的概率也在增高

除此之外，建议将页面进行更小的颗粒化，如果一个过大，当状态发生修改的时候，就会导致整个大组件的渲染，而对组件进行拆分后，粒度变小了，也能够减少子组件不必要的渲染

## 参考文献

- https://zhuanlan.zhihu.com/p/45091185
- https://juejin.cn/post/6844904181493415950
- https://juejin.cn/post/6844903781679759367#heading-12
