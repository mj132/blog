module.exports = {
  '/front-end/': [
    {
      text: 'JS',
      collapsible: true,
      items: [
        {
          link: '/front-end/javascript/datatype',
          text: '数据类型'
        },
        {
          link: '/front-end/javascript/prototype',
          text: '原型链'
        },
        {
          link: '/front-end/javascript/scope',
          text: '作用域链'
        },
        {
          link: '/front-end/javascript/this',
          text: 'this关键字'
        },
        {
          link: '/front-end/javascript/execute_context',
          text: '执行上下文栈'
        },
        {
          link: '/front-end/javascript/closure',
          text: '闭包'
        },
        {
          link: '/front-end/javascript/object',
          text: 'object'
        },
        {
          link: '/front-end/javascript/promise',
          text: 'promise'
        },
        {
          link: '/front-end/javascript/generator',
          text: 'generator'
        },
        {
          link: '/front-end/javascript/async-await',
          text: 'async-await'
        },
        {
          link: '/front-end/javascript/proxy',
          text: 'proxy'
        },
        {
          link: '/front-end/javascript/module',
          text: 'module'
        },
        {
          link: '/front-end/javascript/decorator',
          text: 'decorator'
        },
        {
          link: '/front-end/javascript/functional_programming',
          text: '函数式编程'
        },
        {
          link: '/front-end/javascript/higherFunc',
          text: '高阶函数'
        },
        {
          link: '/front-end/javascript/AST',
          text: '抽象语法树 AST',
        },
      ]
    },
    {
      text: 'HTML',
      collapsible: true,
      collapsed: true,
      items: [
        {
          link: '/html/01',
          text: '01: HTML5和HTML4究竟有哪些不同？'
        },
        {
          link: '/front-end/html/02',
          text: '02: meta标签属性有哪些？'
        },
        {
          link: '/front-end/html/03',
          text: '03: src和href的区别是什么？'
        },
        {
          link: '/front-end/html/04',
          text: '04: script标签中defer和async的区别是什么？'
        },
      ]
    },
    {
      text: 'CSS',
      collapsible: true,
      collapsed: true,
      items: [
        {
          link: '/front-end/css/01',
          text: '01: 让一个元素水平垂直居中，到底有多少种方案？'
        },
        {
          link: '/front-end/css/02',
          text: '02: 浮动布局的优点？有什么缺点？清除浮动有哪些方式？'
        },
        {
          link: '/front-end/css/03',
          text: '03: 实现div垂直居中，左右10px，高度始终为宽度一半'
        },
        {
          link: '/front-end/css/04',
          text: '04: CSS如何进行品字布局？'
        },
        {
          link: '/front-end/css/05',
          text: '05: CSS如何进行圣杯布局？'
        },
        {
          link: '/front-end/css/06',
          text: '06: CSS如何进行双飞翼布局？'
        },
        {
          link: '/front-end/css/07',
          text: '07: BFC应用'
        },
      ]
    },
    {
      text: 'TypeScript',
      collapsible: true,
      collapsed: true,
      items: [
        { link: "/front-end/typescript/typescript_javascript", text: "typescript 的介绍" },
        { link: "/front-end/typescript/data_type", text: "typescript 数据类型" },
        { link: "/front-end/typescript/enum", text: "typescript 枚举类型" },
        { link: "/front-end/typescript/interface", text: "typescript 接口" },
        { link: "/front-end/typescript/class", text: "typescript 类" },
        { link: "/front-end/typescript/function", text: "typescript 函数" },
        { link: "/front-end/typescript/generic", text: "typescript 泛型" },
        { link: "/front-end/typescript/high_type", text: "typescript 高级类型" },
        { link: "/front-end/typescript/decorator", text: "typescript 装饰器" },
        { link: "/front-end/typescript/namespace_module", text: "typescript 命名空间与模块" },
        { link: "/front-end/typescript/react", text: "在React项目中应用 typescript" },
        { link: "/front-end/typescript/vue", text: "在Vue项目中应用 typescript" }
      ]
    },
    {
      text: "Webpack",
      collapsible: true,
      collapsed: true,
      items: [
        ["/front-end/webpack/webpack", "webpack的介绍"],
        ["/front-end/webpack/build_process", "webpack的构建流程"],
        ["/front-end/webpack/Loader", "webpack中的Loader"],
        ["/front-end/webpack/Plugin", "webpack中常见的Plugin"],
        ["/front-end/webpack/Loader_Plugin", "Loader和Plugin的区别"],
        ["/front-end/webpack/HMR", "webpack的热更新原理"],
        ["/front-end/webpack/proxy", "webpack proxy工作原理"],
        ["/front-end/webpack/performance", "webpack优化前端性能"],
        ["/front-end/webpack/improve_build", "提高webpack的构建速度"],
        ["/front-end/webpack/Rollup_Parcel_snowpack_Vite", "与webpack类似的工具"],
      ]
    },
    {
      text: "http",
      collapsible: true,
      collapsed: true,
      items: [
        ["/front-end/http/HTTP_HTTPS", "HTTP 和 HTTPS 的区别"],
        ["/front-end/http/HTTPS", "HTTPS是如何保证安全的"],
        ["/front-end/http/UDP_TCP", "UDP 和 TCP区别和应用场景"],
        ["/front-end/http/OSI", "OSI七层模型"],
        ["/front-end/http/TCP_IP", "TCP/IP协议"],
        ["/front-end/http/DNS", "DNS协议 和 DNS 完整的查询过程"],
        ["/front-end/http/CDN", "CDN实现原理"],
        ["/front-end/http/1.0_1.1_2.0", "HTTP1.0/1.1/2.0 的区别"],
        ["/front-end/http/status", "HTTP 常见的状态码"],
        ["/front-end/http/GET_POST", "GET 和 POST 的区别"],
        ["/front-end/http/headers", "HTTP 常见的请求头"],
        ["/front-end/http/after_url", "地址栏输入 URL 敲下回车后发生了什么"],
        ["/front-end/http/handshakes_waves", "TCP为什么需要三次握手和四次挥手"],
        ["/front-end/http/WebSocket", "WebSocket的理解和应用场景"]
      ]
    },
    {
      text: '浏览器',
      collapsible: true,
      collapsed: true,
      items: [
        {
          link: '/front-end/browser/work_principle',
          text: '浏览器工作原理',
        },
        {
          link: '/front-end/browser/01',
          text: '渲染树',
        },
        {
          link: '/front-end/browser/composite',
          text: '渲染层合并-composite',
        },
        {
          link: '/front-end/browser/GC',
          text: '垃圾回收机制',
        },
      ]
    },
    {
      text: '工程化',
      collapsible: true,
      collapsed: true,
      items: [
        {
          text: '前端工程化大纲',
          link: '/front-end/engineering/intro'
        },
        {
          text: '剖析npm包管理机制',
          link: '/front-end/engineering/package'
        },
        {
          text: '编程规范',
          link: '/front-end/engineering/coding_standards'
        },
        {
          text: '工程设计',
          link: '/front-end/engineering/package_design'
        },
        {
          text: '构建与编译',
          link: '/front-end/engineering/build_compile'
        },
        {
          text: 'Git操作',
          link: '/front-end/engineering/git'
        },
      ]
    },
    {
      text: '数据库',
      collapsible: true,
      collapsed: true,
      items: [
        {
          text: '数据库基础',
          link: '/front-end/database/intro'
        },
        {
          text: 'MySQL基础架构',
          link: '/front-end/database/mysql'
        },
        {
          text: 'SQL 和 NoSQL 的区别',
          link: '/front-end/database/nosql'
        },
      ]
    },
    {
      text: 'Linux',
      collapsible: true,
      collapsed: true,
      items: [
        {
          link: '/front-end/linux/system',
          text: '操作系统',
        },
        {
          link: '/front-end/linux/thread_process',
          text: '进程和线程',
        },
        {
          link: '/front-end/linux/commands',
          text: 'Linux常用命令',
        },
        {
          link: '/front-end/linux/shell_script',
          text: 'shell 脚本',
        },
        {
          link: '/front-end/linux/redirect_pipe',
          text: '输入输出重定向和管道',
        },
      ]
    },
    {
      text: '其它',
      collapsible: true,
      collapsed: true,
      items: [
        {
          link: '/front-end/other/design',
          text: 'JavaScript设计模式',
        },
        {
          link: '/front-end/other/nginx',
          text: '前端开发者必备的Nginx知识',
        },
        {
          link: '/front-end/other/vnode',
          text: 'VNode 详解',
        },
        {
          link: '/front-end/other/tail_recursion',
          text: '尾递归',
        },
        {
          link: '/front-end/other/encode',
          text: 'js 字符编码方式',
        },
        {
          link: '/front-end/other/npx_npm',
          text: 'npx与npm区别',
        },
        {
          link: '/front-end/other/security',
          text: 'web 常见的攻击方式',
        },
        {
          link: '/front-end/other/reg',
          text: '正则表达式介绍',
        },
      ]
    },
  ],
  '/vue/': [
    {
      link: './',
      text: '生命周期原理',
    },
    {
      link: 'responsiveData',
      text: '响应式数据原理'
    },
    {
      link: 'compile',
      text: '模板编译原理'
    },
    {
      link: 'initialRender',
      text: '初始渲染原理'
    },
    {
      link: 'update',
      text: '渲染更新原理'
    },
    {
      link: 'nextTick',
      text: 'NextTick异步更新原理'
    },
    {
      link: 'diff',
      text: 'diff算法原理'
    },
    {
      link: 'mixin',
      text: 'Mixin混入原理'
    },
    {
      link: 'component',
      text: '组件原理'
    },
    {
      link: 'watch',
      text: '侦听属性原理'
    },
    {
      link: 'computed',
      text: '计算属性原理'
    },
    {
      link: 'globalApi',
      text: '全局api原理'
    },
  ],
  '/performance-optimization/': [
    {
      link: './',
      text: '启程'
    },
    {
      link: 'cache',
      text: '一、缓存'
    },
    {
      link: 'request',
      text: '二、发送请求'
    },
    {
      link: 'response',
      text: '三、服务端响应'
    },
    {
      link: 'parse',
      text: '四、页面解析与处理'
    },
    {
      link: '/performance-optimization/resources/',
      text: '五、页面静态资源',
      items: [
        {
          link: 'resources/javascript',
          text: 'javascript'
        },
        {
          link: 'resources/css',
          text: 'css'
        },
        {
          link: 'resources/image',
          text: 'image'
        },
        {
          link: 'resources/font',
          text: 'font'
        },
        {
          link: 'resources/video',
          text: 'video'
        },
      ]
    },
    {
      link: 'runtime',
      text: '六、运行时'
    },
    {
      link: 'preload',
      text: '七、预加载'
    },
    {
      link: 'END',
      text: '尾声'
    },
  ],
  '/interview/': [
    {
      text: '面试题-css',
      link: './'
    },
    {
      text: '面试题-js',
      link: 'javascript'
    },
    {
      text: '面试题-手写js',
      link: 'handwriteJs'
    },
    {
      text: '面试题-vue',
      items: [
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
      text: '面试题-vue3',
      items: [
        ["vue3/goal", "Vue3.0的设计目标是什么？做了哪些优化?"],
        ["vue3/performance", "Vue3.0 性能提升主要是通过哪几方面体现的？"],
        ["vue3/proxy", "Vue3.0里为什么要用 Proxy API 替代 defineProperty API ？"],
        ["vue3/composition", "Vue3.0 所采用的 Composition Api 与 Vue2.x 使用的 Options Api 有什么不同？"],
        ["vue3/treeshaking", "说说Vue 3.0中Treeshaking特性？举例说明一下？"],
        ["vue3/modal_component", "用Vue3.0 写过组件吗？如果想实现一个 Modal你会怎么设计？"],
      ]
    },
    {
      text: '面试题-react',
      items: [
        ["react/react", "说说对React的理解"],
        ["react/virtual_dom", "说说 Real DOM和 Virtual DOM 的区别"],
        ["react/lifecycle", "说说 React 生命周期"],
        ["react/state_props", "说说 state 和 props 区别"],
        ["react/super()_super(props)", "说说 super() 和 super(props) 区别"],
        ["react/set_state", "说说 React 中的 setState 执行机制"],
        ["react/synthetic_event", "说说 React 中的 事件机制"],
        ["react/binding_events", "React 事件绑定的方式有哪些"],
        ["react/building_components", "React 构建组件的方式有哪些"],
        ["react/communication", "React 中组件之间如何通信"],
        ["react/refs", "说说对 React refs 的理解"],
        ["react/hooks", "说说对 React Hooks 的理解"],
        ["react/redux", "说说对 Redux 的理解"],
        ["react/router", "说说对 React Router 的理解"],
        ["react/immutable", "说说对 immutable 的理解"],
        ["react/render", "说说 React render 方法的原理"],
        ["react/diff", "说说React diff原理和Fiber架构"],
        ["react/jsx_to_dom", "说说React Jsx转换成真实DOM过程"],
        ["react/optimize", "说说 React 性能优化的手段"],
        ["react/server_render", "说说 React 服务端渲染怎么做"],
      ]
    },
  ],
  '/node/': [
    {
      text: 'node是什么',
      link: './'
    },
    {
      text: 'node事件循环',
      link: 'event_loop'
    },
    {
      text: 'node核心模块-path',
      link: 'path'
    },
    {
      text: 'node核心模块-fs',
      link: 'fs'
    },
    {
      text: 'node核心模块-stream',
      link: 'stream'
    },
    {
      text: 'node核心模块-buffer',
      link: 'buffer'
    },
    {
      text: '深入理解Node.js 中的进程与线程',
      link: 'processAndThread'
    },
    {
      text: '一文彻底搞懂Events模块',
      link: 'events'
    },
    {
      text: 'require 文件查找策略',
      link: 'require_order'
    },
    {
      text: '中间件',
      link: 'middleware'
    },
  ],
}