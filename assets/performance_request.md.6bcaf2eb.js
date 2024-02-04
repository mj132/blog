import{_ as e,c as s,o as r,a}from"./app.ee2e1667.js";const n="/blog/assets/dns.54460f14.jpg",l="/blog/assets/resourcetiming.23001256.png",g=JSON.parse('{"title":"二、发送请求","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. 避免多余重定向","slug":"_1-避免多余重定向","link":"#_1-避免多余重定向","children":[]},{"level":2,"title":"2. DNS 预解析","slug":"_2-dns-预解析","link":"#_2-dns-预解析","children":[]},{"level":2,"title":"3. 预先建立连接","slug":"_3-预先建立连接","link":"#_3-预先建立连接","children":[]},{"level":2,"title":"4. 使用 CDN","slug":"_4-使用-cdn","link":"#_4-使用-cdn","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"relativePath":"performance/request.md"}'),o={name:"performance/request.md"},t=a('<h1 id="二、发送请求" tabindex="-1">二、发送请求 <a class="header-anchor" href="#二、发送请求" aria-hidden="true">#</a></h1><p>在前一部分，我们介绍了浏览器缓存。当一个请求走过了各级前端缓存后，就会需要实际发送一个请求了。</p><blockquote><p>在 HTTP 缓存中，我们其实也有发送请求；或者是在 HTTP/2 Push 下，使用了之前连接中推送的资源。不过为了保证思路的连贯，我还是把「发送请求」这个章节整体放在「缓存」之后了。</p></blockquote><p>介绍网络请求其实可以包含复杂的网络知识。不过，今天咱们的旅程主要聚焦于“前端性能优化”。因此，主要会介绍一些在这个环节中，前端性能优化可能会做的事儿。</p><h2 id="_1-避免多余重定向" tabindex="-1">1. 避免多余重定向 <a class="header-anchor" href="#_1-避免多余重定向" aria-hidden="true">#</a></h2><p>重定向是一个比较常用的技术手段。在一些情况下，你可能进行了服务迁移，修改了原有的 uri。这时候就可以使用重定向，把访问原网址的用户重定向到新的 uri。还有是在一些登录场景下，会使用到重定向技术。</p><p>重定向分为 301 的永久重定向和 302 的临时重定向。建议贴合语义，例如服务迁移的情况下，使用 301 重定向。对 SEO 也会更友好。</p><p>同时也不要滥用重定向。曾今也见过有业务在访问后重定向 3 次的情况，其实里面有些是不必要的。每次重定向都是有请求耗时的，建议避免过多的重定向。</p><h2 id="_2-dns-预解析" tabindex="-1">2. DNS 预解析 <a class="header-anchor" href="#_2-dns-预解析" aria-hidden="true">#</a></h2><p>基本我们访问远程服务的时候，不会直接使用服务的出口 IP，而是使用域名。所以请求的一个重要环节就是域名解析。</p><p>DNS 服务本身是一个树状层级结构，其解析是一个递归与迭代的过程。例如 <a href="http://github.com" target="_blank" rel="noreferrer">github.com</a> 的大致解析流程如下：</p><ol><li>先检查本地 hosts 文件中是否有映射，有则使用；</li><li>查找本地 DNS 缓存，有则返回；</li><li>根据配置在 TCP/IP 参数中设置 DNS 查询服务器，并向其进行查询，这里先称为本地 DNS；</li><li>如果该服务器无法解析域名（没有缓存），且不需要转发，则会向根服务器请求；</li><li>根服务器根据域名类型判断对应的顶级域名服务器（.com），返回给本地 DNS，然后重复该过程，直到找到该域名；</li><li>当然，如果设置了转发，本地 DNS 会将请求逐级转发，直到转发服务器返回或者也不能解析。</li></ol><p><img src="'+n+`" alt="dns"></p><p>更详细的介绍可以看<a href="https://www.zhihu.com/question/23042131" target="_blank" rel="noreferrer">这篇文章</a><sup>[1]</sup>。</p><p>这里我们需要了解的是：</p><ul><li>首先，DNS 解析流程可能会很长，耗时很高，所以整个 DNS 服务，包括客户端都会有缓存机制，这个作为前端不好涉入；</li><li>其次，在 DNS 解析上，前端还是可以通过浏览器提供的其他手段来“加速”的。</li></ul><p><a href="https://www.w3.org/TR/resource-hints/#dns-prefetch" target="_blank" rel="noreferrer">DNS Prefetch</a><sup>[2]</sup> 就是浏览器提供给我们的一个 API。它是 Resource Hint 的一部分。它可以告诉浏览器：过会我就可能要去 <a href="http://yourwebsite.com" target="_blank" rel="noreferrer">yourwebsite.com</a> 上下载一个资源啦，帮我先解析一下域名吧。这样之后用户点击某个按钮，触发了 <a href="http://yourwebsite.com" target="_blank" rel="noreferrer">yourwebsite.com</a> 域名下的远程请求时，就略去了 DNS 解析的步骤。使用方式很简单：</p><div class="language-HTML line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">HTML</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dns-prefetch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">//yourwebsite.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>当然，浏览器并不保证一定会去解析域名，可能会根据当前的网络、负载等状况做决定。标准里也明确写了 👇</p><blockquote><p>user agent SHOULD resolve as early as possible</p></blockquote><h2 id="_3-预先建立连接" tabindex="-1">3. 预先建立连接 <a class="header-anchor" href="#_3-预先建立连接" aria-hidden="true">#</a></h2><p>我们知道，建立连接不仅需要 DNS 查询，还需要进行 TCP 协议握手，有些还会有 TLS/SSL 协议，这些都会导致连接的耗时。使用 <a href="https://www.w3.org/TR/resource-hints/#preconnect" target="_blank" rel="noreferrer">Preconnect</a><sup>[3]</sup> 可以帮助你告诉浏览器：“我有一些资源会用到某个源（origin），你可以帮我预先建立连接。”</p><p>根据规范，当你使用 Preconnect 时，浏览器大致做了如下处理：</p><ul><li>首先，解析 Preconnect 的 url；</li><li>其次，根据当前 link 元素中的属性进行 cors 的设置；</li><li>然后，默认先将 credential 设为 <code>true</code>，如果 cors 为 <code>Anonymous</code> 并且存在跨域，则将 credential 置为 <code>false</code>；</li><li>最后，进行连接。</li></ul><p>使用 Preconnect 只需要将 <code>rel</code> 属性设为 <code>preconnect</code> 即可：</p><div class="language-HTML line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">HTML</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">preconnect</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">//sample.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>当然，你也可以设置 CORS：</p><div class="language-HTML line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">HTML</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">preconnect</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">//sample.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">crossorigin</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>需要注意的是，标准并没有硬性规定浏览器一定要（而是 SHOULD）完成整个连接过程，与 DNS Prefetch 类似，浏览器可以视情况完成部分工作。</p><h2 id="_4-使用-cdn" tabindex="-1">4. 使用 CDN <a class="header-anchor" href="#_4-使用-cdn" aria-hidden="true">#</a></h2><p>当我们实际把网络包发向我们的目标地址时，肯定希望越快到达目的地越好（对应的，也会希望越快获得响应）。而网络传输是有极限的，同样一个北京的用户，访问北京的服务器显然要比广州快很多。同时，服务的负载也会影响响应的速度。</p><p>对于静态资源，我们可以考虑通过 CDN 来降低时延。</p><p>对于使用 CDN 的资源，DNS 解析会将 CDN 资源的域名解析到 CDN 服务的负载均衡器上，负载均衡器可以通过请求的信息获取用户对应的地理区域，从而通过负载均衡算法，在背后的诸多服务器中，综合选择一台地理位置近、负载低的机器来提供服务。例如为北京联通用户解析北京的服务器 IP。这样，用户在之后访问 CDN 资源时都是访问北京服务器，距离近，速度快。</p><p>想了解更多 CDN 的工作方式可以阅读<a href="https://yq.aliyun.com/articles/577708" target="_blank" rel="noreferrer">这篇文章</a><sup>[4]</sup>。</p><hr><p>下图是请求声明周期中各个阶段的示意图，可以帮助我们理解发送请求（以及接收响应）的流程。</p><p><img src="`+l+'" alt="resource timing line"></p><hr><p>在缓存没法满足我们的情况下，就要开始真正发送请求了。从前端性能优化视角，我们会关注重定向、DNS 解析等问题，从而加速请求。但这块还预留了一小部分 —— 服务端的处理与响应。</p><p>过去，我们会将前端局限在浏览器中，但是随着 NodeJS 的兴起，很多业务都引入了基于 NodeJS 的 BFF 来为前端（客户端端）提供服务。所以咱们这次的旅程也会简单聊一下，在这一阶段可以做的一些优化。</p><hr><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-hidden="true">#</a></h2><ol><li><a href="https://www.zhihu.com/question/23042131" target="_blank" rel="noreferrer">DNS 的解析过程</a></li><li><a href="https://www.w3.org/TR/resource-hints/#dns-prefetch" target="_blank" rel="noreferrer">Resource Hints - DNS Prefetch</a></li><li><a href="https://www.w3.org/TR/resource-hints/#preconnect" target="_blank" rel="noreferrer">Resource Hints - Preconnect</a></li><li><a href="https://yq.aliyun.com/articles/577708" target="_blank" rel="noreferrer">CDN 之我见：原理篇</a></li><li><a href="https://developers.google.com/web/tools/chrome-devtools/network/understanding-resource-timing" target="_blank" rel="noreferrer">Understanding Resource Timing</a></li><li><a href="https://www.geeksforgeeks.org/tcp-3-way-handshake-process/" target="_blank" rel="noreferrer">TCP 3-Way Handshake Process</a></li><li><a href="https://www.geeksforgeeks.org/tcp-connection-termination/" target="_blank" rel="noreferrer">TCP 4 wave hands</a></li><li><a href="https://mp.weixin.qq.com/s/3NKOCOeIUF2SGJnY7II9hA" target="_blank" rel="noreferrer">图文还原 HTTPS 原理</a></li><li><a href="https://en.wikipedia.org/wiki/URL_redirection" target="_blank" rel="noreferrer">URL redirection (wikipedia)</a></li></ol>',43),p=[t];function c(i,d,h,u,D,F){return r(),s("div",null,p)}const _=e(o,[["render",c]]);export{g as __pageData,_ as default};