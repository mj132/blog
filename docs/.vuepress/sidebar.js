module.exports = {
  '/front-end/': [
    {
      title: 'HTML',
      children: [
        {
          path: 'html/01',
          title: '01: HTML5和HTML4究竟有哪些不同？'
        },
        {
          path: 'html/02',
          title: '02: meta标签属性有哪些？'
        },
        {
          path: 'html/03',
          title: '03: src和href的区别是什么？'
        },
        {
          path: 'html/04',
          title: '04: script标签中defer和async的区别是什么？'
        },
      ]
    },
    {
      title: 'CSS',
      children: [
        {
          path: 'css/01',
          title: '01: 让一个元素水平垂直居中，到底有多少种方案？'
        },
        {
          path: 'css/02',
          title: '02: 浮动布局的优点？有什么缺点？清除浮动有哪些方式？'
        },
        {
          path: 'css/03',
          title: '03: 实现div垂直居中，左右10px，高度始终为宽度一半'
        },
        {
          path: 'css/04',
          title: '04: CSS如何进行品字布局？'
        },
        {
          path: 'css/05',
          title: '05: CSS如何进行圣杯布局？'
        },
        {
          path: 'css/06',
          title: '06: CSS如何进行双飞翼布局？'
        },
        {
          path: 'css/07',
          title: '07: BFC应用'
        },
      ]
    },
    {
      title: 'JS',
      children: [
        {
          path: 'javascript/datatype',
          title: '数据类型'
        },
        {
          path: 'javascript/prototype',
          title: '原型链'
        },
        {
          path: 'javascript/scope',
          title: '作用域链'
        },
        {
          path: 'javascript/this',
          title: 'this关键字'
        },
        {
          path: 'javascript/closure',
          title: '闭包'
        },
        {
          path: 'javascript/higherFunc',
          title: '高阶函数'
        },
        {
          path: 'javascript/promise',
          title: 'promise'
        },
        {
          path: 'javascript/generator',
          title: 'generator'
        },
        {
          path: 'javascript/async-await',
          title: 'async-await'
        },
        {
          path: 'javascript/proxy',
          title: 'proxy'
        },
        {
          path: 'javascript/module',
          title: 'module'
        },
        {
          path: 'javascript/decorator',
          title: 'decorator'
        },
      ]
    },
    {
      title: 'TypeScript',
      children:[
        ["typescript/typescript_javascript", "typescript 的介绍"],
        ["typescript/data_type", "typescript 数据类型"],
        ["typescript/enum", "typescript 枚举类型"],
        ["typescript/interface", "typescript 接口"],
        ["typescript/class", "typescript 类"],
        ["typescript/function", "typescript 函数"],
        ["typescript/generic", "typescript 泛型"],
        ["typescript/high_type", "typescript 高级类型"],
        ["typescript/decorator", "typescript 装饰器"],
        ["typescript/namespace_module", "typescript 命名空间与模块"],
        ["typescript/react", "在React项目中应用 typescript"],
        ["typescript/vue", "在Vue项目中应用 typescript"]
      ]
    },
    {
      title: "Webpack",
      children: [
        ["webpack/webpack", "webpack的介绍"],
        ["webpack/build_process", "webpack的构建流程"],
        ["webpack/Loader", "webpack中的Loader"],
        ["webpack/Plugin", "webpack中常见的Plugin"],
        ["webpack/Loader_Plugin", "Loader和Plugin的区别"],
        ["webpack/HMR", "webpack的热更新原理"],
        ["webpack/proxy", "webpack proxy工作原理"],
        ["webpack/performance", "webpack优化前端性能"],
        ["webpack/improve_build", "提高webpack的构建速度"],
        ["webpack/Rollup_Parcel_snowpack_Vite", "与webpack类似的工具"],
      ]
    },
    {
      title: "http",
      children:[
        ["http/HTTP_HTTPS", "HTTP 和 HTTPS 的区别"],
        ["http/HTTPS", "HTTPS是如何保证安全的"],
        ["http/UDP_TCP", "UDP 和 TCP区别和应用场景"],
        ["http/OSI", "OSI七层模型"],
        ["http/TCP_IP", "TCP/IP协议"],
        ["http/DNS", "DNS协议 和 DNS 完整的查询过程"],
        ["http/CDN", "CDN实现原理"],
        ["http/1.0_1.1_2.0", "HTTP1.0/1.1/2.0 的区别"],
        ["http/status", "HTTP 常见的状态码"],
        ["http/GET_POST", "GET 和 POST 的区别"],
        ["http/headers", "HTTP 常见的请求头"],
        ["http/after_url", "地址栏输入 URL 敲下回车后发生了什么"],
        ["http/handshakes_waves", "TCP为什么需要三次握手和四次挥手"],
        ["http/WebSocket", "WebSocket的理解和应用场景"]
      ]
    },
    {
      title: '浏览器',
      children: [
        {
          path: 'browser/01',
          title: '渲染树',
        },
        {
          path: 'browser/composite',
          title: '渲染层合并-composite',
        },
        {
          path: 'browser/GC',
          title: '垃圾回收机制',
        },
      ]
    },
    {
      title: '正则表达式',
      children: [
        {
          path: 'reg/01',
          title: '正则表达式介绍',
        },
      ]
    },
    {
      title: 'Nginx',
      children: [
        {
          path: 'nginx/01',
          title: '前端开发者必备的Nginx知识',
        },
      ]
    },
    {
      title: '数据库',
      children: [
        {
          title: '数据库基础',
          path: 'database/intro'
        },
        {
          title: 'MySQL基础架构',
          path: 'database/mysql'
        },
        {
          title: 'SQL 和 NoSQL 的区别',
          path: 'database/nosql'
        },
      ]
    },
    {
      title: 'Linux',
      children: [
        {
          path: 'linux/commands',
          title: 'Linux常用命令',
        },
        {
          path: 'linux/shell_script',
          title: 'shell 脚本',
        },
      ]
    },
    {
      title: '其它',
      children: [
        {
          path: 'other/vnode',
          title: 'VNode 详解',
        },
        {
          path: 'other/encode',
          title: 'js 字符编码方式',
        },
        {
          path: 'other/npx_npm',
          title: 'npx与npm区别',
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
      path: 'responsiveData',
      title: '响应式数据原理'
    },
    {
      path: 'compile',
      title: '模板编译原理'
    },
    {
      path: 'initialRender',
      title: '初始渲染原理'
    },
    {
      path: 'update',
      title: '渲染更新原理'
    },
    {
      path: 'nextTick',
      title: 'NextTick异步更新原理'
    },
    {
      path: 'diff',
      title: 'diff算法原理'
    },
    {
      path: 'mixin',
      title: 'Mixin混入原理'
    },
    {
      path: 'component',
      title: '组件原理'
    },
    {
      path: 'watch',
      title: '侦听属性原理'
    },
    {
      path: 'computed',
      title: '计算属性原理'
    },
    {
      path: 'globalApi',
      title: '全局api原理'
    },
  ],
  '/performance-optimization/': [
    {
      path: './',
      title: '启程'
    },
    {
      path: 'cache',
      title: '一、缓存'
    },
    {
      path: 'request',
      title: '二、发送请求'
    },
    {
      path: 'response',
      title: '三、服务端响应'
    },
    {
      path: 'parse',
      title: '四、页面解析与处理'
    },
    {
      path: '/performance-optimization/resources/',
      title: '五、页面静态资源',
      children: [
        {
          path: 'resources/javascript',
          title: 'javascript'
        },
        {
          path: 'resources/css',
          title: 'css'
        },
        {
          path: 'resources/image',
          title: 'image'
        },
        {
          path: 'resources/font',
          title: 'font'
        },
        {
          path: 'resources/video',
          title: 'video'
        },
      ]
    },
    {
      path: 'runtime',
      title: '六、运行时'
    },
    {
      path: 'preload',
      title: '七、预加载'
    },
    {
      path: 'END',
      title: '尾声'
    },
  ],
  '/interview/': [
    {
      title: '面试题-css',
      path: './'
    },
    {
      title: '面试题-js',
      path: 'javascript'
    },
    {
      title: '面试题-手写js',
      path: 'handwriteJs'
    },
    {
      title: '面试题-vue',
      children: [
        ["vue/vue", "说说你对vue的理解?"],
        ["vue/spa", "说说你对SPA（单页应用）的理解?"],
        ["vue/show_if", "Vue中的v-show和v-if怎么理解？"],
        ["vue/new_vue", "Vue实例挂载的过程中发生了什么?"],
        ["vue/lifecycle", "说说你对Vue生命周期的理解?"],
        ["vue/if_for", "为什么Vue中的v-if和v-for不建议一起用?"],
        ["vue/first_page_time", "SPA（单页应用）首屏加载速度慢怎么解决？"],
        ["vue/data", "为什么data属性是一个函数而不是一个对象？"],
        ["vue/data_object_add_attrs", "Vue中给对象添加新属性界面不刷新?"],
        ["vue/components_plugin", "Vue中组件和插件有什么区别？"],
        ["vue/communication", "Vue组件间通信方式都有哪些?"],
        ["vue/bind", "说说你对双向绑定的理解?"],
        ["vue/nexttick", "说说你对nexttick的理解?"],
        ["vue/mixin", "说说你对vue的mixin的理解，有什么应用场景？"],
        ["vue/slot", "说说你对slot的理解？slot使用场景有哪些？"],
        ["vue/observable", "Vue.observable你有了解过吗？说说看"],
        ["vue/key", "你知道vue中key的原理吗？说说你对它的理解？"],
        ["vue/keepalive", "怎么缓存当前的组件？缓存后怎么更新？说说你对keep-alive的理解是什么？"],
        ["vue/modifier", "Vue常用的修饰符有哪些？有什么应用场景？"],
        ["vue/directive", "你有写过自定义指令吗？自定义指令的应用场景有哪些？"],
        ["vue/filter", "Vue中的过滤器了解吗？过滤器的应用场景有哪些？"],
        ["vue/vnode", "什么是虚拟DOM？如何实现一个虚拟DOM？说说你的思路"],
        ["vue/diff", "你了解vue的diff算法吗？说说看"],
        ["vue/axios", "Vue项目中有封装过axios吗？主要是封装哪方面的？"],
        ["vue/axiosCode", "你了解axios的原理吗？有看过它的源码吗？"],
        ["vue/ssr", "SSR解决了什么问题？有做过SSR吗？你是怎么做的？"],
        ["vue/structure", "说下你的vue项目的目录结构，如果是大型项目你该怎么划分结构和划分组件呢？"],
        ["vue/permission", "vue要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？"],
        ["vue/cors", "Vue项目中你是如何解决跨域的呢？"],
        ["vue/404", "vue项目本地开发完成后部署到服务器后报404是什么原因呢？"],
        ["vue/error", "你是怎么处理vue项目中的错误的？"],
        ["vue/vue3_vue2", "Vue3有了解过吗？能说说跟Vue2的区别吗？"]
      ],
    },
    {
      title: '面试题-vue3',
      children: [
        ["vue3/goal", "Vue3.0的设计目标是什么？做了哪些优化?"],
        ["vue3/performance", "Vue3.0 性能提升主要是通过哪几方面体现的？"],
        ["vue3/proxy", "Vue3.0里为什么要用 Proxy API 替代 defineProperty API ？"],
        ["vue3/composition", "Vue3.0 所采用的 Composition Api 与 Vue2.x 使用的 Options Api 有什么不同？"],
        ["vue3/treeshaking", "说说Vue 3.0中Treeshaking特性？举例说明一下？"],
        ["vue3/modal_component", "用Vue3.0 写过组件吗？如果想实现一个 Modal你会怎么设计？"],
      ]
    },
  ],
  '/structure-algorithm/': [
    {
      title: '数据结构',
      children: [
        {
          title: '数据结构介绍',
          path: 'structure/intro'
        },
        {
          title: '栈和队列',
          path: 'structure/stack_queue'
        },
        {
          title: '链表',
          path: 'structure/linked_list'
        },
        {
          title: '集合',
          path: 'structure/set'
        },
        {
          title: '树',
          path: 'structure/tree'
        },
        {
          title: '堆',
          path: 'structure/heap'
        },
        {
          title: '图',
          path: 'structure/graph'
        },
      ]
    },
    {
      title: '算法',
      children: [
        {
          title: '算法介绍',
          path: 'algorithm/intro'
        },
        {
          title: '算法复杂度',
          path: 'algorithm/time_space'
        },
        {
          title: '排序算法',
          path: 'algorithm/sort'
        },
      ]
    }
  ],
  '/node/': [
    {
      title: 'node是什么',
      path: './'
    },
    {
      title: 'node事件循环',
      path: 'event_loop'
    },
    {
      title: 'node核心模块-path',
      path: 'path'
    },
    {
      title: 'node核心模块-fs',
      path: 'fs'
    },
    {
      title: 'node核心模块-stream',
      path: 'stream'
    },
    {
      title: 'node核心模块-buffer',
      path: 'buffer'
    },
    {
      title: '深入理解Node.js 中的进程与线程',
      path: 'processAndThread'
    },
    {
      title: '一文彻底搞懂Events模块',
      path: 'events'
    },
  ],
}