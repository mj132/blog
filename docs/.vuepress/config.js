module.exports = {
  base: "/blog/",
  title: '大前端',
  description: '前端技术博客，记录成长轨迹',
  head: [
    ['link', { rel: 'icon', href: '/img/logo.png' }],
    ['script', {}, `
      var _hmt = _hmt || [];
      (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?4d49147fc5053438fb9687c3abc37043";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    `]
  ],
  port: '8888',
  themeConfig: {
    logo: '/img/logo.png',
    nav: [
      {
        text: "主页",
        link: "/"
      },
      {
        text: "前端",
        link: "/front-end/"
      },
      {
        text: "Vue",
        link: "/vue/"
      },
      {
        text: "面试题",
        link: "/interview/"
      },
      {
        text: "数据库",
        link: "/database/"
      },
      {
        text: "CSDN",
        link: "https://blog.csdn.net/weixin_42569598"
      }
    ],
    sidebarDepth: 2,
    sidebar: require('./sidebar.js')
  },
  markdown: {
    lineNumbers: true
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/medium-zoom', {
      options: {
        margin: 16,
        background: 'rgba(30, 30, 30, .9)'
      }
    }]
  ]
}
