import{_ as t,c as n,o as s,b as e,d as r}from"./app.0f29970b.js";const $=JSON.parse('{"title":"04: script标签中defer和async的区别是什么？","description":"","frontmatter":{},"headers":[],"relativePath":"front-end/html/04.md"}'),a={name:"front-end/html/04.md"},c=e("h1",{id:"_04-script标签中defer和async的区别是什么",tabindex:"-1"},[r("04: script标签中defer和async的区别是什么？ "),e("a",{class:"header-anchor",href:"#_04-script标签中defer和async的区别是什么","aria-hidden":"true"},"#")],-1),o=e("p",null,"默认情况下，脚本的下载和执行将会按照文档的先后顺序同步进行。当脚本下载和执行的时候，文档解析就会被阻塞，在脚本下载和执行完成之后文档才能往下继续进行解析。",-1),d=e("p",null,"下面是async和defer两者区别：",-1),l=e("ul",null,[e("li",null,[e("p",null,"当script中有defer属性时，脚本的加载过程和文档加载是异步发生的，等到文档解析完(DOMContentLoaded事件发生)脚本才开始执行。")]),e("li",null,[e("p",null,"当script有async属性时，脚本的加载过程和文档加载也是异步发生的。但脚本下载完成后会停止HTML解析，执行脚本，脚本解析完继续HTML解析。")]),e("li",null,[e("p",null,"当script同时有async和defer属性时，执行效果和async一致。")])],-1),i=[c,o,d,l];function _(p,f,u,h,m,y){return s(),n("div",null,i)}const B=t(a,[["render",_]]);export{$ as __pageData,B as default};