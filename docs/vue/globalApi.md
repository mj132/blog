## 前言

此篇主要手写 Vue2.0 源码-**全局 api 原理**

上一篇咱们主要介绍了 Vue 计算属性原理 知道了计算属性缓存的特点是怎么实现的 到目前为止整个 Vue 源码核心内容 咱们已经基本手写了一遍 那么此篇来梳理下 Vue 的全局 api

## 正文

### 1. Vue.util

```javascript
// src/global-api/index.js

// exposed util methods.
// NOTE: these are not considered part of the public API - avoid relying on
// them unless you are aware of the risk.
Vue.util = {
  warn,
  extend,
  mergeOptions,
  defineReactive,
}
```

Vue.util 是 Vue 内部的工具方法 不推荐业务组件去使用 因为可能随着版本发生变动 如果咱们不开发第三方 Vue 插件确实使用会比较少

### 2. Vue.set / Vue.delete

```javascript
export function set(target: Array<any> | Object, key: any, val: any): any {
  // 如果是数组 直接调用我们重写的splice方法 可以刷新视图
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  // 如果是对象本身的属性，则直接添加即可
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__

  // 如果对象本身就不是响应式 不需要将其定义成响应式属性
  if (!ob) {
    target[key] = val
    return val
  }
  // 利用defineReactive 实际就是Object.defineProperty 将新增的属性定义成响应式的
  defineReactive(ob.value, key, val)
  ob.dep.notify() // 通知视图更新
  return val
}
```

```javascript
export function del(target: Array<any> | Object, key: any) {
  // 如果是数组依旧调用splice方法
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1)
    return
  }
  const ob = (target: any).__ob__
  // 如果对象本身就没有这个属性 什么都不做
  if (!hasOwn(target, key)) {
    return
  }
  // 直接使用delete  删除这个属性
  delete target[key]
  // 如果对象本身就不是响应式 直接返回
  if (!ob) {
    return
  }
  ob.dep.notify() //通知视图更新
}
```

这两个 api 其实在实际业务场景使用还是很多的 set 方法用来新增响应式数据 delete 方法用来删除响应式数据 因为 Vue 整个响应式过程是依赖 Object.defineProperty 这一底层 api 的 但是这个 api 只能对当前已经声明过的对象属性进行劫持 所以新增的属性不是响应式数据 另外直接修改数组下标也不会引发视图更新 这个是考虑到性能原因 所以我们需要使用$set 和$delete 来进行操作 对响应式原理不熟悉的可以看[响应式数据原理](./responsiveData.html)

### 3. Vue.nextTick

```javascript
let callbacks = [] //回调函数
let pending = false
function flushCallbacks() {
  pending = false //把标志还原为false
  // 依次执行回调
  for (let i = 0; i < callbacks.length; i++) {
    callbacks[i]()
  }
}
let timerFunc //先采用微任务并按照优先级优雅降级的方式实现异步刷新
if (typeof Promise !== 'undefined') {
  // 如果支持promise
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
} else if (typeof MutationObserver !== 'undefined') {
  // MutationObserver 主要是监听dom变化 也是一个异步方法
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true,
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
} else if (typeof setImmediate !== 'undefined') {
  // 如果前面都不支持 判断setImmediate
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // 最后降级采用setTimeout
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

export function nextTick(cb) {
  // 除了渲染watcher  还有用户自己手动调用的nextTick 一起被收集到数组
  callbacks.push(cb)
  if (!pending) {
    // 如果多次调用nextTick  只会执行一次异步 等异步队列清空之后再把标志变为false
    pending = true
    timerFunc()
  }
}
```

nextTick 是 Vue 实现异步更新的核心 此 api 在实际业务使用频次也很高 一般用作在数据改变之后立马要获取 dom 节点相关的属性 那么就可以把这样的方法放在 nextTick 中去实现 可以看[异步更新原理](./nextTick.html)

### 4. Vue.observable

```javascript
Vue.observable = <T>(obj: T): T => {
  observe(obj)
  return obj
}
```

核心就是调用 observe 方法将传入的数据变成响应式对象 可用于制造全局变量在组件共享数据 具体 observe 方法可以看[响应式数据原理-对象的数据劫持](./responsiveData.html)

### 5 Vue.options

```javascript
Vue.options = Object.create(null)
ASSET_TYPES.forEach((type) => {
  Vue.options[type + 's'] = Object.create(null)
})

// this is used to identify the "base" constructor to extend all plain-object
// components with in Weex's multi-instance scenarios.
Vue.options.\_base = Vue

extend(Vue.options.components, builtInComponents) // 内置组件
```

Vue.options 是存放组件 指令和过滤器的容器 并且 Vue.options.\_base 指向 Vue 构造函数

### 6 Vue.use

```javascript
Vue.use = function(plugin: Function | Object) {
  const installedPlugins = this._installedPlugins || (this._installedPlugins = [])
  if (installedPlugins.indexOf(plugin) > -1) {
    // 如果安装过这个插件直接返回
    return this
  }

  const args = toArray(arguments, 1) // 获取参数
  args.unshift(this) // 在参数中增加 Vue 构造函数

  if (typeof plugin.install === 'function') {
    plugin.install.apply(plugin, args) // 执行 install 方法
  } else if (typeof plugin === 'function') {
    plugin.apply(null, args) // 没有 install 方法直接把传入的插件执行
  }
  // 记录安装的插件
  installedPlugins.push(plugin)
  return this
}
```

Vue.use 主要用于插件的注册 调用插件的 install 方法 并且把自身 Vue 传到插件的 install 方法 这样可以避免第三方插件强依赖 Vue

### 7. Vue.mixin

```javascript
export function initMixin(Vue: GlobalAPI) {
  Vue.mixin = function(mixin: Object) {
    this.options = mergeOptions(this.options, mixin) //只要调用 mergeOptions 来合并选项
    return this
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
export function mergeOptions(parent: Object, child: Object, vm?: Component): Object {
  if (!child._base) {
    // 这个代表是组件 需要先把自己定义的 extends 和 mixins 与父级属性进行合并
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm)
    }
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
  }

  // 把自己的和父亲的属性进行合并
  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField(key) {
    //真正合并字段的方法
    const strat = strats[key] || defaultStrat //strats 代表合并策略 会优先查找对应的合并策略 找不到就用默认的合并策略
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
```

Vue.mixin 是全局混入方法 一般用作提取全局的公共方法和属性 想深入了解这块的可以看[Mixin 混入原理](./mixin.html)

### 8. Vue.extend

```javascript
Vue.extend = function(extendOptions: Object): Function {
  const Sub = function VueComponent(options) {
    // 创建子类的构造函数 并且调用初始化方法
    this._init(options)
  }
  Sub.prototype = Object.create(Super.prototype) // 子类原型指向父类
  Sub.prototype.constructor = Sub //constructor 指向自己
  Sub.options = mergeOptions(
    //合并自己的 options 和父类的 options
    Super.options,
    extendOptions
  )
  return Sub
}
```

Vue.extend 被称为组件构造器 Vue 的组件创建就是依赖于此 api 其实就是利用原型继承的方式创建继承自 Vue 的子类 对组件初始化和渲染感兴趣的可以看[组件原理](./component.html)

### 9. 组件、指令、过滤器

```javascript
export function initAssetRegisters(Vue: GlobalAPI) {
  var ASSET_TYPES = ['component', 'directive', 'filter']
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach((type) => {
    Vue[type] = function(id: string, definition: Function | Object): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        this.options[type + 's'][id] = definition //把组件 指令 过滤器 放到 Vue.options 中
        return definition
      }
    }
  })
}
```

定义 Vue.component Vue.directive Vue.filter 三大 api 并且格式化用户传入内容 最后把结果放到 Vue.options 中

### 10 全局 api 思维导图

![global_01](./images/global_01.jpg)

## 小结

至此 Vue 的 全局 api 原理已经完结 基本上很多代码咱们之前 Vue 系列的原理都有写过 很多核心 api 大家在日常开发过程中使用的比较频繁
