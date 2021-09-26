module.exports = {
  '/front-end/': [
    {
      title: 'HTML',
      children: [
        {
          path: 'html/01.html',
          title: '01: HTML5和HTML4究竟有哪些不同？'
        },
        {
          path: 'html/02.html',
          title: '02: meta标签属性有哪些？'
        },
        {
          path: 'html/03.html',
          title: '03: src和href的区别是什么？'
        },
        {
          path: 'html/04.html',
          title: '04: script标签中defer和async的区别是什么？'
        },
      ]
    },
    {
      title: 'CSS',
      children: [
        {
          path: 'css/01.html',
          title: '01: 让一个元素水平垂直居中，到底有多少种方案？'
        },
        {
          path: 'css/02.html',
          title: '02: 浮动布局的优点？有什么缺点？清除浮动有哪些方式？'
        },
        {
          path: 'css/03.html',
          title: '03: 实现div垂直居中，左右10px，高度始终为宽度一半'
        },
        {
          path: 'css/04.html',
          title: '04: CSS如何进行品字布局？'
        },
        {
          path: 'css/05.html',
          title: '05: CSS如何进行圣杯布局？'
        },
        {
          path: 'css/06.html',
          title: '06: CSS如何进行双飞翼布局？'
        },
        {
          path: 'css/07.html',
          title: '07: BFC应用'
        },
      ]
    },
    {
      title: 'JS',
      children: [
        {
          path: 'javascript/datatype.html',
          title: '数据类型'
        },
        {
          path: 'javascript/prototype.html',
          title: '原型链'
        },
        {
          path: 'javascript/scope.html',
          title: '作用域链'
        },
        {
          path: 'javascript/this.html',
          title: 'this关键字'
        },
        {
          path: 'javascript/closure.html',
          title: '闭包'
        },
        {
          path: 'javascript/higherFunc.html',
          title: '高阶函数'
        },
        {
          path: 'javascript/promise.html',
          title: 'promise'
        },
        {
          path: 'javascript/async-await.html',
          title: 'async-await'
        },
      ]
    },
    {
      title: '浏览器',
      children: [
        {
          path: 'browser/01.html',
          title: '渲染树',
        },
        {
          path: 'browser/GC.html',
          title: '垃圾回收机制',
        },
      ]
    },
    {
      title: '正则表达式',
      children: [
        {
          path: 'reg/01.html',
          title: '正则表达式介绍',
        },
      ]
    },
    {
      title: 'Nginx',
      children: [
        {
          path: 'nginx/01.html',
          title: '前端开发者必备的Nginx知识',
        },
      ]
    },
  ],
  '/vue/': [
    {
      path: './',
      title: '生命周期分析',
    },
    {
      path: 'responsiveData.html',
      title: '响应式数据原理'
    },
    {
      path: 'compile.html',
      title: '模板编译原理'
    },
    {
      path: 'initialRender.html',
      title: '初始渲染原理'
    },
    {
      path: 'update.html',
      title: '渲染更新原理'
    },
    {
      path: 'nextTick.html',
      title: 'NextTick异步更新原理'
    },
    {
      path: 'diff.html',
      title: 'diff算法原理'
    },
    {
      path: 'mixin.html',
      title: 'Mixin混入原理'
    },
    {
      path: 'component.html',
      title: '组件原理'
    },
    {
      path: 'watch.html',
      title: '侦听属性原理'
    },
    {
      path: 'computed.html',
      title: '计算属性原理'
    },
    {
      path: 'globalApi.html',
      title: '全局api原理'
    },
  ],
  '/interview/': [
    {
      title: '面试题-css',
      path: './'
    },
    {
      title: '面试题-js',
      path: 'javascript.html'
    },
    {
      title: '面试题-手写js',
      path: 'handwriteJs.html'
    },
  ], 
  '/node/': [
    {
      title: 'node是什么',
      path: './'
    },
    {
      title: 'node事件循环',
      path: 'event_loop.html'
    },
  ],
  '/database/': [
    {
      title: '数据库基础',
      path: './'
    },
    {
      title: 'MySQL基础架构',
      path: 'mysql.html'
    },
    {
      title: 'SQL 和 NoSQL 的区别',
      path: 'nosql.html'
    },
  ]
}