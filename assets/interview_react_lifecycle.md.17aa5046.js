import{_ as e,c as a,o as n,a as o}from"./app.0f29970b.js";const D=JSON.parse('{"title":"面试官：说说 React 生命周期有哪些不同阶段？每个阶段对应的方法是？","description":"","frontmatter":{},"headers":[{"level":2,"title":"一、是什么","slug":"一、是什么","link":"#一、是什么","children":[]},{"level":2,"title":"二、流程","slug":"二、流程","link":"#二、流程","children":[{"level":3,"title":"创建阶段","slug":"创建阶段","link":"#创建阶段","children":[]},{"level":3,"title":"getDerivedStateFromProps","slug":"getderivedstatefromprops","link":"#getderivedstatefromprops","children":[]},{"level":3,"title":"render","slug":"render","link":"#render","children":[]},{"level":3,"title":"componentDidMount","slug":"componentdidmount","link":"#componentdidmount","children":[]},{"level":3,"title":"更新阶段","slug":"更新阶段","link":"#更新阶段","children":[]},{"level":3,"title":"getDerivedStateFromProps","slug":"getderivedstatefromprops-1","link":"#getderivedstatefromprops-1","children":[]}]},{"level":2,"title":"shouldComponentUpdate","slug":"shouldcomponentupdate","link":"#shouldcomponentupdate","children":[{"level":3,"title":"render","slug":"render-1","link":"#render-1","children":[]},{"level":3,"title":"getSnapshotBeforeUpdate","slug":"getsnapshotbeforeupdate","link":"#getsnapshotbeforeupdate","children":[]},{"level":3,"title":"componentDidUpdate","slug":"componentdidupdate","link":"#componentdidupdate","children":[]},{"level":3,"title":"卸载阶段","slug":"卸载阶段","link":"#卸载阶段","children":[]}]},{"level":2,"title":"componentWillUnmount","slug":"componentwillunmount","link":"#componentwillunmount","children":[]},{"level":2,"title":"三、总结","slug":"三、总结","link":"#三、总结","children":[]},{"level":2,"title":"参考文献","slug":"参考文献","link":"#参考文献","children":[]}],"relativePath":"interview/react/lifecycle.md"}'),s={name:"interview/react/lifecycle.md"},t=o(`<h1 id="面试官-说说-react-生命周期有哪些不同阶段-每个阶段对应的方法是" tabindex="-1">面试官：说说 React 生命周期有哪些不同阶段？每个阶段对应的方法是？ <a class="header-anchor" href="#面试官-说说-react-生命周期有哪些不同阶段-每个阶段对应的方法是" aria-hidden="true">#</a></h1><h2 id="一、是什么" tabindex="-1">一、是什么 <a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a></h2><p>在<a href="https://mp.weixin.qq.com/s?__biz=MzU1OTgxNDQ1Nw==&amp;mid=2247484176&amp;idx=1&amp;sn=5623421ed2678046ed9e438aadf6e26f&amp;chksm=fc10c146cb67485015f24f7e9f5862c4c685fc33485fe30e1b375a534b4031978439c554e0c0&amp;scene=178&amp;cur_album_id=1711105826272116736#rd" target="_blank" rel="noreferrer">以前文章</a>中，我们了解到生命周期定义</p><p>生命周期<code>（Life Cycle）</code>的概念应用很广泛，特别是在经济、环境、技术、社会等诸多领域经常出现，其基本涵义可以通俗地理解为“从摇篮到坟墓”<code>（Cradle-to-Grave）</code>的整个过程</p><p>跟<code>Vue</code>一样，<code>React</code>整个组件生命周期包括从创建、初始化数据、编译模板、挂载 Dom→ 渲染、更新 → 渲染、卸载等一系列过程</p><h2 id="二、流程" tabindex="-1">二、流程 <a class="header-anchor" href="#二、流程" aria-hidden="true">#</a></h2><p>这里主要讲述<code>react16.4</code>之后的生命周期，可以分成三个阶段：</p><ul><li>创建阶段</li><li>更新阶段</li><li>卸载阶段</li></ul><h3 id="创建阶段" tabindex="-1">创建阶段 <a class="header-anchor" href="#创建阶段" aria-hidden="true">#</a></h3><p>创建阶段主要分成了以下几个生命周期方法：</p><ul><li>constructor</li><li>getDerivedStateFromProps</li><li>render</li><li>componentDidMount</li></ul><h4 id="constructor" tabindex="-1">constructor <a class="header-anchor" href="#constructor" aria-hidden="true">#</a></h4><p>实例过程中自动调用的方法，在方法内部通过<code>super</code>关键字获取来自父组件的<code>props</code></p><p>在该方法中，通常的操作为初始化<code>state</code>状态或者在<code>this</code>上挂载方法</p><h3 id="getderivedstatefromprops" tabindex="-1">getDerivedStateFromProps <a class="header-anchor" href="#getderivedstatefromprops" aria-hidden="true">#</a></h3><p>该方法是新增的生命周期方法，是一个静态的方法，因此不能访问到组件的实例</p><p>执行时机：组件创建和更新阶段，不论是<code>props</code>变化还是<code>state</code>变化，也会调用</p><p>在每次<code>render</code>方法前调用，第一个参数为即将更新的<code>props</code>，第二个参数为上一个状态的<code>state</code>，可以比较<code>props</code> 和 <code>state</code>来加一些限制条件，防止无用的 state 更新</p><p>该方法需要返回一个新的对象作为新的<code>state</code>或者返回<code>null</code>表示<code>state</code>状态不需要更新</p><h3 id="render" tabindex="-1">render <a class="header-anchor" href="#render" aria-hidden="true">#</a></h3><p>类组件必须实现的方法，用于渲染<code>DOM</code>结构，可以访问组件<code>state</code>与<code>prop</code>属性</p><p>注意： 不要在 <code>render</code> 里面 <code>setState</code>, 否则会触发死循环导致内存崩溃</p><h3 id="componentdidmount" tabindex="-1">componentDidMount <a class="header-anchor" href="#componentdidmount" aria-hidden="true">#</a></h3><p>组件挂载到真实<code>DOM</code>节点后执行，其在<code>render</code>方法之后执行</p><p>此方法多用于执行一些数据获取，事件监听等操作</p><h3 id="更新阶段" tabindex="-1">更新阶段 <a class="header-anchor" href="#更新阶段" aria-hidden="true">#</a></h3><p>该阶段的函数主要为如下方法：</p><ul><li>getDerivedStateFromProps</li><li>shouldComponentUpdate</li><li>render</li><li>getSnapshotBeforeUpdate</li><li>componentDidUpdate</li></ul><h3 id="getderivedstatefromprops-1" tabindex="-1">getDerivedStateFromProps <a class="header-anchor" href="#getderivedstatefromprops-1" aria-hidden="true">#</a></h3><p>该方法介绍同上</p><h2 id="shouldcomponentupdate" tabindex="-1">shouldComponentUpdate <a class="header-anchor" href="#shouldcomponentupdate" aria-hidden="true">#</a></h2><p>用于告知组件本身基于当前的<code>props</code>和<code>state</code>是否需要重新渲染组件，默认情况返回<code>true</code></p><p>执行时机：到新的 props 或者 state 时都会调用，通过返回 true 或者 false 告知组件更新与否</p><p>一般情况，不建议在该周期方法中进行深层比较，会影响效率</p><p>同时也不能调用<code>setState</code>，否则会导致无限循环调用更新</p><h3 id="render-1" tabindex="-1">render <a class="header-anchor" href="#render-1" aria-hidden="true">#</a></h3><p>介绍如上</p><h3 id="getsnapshotbeforeupdate" tabindex="-1">getSnapshotBeforeUpdate <a class="header-anchor" href="#getsnapshotbeforeupdate" aria-hidden="true">#</a></h3><p>该周期函数在<code>render</code>后执行，执行之时<code>DOM</code>元素还没有被更新</p><p>该方法返回的一个<code>Snapshot</code>值，作为<code>componentDidUpdate</code>第三个参数传入</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki"><code><span class="line"><span style="color:#82AAFF;">getSnapshotBeforeUpdate</span><span style="color:#A6ACCD;">(prevProps</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> prevState) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#enter getSnapshotBeforeUpdate</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">componentDidUpdate</span><span style="color:#A6ACCD;">(prevProps</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> prevState</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> snapshot) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#enter componentDidUpdate snapshot = </span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">snapshot</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>此方法的目的在于获取组件更新前的一些信息，比如组件的滚动位置之类的，在组件更新后可以根据这些信息恢复一些 UI 视觉上的状态</p><h3 id="componentdidupdate" tabindex="-1">componentDidUpdate <a class="header-anchor" href="#componentdidupdate" aria-hidden="true">#</a></h3><p>执行时机：组件更新结束后触发</p><p>在该方法中，可以根据前后的<code>props</code>和<code>state</code>的变化做相应的操作，如获取数据，修改<code>DOM</code>样式等</p><h3 id="卸载阶段" tabindex="-1">卸载阶段 <a class="header-anchor" href="#卸载阶段" aria-hidden="true">#</a></h3><h2 id="componentwillunmount" tabindex="-1">componentWillUnmount <a class="header-anchor" href="#componentwillunmount" aria-hidden="true">#</a></h2><p>此方法用于组件卸载前，清理一些注册是监听事件，或者取消订阅的网络请求等</p><p>一旦一个组件实例被卸载，其不会被再次挂载，而只可能是被重新创建</p><h2 id="三、总结" tabindex="-1">三、总结 <a class="header-anchor" href="#三、总结" aria-hidden="true">#</a></h2><p>新版生命周期整体流程如下图所示：</p><p><img src="https://static.vue-js.com/66c999c0-d373-11eb-85f6-6fac77c0c9b3.png" alt=""></p><p>旧的生命周期流程图如下：</p><p><img src="https://static.vue-js.com/d379e420-d374-11eb-ab90-d9ae814b240d.png" alt=""></p><p>通过两个图的对比，可以发现新版的生命周期减少了以下三种方法：</p><ul><li>componentWillMount</li><li>componentWillReceiveProps</li><li>componentWillUpdate</li></ul><p>其实这三个方法仍然存在，只是在前者加上了<code>UNSAFE_</code>前缀，如<code>UNSAFE_componentWillMount</code>，并不像字面意思那样表示不安全，而是表示这些生命周期的代码可能在未来的 <code>react</code>版本可能废除</p><p>同时也新增了两个生命周期函数：</p><ul><li>getDerivedStateFromProps</li><li>getSnapshotBeforeUpdate</li></ul><h2 id="参考文献" tabindex="-1">参考文献 <a class="header-anchor" href="#参考文献" aria-hidden="true">#</a></h2><ul><li><a href="https://github.com/pomelovico/keep/issues/23" target="_blank" rel="noreferrer">https://github.com/pomelovico/keep/issues/23</a></li><li><a href="https://segmentfault.com/a/1190000020268993" target="_blank" rel="noreferrer">https://segmentfault.com/a/1190000020268993</a></li></ul>`,61),l=[t];function p(r,d,c,i,h,u){return n(),a("div",null,l)}const f=e(s,[["render",p]]);export{D as __pageData,f as default};
