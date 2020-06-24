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
      title: 'JS',
      children: [
        {
          path: 'javascript/',
          title: '数据类型'
        },
        {
          path: 'javascript/scope.html',
          title: '作用域链'
        }
      ]
    },
    // {
    //   title: 'vue',
    //   children: [
    //     {
    //       path: 'vue/lifecycle.html',
    //       title: '生命周期分析',
    //     },
    //     {
    //       path: 'vue/nexttick.html',
    //       title: 'NextTick原理分析'
    //     },
    //   ]
    // },
    {
      title: '浏览器',
      children: [
        {
          path: 'browser/01.html',
          title: '渲染树',
        },
      ]
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
  ], 
  // '/database/': [
  //   {
  //     title: '数据库基础',
  //     path: './'
  //   },
  //   {
  //     title: 'MySQL基础架构',
  //     path: 'mysql.html'
  //   },
  //   {
  //     title: 'SQL 和 NoSQL 的区别',
  //     path: 'nosql.html'
  //   },
  // ]
}