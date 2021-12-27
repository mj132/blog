# JavaScript 抽象语法树 AST

## 前言

Babel 为当前最流行的代码 JavaScript 编译器了，其使用的 JavaScript 解析器为[babel-parser](https://github.com/babel/babel/tree/master/packages/babel-parser)，最初是从`Acorn` 项目`fork`出来的。Acorn 非常快，易于使用，并且针对非标准特性(以及那些未来的标准特性) 设计了一个基于插件的架构。本文主要介绍[`esprima`](https://github.com/jquery/esprima)解析生成的抽象语法树节点，`esprima`的实现也是基于 Acorn 的。

## 解析器 Parser

JavaScript Parser 是把 js 源码转化为抽象语法树（AST）的解析器。这个步骤分为两个阶段：[词法分析（Lexical Analysis）](https://en.wikipedia.org/wiki/Lexical_analysis) 和 [语法分析（Syntactic Analysis）](https://en.wikipedia.org/wiki/Parsing)。

常用的 JavaScript Parser：

- [esprima](https://github.com/jquery/esprima)

- [uglifyJS2](https://github.com/mishoo/UglifyJS2)

- [traceur](https://github.com/google/traceur-compiler)

- [acorn](https://github.com/acornjs/acorn)

- [espree](https://github.com/eslint/espree)

- [@babel/parser](https://github.com/babel/babel/tree/master/packages/babel-parser)

### 词法分析

词法分析，也称之为扫描（scanner），简单来说就是调用 next() 方法，一个一个字母的来读取字符，然后与定义好的 JavaScript 关键字符做比较，生成对应的Token。Token 是一个不可分割的最小单元，例如 var 这三个字符，它只能作为一个整体，语义上不能再被分解，因此它是一个 Token。词法分析器里，每个关键字是一个 Token ，每个标识符是一个 Token，每个操作符是一个 Token，每个标点符号也都是一个 Token。除此之外，还会过滤掉源程序中的注释和空白字符（换行符、空格、制表符等）。最终，整个代码将被分割进一个tokens列表（或者说一维数组）。

```js
n * n
```

例如上面`n*n`的词法分析得到结果如下：

```js
[
  { type: { ... }, value: "n", start: 0, end: 1, loc: { ... } },
  { type: { ... }, value: "*", start: 2, end: 3, loc: { ... } },
  { type: { ... }, value: "n", start: 4, end: 5, loc: { ... } },
]
```

每一个 type 有一组属性来描述该令牌：

```ts
{
  type: {
    label: 'name',
    keyword: undefined,
    beforeExpr: false,
    startsExpr: true,
    rightAssociative: false,
    isLoop: false,
    isAssign: false,
    prefix: false,
    postfix: false,
    binop: null,
    updateContext: null
  },
  ...
}
```

和 AST 节点一样它们也有 start，end，loc 属性。

### 语法分析

语法分析会将词法分析出来的 Token 转化成有语法含义的抽象语法树结构。同时，验证语法，语法如果有错的话，抛出语法错误。

```js
function square(n) {
  return n * n
}
```

如上面代码，生成的 AST 结构如下：

```js
{
  type: "FunctionDeclaration",
  id: {
    type: "Identifier",
    name: "square"
  },
  params: [{
    type: "Identifier",
    name: "n"
  }],
  body: {
    type: "BlockStatement",
    body: [{
      type: "ReturnStatement",
      argument: {
        type: "BinaryExpression",
        operator: "*",
        left: {
          type: "Identifier",
          name: "n"
        },
        right: {
          type: "Identifier",
          name: "n"
        }
      }
    }]
  }
}
```

下文将对 AST 各个类型节点做解释。更多 AST 生成，入口如下:

- [eslint](https://eslint.org/parser/)

- [AST Explorer](https://astexplorer.net/)

- [esprima](http://esprima.org/demo/parse.html)

结合[可视化工具](http://resources.jointjs.com/demos/javascript-ast)，举个例子

如下代码：

```js
var a = 42
var b = 5
function addA(d) {
  return a + d
}
var c = addA(2) + b
```

第一步词法分析之后长成如下图所示：

![词法分析](./images/ast_01.png)

语法分析，生产抽象语法树，生成的抽象语法树如下图所示

![语法分析](./images/ast_02.png)

## Base

### Node

所有节点类型都实现以下接口：

```ts
interface Node {
  type: string
  range?: [number, number]
  loc?: SourceLocation
}
```

该 type 字段是表示 AST 变体类型的字符串。该 loc 字段表示节点的源位置信息。如果解析器没有生成有关节点源位置的信息，则该字段为 null;否则它是一个对象，包括一个起始位置（被解析的源区域的第一个字符的位置）和一个结束位置.

```ts
interface SourceLocation {
  start: Position
  end: Position
  source?: string | null
}
```

每个 Position 对象由一个 line 数字（1 索引）和一个 column 数字（0 索引）组成：

```ts
interface Position {
    line: uint32 >= 1;
    column: uint32 >= 0;
}
```

### Programs

```ts
interface Program <: Node {
    type: "Program";
    sourceType: 'script' | 'module';
    body: StatementListItem[] | ModuleItem[];
}
```

表示一个完整的源代码树。

## Scripts and Modules

源代码数的来源包括两种，一种是 script 脚本，一种是 modules 模块

当为 script 时，body 为`StatementListItem`。
当为 modules 时，body 为`ModuleItem`。

类型`StatementListItem`和`ModuleItem`类型如下。

```ts
type StatementListItem = Declaration | Statement
type ModuleItem = ImportDeclaration | ExportDeclaration | StatementListItem
```

### ImportDeclaration

import 语法，导入模块

```ts
type ImportDeclaration {
    type: 'ImportDeclaration';
    specifiers: ImportSpecifier[];
    source: Literal;
}
```

`ImportSpecifier`类型如下：

```ts
interface ImportSpecifier {
  type: 'ImportSpecifier' | 'ImportDefaultSpecifier' | 'ImportNamespaceSpecifier'
  local: Identifier
  imported?: Identifier
}
```

`ImportSpecifier`语法如下：

```js
import { foo } from './foo'
```

`ImportDefaultSpecifier`语法如下：

```js
import foo from './foo'
```

`ImportNamespaceSpecifier`语法如下

```js
import * as foo from './foo'
```

### ExportDeclaration

export 类型如下

```ts
type ExportDeclaration = ExportAllDeclaration | ExportDefaultDeclaration | ExportNamedDeclaration
```

`ExportAllDeclaration`从指定模块中导出

```ts
interface ExportAllDeclaration {
  type: 'ExportAllDeclaration'
  source: Literal
}
```

语法如下:

```js
export * from './foo'
```

`ExportDefaultDeclaration`导出默认模块

```ts
interface ExportDefaultDeclaration {
  type: 'ExportDefaultDeclaration'
  declaration: Identifier | BindingPattern | ClassDeclaration | Expression | FunctionDeclaration
}
```

语法如下：

```js
export default 'foo'
```

`ExportNamedDeclaration`导出部分模块

```ts
interface ExportNamedDeclaration {
  type: 'ExportNamedDeclaration'
  declaration: ClassDeclaration | FunctionDeclaration | VariableDeclaration
  specifiers: ExportSpecifier[]
  source: Literal
}
```

语法如下：

```js
export const foo = 'foo'
```

## Declarations and Statements

`declaration`，即声明，类型如下：

```ts
type Declaration = VariableDeclaration | FunctionDeclaration | ClassDeclaration
```

`statements`，即语句，类型如下：

```ts
type Statement = BlockStatement | BreakStatement | ContinueStatement | DebuggerStatement | DoWhileStatement | EmptyStatement | ExpressionStatement | ForStatement | ForInStatement | ForOfStatement | FunctionDeclaration | IfStatement | LabeledStatement | ReturnStatement | SwitchStatement | ThrowStatement | TryStatement | VariableDeclaration | WhileStatement | WithStatement
```

### VariableDeclarator

变量声明，kind 属性表示是什么类型的声明，因为 ES6 引入了 const/let。

```ts
interface VariableDeclaration <: Declaration {
    type: "VariableDeclaration";
    declarations: [ VariableDeclarator ];
    kind: "var" | "let" | "const";
}
```

### FunctionDeclaration

函数声明（非函数表达式）

```js
interface FunctionDeclaration {
  type: 'FunctionDeclaration';
  id: Identifier | null;
  params: FunctionParameter[];
  body: BlockStatement;
  generator: boolean;
  async: boolean;
  expression: false;
}
```

例如：

```js
function foo() {}

function* bar() {
  yield '44'
}

async function noop() {
  await new Promise(function(resolve, reject) {
    resolve('55')
  })
}
```

### ClassDeclaration

类声明（非类表达式）

```ts
interface ClassDeclaration {
  type: 'ClassDeclaration'
  id: Identifier | null
  superClass: Identifier | null
  body: ClassBody
}
```

`ClassBody`声明如下：

```ts
interface ClassBody {
  type: 'ClassBody'
  body: MethodDefinition[]
}
```

`MethodDefinition`表示方法声明；

```ts
interface MethodDefinition {
  type: 'MethodDefinition'
  key: Expression | null
  computed: boolean
  value: FunctionExpression | null
  kind: 'method' | 'constructor'
  static: boolean
}
```

```js
class foo {
  constructor() {}
  method() {}
}
```

### ContinueStatement

continue 语句

```ts
interface ContinueStatement {
  type: 'ContinueStatement'
  label: Identifier | null
}
```

例如：

```js
for (var i = 0; i < 10; i++) {
  if (i === 0) {
    continue
  }
}
```

### DebuggerStatement

debugger 语句

```ts
interface DebuggerStatement {
  type: 'DebuggerStatement'
}
```

例如

```js
while (true) {
  debugger
}
```

### DoWhileStatement

do-while 语句

```ts
interface DoWhileStatement {
  type: 'DoWhileStatement'
  body: Statement
  test: Expression
}
```

`test`表示 while 条件

例如：

```js
var i = 0
do {
  i++
} while ((i = 2))
```

### EmptyStatement

空语句

```ts
interface EmptyStatement {
  type: 'EmptyStatement'
}
```

例如：

```js
if (true);

var a = []
for (i = 0; i < a.length; a[i++] = 0);
```

### ExpressionStatement

表达式语句，即，由单个表达式组成的语句。

```ts
interface ExpressionStatement {
  type: 'ExpressionStatement'
  expression: Expression
  directive?: string
}
```

当表达式语句表示一个指令(例如“use strict”)时，directive 属性将包含该指令字符串。

例如：

```js
;(function() {})
```

### ForStatement

for 语句

```ts
interface ForStatement {
  type: 'ForStatement'
  init: Expression | VariableDeclaration | null
  test: Expression | null
  update: Expression | null
  body: Statement
}
```

### ForInStatement

for...in 语句

```ts
interface ForInStatement {
  type: 'ForInStatement'
  left: Expression
  right: Expression
  body: Statement
  each: false
}
```

### ForOfStatement

for...of 语句

```ts
interface ForOfStatement {
  type: 'ForOfStatement'
  left: Expression
  right: Expression
  body: Statement
}
```

### IfStatement

if 语句

```ts
interface IfStatement {
  type: 'IfStatement'
  test: Expression
  consequent: Statement
  alternate?: Statement
}
```

`consequent`表示 if 命中后内容，`alternate`表示 else 或者 else if 的内容。

### LabeledStatement

label 语句，多用于精确的使用嵌套循环中的 continue 和 break。

```ts
interface LabeledStatement {
  type: 'LabeledStatement'
  label: Identifier
  body: Statement
}
```

如：

```js
var num = 0
outPoint: for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    if (i == 5 && j == 5) {
      break outPoint
    }
    num++
  }
}
```

### ReturnStatement

return 语句

```ts
interface ReturnStatement {
  type: 'ReturnStatement'
  argument: Expression | null
}
```

### SwitchStatement

Switch 语句

```ts
interface SwitchStatement {
  type: 'SwitchStatement'
  discriminant: Expression
  cases: SwitchCase[]
}
```

`discriminant`表示 switch 的变量。

`SwitchCase`类型如下

```ts
interface SwitchCase {
  type: 'SwitchCase'
  test: Expression | null
  consequent: Statement[]
}
```

### ThrowStatement

throw 语句

```ts
interface ThrowStatement {
  type: 'ThrowStatement'
  argument: Expression
}
```

### TryStatement

try...catch 语句

```ts
interface TryStatement {
  type: 'TryStatement'
  block: BlockStatement
  handler: CatchClause | null
  finalizer: BlockStatement | null
}
```

`handler`为 catch 处理声明内容，`finalizer`为 finally 内容。

`CatchClaus` 类型如下

```ts
interface CatchClause {
  type: 'CatchClause'
  param: Identifier | BindingPattern
  body: BlockStatement
}
```

例如：

```js
try {
  foo()
} catch (e) {
  console.erroe(e)
} finally {
  bar()
}
```

### WhileStatement

while 语句

```ts
interface WhileStatement {
  type: 'WhileStatement'
  test: Expression
  body: Statement
}
```

`test`为判定表达式

### WithStatement

with 语句（指定块语句的作用域）

```ts
interface WithStatement {
  type: 'WithStatement'
  object: Expression
  body: Statement
}
```

如：

```js
var a = {}

with (a) {
  name = 'xiao.ming'
}

console.log(a) // {name: 'xiao.ming'}
```

## Expressions and Patterns

`Expressions`可用类型如下：

```ts
type Expression = ThisExpression | Identifier | Literal | ArrayExpression | ObjectExpression | FunctionExpression | ArrowFunctionExpression | ClassExpression | TaggedTemplateExpression | MemberExpression | Super | MetaProperty | NewExpression | CallExpression | UpdateExpression | AwaitExpression | UnaryExpression | BinaryExpression | LogicalExpression | ConditionalExpression | YieldExpression | AssignmentExpression | SequenceExpression
```

`Patterns`可用有两种类型，函数模式和对象模式如下：

```ts
type BindingPattern = ArrayPattern | ObjectPattern
```

### ThisExpression

`this` 表达式

```ts
interface ThisExpression {
  type: 'ThisExpression'
}
```

### Identifier

标识符，就是我们写 JS 时自定义的名称，如变量名，函数名，属性名，都归为标识符。相应的接口是这样的：

```ts
interface Identifier {
  type: 'Identifier'
  name: string
}
```

### Literal

字面量，这里不是指 [] 或者 {} 这些，而是本身语义就代表了一个值的字面量，如 1，“hello”, true 这些，还有正则表达式（有一个扩展的 Node 来表示正则表达式），如 /\d?/。

```ts
interface Literal {
  type: 'Literal'
  value: boolean | number | string | RegExp | null
  raw: string
  regex?: { pattern: string; flags: string }
}
```

例如：

```js
var a = 1
var b = 'b'
var c = false
var d = /\d/
```

### ArrayExpression

数组表达式

```ts
interface ArrayExpression {
  type: 'ArrayExpression'
  elements: ArrayExpressionElement[]
}
```

例:

```js
;[1, 2, 3, 4]
```

### ArrayExpressionElement

数组表达式的节点，类型如下

```ts
type ArrayExpressionElement = Expression | SpreadElement
```

Expression 包含所有表达式，SpreadElement 为扩展运算符语法。

### SpreadElement

扩展运算符

```ts
interface SpreadElement {
  type: 'SpreadElement'
  argument: Expression
}
```

如：

```js
var a = [3, 4]
var b = [1, 2, ...a]

var c = { foo: 1 }
var b = { bar: 2, ...c }
```

### ObjectExpression

对象表达式

```ts
interface ObjectExpression {
  type: 'ObjectExpression'
  properties: Property[]
}
```

`Property`代表为对象的属性描述

类型如下

```ts
interface Property {
  type: 'Property'
  key: Expression
  computed: boolean
  value: Expression | null
  kind: 'get' | 'set' | 'init'
  method: false
  shorthand: boolean
}
```

`kind`用来表示是普通的初始化，或者是 get/set。

例如：

```js
var obj = {
  foo: 'foo',
  bar: function() {},
  noop() {}, // method 为 true
  ['computed']: 'computed', // computed 为 true
}
```

### FunctionExpression

函数表达式

```ts
interface FunctionExpression {
  type: 'FunctionExpression'
  id: Identifier | null
  params: FunctionParameter[]
  body: BlockStatement
  generator: boolean
  async: boolean
  expression: boolean
}
```

例如：

```js
var foo = function() {}
```

### ArrowFunctionExpression

箭头函数表达式

```ts
interface ArrowFunctionExpression {
  type: 'ArrowFunctionExpression'
  id: Identifier | null
  params: FunctionParameter[]
  body: BlockStatement | Expression
  generator: boolean
  async: boolean
  expression: false
}
```

`generator`表示是否为 generator 函数，`async`表示是否为 async/await 函数，`params`为参数定义。

`FunctionParameter`类型如下

```ts
type FunctionParameter = AssignmentPattern | Identifier | BindingPattern
```

例：

```js
var foo = () => {}
```

### ClassExpression

类表达式

```ts
interface ClassExpression {
  type: 'ClassExpression'
  id: Identifier | null
  superClass: Identifier | null
  body: ClassBody
}
```

例如：

```js
var foo = class {
  constructor() {}
  method() {}
}
```

### TaggedTemplateExpression

标记模板文字函数

```ts
interface TaggedTemplateExpression {
  type: 'TaggedTemplateExpression'
  readonly tag: Expression
  readonly quasi: TemplateLiteral
}
```

`TemplateLiteral`类型如下

```ts
interface TemplateLiteral {
  type: 'TemplateLiteral'
  quasis: TemplateElement[]
  expressions: Expression[]
}
```

`TemplateElement`类型如下

```ts
interface TemplateElement {
  type: 'TemplateElement'
  value: { cooked: string; raw: string }
  tail: boolean
}
```

例如

```js
var foo = function(a) {
  console.log(a)
}
foo`test`
```

### MemberExpression

属性成员表达式

```ts
interface MemberExpression {
  type: 'MemberExpression'
  computed: boolean
  object: Expression
  property: Expression
}
```

例如：

```js
const foo = { bar: 'bar' }
foo.bar
foo['bar'] // computed 为 true
```

### Super

父类关键字

```ts
interface Super {
  type: 'Super'
}
```

例如:

```js
class foo {}
class bar extends foo {
  constructor() {
    super()
  }
}
```

### MetaProperty

（这个不知道干嘛用的）

```ts
interface MetaProperty {
  type: 'MetaProperty'
  meta: Identifier
  property: Identifier
}
```

例如:

```js
new.target // 通过new 声明的对象，new.target会存在

import.meta
```

### CallExpression

函数执行表达式

```ts
interface CallExpression {
  type: 'CallExpression'
  callee: Expression | Import
  arguments: ArgumentListElement[]
}
```

Import 类型，没搞懂。

```ts
interface Import {
  type: 'Import'
}
```

`ArgumentListElement`类型

```ts
type ArgumentListElement = Expression | SpreadElement
```

如：

```js
var foo = function() {}
foo()
```

### NewExpression

new 表达式

```ts
interface NewExpression {
  type: 'NewExpression'
  callee: Expression
  arguments: ArgumentListElement[]
}
```

### UpdateExpression

更新操作符表达式，如`++`、`--`;

```ts
interface UpdateExpression {
  type: 'UpdateExpression'
  operator: '++' | '--'
  argument: Expression
  prefix: boolean
}
```

如:

```js
var i = 0
i++
++i // prefix为true
```

### AwaitExpression

await 表达式，会与 async 连用。

```ts
interface AwaitExpression {
  type: 'AwaitExpression'
  argument: Expression
}
```

如

```js
async function foo() {
  var bar = function() {
    new Primise(function(resolve, reject) {
      setTimeout(function() {
        resove('foo')
      }, 1000)
    })
  }
  return await bar()
}

foo() // foo
```

### UnaryExpression

一元操作符表达式

```ts
interface UnaryExpression {
  type: 'UnaryExpression'
  operator: UnaryOperator
  prefix: boolean
  argument: Expression
}
```

枚举`UnaryOperator`

```ts
enum UnaryOperator {
  "-" | "+" | "!" | "~" | "typeof" | "void" | "delete" | "throw"
}
```

### BinaryExpression

二元操作符表达式

```ts
interface BinaryExpression {
  type: 'BinaryExpression'
  operator: BinaryOperator
  left: Expression
  right: Expression
}
```

枚举`BinaryOperator`

```ts
enum BinaryOperator {
  "==" | "!=" | "===" | "!=="
     | "<" | "<=" | ">" | ">="
     | "<<" | ">>" | ">>>"
     | "+" | "-" | "*" | "/" | "%"
     | "**" | "|" | "^" | "&" | "in"
     | "instanceof"
     | "|>"
}
```

### LogicalExpression

逻辑运算符表达式

```ts
interface LogicalExpression {
  type: 'LogicalExpression'
  operator: '||' | '&&'
  left: Expression
  right: Expression
}
```

如：

```js
var a = '-'
var b = a || '-'

if (a && b) {
}
```

### ConditionalExpression

条件运算符

```ts
interface ConditionalExpression {
  type: 'ConditionalExpression'
  test: Expression
  consequent: Expression
  alternate: Expression
}
```

例如：

```js
var a = true
var b = a ? 'consequent' : 'alternate'
```

### YieldExpression

yield 表达式

```ts
interface YieldExpression {
  type: 'YieldExpression'
  argument: Expression | null
  delegate: boolean
}
```

例如：

```js
function* gen(x) {
  var y = yield x + 2
  return y
}
```

### AssignmentExpression

赋值表达式。

```ts
interface AssignmentExpression {
  type: 'AssignmentExpression'
  operator: '=' | '*=' | '**=' | '/=' | '%=' | '+=' | '-=' | '<<=' | '>>=' | '>>>=' | '&=' | '^=' | '|='
  left: Expression
  right: Expression
}
```

`operator`属性表示一个赋值运算符，`left`和`right`是赋值运算符左右的表达式。

### SequenceExpression

序列表达式（使用逗号）。

```ts
interface SequenceExpression {
  type: 'SequenceExpression'
  expressions: Expression[]
}
```

```js
var a, b
;(a = 1), (b = 2)
```

### ArrayPattern

数组解析模式

```ts
interface ArrayPattern {
  type: 'ArrayPattern'
  elements: ArrayPatternElement[]
}
```

例：

```js
const [a, b] = [1, 3]
```

elements 代表数组节点

ArrayPatternElement 如下

```js
type ArrayPatternElement = AssignmentPattern | Identifier | BindingPattern | RestElement | null
```

### AssignmentPattern

默认赋值模式，数组解析、对象解析、函数参数默认值使用。

```ts
interface AssignmentPattern {
  type: 'AssignmentPattern'
  left: Identifier | BindingPattern
  right: Expression
}
```

例：

```js
const [a, b = 4] = [1, 3]
```

### RestElement

剩余参数模式，语法与扩展运算符相近。

```ts
interface RestElement {
  type: 'RestElement'
  argument: Identifier | BindingPattern
}
```

例：

```js
const [a, b, ...c] = [1, 2, 3, 4]
```

### ObjectPatterns

对象解析模式

```ts
interface ObjectPattern {
  type: 'ObjectPattern'
  properties: Property[]
}
```

例：

```js
const object = { a: 1, b: 2 }
const { a, b } = object
```

## 结束

AST 的作用大致分为几类

1. IDE 使用，如代码风格检测(eslint 等)、代码的格式化，代码高亮，代码错误等等

2. 代码的混淆压缩

3. 转换代码的工具。如 webpack，rollup，各种代码规范之间的转换，ts，jsx 等转换为原生 js

了解 AST，最终还是为了让我们了解我们使用的工具，当然也让我们更了解 JavaScript，更靠近 JavaScript。

## 参考文献

- [前端进阶之 Javascript 抽象语法树](https://segmentfault.com/a/1190000015653342)

- [抽象语法树(Abstract Syntax Tree)](https://segmentfault.com/a/1190000014389494)
