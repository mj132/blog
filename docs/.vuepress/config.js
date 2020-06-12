module.exports = {
  base: "/blog/",
  title: '大前端',
  description: '前端技术博客，记录成长轨迹',
  head: [
    ['link', {rel: 'icon', href: '/img/clock.gif'}]
  ],
  port: '8888',
  themeConfig: {
    nav: [
      {
        text: "主页",
        link: "/"
      },
      {
        text: "前端",
        link: "/web-frame/"
      },
      {
        text: "每日·壹题",
        link: "/interview/"
      },
      {
        text: "GitHub",
        link: "https://github.com/mj132"
      },
      // {
      //   text: "node",
      //   link: "/node/"
      // },
    ]
  },
  markdown: {
    lineNumbers: true
  },
  sidebar: 'auto',
  plugins: [
    '@vuepress/back-to-top'
  ]
}
