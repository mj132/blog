module.exports = {
  sidebarDepth: 2,
  '/front-end/': [
    {
      title: 'javascript',
      children: [
        {
          path: '/front-end/javascript/',
          title: '数据类型'
        },
        {
          path: '/front-end/javascript/scope.html',
          title: '作用域链'
        }
      ]
    },
    // {
    //   title: 'vue',
    //   children: [
    //     {
    //       path: '/front-end/vue/',
    //       title: '生命周期分析',
    //     },
    //     {
    //       path: '/front-end/vue/nexttick.html',
    //       title: 'NextTick原理分析'
    //     },
    //   ]
    // },
  ],
  '/interview/': [
    {
      title: '面试题-css',
      path: '/interview/css/'
    },
    {
      title: '面试题-js',
      path: '/interview/javascript/'
    },
  ], 
  '/database/': [
    {
      title: '数据库基础',
      path: '/database/'
    },
    {
      title: 'MySQL基础架构',
      path: '/database/mysql.html'
    },
    // {
    //   title: 'SQL 和 NoSQL 的区别',
    //   path: '/database/nosql.html'
    // },
  ]
}