import{_ as s,c as a,o as e,a as n}from"./app.0f29970b.js";const l="/blog/assets/overall.27cfb7a0.png",r="/blog/assets/baseline-jpeg.044defdf.jpeg",p="/blog/assets/progressive-jpeg.860b87a1.jpeg",o="/blog/assets/jpeg-quality.79dbef49.jpg",b=JSON.parse('{"title":"图片","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. 优化请求数","slug":"_1-优化请求数","link":"#_1-优化请求数","children":[{"level":3,"title":"1.1. 雪碧图","slug":"_1-1-雪碧图","link":"#_1-1-雪碧图","children":[]},{"level":3,"title":"1.2. 懒加载","slug":"_1-2-懒加载","link":"#_1-2-懒加载","children":[]},{"level":3,"title":"1.3. CSS 中的图片懒加载","slug":"_1-3-css-中的图片懒加载","link":"#_1-3-css-中的图片懒加载","children":[]},{"level":3,"title":"1.4. 内联 base64","slug":"_1-4-内联-base64","link":"#_1-4-内联-base64","children":[]}]},{"level":2,"title":"2. 减小图片大小","slug":"_2-减小图片大小","link":"#_2-减小图片大小","children":[{"level":3,"title":"2.1. 使用合适的图片格式","slug":"_2-1-使用合适的图片格式","link":"#_2-1-使用合适的图片格式","children":[]},{"level":3,"title":"2.2. 图片质量的权衡","slug":"_2-2-图片质量的权衡","link":"#_2-2-图片质量的权衡","children":[]},{"level":3,"title":"2.3. 使用合适的大小和分辨率","slug":"_2-3-使用合适的大小和分辨率","link":"#_2-3-使用合适的大小和分辨率","children":[]},{"level":3,"title":"2.4. 删除冗余的图片信息","slug":"_2-4-删除冗余的图片信息","link":"#_2-4-删除冗余的图片信息","children":[]},{"level":3,"title":"2.5 SVG 压缩","slug":"_2-5-svg-压缩","link":"#_2-5-svg-压缩","children":[]}]},{"level":2,"title":"3. 缓存","slug":"_3-缓存","link":"#_3-缓存","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"relativePath":"performance/resources/image.md"}'),t={name:"performance/resources/image.md"},c=n('<h1 id="图片" tabindex="-1">图片 <a class="header-anchor" href="#图片" aria-hidden="true">#</a></h1><p>优质的图片可以有效吸引用户，给用户良好的体验，所以随着互联网的发展，越来越多的产品开始使用图片来提升产品体验。相较于页面其他元素，图片的体积不容忽视。下图是截止 2019 年 6 月 <a href="https://httparchive.org/reports/page-weight?view=grid" target="_blank" rel="noreferrer">HTTP Archive</a><sup>[1]</sup> 上统计的网站上各类资源加载的体积：</p><p><img src="'+l+`" alt="overall"></p><p>可以看到，图片占据了半壁江山。同样，在一篇 2018 年的文章中，也提到了<a href="https://dougsillars.com/2018/05/21/state-of-the-web-top-image-optimization-strategies/?utm_source=mybridge&amp;utm_medium=blog&amp;utm_campaign=read_more" target="_blank" rel="noreferrer">图片在网站中体量的平均占比已经超过了 50%</a><sup>[2]</sup>。然而，随着平均加载图片总字节数的增加，图片的请求数却再减少，这也说明网站使用的图片质量和大小正在不断提高。</p><p>所以，如果单纯从加载的字节数这个维度来看性能优化，那么很多时候，优化图片带来的流量收益要远高于优化 JavaScript 脚本和 CSS 样式文件。下面我们就来看看，如何优化图片资源。</p><h2 id="_1-优化请求数" tabindex="-1">1. 优化请求数 <a class="header-anchor" href="#_1-优化请求数" aria-hidden="true">#</a></h2><h3 id="_1-1-雪碧图" tabindex="-1">1.1. 雪碧图 <a class="header-anchor" href="#_1-1-雪碧图" aria-hidden="true">#</a></h3><p>图片可以合并么？当然。最为常用的图片合并场景就是<a href="https://css-tricks.com/css-sprites/" target="_blank" rel="noreferrer">雪碧图（Sprite）</a><sup>[3]</sup>。</p><p>在网站上通常会有很多小的图标，不经优化的话，最直接的方式就是将这些小图标保存为一个个独立的图片文件，然后通过 CSS 将对应元素的背景图片设置为对应的图标图片。这么做的一个重要问题在于，页面加载时可能会同时请求非常多的小图标图片，这就会受到浏览器并发 HTTP 请求数的限制。我见过一个没有使用雪碧图的页面，首页加载时需要发送 20+ 请求来加载图标。将图标合并为一张大图可以实现「20+ → 1」的巨大缩减。</p><p>雪碧图的核心原理在于设置不同的背景偏移量，大致包含两点：</p><ul><li>不同的图标元素都会将 <code>background-url</code> 设置为合并后的雪碧图的 uri；</li><li>不同的图标通过设置对应的 <code>background-position</code> 来展示大图中对应的图标部分。</li></ul><p>你可以用 Photoshop 这类工具自己制作雪碧图。当然比较推荐的还是将雪碧图的生成集成到前端自动化构建工具中，例如在 webpack 中使用 <a href="https://github.com/mixtur/webpack-spritesmith" target="_blank" rel="noreferrer">webpack-spritesmith</a>，或者在 gulp 中使用 <a href="https://github.com/twolfson/gulp.spritesmith" target="_blank" rel="noreferrer">gulp.spritesmith</a>。它们两者都是基于于 <a href="https://github.com/twolfson/spritesmith" target="_blank" rel="noreferrer">spritesmith</a> 这个库，你也可以自己将这个库集成到你喜欢的构建工具中。</p><h3 id="_1-2-懒加载" tabindex="-1">1.2. 懒加载 <a class="header-anchor" href="#_1-2-懒加载" aria-hidden="true">#</a></h3><p>我们知道，一般来说我们访问一个页面，浏览器加载的整个页面其实是要比可视区域大很多的，也是什么我们会提出“首屏”的概念。这就导致其实很多图片是不在首屏中的，如果我们都加载的话，相当于是加载了用户不一定会看到图片。而图片体积一般都不小，这显然是一种流量的浪费。这种场景在一些带图片的长列表或者配图的博客中经常会遇到。</p><p>解决的核心思路就是图片懒加载 —— 尽量只加载用户正在浏览或者即将会浏览到的图片。实现上来说最简单的就是通过监听页面滚动，判断图片是否进入视野，从而真正去加载图片：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">loadIfNeeded</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">$img</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">bounding</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">$img</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getBoundingClientRect</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#82AAFF;">getComputedStyle</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">$img</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">display</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">none</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">bounding</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">top</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">innerHeight</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">bounding</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">bottom</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">$img</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">src</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">$img</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">dataset</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">src</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">$img</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">classList</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">remove</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">lazy</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// 这里使用了 throttle，你可以实现自己的 throttle，也可以使用 lodash</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> lazy </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">throttle</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">$imgList</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelectorAll</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.lazy</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">$imgList</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">removeEventListener</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">scroll</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">lazy</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">removeEventListener</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">resize</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">lazy</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">removeEventListener</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">orientationchange</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">lazy</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">$imgList</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forEach</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">loadIfNeeded</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">},</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">200</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addEventListener</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">scroll</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> lazy)</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addEventListener</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">resize</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> lazy)</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addEventListener</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">orientationchange</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> lazy)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>对于页面上的元素只需要将原本的 <code>src</code> 值设置到 <code>data-src</code> 中即可，而 <code>src</code> 可以设置为一个统一的占位图。注意，由于页面滚动、缩放和横竖方向（移动端）都可能会改变可视区域，因此添加了三个监听。</p><p>当然，这是最传统的方法，现代浏览器还提供了一个更先进的 <a href="https://developers.google.com/web/updates/2016/04/intersectionobserver" target="_blank" rel="noreferrer">Intersection Observer API</a><sup>[4]</sup> 来做这个事，它可以通过更高效的方式来监听元素是否进入视口。考虑兼容性问题，在生产环境中建议使用对应的 <a href="https://github.com/w3c/IntersectionObserver/tree/master/polyfill" target="_blank" rel="noreferrer">polyfill</a>。</p><p>如果想使用懒加载，还可以借助一些已有的工具库，例如 <a href="https://github.com/aFarkas/lazysizes" target="_blank" rel="noreferrer">aFarkas/lazysizes</a>、<a href="https://github.com/verlok/lazyload" target="_blank" rel="noreferrer">verlok/lazyload</a>、<a href="https://github.com/tuupola/lazyload" target="_blank" rel="noreferrer">tuupola/lazyload</a> 等。</p><p>在使用懒加载时也有一些注意点：</p><ul><li>首屏可以不需要懒加载，对首屏图片也使用懒加载会延迟图片的展示。</li><li>设置合理的占位图，避免图片加载后的页面“抖动”。</li><li>虽然目前基本所有用户都不会禁用 JavaScript，但还是建议做一些 JavaScript 不可用时的 backup。</li></ul><p>对于占位图这块可以再补充一点。为了更好的用户体验，我们可以使用一个基于原图生成的体积小、清晰度低的图片作为占位图。这样一来不会增加太大的体积，二来会有很好的用户体验。<a href="https://www.guypo.com/introducing-lqip-low-quality-image-placeholders" target="_blank" rel="noreferrer">LQIP (Low Quality Image Placeholders)</a><sup>[5]</sup> 就是这种技术。目前也已经有了 <a href="https://github.com/zouhir/lqip" target="_blank" rel="noreferrer">LQIP</a> 和 <a href="https://github.com/axe312ger/sqip" target="_blank" rel="noreferrer">SQIP(SVG-based LQIP)</a> 的自动化工具可以直接使用。</p><p>如果你想了解更多关于图片懒加载的内容，这里有一篇更详尽的<a href="https://css-tricks.com/the-complete-guide-to-lazy-loading-images/" target="_blank" rel="noreferrer">图片懒加载指南</a><sup>[6]</sup>。</p><h3 id="_1-3-css-中的图片懒加载" tabindex="-1">1.3. CSS 中的图片懒加载 <a class="header-anchor" href="#_1-3-css-中的图片懒加载" aria-hidden="true">#</a></h3><p>除了对于 <code>&lt;img&gt;</code> 元素的图片进行来加载，在 CSS 中使用的图片一样可以懒加载，最常见的场景就是 <code>background-url</code>。</p><div class="language-CSS line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">login</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    background-url</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">url</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">/static/img/login.png</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>对于上面这个样式规则，如果不应用到具体的元素，浏览器不会去下载该图片。所以你可以通过切换 className 的方式，放心得进行 CSS 中图片的懒加载。</p><h3 id="_1-4-内联-base64" tabindex="-1">1.4. 内联 base64 <a class="header-anchor" href="#_1-4-内联-base64" aria-hidden="true">#</a></h3><p>还有一种方式是将图片转为 base64 字符串，并将其内联到页面中返回，即将原 url 的值替换为 base64。这样，当浏览器解析到这个的图片 url 时，就不会去请求并下载图片，直接解析 base64 字符串即可。</p><p>但是这种方式的一个缺点在于相同的图片，相比使用二进制，变成 base64 后体积会增大 33%。而全部内联进页面后，也意味着原本可能并行加载的图片信息，都会被放在页面请求中（像当于是串行了）。同时这种方式也不利于复用独立的文件缓存。所以，使用 base64 需要权衡，常用于首屏加载 CRP 或者骨架图上的一些小图标。</p><h2 id="_2-减小图片大小" tabindex="-1">2. 减小图片大小 <a class="header-anchor" href="#_2-减小图片大小" aria-hidden="true">#</a></h2><h3 id="_2-1-使用合适的图片格式" tabindex="-1">2.1. 使用合适的图片格式 <a class="header-anchor" href="#_2-1-使用合适的图片格式" aria-hidden="true">#</a></h3><p>使用合适的图片格式不仅能帮助你减少不必要的请求流量，同时还可能提供更好的图片体验。</p><p>图片格式是一个比较大的话题，<a href="https://www.sitepoint.com/what-is-the-right-image-format-for-your-website/" target="_blank" rel="noreferrer">选择合适的格式</a><sup>[7]</sup>有利于性能优化。这里我们简单总结一些。</p><p><strong>1) 使用 WebP：</strong></p><p>考虑<a href="https://css-tricks.com/using-webp-images/" target="_blank" rel="noreferrer">在网站上使用 WebP 格式</a><sup>[8]</sup>。在有损与无损压缩上，它的表现都会优于传统（JPEG/PNG）格式。WebP 无损压缩比 PNG 的体积小 26%，webP 的有损压缩比同质量的 JPEG 格式体积小 25-34%。同时 WebP 也支持透明度。下面提供了一种兼容性较好的写法。</p><div class="language-HTML line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">HTML</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">picture</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">source</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">image/webp</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">srcset</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/static/img/perf.webp</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">source</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">image/jpeg</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">srcset</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/static/img/perf.jpg</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">img</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/static/img/perf.jpg</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">picture</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>2) 使用 SVG 应对矢量图场景：</strong></p><p>在一些需要缩放与高保真的情况，或者用作图标的场景下，使用 SVG 这种矢量图非常不错。有时使用 SVG 格式会比相同的 PNG 或 JPEG 更小。</p><p><strong>3) 使用 video 替代 GIF：</strong></p><p>在<a href="https://caniuse.com/#feat=video" target="_blank" rel="noreferrer">兼容性允许</a>的情况下考虑，可以在想要动图效果时使用视频，通过静音（muted）的 video 来代替 GIF。相同的效果下，<a href="https://youtu.be/reztLS3vomE?t=158" target="_blank" rel="noreferrer">GIF 比视频（MPEG-4）大 5 ～ 20 倍</a>。<a href="https://www.smashingmagazine.com/2018/11/gif-to-video/" target="_blank" rel="noreferrer">Smashing Magazine 上有篇文章</a><sup>[9]</sup>详细介绍使用方式。</p><p><strong>4) 渐进式 JPEG：</strong></p><p>基线 JPEG (baseline JPEG) 会从上往下逐步呈现，类似下面这种：</p><p><img src="`+r+'" alt="baseline jpeg"></p><p>而另一种<a href="https://www.zhangxinxu.com/wordpress/2013/01/progressive-jpeg-image-and-so-on/" target="_blank" rel="noreferrer">渐进式 JPEG (progressive JPEG)</a><sup>[10]</sup> 则会从模糊到逐渐清晰，使人的感受上会更加平滑。</p><p><img src="'+p+'" alt="progressive jpeg"></p><p>不过渐进式 JPEG 的解码速度会慢于基线 JPEG，所以还是需要综合考虑 CPU、网络等情况，在实际的用户体验之上做权衡。</p><h3 id="_2-2-图片质量的权衡" tabindex="-1">2.2. 图片质量的权衡 <a class="header-anchor" href="#_2-2-图片质量的权衡" aria-hidden="true">#</a></h3><p>图片的压缩一般可以分为有损压缩（lossy compression）和无损压缩（lossless compression）。顾名思义，有损压缩下，会损失一定的图片质量，无损压缩则能够在保证图片质量的前提下压缩数据大小。不过，无损压缩一般可以带来更可观的体积缩减。在使用有损压缩时，一般我们可以指定一个 0-100 的压缩质量。在大多数情况下，相较于 100 质量系数的压缩，80 ～ 85 的质量系数可以带来 30 ～ 40% 的大小缩减，同时对图片效果影响较小，即人眼不易分辨出质量效果的差异。</p><p><img src="'+o+`" alt="jpeg quality"></p><p>处理图片压缩可以使用 <a href="https://github.com/imagemin/imagemin" target="_blank" rel="noreferrer">imagemin</a> 这样的工具，也可以进一步将它集成至 <a href="https://github.com/tcoopman/image-webpack-loader" target="_blank" rel="noreferrer">webpack</a>、<a href="https://github.com/sindresorhus/gulp-imagemin" target="_blank" rel="noreferrer">Gulp</a>、<a href="https://github.com/gruntjs/grunt-contrib-imagemin" target="_blank" rel="noreferrer">Grunt</a> 这样的自动化工具中。</p><h3 id="_2-3-使用合适的大小和分辨率" tabindex="-1">2.3. 使用合适的大小和分辨率 <a class="header-anchor" href="#_2-3-使用合适的大小和分辨率" aria-hidden="true">#</a></h3><p>由于移动端的发展，屏幕尺寸更加多样化了。同一套设计在不同尺寸、像素比的屏幕上可能需要不同像素大小的图片来保证良好的展示效果；此外，响应式设计也会对不同屏幕上最佳的图片尺寸有不同的要求。</p><p>以往我们可能会在 1280px 宽度的屏幕上和 640px 宽度的屏幕上都使用一张 400px 的图，但很可能在 640px 上我们只需要 200px 大小的图片。另一方面，对于如今盛行的“2 倍屏”、“3 倍屏”也需要使用不同像素大小的资源。</p><p>好在 HTML5 在 <code>&lt;img&gt;</code> 元素上为我们提供了 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset" target="_blank" rel="noreferrer"><code>srcset</code></a> 和 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes" target="_blank" rel="noreferrer"><code>sizes</code></a> 属性，可以让浏览器根据屏幕信息选择需要展示的图片。</p><div class="language-HTML line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">HTML</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">img</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">srcset</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">small.jpg 480w, large.jpg 1080w</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">sizes</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">50w</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">large.jpg</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> &gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>具体的使用方式可以看<a href="https://www.zhangxinxu.com/wordpress/2014/10/responsive-images-srcset-size-w-descriptor/" target="_blank" rel="noreferrer">这篇文章</a><sup>[11]</sup>。</p><h3 id="_2-4-删除冗余的图片信息" tabindex="-1">2.4. 删除冗余的图片信息 <a class="header-anchor" href="#_2-4-删除冗余的图片信息" aria-hidden="true">#</a></h3><p>你也许不知道，很多图片含有一些非“视觉化”的元信息（metadata），带上它们可会<a href="https://www.keycdn.com/blog/image-metadata" target="_blank" rel="noreferrer">导致体积增大与安全风险</a><sup>[12]</sup>。元信息包括图片的 DPI、相机品牌、拍摄时的 GPS 等，可能导致 JPEG 图片大小增加 15%。同时，其中的一些隐私信息也可能会带来安全风险。</p><p>所以如果不需要的情况下，可以使用像 <a href="https://imageoptim.com/versions" target="_blank" rel="noreferrer">imageOptim</a> 这样的工具来移除隐私与非关键的元信息。</p><h3 id="_2-5-svg-压缩" tabindex="-1">2.5 SVG 压缩 <a class="header-anchor" href="#_2-5-svg-压缩" aria-hidden="true">#</a></h3><p>在 2.1. 中提到，合适的场景下可以使用 SVG。针对 SVG 我们也可以进行一些压缩。压缩包括了两个方面：</p><p>首先，与图片不同，图片是二进制形式的文件，而 SVG 作为一种 XML 文本，同样是适合使用 gzip 压缩的。</p><p>其次，SVG 本身的信息、数据是可以压缩的，例如用相比用 <code>&lt;path&gt;</code> 画一个椭圆，直接使用 <code>&lt;ellipse&gt;</code> 可以节省文本长度。关于信息的“压缩”还有<a href="https://css-tricks.com/understanding-and-manually-improving-svg-optimization/" target="_blank" rel="noreferrer">更多可以优化的点</a><sup>[13]</sup>。<a href="https://github.com/svg/svgo" target="_blank" rel="noreferrer">SVGGO</a> 是一个可以集成到我们构建流中的 NodeJS 工具，它能帮助我们进行 SVG 的优化。当然你也可以使用它提供的 <a href="https://jakearchibald.github.io/svgomg/" target="_blank" rel="noreferrer">Web 服务</a>。</p><h2 id="_3-缓存" tabindex="-1">3. 缓存 <a class="header-anchor" href="#_3-缓存" aria-hidden="true">#</a></h2><p>与其他静态资源类似，我们仍然可以使用<a href="./../cache.html">各类缓存策略</a>来加速资源的加载。</p><hr><p>图片作为现代 Web 应用的重要部分，在资源占用上同样也不可忽视。可以发现，在上面提及的各类优化措施中，同时附带了相应的工具或类库。平时我们主要的精力会放在 CSS 与 JavaScript 的优化上，因此在图片优化上可能概念较为薄弱，自动化程度较低。如果你希望更好得去贯彻图片的相关优化，非常建议将自动化工具引入到构建流程中。</p><p>除了上述的一些工具，这里再介绍两个非常好用的图片处理的自动化工具：<a href="https://github.com/lovell/sharp" target="_blank" rel="noreferrer">Sharp</a> 和 <a href="https://github.com/oliver-moran/jimp" target="_blank" rel="noreferrer">Jimp</a>。</p><p>好了，我们的图片优化之旅就暂时到这了，下面就是字体资源了。</p><hr><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-hidden="true">#</a></h2><ol><li><a href="https://httparchive.org/reports/page-weight?view=grid" target="_blank" rel="noreferrer">HTTP Archive: Page Weight Report</a></li><li><a href="https://dougsillars.com/2018/05/21/state-of-the-web-top-image-optimization-strategies/" target="_blank" rel="noreferrer">State of the Web: Top Image Optimization Strategies</a></li><li><a href="https://css-tricks.com/css-sprites/" target="_blank" rel="noreferrer">CSS Sprites: What They Are, Why They’re Cool, and How To Use Them</a></li><li><a href="https://developers.google.com/web/updates/2016/04/intersectionobserver" target="_blank" rel="noreferrer">IntersectionObserver’s Coming into View</a></li><li><a href="https://www.guypo.com/introducing-lqip-low-quality-image-placeholders" target="_blank" rel="noreferrer">Introducing LQIP – Low Quality Image Placeholders</a></li><li><a href="https://css-tricks.com/the-complete-guide-to-lazy-loading-images/" target="_blank" rel="noreferrer">The Complete Guide to Lazy Loading Images</a></li><li><a href="https://www.sitepoint.com/what-is-the-right-image-format-for-your-website/" target="_blank" rel="noreferrer">What Is the Right Image Format for Your Website?</a></li><li><a href="https://css-tricks.com/using-webp-images/" target="_blank" rel="noreferrer">Using WebP Images</a></li><li><a href="https://www.smashingmagazine.com/2018/11/gif-to-video/" target="_blank" rel="noreferrer">Improve Animated GIF Performance With HTML5 Video</a></li><li><a href="https://www.zhangxinxu.com/wordpress/2013/01/progressive-jpeg-image-and-so-on/" target="_blank" rel="noreferrer">渐进式 jpeg(progressive jpeg)图片及其相关</a></li><li><a href="https://www.zhangxinxu.com/wordpress/2014/10/responsive-images-srcset-size-w-descriptor/" target="_blank" rel="noreferrer">响应式图片 srcset 全新释义 sizes 属性 w 描述符</a></li><li><a href="https://www.keycdn.com/blog/image-metadata" target="_blank" rel="noreferrer">An Overview of Image Metadata - How It Affects Web Performance and Security</a></li><li><a href="https://css-tricks.com/understanding-and-manually-improving-svg-optimization/" target="_blank" rel="noreferrer">Understanding and Manually Improving SVG Optimization</a></li><li><a href="https://images.guide/" target="_blank" rel="noreferrer">Essential Image Optimization Guide</a></li><li><a href="https://zhuanlan.zhihu.com/p/50280008" target="_blank" rel="noreferrer">见微知著，Google Photos Web UI 完善之旅</a></li><li><a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/automating-image-optimization/" target="_blank" rel="noreferrer">Automating image optimization</a></li><li><a href="http://deanhume.com/lazy-loading-images-using-intersection-observer/" target="_blank" rel="noreferrer">Lazy loading images using Intersection Observer</a></li><li><a href="https://developers.google.com/web/updates/2019/02/intersectionobserver-v2" target="_blank" rel="noreferrer">Trust is Good, Observation is Better—Intersection Observer v2</a></li><li><a href="https://web.dev/image-policies/" target="_blank" rel="noreferrer">Image policies for fast load times and more</a></li></ol>`,73),i=[c];function y(F,g,h,D,d,m){return e(),a("div",null,i)}const f=s(t,[["render",y]]);export{b as __pageData,f as default};