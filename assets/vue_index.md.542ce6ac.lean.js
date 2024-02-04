import{_ as e,c as o,e as a,w as l,d as s,b as p,a as c,r,o as t}from"./app.ee2e1667.js";const v=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"生命周期介绍","slug":"生命周期介绍","link":"#生命周期介绍","children":[{"level":3,"title":"异步请求在哪一步发起？","slug":"异步请求在哪一步发起","link":"#异步请求在哪一步发起","children":[]}]},{"level":2,"title":"源码分析","slug":"源码分析","link":"#源码分析","children":[{"level":3,"title":"初始化流程","slug":"初始化流程","link":"#初始化流程","children":[]},{"level":3,"title":"更新流程","slug":"更新流程","link":"#更新流程","children":[]},{"level":3,"title":"销毁流程","slug":"销毁流程","link":"#销毁流程","children":[]}]}],"relativePath":"vue/index.md"}'),y={name:"vue/index.md"},F=p("h2",{id:"生命周期介绍",tabindex:"-1"},[s("生命周期介绍 "),p("a",{class:"header-anchor",href:"#生命周期介绍","aria-hidden":"true"},"#")],-1),i=c("",74);function D(d,A,C,b,u,m){const n=r("font");return t(),o("div",null,[F,a(n,{color:"#f00"},{default:l(()=>[s("beforeCreate")]),_:1}),s(" 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。在当前阶段 data、methods、computed 以及 watch 上的数据和方法都不能被访问"),a(n,{color:"#f00"},{default:l(()=>[s("created")]),_:1}),s(" 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。这里没有$el,如果非要想与 Dom 进行交互，可以通过 vm.$nextTick 来访问 Dom"),a(n,{color:"#f00"},{default:l(()=>[s("beforeMount")]),_:1}),s(" 在挂载开始之前被调用：相关的 render 函数首次被调用。"),a(n,{color:"#f00"},{default:l(()=>[s("mounted")]),_:1}),s(" 在挂载完成后发生，在当前阶段，真实的 Dom 挂载完毕，数据完成双向绑定，可以访问到 Dom 节点"),a(n,{color:"#f00"},{default:l(()=>[s("beforeUpdate")]),_:1}),s(" 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁（patch）之前。可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程"),a(n,{color:"#f00"},{default:l(()=>[s("updated")]),_:1}),s(" 发生在更新完成之后，当前阶段组件 Dom 已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新，该钩子在服务器端渲染期间不被调用。"),a(n,{color:"#f00"},{default:l(()=>[s("beforeDestroy")]),_:1}),s(" 实例销毁之前调用。在这一步，实例仍然完全可用。我们可以在这时进行善后收尾工作，比如清除计时器。"),a(n,{color:"#f00"},{default:l(()=>[s("destroyed")]),_:1}),s(" Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。"),a(n,{color:"#f00"},{default:l(()=>[s("activated")]),_:1}),s(" keep-alive 专属，组件被激活时调用"),a(n,{color:"#f00"},{default:l(()=>[s("deactivated")]),_:1}),s(" keep-alive 专属，组件被销毁时调用"),i])}const f=e(y,[["render",D]]);export{v as __pageData,f as default};