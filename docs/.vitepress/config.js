export default {
  base: "/blog/",
  appearance: 'dark',
  title: '大前端',
  description: '前端技术博客，记录成长轨迹',
  head: [
    ['link', { rel: 'icon', href: './logo.png' }],
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
    logo: '/logo.png',
    nav: [
      {
        text: "前端",
        link: "/front-end/",
        activeMatch: '/front-end'
      },
      {
        text: "Vue",
        link: "/vue/",
        activeMatch: '/vue'
      },
      // {
      //   text: "React",
      //   link: "/react/",
      //   activeMatch: '/react'
      // },
      {
        text: "性能优化",
        link: "/performance/",
        activeMatch: '/performance'
      },
      {
        text: "面试题",
        link: "/interview/",
        activeMatch: '/interview'
      },
      {
        text: "node",
        link: "/node/",
        activeMatch: '/node'
      }
    ],
    sidebar: require('./sidebar.js'),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/mj132' }
    ],
    algolia: {
      appId: 'C4PC7T7WCR',
      apiKey: 'af4b6ea65c248c885e1b0ce587926ea8',
      indexName: 'blog'
    },
    footer: {
      copyright: 'Copyright © 2024-present MJ'
    }
  },
  markdown: {
    theme: 'material-palenight',
    lineNumbers: true
  },
  plugins: [
    // ['@vuepress/back-to-top', true],
    // ['@vuepress/medium-zoom', {
    //   options: {
    //     margin: 16,
    //     background: 'rgba(30, 30, 30, .9)'
    //   }
    // }]
  ]
}
