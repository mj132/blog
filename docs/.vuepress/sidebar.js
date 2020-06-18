module.exports = {
  '/front-end/': [
    {
      title: 'javascript',
      children: [
        {
          path: '/front-end/javascript/',
          title: '数据类型',
          sidebarDepth: 0
        },
        {
          path: '/front-end/javascript/scope',
          title: '作用域链'
        }
      ]
    },
  ],
  '/interview/': [
    {
      title: '面试题-css',
      sidebarDepth: 0,
      children: [
        {
          path: '/interview/css/',
          title: 'css高频面试题'
        }, {
          path: '/interview/css/layout',
          title: '多种布局'
        }
      ]
    },
  ],
  '/database/': [
    {
      title: '数据库基础',
      path: '/database/'
    },
    {
      title: 'SQL 和 NoSQL 的区别',
      path: '/database/nosql'
    },
    {
      title: 'MySQL基础知识',
      path: '/database/mysql'
    },
  ]
}