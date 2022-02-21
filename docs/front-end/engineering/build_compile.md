## 构建简史

### 前端进化史

#### 洪荒时代

- Vanilla javascript/HTML/CSS

1993 年-HTML（超文本标记语言）-> 1994-css（层叠样式表）-> javaScript

- 最火热的话题

DOM、BOM、样式放在哪、浏览器的兼容性.....

- jQuery

1. 简化 DOM 操作
2. 制作底层 API（如 xhr）
3. 制作炫酷动画
4. 解决浏览器兼容性问题

- Bootstrap

1. 用 class 决定元素的功能和样式
2. “组件”开始出现
3. 工程化的问题开始显现

#### 曙光初现

- Nodejs 出现

1. NodeJS v0.0.1-2009 年
2. 利用 v8 和 libuv，让 JS 代码运行于浏览器之外
3. Node 出现之前，构建脚本往往需要使用 Makefile、Shell 编写

```js
var sass = require('node-sass')
sass.render(
  {file:scss_filename,[,option...]},
  function(err,result){/*...*/}
)
```

#### 百家争鸣

- Grunt/Gulp

1. 构建工具流开始初步形成
2. 编写简单、生态丰富

#### 语言的进化

1. ECMAScript 6 的出现，即 ES2015，诞生于 2015 年 6 月，现代的语法极大的提高了开发效率

- 箭头函数
- Class 语法
- Promise/Gennerator
- ES Module
  ......

#### MV\*框架

- 现代 mv\*框架的出现

1. Angular、React、Vue
2. 单文件组件、JSX
3. 大量利用了 ES6 新特性

- AMD/CMD

1. 纯前端模块化方案

2. AMD:require.js

3. CMD:sea.js

- CommonJS

1. NodeJS 模块化方案
2. 同步引用依赖、符合人类视觉

```js
module.exports = function() {
  return 'a'
}
var a = require('./a')
```

- ES Module

1. ES6 规带来的语言级模块化方案
2. 支持 Node/Browser 等运行时
3. 利于静态分析

```js
export default function() {
  return 'a'
}
import { default as a } from './a'
```

### 现代化的前端构建

- 我们需要怎样的前端构建

1. 性能：图片优化、合并资源、减少 Polyfill 体积
2. 模块化：Commonjs/ES Module-> script
3. 强力的语法转换：ES6、7、8...
4. 统一打包过程、整体分析优化：Vue 单文件组件

- Babel、webpack

## 不得不提的 babel：token-ast

### 回顾 AST

#### 《代码规范》中的介绍

AST 是一种可遍历的、描述代码的树状结构，利用 AST 可以方便的分析代码的结构和内容。

[AST Explore](https://astexplorer.net/)

### 编译理论

![](https://hejialianghe.gitee.io/assets/img/cpn-process.24c11465.png)

#### Babel 中的编译

- Babel 也是编译器

  输入的是高版本的 ES 代码，输出的是符合我们要求的低版本的 ES 代码，例如：ES7->ES5

- Babel 的工作步骤

根据 Babel 文档，其工作步骤其实主要分为三步

1. 解析（Parsing）：解析代码，生成 AST（抽象语法树）
2. 变换（Transformation）：操作 AST（抽象语法树），修改其内容
3. 生成（Code Generation）：根据 AST（抽象语法树）生成新的代码

### 如何实现简单编译器

#### 目标

- LISP -> C

|     |      LISP       |       C       |
| :-: | :-------------: | :-----------: |
| 2+2 |   (add 2 2 )    |   add(2,2)    |
| 4-2 | (subtract 4 2 ) | subtract(4,2) |

#### parsing

- Tokenizing

![](https://hejialianghe.gitee.io/assets/img/tokenizing.24c5f246.png)

- Tokenizer 函数

![](https://hejialianghe.gitee.io/assets/img/tokenizer.b04318d4.png)

![](https://hejialianghe.gitee.io/assets/img/tokenizer2.b5480dde.png)

将代码转换成 token

- Parser 函数

![](https://hejialianghe.gitee.io/assets/img/Parser.681f1feb.png)

将 token 转换为 AST

#### transformation

- Traverser 函数

深度优先地遍历 AST 树

- TransFormer 函数

在遍历每一个节点时调用将旧 AST 转成一颗新树，就是转换为目标语言的树

#### Code Generator

- Code Generator

深度优先地遍历新的 AST 树，将每个节点依次组合新代码

- 最终的 Compiler

1. input -> tokenizer -> tokens
2. Tokens -> parser -> ast
3. ast -> transformer -> newAst
4. newAst -> generator -> output

```js
function compiler(input) {
  let tokens = tokenizer(input)
  let ast = parser(tokens)
  let newAst = transformer(ast)
  let output = codeGennerator(newAst)
  return output
}
```

### 扩展资料

[the-super-tiny-compiler 项目](https://github.com/jamiebuilds/the-super-tiny-compiler)

[国大学慕课：编译原理 哈尔滨工业大学：](http://www.icourse163.org/course/HIT-1002123007)

## 不得不提的 babel 基本概念

### Babel 的作用

#### Babel 是啥？

- Babel 是啥？
- Babel is javaScript compiler
- 主要将 ECMAScript 2015+的代码，转换成让我们能够在更古老的浏览其和其他环境运行的、兼容性更好的、老版本 javascript 代码
- Babel 能干嘛？

作用 1: 语法转换

```js
[1,2,3].map((n)=>n+1) => [1,2,3].map(function(n){
                                return n+1
                            })
```

作用 2: Polyfill

```js
Array.from(new Set([1, 2, 3]))[(1, [2, 3], [4, [5]])].flat(2)
Promise.resolve(32).then((x) => console.log(x))
```

让 老环境支持新的 api

作用 2: 源码修改

去除 Flow/TypeScript 代码中的类型标识

```js
function square(n: number): number {
  return n + n
}
// ------transformation------
function square(n) {
  return n + n
}
```

### Syntax & Feature

#### Syntax

- Syntax

语言级的某一种概念的写法，不可被语言中的其他概念实现

举个例子

```js
// 1. 箭头函数
;(a, b, c) => a + b + c
// 2. Class类
class A {}
// 3. ES模块
import * as ext from 'fs-ext'
```

#### feature

- Feature 就是指 API

实例方法、静态方法、全局对象等

举个例子

```js
// 1. promise
new Promise().then()
//2. Object.keys
Object.keys({ a: 1 })[
  // 3. [].inculdes
  (1, 2, 3)
].includes(2)
```

### plugin / preset / env

#### plugin

- 插件

babel 本身不会对代码做任何操作，所有功能都靠插件实现

- 有哪些插件？

1. @bable/plugin-transform-arrow-functions
2. @babel/plugin-transform-destructuring
3. @bable/plugin-transform-classes
4. ......

#### preset

- preset 是什么？

A set of plugins，一组插件的集合

- 官方 preset

1. @babel/preset-env
2. @babel/preset-flow
3. @babel/preset-react
4. @babel/preset-typescript

```js
module.exports = function() {
  return {
    plugins: ['pluginA', 'pluginB', 'pluginC'],
  }
}
```

#### env

- env 的出现

@bable/preset-env 是一种更加智能的 preset，让我们只需要根据我们的目标环境，快速配置 babel

- env 的配置例子

```json
{
  "target": ">0,25%,not dead"
}
{
  "target": { "chrome": "58", "ie": "11" }
}
```

### 扩展资料

[browserlist 项目地址](https://github.com/browserslist/browserslist)

[compat-table 项目地址](https://github.com/kangax/compat-table)

## 不得不提的 babel 使用

### Babel 的使用方式

- 直接 require

```js
const bable = require('@babel/core')
babel.transform(code, options, function() {
  result // =>{code,map,ast}
})
```

- babel-cli

```bash
babel src --out-dir lib --ignore "src/**/*.spec.js","src/**/* .test.js"

babel -node --inspect --presets @babel/preset-env -- script.js --inspect
```

- Webpack / Rollup

```js
module:{
  rules:[
    test:/\.m?js$/,
    exclude:/(node_modules | bower_components)/,
    use:{
      loader:'babel-loader',
      options:{
        presets:['@bable/preset-env']
      }
    }
  ]
}
```

### Babel 的配置

#### 配置的位置

- 项目根目录的.babelrc.json

对整个项目生效

- 工程根目录的 babel.config.json

对整个工程生效（可跨项目）

- package.json 的 babel 字段

相当于.babelrc.json

#### plugin

- plugin 的使用

```js
module.exports = {
  // "@babel/preset-env" ,下面配置的是简写，如果工程配置中找不到包，可能是被简写了
  presets: ['@babel/env'],
  // same as "@babel/plugins-transform-arrow-functions"
  plugins: ['@babel/transform-arrow-function'],
}
```

- plugin 的几种配置

```js
// 以下三种配置方式等价
module.exports = {
  plugins: [
    'pluginA',
    ['pluginA'],
    ['pluginA', {}], // 如果plugin配置成数组，第一项是插件名称，第二项是配置
  ],
}
```

利用以下方式，我们可以将配置传入插件

```js
module.exports = {
  plugins: [
    [
      'transform-async-to-module-method',
      {
        module: 'bluebird',
        method: 'coroutine',
      },
    ],
  ],
}
```

- plugin 的顺序

1. Plugins 在 preset 之前执行
2. Plugin 之间从前往后依次执行

babel 为什么这么设计呢？

因为 preset 配置的是比较成熟的语法，plugin 主要配置一些更新特性，plugin 在 preset 之前执行是保证这些新特性是最先被转换的，保证 preset 只关心比较稳定的语法

#### preset

- preset 的使用

```json
{
  "preset": [
    [
      "@bable/preset-env",
      {
        "loose": true,
        "modules": false
      }
    ]
  ]
}
```

为什么 preset 也需要配置呢？

因为 preset 本质就是一组 plugin 的集合,plugins 可以配置，当然 preset 也可以配置，甚至 preset 可以依赖另一个 preset

- preset 的本质

```js
module.exports = () => ({
  presets: ['@babel/preset-env'],
  plugins: [['@babel/plugin-proposal-class-properties', { loose: true }], '@babel/plugin-proposal-object-rest-spread'],
})
```

- preset 的顺序

1. preset 在 plugin 之后执行
2. preset 之间从后往前依次执行

```json
// 执行顺序 c->b->a，这个设计babel文档中说是历史原因造成的
{
  "preset": ["a", "b", "c"]
}
```

#### preset-env

- preset-env 的配置

preset-env 是最常用的 preset，大部分情况下你只需用这一个 preset 就可以了

1. 主要就是 useBuiltins 和 target 两个配置
2. useBuiltins 用来配置 polyfill
3. target 用来告诉 preset-env 选择哪个插件

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "target": {
          "esmodules": true,
          "chrome": "58",
          "ie": "11",
          "node": "current"
        }
      }
    ]
  ]
}
```

- targets 的配置

这个配置项是我们支持的平台是什么

```json
{
  "targets": {"chrome":"58","ie":"11"}
}
// or
{
  "targets": "> .5%  and not last 2 versions"
}
```

1. 可以是描述浏览器版本的对象，也可以是字符串（browserlist）
2. browserlist 完整语法
3. 也可以将 browserlist 写在.browserslistrc 中

- useBuiltIns 的配置

三种取值："usage"、"entry"、"false"，默认是 false

用于自动注入 polyfill 代码

1. false: 什么也不做/不自动注入 polyfill
2. entry: 根据环境配置自动注入 polyfill
3. usage: 根据实际使用自动注入 polyfill

### polyfill

#### Babel 的 Polyfiill

- Babel 7.4 之前

统一使用@babel/polyfill

- babel 7.4 之后

新的形式更有利于 babel 做进一步的转换

```js
import 'core-js/stable'
import 'regenerator-runtime/runtime'
```

core-js 用于 polyfill 大部分的 ES 新 feature

regenerator-runtime/runtime 用于转换 generator 函数

由于 polyfill 会用于运行时，所以要以`dependencies`方式安装

#### Polyfill 的使用

- 直接引入？

官方不建议直接引入，因为太大了，建议将 preset-env 的 useBuiltins 和 corejs 搭配使用。

- useBuiltIns: "entry"

在 target 配置为 chrome71 的条件下使用：

```js
import 'core-js/stable'

// ------------------------

import 'core-js/modules/es.array.unscopables.flat'
import 'core-js/modules/es.array.unscopables.flat-map'
import 'core-js/modules/es.object.form-entries'
import 'core-js/modules/web.immediate'
```

- useBuiltins:false

Babel 什么都不做，完全由你自己决定如何 polyfill

- useBuiltins: "usage"

根据使用情况自动加入 poilfill

```js
// a.js
var set =new Set([1,2,3])

// 转换后
import 'core-js/module/es.array.iterator';
import 'core-js/modules/es.object.to-string';
import 'core-js/modules/es.set';
var set = net Set([1,2,3])
```

<font color="red">**似乎完美了吗？**</font>

```js
export class Animal {
  makeSound(){
    console.log('hi')
  }
}

//  ----------------------------

"use strict"
require("core-js/modules/es6.object.define-property")
function _classCallCheck(instance,constructor){//....}
function _defineProperties(target,props){//....}
function _createClass(Constructor,protoProps,staticProps){//....}
```

Polyfill 函数被内联的写进文件里，如果工程中大量使用 class 语法，必然会出现大量的重复的 polyfill

<font color="red">**解决方法**</font>

yarn add -D @babel/plugins-transform-runtime

yarn add @babel/runtime

```js
var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'))
var _classCallClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'))
```

让所有 polyfill 函数从 @babel/runtime 引入

<font color="red">**带来的好处**</font>

1. 不会污染全局变量
2. 减小包的体积
3. 依赖统一按需引入,无重复引入

<font color="red">**最终配置**</font>

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
      },
    ],
  ],
  plugins: ['@babel/plugin-proposal-class-properties', ['@babel/plugin-transform-runtime']],
}
```
