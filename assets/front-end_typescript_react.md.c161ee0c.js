import{_ as s,c as n,o as a,a as l}from"./app.0f29970b.js";const d=JSON.parse('{"title":"在 React 项目中应用 TypeScript","description":"","frontmatter":{},"headers":[{"level":2,"title":"一、前言","slug":"一、前言","link":"#一、前言","children":[]},{"level":2,"title":"二、使用方式","slug":"二、使用方式","link":"#二、使用方式","children":[{"level":3,"title":"无状态组件","slug":"无状态组件","link":"#无状态组件","children":[]},{"level":3,"title":"有状态组件","slug":"有状态组件","link":"#有状态组件","children":[]},{"level":3,"title":"受控组件","slug":"受控组件","link":"#受控组件","children":[]}]},{"level":2,"title":"三、总结","slug":"三、总结","link":"#三、总结","children":[]},{"level":2,"title":"参考文献","slug":"参考文献","link":"#参考文献","children":[]}],"relativePath":"front-end/typescript/react.md"}'),p={name:"front-end/typescript/react.md"},e=l(`<h1 id="在-react-项目中应用-typescript" tabindex="-1">在 React 项目中应用 TypeScript <a class="header-anchor" href="#在-react-项目中应用-typescript" aria-hidden="true">#</a></h1><p><img src="https://static.vue-js.com/a98974e0-13bc-11ec-a752-75723a64e8f5.png" alt=""></p><h2 id="一、前言" tabindex="-1">一、前言 <a class="header-anchor" href="#一、前言" aria-hidden="true">#</a></h2><p>单独的使用<code>typescript</code> 并不会导致学习成本很高，但是绝大部分前端开发者的项目都是依赖于框架的</p><p>例如和<code>vue</code>、<code>react</code> 这些框架结合使用的时候，会有一定的门槛</p><p>使用 <code>TypeScript</code> 编写 <code>react</code> 代码，除了需要 <code>typescript</code> 这个库之外，还需要安装<code>@types/react</code>、<code>@types/react-dom</code></p><div class="language-cmd line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">cmd</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">npm i @types/react </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">s</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">npm i @types/react</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">dom </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">s</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>至于上述使用<code>@types</code>的库的原因在于，目前非常多的<code>javascript</code>库并没有提供自己关于 <code>TypeScript</code> 的声明文件</p><p>所以，<code>ts</code>并不知道这些库的类型以及对应导出的内容，这里<code>@types</code>实际就是社区中的<code>DefinitelyTyped</code>库，定义了目前市面上绝大多数的<code>JavaScript</code>库的声明</p><p>所以下载相关的<code>javascript</code>对应的<code>@types</code>声明时，就能够使用使用该库对应的类型定义</p><h2 id="二、使用方式" tabindex="-1">二、使用方式 <a class="header-anchor" href="#二、使用方式" aria-hidden="true">#</a></h2><p>在编写<code>react</code>项目的时候，最常见的使用的组件就是：</p><ul><li>无状态组件</li><li>有状态组件</li><li>受控组件</li></ul><h3 id="无状态组件" tabindex="-1">无状态组件 <a class="header-anchor" href="#无状态组件" aria-hidden="true">#</a></h3><p>主要作用是用于展示<code>UI</code>，如果使用<code>js</code>声明，则如下所示：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">as</span><span style="color:#A6ACCD;"> React </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">react</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Logo </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">props</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">logo</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">className</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">alt</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">props</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">img</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">logo</span><span style="color:#89DDFF;">} </span><span style="color:#C792EA;">className</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">className</span><span style="color:#89DDFF;">} </span><span style="color:#C792EA;">alt</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">alt</span><span style="color:#89DDFF;">} /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>但这时候<code>ts</code>会出现报错提示，原因在于没有定义<code>porps</code>类型，这时候就可以使用<code>interface</code>接口去定义<code>porps</code>即可，如下：</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">as</span><span style="color:#A6ACCD;"> React </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">react</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">IProps</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">logo</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">className</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">alt</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Logo </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">IProps</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">logo</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">className</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">alt</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">props</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> &lt;</span><span style="color:#FFCB6B;">img</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">src</span><span style="color:#F07178;">=</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">logo</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">className</span><span style="color:#F07178;">=</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">className</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">alt</span><span style="color:#F07178;">=</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">alt</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>但是我们都知道<code>props</code>里面存在<code>children</code>属性，我们不可能每个<code>porps</code>接口里面定义多一个<code>children</code>，如下：</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">IProps</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">logo</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">className</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">alt</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">children</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ReactNode</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>更加规范的写法是使用<code>React</code>里面定义好的<code>FC</code>属性，里面已经定义好<code>children</code>类型，如下：</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Logo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">React</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">FC</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IProps</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">props</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">logo</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">className</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">alt</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">props</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> &lt;</span><span style="color:#FFCB6B;">img</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">src</span><span style="color:#F07178;">=</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">logo</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">className</span><span style="color:#F07178;">=</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">className</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">alt</span><span style="color:#F07178;">=</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">alt</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul><li><p>React.FC 显式地定义了返回类型，其他方式是隐式推导的</p></li><li><p>React.FC 对静态属性：displayName、propTypes、defaultProps 提供了类型检查和自动补全</p></li><li><p>React.FC 为 children 提供了隐式的类型（ReactElement | null）</p></li></ul><h3 id="有状态组件" tabindex="-1">有状态组件 <a class="header-anchor" href="#有状态组件" aria-hidden="true">#</a></h3><p>可以是一个类组件且存在<code>props</code>和<code>state</code>属性</p><p>如果使用<code>typescript</code>声明则如下所示：</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">as</span><span style="color:#A6ACCD;"> React </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">react</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">IProps</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">size</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">IState</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">count</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">App</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">React</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">Component</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">IProps</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">IState</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">state</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">count</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">render</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> &lt;</span><span style="color:#FFCB6B;">div</span><span style="color:#F07178;">&gt;</span><span style="color:#A6ACCD;">Hello</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">world</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#A6ACCD;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>上述通过泛型对<code>props</code>、<code>state</code>进行类型定义，然后在使用的时候就可以在编译器中获取更好的智能提示</p><p>关于<code>Component</code>泛型类的定义，可以参考下 React 的类型定义文件 <code>node_modules/@types/react/index.d.ts</code>，如下所示：</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Component</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">P</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">S</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">readonly</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Readonly</span><span style="color:#89DDFF;">&lt;{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">children</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ReactNode</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Readonly</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">P</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">state</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Readonly</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">S</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>从上述可以看到，<code>state</code>属性也定义了可读类型，目的是为了防止直接调用<code>this.state</code>更新状态</p><h3 id="受控组件" tabindex="-1">受控组件 <a class="header-anchor" href="#受控组件" aria-hidden="true">#</a></h3><p>受控组件的特性在于元素的内容通过组件的状态<code>state</code>进行控制</p><p>由于组件内部的事件是合成事件，不等同于原生事件，</p><p>例如一个<code>input</code>组件修改内部的状态，常见的定义的时候如下所示：</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">private </span><span style="color:#82AAFF;">updateValue</span><span style="color:#A6ACCD;">(e: React</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">ChangeEvent</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">HTMLInputElement</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">setState</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> itemText</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>常用<code>Event</code> 事件对象类型：</p><ul><li>ClipboardEvent&lt;T = Element&gt; 剪贴板事件对象</li><li>DragEvent&lt;T = Element&gt; 拖拽事件对象</li><li>ChangeEvent&lt;T = Element&gt; Change 事件对象</li><li>KeyboardEvent&lt;T = Element&gt; 键盘事件对象</li><li>MouseEvent&lt;T = Element&gt; 鼠标事件对象</li><li>TouchEvent&lt;T = Element&gt; 触摸事件对象</li><li>WheelEvent&lt;T = Element&gt; 滚轮事件对象</li><li>AnimationEvent&lt;T = Element&gt; 动画事件对象</li><li>TransitionEvent&lt;T = Element&gt; 过渡事件对象</li></ul><p><code>T</code>接收一个<code>DOM</code> 元素类型</p><h2 id="三、总结" tabindex="-1">三、总结 <a class="header-anchor" href="#三、总结" aria-hidden="true">#</a></h2><p>上述只是简单的在<code>react</code>项目使用<code>typescript</code>，但在编写<code>react</code>项目的时候，还存在<code>hooks</code>、默认参数、以及<code>store</code>等等......</p><p><code>typescript</code>在框架中使用的学习成本相对会更高，需要不断编写才能熟练</p><h2 id="参考文献" tabindex="-1">参考文献 <a class="header-anchor" href="#参考文献" aria-hidden="true">#</a></h2><ul><li><a href="https://juejin.cn/post/6952696734078369828" target="_blank" rel="noreferrer">https://juejin.cn/post/6952696734078369828</a></li><li><a href="https://juejin.cn/post/6844903684422254606" target="_blank" rel="noreferrer">https://juejin.cn/post/6844903684422254606</a></li></ul>`,44),o=[e];function c(r,t,y,F,D,i){return a(),n("div",null,o)}const A=s(p,[["render",c]]);export{d as __pageData,A as default};
