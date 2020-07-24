# async和await的讲解

### 声明async函数的几个方法

//普通的函数声明


```javascript
async function Fun() {}
```


//声明一个函数表达式


```javascript
let Fun = async function () {}
```


//async形式的箭头函数


```javascript
let Fun = async () => {}
```


### 初识async和await

async与await实例应用，基础代码
控制器调用与server中查询数据


```javascript
exports.getBlogList = async (ctx,next) => {
  return ctx.body = await ArticleServer.getBlogListServer();
}

exports.getBlogListServer = async () => {
  let where = {
    id:'33'
  }
  let blogList = await articleBlogDa.findAll({where:where});
  console.log("hello" + blogList);
  return  blogList;
}

```

1. 方法执行后的返回值：await命令后面可以是Promise对象或值，如果是值，就会转到一个立即resolve的Promise对象。async函数返回的是一个Promise对象，如果结果是值，会经过Promise包装返回。

2. await与并行：如果在一个async的方法中，有多个await操作的时候，程序会变成完全的串行操作，一个完事等另一个但是为了发挥node的异步优势，当异步操作之间不存在结果的依赖关系时，可以使用promise.all来实现并行，all中的所有方法是一同执行的。

3. 执行后的结果：async函数中，如果有多个await关键字时，如果有一个await的状态变成了rejected，那么后面的操作都不会继续执行，promise也是同理await的返回结果就是后面promise执行的结果，可能是resolves或者rejected的值使用场景循环遍历方便了代码需要同步的操作（文件读取，数据库操作等）

async与await一些注意关键点小结

- 	await关键字必须位于async函数内部
- 	await关键字后面需要一个promise对象（不是的话就调用resolve转换它）
- 	await关键字的返回结果就是其后面Promise执行的结果，可能是resolved或者rejected的值
- 	不能在普通箭头函数中使用await关键字，需要在箭头函数前面添加async
- 	await用来串行的执行异步操作，想实现并行可以考虑promise.all

并行写法

``` javascript
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

### async与await缺点

async函数中，如果有多个await关键字时，如果有一个await的状态变成了rejected，那么后面的操作都不会继续执行。

```javascript
async function fun() {
  await Promise.reject('err');
  await Promise.resolve('hello'); // 不会执行
}
```

有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。

```javascript
async function fun() {
  try {
    await Promise.reject('err');
  } catch(e) {
  }
  return await Promise.resolve('hello');
}

fun()
.then(v => console.log(v))
// hello
```

另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。

```javascript
async function fun() {
  await Promise.reject('err').catch(e => console.log(e));
  return await Promise.resolve('hello');
}

fun()
.then(v => console.log(v))
// err
// hello
```

### await与async大多数人的误区
这个误区在一道面试题那篇文章中详细讲解过，但是还是想提一下。
看一段代码:

```javascript
async function async1(){
    console.log('async1 start')
    await async2()
    console.log('async1 end')
  }
async function async2(){
    console.log('async2')
}
async1();
console.log('i am mj')
```
我想会有一些开发者认为await是把同步变为异步，执行顺序是这样

```
async1 start
async2
async1 end
i am mj
``` 

然而并不是，正确的执行顺序是

```
async1 start
async2
i am mj
async1 end
``` 
解释一下原因：

> “ async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。” ——阮一峰ES6

简单的说，先去执行后面的同步任务代码，执行完成后，也就是表达式中的 Promise 解析完成后继续执行 async 函数并返回解决结果。（其实还是本轮循环promise的问题，最后的resolve属于异步，位于本轮循环的末尾。）

