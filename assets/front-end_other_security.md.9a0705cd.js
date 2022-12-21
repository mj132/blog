import{_ as s,c as a,o as l,a as n}from"./app.0f29970b.js";const u=JSON.parse('{"title":"web 常见的攻击方式","description":"","frontmatter":{},"headers":[{"level":2,"title":"一、是什么","slug":"一、是什么","link":"#一、是什么","children":[]},{"level":2,"title":"二、XSS","slug":"二、xss","link":"#二、xss","children":[{"level":3,"title":"存储型","slug":"存储型","link":"#存储型","children":[]},{"level":3,"title":"反射型 XSS","slug":"反射型-xss","link":"#反射型-xss","children":[]},{"level":3,"title":"DOM 型 XSS","slug":"dom-型-xss","link":"#dom-型-xss","children":[]},{"level":3,"title":"XSS 的预防","slug":"xss-的预防","link":"#xss-的预防","children":[]}]},{"level":2,"title":"三、CSRF","slug":"三、csrf","link":"#三、csrf","children":[{"level":3,"title":"CSRF 的特点","slug":"csrf-的特点","link":"#csrf-的特点","children":[]},{"level":3,"title":"CSRF 的预防","slug":"csrf-的预防","link":"#csrf-的预防","children":[]}]},{"level":2,"title":"四、SQL 注入","slug":"四、sql-注入","link":"#四、sql-注入","children":[]},{"level":2,"title":"参考文献","slug":"参考文献","link":"#参考文献","children":[]}],"relativePath":"front-end/other/security.md"}'),e={name:"front-end/other/security.md"},p=n(`<h1 id="web-常见的攻击方式" tabindex="-1">web 常见的攻击方式 <a class="header-anchor" href="#web-常见的攻击方式" aria-hidden="true">#</a></h1><p><img src="https://static.vue-js.com/d0892930-8d1d-11eb-ab90-d9ae814b240d.png" alt=""></p><h2 id="一、是什么" tabindex="-1">一、是什么 <a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a></h2><p>Web 攻击（WebAttack）是针对用户上网行为或网站服务器等设备进行攻击的行为</p><p>如植入恶意代码，修改网站权限，获取网站用户隐私信息等等</p><p>Web 应用程序的安全性是任何基于 Web 业务的重要组成部分</p><p>确保 Web 应用程序安全十分重要，即使是代码中很小的 bug 也有可能导致隐私信息被泄露</p><p>站点安全就是为保护站点不受未授权的访问、使用、修改和破坏而采取的行为或实践</p><p>我们常见的 Web 攻击方式有</p><ul><li>XSS (Cross Site Scripting) 跨站脚本攻击</li><li>CSRF（Cross-site request forgery）跨站请求伪造</li><li>SQL 注入攻击</li></ul><h2 id="二、xss" tabindex="-1">二、XSS <a class="header-anchor" href="#二、xss" aria-hidden="true">#</a></h2><p>XSS，跨站脚本攻击，允许攻击者将恶意代码植入到提供给其它用户使用的页面中</p><p><code>XSS</code>涉及到三方，即攻击者、客户端与<code>Web</code>应用</p><p><code>XSS</code>的攻击目标是为了盗取存储在客户端的<code>cookie</code>或者其他网站用于识别客户端身份的敏感信息。一旦获取到合法用户的信息后，攻击者甚至可以假冒合法用户与网站进行交互</p><p>举个例子：</p><p>一个搜索页面，根据<code>url</code>参数决定关键词的内容</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">value</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">&lt;%= getParameter(&#39;keyword&#39;) %&gt;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">搜索</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  您搜索的关键词是：&lt;%= getParameter(&quot;keyword&quot;) %&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>这里看似并没有问题，但是如果不按套路出牌呢？</p><p>用户输入<code>&quot;&gt;&lt;script&gt;alert(&#39;XSS&#39;);&lt;/script&gt;</code>，拼接到 HTML 中返回给浏览器。形成了如下的 HTML：</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">value</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">alert</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">XSS</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">搜索</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  您搜索的关键词是：&quot;&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">  &lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">alert</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">XSS</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>浏览器无法分辨出 <code>&lt;script&gt;alert(&#39;XSS&#39;);&lt;/script&gt;</code> 是恶意代码，因而将其执行，试想一下，如果是获取<code>cookie</code>发送对黑客服务器呢？</p><p>根据攻击的来源，<code>XSS</code>攻击可以分成：</p><ul><li>存储型</li><li>反射型</li><li>DOM 型</li></ul><h3 id="存储型" tabindex="-1">存储型 <a class="header-anchor" href="#存储型" aria-hidden="true">#</a></h3><p>存储型 XSS 的攻击步骤：</p><ol><li>攻击者将恶意代码提交到目标网站的数据库中</li><li>用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器</li><li>用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行</li><li>恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作</li></ol><p>这种攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等</p><h3 id="反射型-xss" tabindex="-1">反射型 XSS <a class="header-anchor" href="#反射型-xss" aria-hidden="true">#</a></h3><p>反射型 XSS 的攻击步骤：</p><ol><li>攻击者构造出特殊的 URL，其中包含恶意代码</li><li>用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器</li><li>用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行</li><li>恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作</li></ol><p>反射型 XSS 跟存储型 XSS 的区别是：存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里。</p><p>反射型 XSS 漏洞常见于通过 URL 传递参数的功能，如网站搜索、跳转等。</p><p>由于需要用户主动打开恶意的 URL 才能生效，攻击者往往会结合多种手段诱导用户点击。</p><p>POST 的内容也可以触发反射型 XSS，只不过其触发条件比较苛刻（需要构造表单提交页面，并引导用户点击），所以非常少见</p><h3 id="dom-型-xss" tabindex="-1">DOM 型 XSS <a class="header-anchor" href="#dom-型-xss" aria-hidden="true">#</a></h3><p>DOM 型 XSS 的攻击步骤：</p><ol><li>攻击者构造出特殊的 URL，其中包含恶意代码</li><li>用户打开带有恶意代码的 URL</li><li>用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行</li><li>恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作</li></ol><p>DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞</p><h3 id="xss-的预防" tabindex="-1">XSS 的预防 <a class="header-anchor" href="#xss-的预防" aria-hidden="true">#</a></h3><p>通过前面介绍，看到<code>XSS</code>攻击的两大要素：</p><ul><li>攻击者提交恶意代码</li><li>浏览器执行恶意代码</li></ul><p>针对第一个要素，我们在用户输入的过程中，过滤掉用户输入的恶劣代码，然后提交给后端，但是如果攻击者绕开前端请求，直接构造请求就不能预防了</p><p>而如果在后端写入数据库前，对输入进行过滤，然后把内容给前端，但是这个内容在不同地方就会有不同显示</p><p>例如：</p><p>一个正常的用户输入了 <code>5 &lt; 7</code> 这个内容，在写入数据库前，被转义，变成了 <code>5 &lt; 7</code></p><p>在客户端中，一旦经过了 <code>escapeHTML()</code>，客户端显示的内容就变成了乱码( <code>5 &lt; 7</code> )</p><p>在前端中，不同的位置所需的编码也不同。</p><ul><li>当 <code>5 &lt; 7</code> 作为 HTML 拼接页面时，可以正常显示：</li></ul><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">title</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">comment</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">5 &amp;lt; 7</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul><li>当 <code>5 &lt; 7</code> 通过 Ajax 返回，然后赋值给 JavaScript 的变量时，前端得到的字符串就是转义后的字符。这个内容不能直接用于 Vue 等模板的展示，也不能直接用于内容长度计算。不能用于标题、alert 等</li></ul><p>可以看到，过滤并非可靠的，下面就要通过防止浏览器执行恶意代码：</p><p>在使用 <code>.innerHTML</code>、<code>.outerHTML</code>、<code>document.write()</code> 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 <code>.textContent</code>、<code>.setAttribute()</code> 等</p><p>如果用 <code>Vue/React</code> 技术栈，并且不使用 <code>v-html</code>/<code>dangerouslySetInnerHTML</code> 功能，就在前端 <code>render</code> 阶段避免 <code>innerHTML</code>、<code>outerHTML</code> 的 XSS 隐患</p><p>DOM 中的内联事件监听器，如 <code>location</code>、<code>onclick</code>、<code>onerror</code>、<code>onload</code>、<code>onmouseover</code> 等，<code>&lt;a&gt;</code> 标签的 <code>href</code> 属性，JavaScript 的 <code>eval()</code>、<code>setTimeout()</code>、<code>setInterval()</code> 等，都能把字符串作为代码运行。如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">&lt;!-- 链接内包含恶意代码 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">1</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// setTimeout()/setInterval() 中调用恶意代码</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">setTimeout</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">UNTRUSTED</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">setInterval</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">UNTRUSTED</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// location 调用恶意代码</span></span>
<span class="line"><span style="color:#A6ACCD;">  location</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">href </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">UNTRUSTED</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// eval() 中调用恶意代码</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">eval</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">UNTRUSTED</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="三、csrf" tabindex="-1">三、CSRF <a class="header-anchor" href="#三、csrf" aria-hidden="true">#</a></h2><p>CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求</p><p>利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的</p><p>一个典型的 CSRF 攻击有着如下的流程：</p><ul><li>受害者登录 <a href="http://a.com" target="_blank" rel="noreferrer">a.com</a>，并保留了登录凭证（Cookie）</li><li>攻击者引诱受害者访问了 <a href="http://b.com" target="_blank" rel="noreferrer">b.com</a></li><li><a href="http://b.com" target="_blank" rel="noreferrer">b.com</a> 向 <a href="http://a.com" target="_blank" rel="noreferrer">a.com</a> 发送了一个请求：<a href="http://a.com/act=xx%E3%80%82%E6%B5%8F%E8%A7%88%E5%99%A8%E4%BC%9A%E9%BB%98%E8%AE%A4%E6%90%BA%E5%B8%A6" target="_blank" rel="noreferrer">a.com/act=xx。浏览器会默认携带</a> <a href="http://a.com" target="_blank" rel="noreferrer">a.com</a> 的 Cookie</li><li><a href="http://a.com" target="_blank" rel="noreferrer">a.com</a> 接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求</li><li><a href="http://a.com" target="_blank" rel="noreferrer">a.com</a> 以受害者的名义执行了 act=xx</li><li>攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让 <a href="http://a.com" target="_blank" rel="noreferrer">a.com</a> 执行了自己定义的操作</li></ul><p><code>csrf</code>可以通过<code>get</code>请求，即通过访问<code>img</code>的页面后，浏览器自动访问目标地址，发送请求</p><p>同样，也可以设置一个自动提交的表单发送<code>post</code>请求，如下：</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">form</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">action</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://bank.example/withdraw</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">method</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">POST</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">hidden</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">account</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">value</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">xiaoming</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">hidden</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">amount</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">value</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">10000</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">hidden</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">for</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">value</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">hacker</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">form</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">forms[</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">submit</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>访问该页面后，表单会自动提交，相当于模拟用户完成了一次<code>POST</code>操作</p><p>还有一种为使用<code>a</code>标签的，需要用户点击链接才会触发</p><p>访问该页面后，表单会自动提交，相当于模拟用户完成了一次 POST 操作</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://test.com/csrf/withdraw.php?amount=1000&amp;for=hacker</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">taget</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">_blank</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> 重磅消息！！ </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="csrf-的特点" tabindex="-1">CSRF 的特点 <a class="header-anchor" href="#csrf-的特点" aria-hidden="true">#</a></h3><ul><li>攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生</li><li>攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；而不是直接窃取数据</li><li>整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”</li><li>跨站请求可以用各种方式：图片 URL、超链接、CORS、Form 提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪</li></ul><h3 id="csrf-的预防" tabindex="-1">CSRF 的预防 <a class="header-anchor" href="#csrf-的预防" aria-hidden="true">#</a></h3><p>CSRF 通常从第三方网站发起，被攻击的网站无法防止攻击发生，只能通过增强自己网站针对 CSRF 的防护能力来提升安全性</p><p>防止<code>csrf</code>常用方案如下：</p><ul><li>阻止不明外域的访问 <ul><li>同源检测</li><li>Samesite Cookie</li></ul></li><li>提交时要求附加本域才能获取的信息 <ul><li>CSRF Token</li><li>双重 Cookie 验证</li></ul></li></ul><p>这里主要讲讲<code>token</code>这种形式，流程如下：</p><ul><li>用户打开页面的时候，服务器需要给这个用户生成一个 Token</li><li>对于 GET 请求，Token 将附在请求地址之后。对于 POST 请求来说，要在 form 的最后加上</li></ul><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">”hidden”</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">”csrftoken”</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">value</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">”tokenvalue”</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul><li>当用户从客户端得到了 Token，再次提交给服务器的时候，服务器需要判断 Token 的有效性</li></ul><h2 id="四、sql-注入" tabindex="-1">四、SQL 注入 <a class="header-anchor" href="#四、sql-注入" aria-hidden="true">#</a></h2><p>Sql 注入攻击，是通过将恶意的 <code>Sql</code>查询或添加语句插入到应用的输入参数中，再在后台 <code>Sql</code>服务器上解析执行进行的攻击</p><p><img src="https://static.vue-js.com/ead52fa0-8d1d-11eb-85f6-6fac77c0c9b3.png" alt=""></p><p>流程如下所示：</p><ul><li><p>找出 SQL 漏洞的注入点</p></li><li><p>判断数据库的类型以及版本</p></li><li><p>猜解用户名和密码</p></li><li><p>利用工具查找 Web 后台管理入口</p></li><li><p>入侵和破坏</p></li></ul><p>预防方式如下：</p><ul><li>严格检查输入变量的类型和格式</li><li>过滤和转义特殊字符</li><li>对访问数据库的 Web 应用程序采用 Web 应用防火墙</li></ul><p>上述只是列举了常见的<code>web</code>攻击方式，实际开发过程中还会遇到很多安全问题，对于这些问题，切记不可忽视</p><h2 id="参考文献" tabindex="-1">参考文献 <a class="header-anchor" href="#参考文献" aria-hidden="true">#</a></h2><ul><li><a href="https://tech.meituan.com/2018/09/27/fe-security.html" target="_blank" rel="noreferrer">https://tech.meituan.com/2018/09/27/fe-security.html</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/learn/Server-side/First_steps/Website_security" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/learn/Server-side/First_steps/Website_security</a></li></ul>`,87),o=[p];function t(r,c,i,D,F,y){return l(),a("div",null,o)}const b=s(e,[["render",t]]);export{u as __pageData,b as default};
