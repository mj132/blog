# 手写 js 系列

## 1. 实现一个 compose 函数

#### 用法如下

```javascript
function fn1(x) {
  return x + 1
}
function fn2(x) {
  return x + 2
}
function fn3(x) {
  return x + 3
}
function fn4(x) {
  return x + 4
}
const fun = compose(fn1, fn2, fn3, fn4)
console.log(fun(0)) // 0+4+3+2+1=10
```

#### 实现代码如下:

```javascript
function compose(...fn) {
  if (!fn.length) return (v) => v
  if (fn.length === 1) return fn[0]
  return fn.reduce((pre, cur) => (...args) => pre(cur(...args)))
}
```

## 2. 数组扁平化

实现一个方法使多维数组变成一维数组

#### 递归版本如下

```javascript
function flatter(arr) {
  if (!arr.length) return
  return arr.reduce((pre, cur) => (Array.isArray(cur) ? [...pre, ...flatter(cur)] : [...pre, cur]), [])
}
// console.log(flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]]))
```

#### 迭代版本如下:

```javascript
function flatter(arr) {
  if (!arr.length) return
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
// console.log(flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]]))
```

## 3. 实现有并行限制的 Promise 调度器

实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个

```javascript
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
/* 输出顺序是：2 3 1 4

整个的完整执行流程：

一开始1、2两个任务开始执行
500ms时，2任务执行完毕，输出2，任务3开始执行
800ms时，3任务执行完毕，输出3，任务4开始执行
1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
1200ms时，4任务执行完毕，输出4 */
```

#### 实现代码如下:

```javascript
class Scheduler {
  constructor(limit) {
    this.queue = []
    this.maxCount = limit
    this.runCounts = 0
  }
  add(time, order) {
    const promiseCreator = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(order)
          resolve()
        }, time)
      })
    }
    this.queue.push(promiseCreator)
  }
  taskStart() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request()
    }
  }
  request() {
    if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
      return
    }
    this.runCounts++
    this.queue
      .shift()()
      .then(() => {
        this.runCounts--
        this.request()
      })
  }
}
const scheduler = new Scheduler(2)
const addTask = (time, order) => {
  scheduler.add(time, order)
}
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
scheduler.taskStart()
```

## 4. 发布订阅模式

实现一个发布订阅模式拥有 on emit once off 方法

#### 实现代码如下:

```javascript
class EventEmitter {
  constructor() {
    this.events = {}
  }
  // 实现订阅
  on(type, callBack) {
    if (!this.events[type]) {
      this.events[type] = [callBack]
    } else {
      this.events[type].push(callBack)
    }
  }
  // 删除订阅
  off(type, callBack) {
    if (!this.events[type]) return
    this.events[type] = this.events[type].filter((item) => {
      return item !== callBack
    })
  }
  // 只执行一次订阅事件
  once(type, callBack) {
    function fn() {
      callBack()
      this.off(type, fn)
    }
    this.on(type, fn)
  }
  // 触发事件
  emit(type, ...rest) {
    this.events[type] && this.events[type].forEach((fn) => fn.apply(this, rest))
  }
}
// 使用如下
// const event = new EventEmitter()

// const handle = (...rest) => {
//   console.log(rest)
// }

// event.on("click", handle)

// event.emit("click", 1, 2, 3, 4)

// event.off("click", handle)

// event.emit("click", 1, 2)

// event.once("dbClick", () => {
//   console.log(123456)
// })
// event.emit("dbClick")
// event.emit("dbClick")
```

## 5. settimeout 模拟实现 setinterval(带清除定时器的版本)

setinterval 用来实现循环定时调用 可能会存在一定的问题 可以用 settimeout 解决。每个 setTimeout 产生的任务会直接 push 到任务队列中；而 setInterval 在每次把任务 push 到任务队列前，都要进行一下判断（看上次的任务是否仍在队列中，如果有则不添加，没有则添加）。

#### 实现代码如下:

```javascript
function mySettimeout(fn, t) {
  let timer = null
  function interval() {
    fn()
    timer = setTimeout(interval, t)
  }
  interval()
  return {
    cancel: () => {
      clearTimeout(timer)
    },
  }
}
// let fun = mySettimeout(() => {
//   console.log(1)
// }, 1000)
// fun.cancel() 清除定时器
```

## 6. 寄生组合继承

较好的 js 继承方式

#### 实现代码如下:

```javascript
function Parent(name) {
  this.name = name
  this.say = () => {
    console.log(1)
  }
}
Parent.prototype.play = () => {
  console.log(2)
}
function Children(name) {
  Parent.call(this)
  this.name = name
}
Children.prototype = Object.create(Parent.prototype)
Children.prototype.constructor = Children
// let child = new Children("1")
// console.log(child.name)
// child.say()
// child.play()
```

## 7. new 操作符

#### 实现代码如下:

```javascript
function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype)
  const res = fn.call(obj, ...args)
  return res instanceof Object ? res : obj
}
// 用法如下：
// function Person(name, age) {
//   this.name = name
//   this.age = age
// }
// Person.prototype.say = function() {
//   console.log(this.age)
// }
// let p1 = myNew(Person, "mj", 18)
// console.log(p1.name)
// console.log(p1)
// p1.say()
```
