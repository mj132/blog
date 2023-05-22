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
          text: '抽象语法树 AST'
        }
      ]
    },
    {
      text: 'HTML',
      collapsible: true,
      collapsed: true,
      items: [
        {
          link: '/front-end/html/01',
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
        }
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
        }
      ]
    },
    {
      text: 'TypeScript',
      collapsible: true,
      collapsed: true,
      items: [
        { link: '/front-end/typescript/typescript_javascript', text: 'typescript 的介绍' },
        { link: '/front-end/typescript/data_type', text: 'typescript 数据类型' },
        { link: '/front-end/typescript/enum', text: 'typescript 枚举类型' },
        { link: '/front-end/typescript/interface', text: 'typescript 接口' },
        { link: '/front-end/typescript/class', text: 'typescript 类' },
        { link: '/front-end/typescript/function', text: 'typescript 函数' },
        { link: '/front-end/typescript/generic', text: 'typescript 泛型' },
        { link: '/front-end/typescript/high_type', text: 'typescript 高级类型' },
        { link: '/front-end/typescript/decorator', text: 'typescript 装饰器' },
        { link: '/front-end/typescript/namespace_module', text: 'typescript 命名空间与模块' },
        { link: '/front-end/typescript/react', text: '在React项目中应用 typescript' },
        { link: '/front-end/typescript/vue', text: '在Vue项目中应用 typescript' }
      ]
    },
    {
      text: 'Webpack',
      collapsible: true,
      collapsed: true,
      items: [
        { link: '/front-end/webpack/webpack', text: 'webpack的介绍' },
        { link: '/front-end/webpack/build_process', text: 'webpack的构建流程' },
        { link: '/front-end/webpack/Loader', text: 'webpack中的Loader' },
        { link: '/front-end/webpack/Plugin', text: 'webpack中常见的Plugin' },
        { link: '/front-end/webpack/Loader_Plugin', text: 'Loader和Plugin的区别' },
        { link: '/front-end/webpack/HMR', text: 'webpack的热更新原理' },
        { link: '/front-end/webpack/proxy', text: 'webpack proxy工作原理' },
        { link: '/front-end/webpack/performance', text: 'webpack优化前端性能' },
        { link: '/front-end/webpack/improve_build', text: '提高webpack的构建速度' },
        { link: '/front-end/webpack/Rollup_Parcel_snowpack_Vite', text: '与webpack类似的工具' }
      ]
    },
    {
      text: 'HTTP',
      collapsible: true,
      collapsed: true,
      items: [
        { link: '/front-end/http/HTTP_HTTPS', text: 'HTTP 和 HTTPS 的区别' },
        { link: '/front-end/http/HTTPS', text: 'HTTPS是如何保证安全的' },
        { link: '/front-end/http/UDP_TCP', text: 'UDP 和 TCP区别和应用场景' },
        { link: '/front-end/http/OSI', text: 'OSI七层模型' },
        { link: '/front-end/http/TCP_IP', text: 'TCP/IP协议' },
        { link: '/front-end/http/DNS', text: 'DNS协议 和 DNS 完整的查询过程' },
        { link: '/front-end/http/CDN', text: 'CDN实现原理' },
        { link: '/front-end/http/1.0_1.1_2.0', text: 'HTTP1.0/1.1/2.0 的区别' },
        { link: '/front-end/http/status', text: 'HTTP 常见的状态码' },
        { link: '/front-end/http/GET_POST', text: 'GET 和 POST 的区别' },
        { link: '/front-end/http/headers', text: 'HTTP 常见的请求头' },
        { link: '/front-end/http/after_url', text: '地址栏输入 URL 敲下回车后发生了什么' },
        { link: '/front-end/http/handshakes_waves', text: 'TCP为什么需要三次握手和四次挥手' },
        { link: '/front-end/http/WebSocket', text: 'WebSocket的理解和应用场景' }
      ]
    },
    {
      text: '浏览器',
      collapsible: true,
      collapsed: true,
      items: [
        {
          link: '/front-end/browser/work_principle',
          text: '浏览器工作原理'
        },
        {
          link: '/front-end/browser/01',
          text: '渲染树'
        },
        {
          link: '/front-end/browser/composite',
          text: '渲染层合并-composite'
        },
        {
          link: '/front-end/browser/GC',
          text: '垃圾回收机制'
        }
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
        }
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
        }
      ]
    },
    {
      text: 'Linux',
      collapsible: true,
      collapsed: true,
      items: [
        {
          link: '/front-end/linux/system',
          text: '操作系统'
        },
        {
          link: '/front-end/linux/thread_process',
          text: '进程和线程'
        },
        {
          link: '/front-end/linux/commands',
          text: 'Linux常用命令'
        },
        {
          link: '/front-end/linux/shell_script',
          text: 'shell 脚本'
        },
        {
          link: '/front-end/linux/redirect_pipe',
          text: '输入输出重定向和管道'
        }
      ]
    },
    {
      text: '其它',
      collapsible: true,
      collapsed: true,
      items: [
        {
          link: '/front-end/other/design',
          text: 'JavaScript设计模式'
        },
        {
          link: '/front-end/other/nginx',
          text: '前端开发者必备的Nginx知识'
        },
        {
          link: '/front-end/other/vnode',
          text: 'VNode 详解'
        },
        {
          link: '/front-end/other/tail_recursion',
          text: '尾递归'
        },
        {
          link: '/front-end/other/encode',
          text: 'js 字符编码方式'
        },
        {
          link: '/front-end/other/npx_npm',
          text: 'npx与npm区别'
        },
        {
          link: '/front-end/other/security',
          text: 'web 常见的攻击方式'
        },
        {
          link: '/front-end/other/reg',
          text: '正则表达式介绍'
        }
      ]
    }
  ],
  '/vue/': [
    {
      text: 'vue2',
      collapsible: true,
      items: [
        {
          link: '/vue/',
          text: '生命周期原理'
        },
        {
          link: '/vue/responsiveData',
          text: '响应式数据原理'
        },
        {
          link: '/vue/compile',
          text: '模板编译原理'
        },
        {
          link: '/vue/initialRender',
          text: '初始渲染原理'
        },
        {
          link: '/vue/update',
          text: '渲染更新原理'
        },
        {
          link: '/vue/nextTick',
          text: 'NextTick异步更新原理'
        },
        {
          link: '/vue/diff',
          text: 'diff算法原理'
        },
        {
          link: '/vue/mixin',
          text: 'Mixin混入原理'
        },
        {
          link: '/vue/component',
          text: '组件原理'
        },
        {
          link: '/vue/watch',
          text: '侦听属性原理'
        },
        {
          link: '/vue/computed',
          text: '计算属性原理'
        },
        {
          link: '/vue/globalApi',
          text: '全局api原理'
        }
      ]
    },
    {
      text: 'vue3',
      collapsible: true,
      collapsed: true,
      items: []
    }
  ],
  '/react/': [
    {
      items: [
        {
          link: '/react/',
          text: 'React理念'
        },
        {
          link: '/react/structure',
          text: 'React 架构'
        },
        {
          link: '/react/fiber',
          text: 'Fiber 架构'
        },
        {
          link: '/react/render',
          text: 'render 阶段'
        },
        {
          link: '/react/commit',
          text: 'commit 阶段'
        },
        {
          link: '/react/diff',
          text: 'Diff 算法'
        }
      ]
    }
  ],
  '/performance/': [
    {
      items: [
        {
          link: '/performance/',
          text: '启程'
        },
        {
          link: '/performance/cache',
          text: '一、缓存'
        },
        {
          link: '/performance/request',
          text: '二、发送请求'
        },
        {
          link: '/performance/response',
          text: '三、服务端响应'
        },
        {
          link: '/performance/parse',
          text: '四、页面解析与处理'
        },
        {
          text: '五、页面静态资源',
          collapsible: true,
          collapsed: true,
          items: [
            {
              link: '/performance/resources/javascript',
              text: 'javascript'
            },
            {
              link: '/performance/resources/css',
              text: 'css'
            },
            {
              link: '/performance/resources/image',
              text: 'image'
            },
            {
              link: '/performance/resources/font',
              text: 'font'
            },
            {
              link: '/performance/resources/video',
              text: 'video'
            }
          ]
        },
        {
          link: '/performance/runtime',
          text: '六、运行时'
        },
        {
          link: '/performance/preload',
          text: '七、预加载'
        },
        {
          link: '/performance/END',
          text: '尾声'
        }
      ]
    }
  ],
  '/interview/': [
    {
      text: '基础题',
      items: [
        {
          text: '面试题-手写js',
          link: '/interview/'
        },
        {
          text: '面试题-css',
          link: '/interview/css'
        },
        {
          text: '面试题-js',
          link: '/interview/javascript'
        }
      ]
    },
    {
      text: '面试题-vue',
      collapsible: true,
      collapsed: true,
      items: [
        { link: '/interview/vue/vue', text: '说说你对vue的理解?' },
        { link: '/interview/vue/spa', text: '说说你对SPA（单页应用）的理解?' },
        { link: '/interview/vue/show_if', text: 'Vue中的v-show和v-if怎么理解？' },
        { link: '/interview/vue/new_vue', text: 'Vue实例挂载的过程中发生了什么?' },
        { link: '/interview/vue/lifecycle', text: '说说你对Vue生命周期的理解?' },
        { link: '/interview/vue/if_for', text: '为什么Vue中的v-if和v-for不建议一起用?' },
        { link: '/interview/vue/first_page_time', text: 'SPA（单页应用）首屏加载速度慢怎么解决？' },
        { link: '/interview/vue/data', text: '为什么data属性是一个函数而不是一个对象？' },
        { link: '/interview/vue/data_object_add_attrs', text: 'Vue中给对象添加新属性界面不刷新?' },
        { link: '/interview/vue/components_plugin', text: 'Vue中组件和插件有什么区别？' },
        { link: '/interview/vue/communication', text: 'Vue组件间通信方式都有哪些?' },
        { link: '/interview/vue/bind', text: '说说你对双向绑定的理解?' },
        { link: '/interview/vue/nexttick', text: '说说你对nexttick的理解?' },
        { link: '/interview/vue/mixin', text: '说说你对vue的mixin的理解，有什么应用场景？' },
        { link: '/interview/vue/slot', text: '说说你对slot的理解？slot使用场景有哪些？' },
        { link: '/interview/vue/observable', text: 'Vue.observable你有了解过吗？说说看' },
        { link: '/interview/vue/key', text: '你知道vue中key的原理吗？说说你对它的理解？' },
        { link: '/interview/vue/keepalive', text: '怎么缓存当前的组件？缓存后怎么更新？说说你对keep-alive的理解是什么？' },
        { link: '/interview/vue/modifier', text: 'Vue常用的修饰符有哪些？有什么应用场景？' },
        { link: '/interview/vue/directive', text: '你有写过自定义指令吗？自定义指令的应用场景有哪些？' },
        { link: '/interview/vue/filter', text: 'Vue中的过滤器了解吗？过滤器的应用场景有哪些？' },
        { link: '/interview/vue/vnode', text: '什么是虚拟DOM？如何实现一个虚拟DOM？说说你的思路' },
        { link: '/interview/vue/diff', text: '你了解vue的diff算法吗？说说看' },
        { link: '/interview/vue/axios', text: 'Vue项目中有封装过axios吗？主要是封装哪方面的？' },
        { link: '/interview/vue/axiosCode', text: '你了解axios的原理吗？有看过它的源码吗？' },
        { link: '/interview/vue/ssr', text: 'SSR解决了什么问题？有做过SSR吗？你是怎么做的？' },
        { link: '/interview/vue/structure', text: '说下你的vue项目的目录结构，如果是大型项目你该怎么划分结构和划分组件呢？' },
        { link: '/interview/vue/permission', text: 'vue要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？' },
        { link: '/interview/vue/cors', text: 'Vue项目中你是如何解决跨域的呢？' },
        { link: '/interview/vue/404', text: 'vue项目本地开发完成后部署到服务器后报404是什么原因呢？' },
        { link: '/interview/vue/error', text: '你是怎么处理vue项目中的错误的？' },
        { link: '/interview/vue/vue3_vue2', text: 'Vue3有了解过吗？能说说跟Vue2的区别吗？' }
      ]
    },
    {
      text: '面试题-vue3',
      collapsible: true,
      collapsed: true,
      items: [
        { link: '/interview/vue3/goal', text: 'Vue3.0的设计目标是什么？做了哪些优化?' },
        { link: '/interview/vue3/performance', text: 'Vue3.0 性能提升主要是通过哪几方面体现的？' },
        { link: '/interview/vue3/proxy', text: 'Vue3.0里为什么要用 Proxy API 替代 defineProperty API ？' },
        { link: '/interview/vue3/composition', text: 'Vue3.0 所采用的 Composition Api 与 Vue2.x 使用的 Options Api 有什么不同？' },
        { link: '/interview/vue3/treeshaking', text: '说说Vue 3.0中Treeshaking特性？举例说明一下？' },
        { link: '/interview/vue3/modal_component', text: '用Vue3.0 写过组件吗？如果想实现一个 Modal你会怎么设计？' }
      ]
    },
    {
      text: '面试题-react',
      collapsible: true,
      collapsed: true,
      items: [
        { link: '/interview/react/react', text: '说说对React的理解' },
        { link: '/interview/react/virtual_dom', text: '说说 Real DOM和 Virtual DOM 的区别' },
        { link: '/interview/react/lifecycle', text: '说说 React 生命周期' },
        { link: '/interview/react/state_props', text: '说说 state 和 props 区别' },
        { link: '/interview/react/super()_super(props)', text: '说说 super() 和 super(props) 区别' },
        { link: '/interview/react/set_state', text: '说说 React 中的 setState 执行机制' },
        { link: '/interview/react/synthetic_event', text: '说说 React 中的 事件机制' },
        { link: '/interview/react/binding_events', text: 'React 事件绑定的方式有哪些' },
        { link: '/interview/react/building_components', text: 'React 构建组件的方式有哪些' },
        { link: '/interview/react/communication', text: 'React 中组件之间如何通信' },
        { link: '/interview/react/refs', text: '说说对 React refs 的理解' },
        { link: '/interview/react/hooks', text: '说说对 React Hooks 的理解' },
        { link: '/interview/react/redux', text: '说说对 Redux 的理解' },
        { link: '/interview/react/router', text: '说说对 React Router 的理解' },
        { link: '/interview/react/immutable', text: '说说对 immutable 的理解' },
        { link: '/interview/react/render', text: '说说 React render 方法的原理' },
        { link: '/interview/react/diff', text: '说说React diff原理和Fiber架构' },
        { link: '/interview/react/jsx_to_dom', text: '说说React Jsx转换成真实DOM过程' },
        { link: '/interview/react/optimize', text: '说说 React 性能优化的手段' },
        { link: '/interview/react/server_render', text: '说说 React 服务端渲染怎么做' }
      ]
    }
  ],
  '/node/': [
    {
      items: [
        {
          text: 'node是什么',
          link: '/node/'
        },
        {
          text: 'node事件循环',
          link: '/node/event_loop'
        },
        {
          text: 'node核心模块-path',
          link: '/node/path'
        },
        {
          text: 'node核心模块-fs',
          link: '/node/fs'
        },
        {
          text: 'node核心模块-stream',
          link: '/node/stream'
        },
        {
          text: 'node核心模块-buffer',
          link: '/node/buffer'
        },
        {
          text: '深入理解Node.js 中的进程与线程',
          link: '/node/processAndThread'
        },
        {
          text: '一文彻底搞懂Events模块',
          link: '/node/events'
        },
        {
          text: 'require 文件查找策略',
          link: '/node/require_order'
        },
        {
          text: '中间件',
          link: '/node/middleware'
        }
      ]
    }
  ]
}
