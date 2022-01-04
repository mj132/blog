# 面试官：说说你对 React Router 的理解？常用的 Router 组件有哪些？模式有哪些？

## 一、是什么

`react-router`等前端路由的原理大致相同，可以实现无刷新的条件下切换显示不同的页面

路由的本质就是页面的`URL`发生改变时，页面的显示结果可以根据`URL`的变化而变化，但是页面不会刷新

因此，可以通过前端路由可以实现单页(SPA)应用

`react-router`主要分成了几个不同的包：

- react-router: 实现了路由的核心功能
- react-router-dom： 基于 react-router，加入了在浏览器运行环境下的一些功能
- react-router-native：基于 react-router，加入了 react-native 运行环境下的一些功能

- react-router-config: 用于配置静态路由的工具库

## 二、有哪些

这里主要讲述的是`react-router-dom`的常用`API`，主要是提供了一些组件：

- BrowserRouter、HashRouter
- Route
- Link、NavLink
- switch
- redirect

### BrowserRouter、HashRouter

`Router`中包含了对路径改变的监听，并且会将相应的路径传递给子组件

`BrowserRouter`是`history`模式，`HashRouter`模式

使用两者作为最顶层组件包裹其他组件

```jsx
import { BrowserRouter as Router } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li>
              <a href=' '>Home</a>
            </li>
            <li>
              <a href='/about'>About</a>
            </li>
            <li>
              <a href='/contact'>Contact</a>
            </li>
          </ul>
        </nav>
      </main>
    </Router>
  )
}
```

### Route

`Route`用于路径的匹配，然后进行组件的渲染，对应的属性如下：

- path 属性：用于设置匹配到的路径
- component 属性：设置匹配到路径后，渲染的组件
- render 属性：设置匹配到路径后，渲染的内容
- exact 属性：开启精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件

```jsx
import { BrowserRouter as Router, Route } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li>
              <a href='/'>Home</a>
            </li>
            <li>
              <a href='/about'>About</a>
            </li>
            <li>
              <a href='/contact'>Contact</a>
            </li>
          </ul>
        </nav>
        <Route path='/' render={() => <h1>Welcome!</h1>} />
      </main>
    </Router>
  )
}
```

### Link、NavLink

通常路径的跳转是使用`Link`组件，最终会被渲染成`a`元素，其中属性`to`代替`a`标题的`href`属性

`NavLink`是在`Link`基础之上增加了一些样式属性，例如组件被选中时，发生样式变化，则可以设置`NavLink`的一下属性：

- activeStyle：活跃时（匹配时）的样式
- activeClassName：活跃时添加的 class

如下：

```js
<NavLink to="/" exact activeStyle={{color: "red"}}>首页</NavLink>
<NavLink to="/about" activeStyle={{color: "red"}}>关于</NavLink>
<NavLink to="/profile" activeStyle={{color: "red"}}>我的</NavLink>
```

如果需要实现`js`实现页面的跳转，那么可以通过下面的形式：

通过`Route`作为顶层组件包裹其他组件后,页面组件就可以接收到一些路由相关的东西，比如`props.history`

```jsx
const Contact = ({ history }) => (
  <Fragment>
    <h1>Contact</h1>
    <button onClick={() => history.push('/')}>Go to home</button>
    <FakeText />
  </Fragment>
)
```

`props`中接收到的`history`对象具有一些方便的方法，如`goBack`，`goForward`,`push`

### redirect

用于路由的重定向，当这个组件出现时，就会执行跳转到对应的`to`路径中，如下例子：

```js
const About = ({
  match: {
    params: { name },
  },
}) => (
  // props.match.params.name
  <Fragment>
    {name !== 'tom' ? <Redirect to='/' /> : null}
    <h1>About {name}</h1>
    <FakeText />
  </Fragment>
)
```

上述组件当接收到的路由参数`name` 不等于 `tom` 的时候，将会自动重定向到首页

### switch

`swich`组件的作用适用于当匹配到第一个组件的时候，后面的组件就不应该继续匹配

如下例子：

```jsx
<Switch>
  <Route exact path='/' component={Home} />
  <Route path='/about' component={About} />
  <Route path='/profile' component={Profile} />
  <Route path='/:userid' component={User} />
  <Route component={NoMatch} />
</Switch>
```

如果不使用`switch`组件进行包裹

除了一些路由相关的组件之外，`react-router`还提供一些`hooks`，如下：

- useHistory
- useParams
- useLocation

### useHistory

`useHistory`可以让组件内部直接访问`history`，无须通过`props`获取

```js
import { useHistory } from 'react-router-dom'

const Contact = () => {
  const history = useHistory()
  return (
    <Fragment>
      <h1>Contact</h1>
      <button onClick={() => history.push('/')}>Go to home</button>
    </Fragment>
  )
}
```

### useParams

```jsx
const About = () => {
  const { name } = useParams()
  return (
    // props.match.params.name
    <Fragment>
      {name !== 'John Doe' ? <Redirect to='/' /> : null}
      <h1>About {name}</h1>
      <Route component={Contact} />
    </Fragment>
  )
}
```

### useLocation

`useLocation` 会返回当前 `URL`的 `location`对象

```jsx
import { useLocation } from 'react-router-dom'

const Contact = () => {
  const { pathname } = useLocation()

  return (
    <Fragment>
      <h1>Contact</h1>
      <p>Current URL: {pathname}</p>
    </Fragment>
  )
}
```

## 三、参数传递

这些路由传递参数主要分成了三种形式：

- 动态路由的方式
- search 传递参数
- to 传入对象

### 动态路由

动态路由的概念指的是路由中的路径并不会固定

例如将`path`在`Route`匹配时写成`/detail/:id`，那么 `/detail/abc`、`/detail/123`都可以匹配到该`Route`

```jsx
<NavLink to="/detail/abc123">详情</NavLink>

<Switch>
    ... 其他Route
    <Route path="/detail/:id" component={Detail}/>
    <Route component={NoMatch} />
</Switch>
```

获取参数方式如下：

```jsx
console.log(props.match.params.xxx)
```

### search 传递参数

在跳转的路径中添加了一些 query 参数；

```jsx
<NavLink to="/detail2?name=why&age=18">详情2</NavLink>

<Switch>
  <Route path="/detail2" component={Detail2}/>
</Switch>
```

获取形式如下：

```js
console.log(props.location.search)
```

### to 传入对象

传递方式如下：

```jsx
<NavLink
  to={{
    pathname: '/detail2',
    query: { name: 'kobe', age: 30 },
    state: { height: 1.98, address: '洛杉矶' },
    search: '?apikey=123',
  }}
>
  详情2
</NavLink>
```

获取参数的形式如下：

```js
console.log(props.location)
```

## 四、模式

在单页应用中，一个`web`项目只有一个`html`页面，一旦页面加载完成之后，就不用因为用户的操作而进行页面的重新加载或者跳转，其特性如下：

- 改变 url 且不让浏览器像服务器发送请求

- 在不刷新页面的前提下动态改变浏览器地址栏中的 URL 地址

其中主要分成了两种模式：

- hash 模式：在 url 后面加上#，如http://127.0.0.1:5500/home/#/page1
- history 模式：允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录

### 使用

`React Router`对应的`hash`模式和`history`模式对应的组件为：

- HashRouter
- BrowserRouter

这两个组件的使用都十分的简单，作为最顶层组件包裹其他组件，如下所示

```jsx
import React from 'react'
import {
  BrowserRouter as Router,
  // HashRouter as Router
  Switch,
  Route,
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Backend from './pages/Backend'
import Admin from './pages/Admin'

function App() {
  return (
    <Router>
      <Route path='/login' component={Login} />
      <Route path='/backend' component={Backend} />
      <Route path='/admin' component={Admin} />
      <Route path='/' component={Home} />
    </Router>
  )
}

export default App
```

### 实现原理

路由描述了 `URL` 与 `UI`之间的映射关系，这种映射是单向的，即 URL 变化引起 UI 更新（无需刷新页面）

下面以`hash`模式为例子，改变`hash`值并不会导致浏览器向服务器发送请求，浏览器不发出请求，也就不会刷新页面

`hash` 值改变，触发全局 `window` 对象上的 `hashchange` 事件。所以 `hash` 模式路由就是利用 `hashchange` 事件监听 `URL` 的变化，从而进行 `DOM` 操作来模拟页面跳转

`react-router`也是基于这个特性实现路由的跳转

下面以`HashRouter`组件分析进行展开：

#### HashRouter

`HashRouter`包裹了整应用，

通过`window.addEventListener('hashChange',callback)`监听`hash`值的变化，并传递给其嵌套的组件

然后通过`context`将`location`数据往后代组件传递，如下：

```jsx
import React, { Component } from 'react'
import { Provider } from './context'
// 该组件下Api提供给子组件使用
class HashRouter extends Component {
  constructor() {
    super()
    this.state = {
      location: {
        pathname: window.location.hash.slice(1) || '/',
      },
    }
  }
  // url路径变化 改变location
  componentDidMount() {
    window.location.hash = window.location.hash || '/'
    window.addEventListener('hashchange', () => {
      this.setState(
        {
          location: {
            ...this.state.location,
            pathname: window.location.hash.slice(1) || '/',
          },
        },
        () => console.log(this.state.location)
      )
    })
  }
  render() {
    let value = {
      location: this.state.location,
    }
    return <Provider value={value}>{this.props.children}</Provider>
  }
}

export default HashRouter
```

#### Route

`Route`组件主要做的是通过`BrowserRouter`传过来的当前值，通过`props`传进来的`path`与`context`传进来的`pathname`进行匹配，然后决定是否执行渲染组件

```js
import React, { Component } from 'react'
import { Consumer } from './context'
const { pathToRegexp } = require('path-to-regexp')
class Route extends Component {
  render() {
    return (
      <Consumer>
        {(state) => {
          console.log(state)
          let { path, component: Component } = this.props
          let pathname = state.location.pathname
          let reg = pathToRegexp(path, [], { end: false })
          // 判断当前path是否包含pathname
          if (pathname.match(reg)) {
            return <Component></Component>
          }
          return null
        }}
      </Consumer>
    )
  }
}
export default Route
```

## 参考文献

- http://react-guide.github.io/react-router-cn/docs/API.html#route
- https://juejin.cn/post/6870376090297171975#heading-9
- https://segmentfault.com/a/1190000023560665
