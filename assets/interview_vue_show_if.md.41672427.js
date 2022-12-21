import{_ as s,c as n,o as a,a as l}from"./app.0f29970b.js";const C=JSON.parse('{"title":"面试官：v-show 和 v-if 有什么区别？使用场景分别是什么？","description":"","frontmatter":{},"headers":[{"level":2,"title":"一、v-show 与 v-if 的共同点","slug":"一、v-show-与-v-if-的共同点","link":"#一、v-show-与-v-if-的共同点","children":[]},{"level":2,"title":"二、v-show 与 v-if 的区别","slug":"二、v-show-与-v-if-的区别","link":"#二、v-show-与-v-if-的区别","children":[]},{"level":2,"title":"三、v-show 与 v-if 原理分析","slug":"三、v-show-与-v-if-原理分析","link":"#三、v-show-与-v-if-原理分析","children":[{"level":3,"title":"v-show 原理","slug":"v-show-原理","link":"#v-show-原理","children":[]},{"level":3,"title":"v-if 原理","slug":"v-if-原理","link":"#v-if-原理","children":[]}]},{"level":2,"title":"四、v-show 与 v-if 的使用场景","slug":"四、v-show-与-v-if-的使用场景","link":"#四、v-show-与-v-if-的使用场景","children":[]},{"level":2,"title":"参考文献","slug":"参考文献","link":"#参考文献","children":[]}],"relativePath":"interview/vue/show_if.md"}'),o={name:"interview/vue/show_if.md"},p=l(`<h1 id="面试官-v-show-和-v-if-有什么区别-使用场景分别是什么" tabindex="-1">面试官：v-show 和 v-if 有什么区别？使用场景分别是什么？ <a class="header-anchor" href="#面试官-v-show-和-v-if-有什么区别-使用场景分别是什么" aria-hidden="true">#</a></h1><p><img src="https://static.vue-js.com/d21c3c50-3acb-11eb-85f6-6fac77c0c9b3.png" alt=""></p><h2 id="一、v-show-与-v-if-的共同点" tabindex="-1">一、v-show 与 v-if 的共同点 <a class="header-anchor" href="#一、v-show-与-v-if-的共同点" aria-hidden="true">#</a></h2><p>我们都知道在 <code>vue</code> 中 <code>v-show</code> 与 <code>v-if</code> 的作用效果是相同的(不含 v-else)，都能控制元素在页面是否显示</p><p>在用法上也是相同的</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Tag</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-show</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">isShow</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Tag</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">isShow</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li>当表达式为<code>true</code>的时候，都会占据页面的位置</li><li>当表达式都为<code>false</code>时，都不会占据页面位置</li></ul><h2 id="二、v-show-与-v-if-的区别" tabindex="-1">二、v-show 与 v-if 的区别 <a class="header-anchor" href="#二、v-show-与-v-if-的区别" aria-hidden="true">#</a></h2><ul><li>控制手段不同</li><li>编译过程不同</li><li>编译条件不同</li></ul><p>控制手段：<code>v-show</code>隐藏则是为该元素添加<code>css--display:none</code>，<code>dom</code>元素依旧还在。<code>v-if</code>显示隐藏是将<code>dom</code>元素整个添加或删除</p><p>编译过程：<code>v-if</code>切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；<code>v-show</code>只是简单的基于 css 切换</p><p>编译条件：<code>v-if</code>是真正的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。只有渲染条件为假时，并不做操作，直到为真才渲染</p><ul><li><p><code>v-show</code> 由<code>false</code>变为<code>true</code>的时候不会触发组件的生命周期</p></li><li><p><code>v-if</code>由<code>false</code>变为<code>true</code>的时候，触发组件的<code>beforeCreate</code>、<code>create</code>、<code>beforeMount</code>、<code>mounted</code>钩子，由<code>true</code>变为<code>false</code>的时候触发组件的<code>beforeDestory</code>、<code>destoryed</code>方法</p></li></ul><p>性能消耗：<code>v-if</code>有更高的切换消耗；<code>v-show</code>有更高的初始渲染消耗；</p><h2 id="三、v-show-与-v-if-原理分析" tabindex="-1">三、v-show 与 v-if 原理分析 <a class="header-anchor" href="#三、v-show-与-v-if-原理分析" aria-hidden="true">#</a></h2><p>具体解析流程这里不展开讲，大致流程如下</p><ul><li>将模板<code>template</code>转为<code>ast</code>结构的<code>JS</code>对象</li><li>用<code>ast</code>得到的<code>JS</code>对象拼装<code>render</code>和<code>staticRenderFns</code>函数</li><li><code>render</code>和<code>staticRenderFns</code>函数被调用后生成虚拟<code>VNODE</code>节点，该节点包含创建<code>DOM</code>节点所需信息</li><li><code>vm.patch</code>函数通过虚拟<code>DOM</code>算法利用<code>VNODE</code>节点创建真实<code>DOM</code>节点</li></ul><h3 id="v-show-原理" tabindex="-1">v-show 原理 <a class="header-anchor" href="#v-show-原理" aria-hidden="true">#</a></h3><p>不管初始条件是什么，元素总是会被渲染</p><p>我们看一下在<code>vue</code>中是如何实现的</p><p>代码很好理解，有<code>transition</code>就执行<code>transition</code>，没有就直接设置<code>display</code>属性</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// https://github.com/vuejs/vue-next/blob/3cd30c5245da0733f9eb6f29d220f39c46518162/packages/runtime-dom/src/directives/vShow.ts</span></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> vShow</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ObjectDirective</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">VShowElement</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">beforeMount</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">transition</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">})</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">_vod</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">style</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">display</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">none</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">style</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">display</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">transition</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">transition</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">beforeEnter</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">el</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#82AAFF;">setDisplay</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">mounted</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">transition</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">})</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">transition</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">transition</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">enter</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">el</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">updated</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">oldValue</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">transition</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">})</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// ...</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">beforeUnmount</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">})</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">setDisplay</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="v-if-原理" tabindex="-1">v-if 原理 <a class="header-anchor" href="#v-if-原理" aria-hidden="true">#</a></h3><p><code>v-if</code>在实现上比<code>v-show</code>要复杂的多，因为还有<code>else</code> <code>else-if</code> 等条件需要处理，这里我们也只摘抄源码中处理 <code>v-if</code> 的一小部分</p><p>返回一个<code>node</code>节点，<code>render</code>函数通过表达式的值来决定是否生成<code>DOM</code></p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// https://github.com/vuejs/vue-next/blob/cdc9f336fd/packages/compiler-core/src/transforms/vIf.ts</span></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> transformIf </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createStructuralDirectiveTransform</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">/</span><span style="color:#89DDFF;">^</span><span style="color:#89DDFF;">(</span><span style="color:#C3E88D;">if</span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;">else</span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;">else-if</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">$</span><span style="color:#89DDFF;">/</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">dir</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">processIf</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">dir</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">ifNode</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">branch</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">isRoot</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">// ...</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">isRoot</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">          </span><span style="color:#A6ACCD;">ifNode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">codegenNode</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">createCodegenNodeForBranch</span><span style="color:#F07178;">(</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">branch</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">context</span></span>
<span class="line"><span style="color:#F07178;">          ) </span><span style="color:#89DDFF;">as</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">IfConditionalExpression</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">          </span><span style="color:#676E95;">// attach this branch&#39;s codegen node to the v-if root.</span></span>
<span class="line"><span style="color:#F07178;">          </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">parentCondition</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">getParentCondition</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">ifNode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">codegenNode</span><span style="color:#89DDFF;">!</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">          </span><span style="color:#A6ACCD;">parentCondition</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">alternate</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">createCodegenNodeForBranch</span><span style="color:#F07178;">(</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">branch</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ifNode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">branches</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">context</span></span>
<span class="line"><span style="color:#F07178;">          )</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h2 id="四、v-show-与-v-if-的使用场景" tabindex="-1">四、v-show 与 v-if 的使用场景 <a class="header-anchor" href="#四、v-show-与-v-if-的使用场景" aria-hidden="true">#</a></h2><p><code>v-if</code> 与 <code>v-show</code> 都能控制<code>dom</code>元素在页面的显示</p><p><code>v-if</code> 相比 <code>v-show</code> 开销更大的（直接操作<code>dom</code>节点增加与删除）</p><p>如果需要非常频繁地切换，则使用 v-show 较好</p><p>如果在运行时条件很少改变，则使用 v-if 较好</p><h2 id="参考文献" tabindex="-1">参考文献 <a class="header-anchor" href="#参考文献" aria-hidden="true">#</a></h2><ul><li><a href="https://www.jianshu.com/p/7af8554d8f08" target="_blank" rel="noreferrer">https://www.jianshu.com/p/7af8554d8f08</a></li><li><a href="https://juejin.cn/post/6897948855904501768" target="_blank" rel="noreferrer">https://juejin.cn/post/6897948855904501768</a></li><li><a href="https://vue3js/docs/zh" target="_blank" rel="noreferrer">https://vue3js/docs/zh</a></li></ul>`,33),e=[p];function c(r,t,F,D,y,i){return a(),n("div",null,e)}const A=s(o,[["render",c]]);export{C as __pageData,A as default};
