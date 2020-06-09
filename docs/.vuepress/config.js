module.exports = {
  base: "/blog/",
  title: '大前端',
  description: '前端技术博客，记录成长轨迹',
  head: [
    ['link', {rel: 'icon', href: '/img/clock.gif'}]
  ],
  themeConfig: {
    nav: [{
        text: "主页",
        link: "/"
      },
      {
        text: "前端",
        link: "/webframe/"
      },
      // {
      //   text: "node",
      //   link: "/node/"
      // },
      {
        text: "面试问题",
        link: "/interview/"
      }
    ]
  },
  sidebar: 'auto'
}
