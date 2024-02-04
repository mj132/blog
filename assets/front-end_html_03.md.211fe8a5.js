import{_ as s,c as a,o as n,a as l}from"./app.ee2e1667.js";const h=JSON.parse('{"title":"03: src和href的区别是什么？","description":"","frontmatter":{},"headers":[{"level":2,"title":"定义","slug":"定义","link":"#定义","children":[]},{"level":2,"title":"作用结果","slug":"作用结果","link":"#作用结果","children":[]},{"level":2,"title":"浏览器解析方式","slug":"浏览器解析方式","link":"#浏览器解析方式","children":[]}],"relativePath":"front-end/html/03.md"}'),e={name:"front-end/html/03.md"},o=l(`<h1 id="_03-src和href的区别是什么" tabindex="-1">03: src和href的区别是什么？ <a class="header-anchor" href="#_03-src和href的区别是什么" aria-hidden="true">#</a></h1><h2 id="定义" tabindex="-1">定义 <a class="header-anchor" href="#定义" aria-hidden="true">#</a></h2><p>href是Hypertext Reference的简写，表示超文本引用，指向网络资源所在位置。</p><p>常见场景:</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://www.baidu.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text/css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stylesheet</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">common.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>src是source的简写，目的是要把文件下载到html页面中去。</p><p>常见场景:</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">img</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">img/girl.jpg</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">img</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">iframe</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">top.html</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">show.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="作用结果" tabindex="-1">作用结果 <a class="header-anchor" href="#作用结果" aria-hidden="true">#</a></h2><ol><li>href 用于在当前文档和引用资源之间确立联系</li><li>src 用于替换当前内容</li></ol><h2 id="浏览器解析方式" tabindex="-1">浏览器解析方式 <a class="header-anchor" href="#浏览器解析方式" aria-hidden="true">#</a></h2><ol><li>当浏览器遇到href会并行下载资源并且不会停止对当前文档的处理。(同时也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式)</li><li>当浏览器解析到src ，会暂停其他资源的下载和处理，直到将该资源加载或执行完毕。(这也是script标签为什么放在底部而不是头部的原因)</li></ol>`,12),p=[o];function t(r,c,D,i,F,y){return n(),a("div",null,p)}const u=s(e,[["render",t]]);export{h as __pageData,u as default};