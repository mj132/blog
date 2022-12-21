import{_ as s,c as n,o as a,a as l}from"./app.0f29970b.js";const C=JSON.parse('{"title":"webpack 的构建流程","description":"","frontmatter":{},"headers":[{"level":2,"title":"一、运行流程","slug":"一、运行流程","link":"#一、运行流程","children":[{"level":3,"title":"初始化流程","slug":"初始化流程","link":"#初始化流程","children":[]},{"level":3,"title":"编译构建流程","slug":"编译构建流程","link":"#编译构建流程","children":[]},{"level":3,"title":"输出流程","slug":"输出流程","link":"#输出流程","children":[]},{"level":3,"title":"小结","slug":"小结","link":"#小结","children":[]}]},{"level":2,"title":"参考文献","slug":"参考文献","link":"#参考文献","children":[]}],"relativePath":"front-end/webpack/build_process.md"}'),p={name:"front-end/webpack/build_process.md"},e=l(`<h1 id="webpack-的构建流程" tabindex="-1">webpack 的构建流程 <a class="header-anchor" href="#webpack-的构建流程" aria-hidden="true">#</a></h1><p><img src="https://static.vue-js.com/96cf6840-a658-11eb-85f6-6fac77c0c9b3.png" alt=""></p><h2 id="一、运行流程" tabindex="-1">一、运行流程 <a class="header-anchor" href="#一、运行流程" aria-hidden="true">#</a></h2><p><code>webpack</code> 的运行流程是一个串行的过程，它的工作流程就是将各个插件串联起来</p><p>在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条<code>webpack</code>机制中，去改变<code>webpack</code>的运作，使得整个系统扩展性良好</p><p>从启动到结束会依次执行以下三大步骤：</p><ul><li>初始化流程：从配置文件和 <code>Shell</code> 语句中读取与合并参数，并初始化需要使用的插件和配置插件等执行环境所需要的参数</li><li>编译构建流程：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理</li><li>输出流程：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统</li></ul><p><img src="https://static.vue-js.com/b566d400-a658-11eb-85f6-6fac77c0c9b3.png" alt=""></p><h3 id="初始化流程" tabindex="-1">初始化流程 <a class="header-anchor" href="#初始化流程" aria-hidden="true">#</a></h3><p>从配置文件和 <code>Shell</code> 语句中读取与合并参数，得出最终的参数</p><p>配置文件默认下为<code>webpack.config.js</code>，也或者通过命令的形式指定配置文件，主要作用是用于激活<code>webpack</code>的加载项和插件</p><p>关于文件配置内容分析，如下注释：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> path </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">path</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> node_modules </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(__dirname</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">node_modules</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> pathToReact </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(node_modules</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">react/dist/react.min.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// 入口文件，是模块构建的起点，同时每一个入口文件对应最后生成的一个 chunk。</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">entry</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./path/to/my/entry/file.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">，</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// 文件路径指向(可加快打包过程)。</span></span>
<span class="line"><span style="color:#A6ACCD;">  resolve: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">alias</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">react</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> pathToReact</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// 生成文件，是模块构建的终点，包括输出文件与输出路径。</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">output</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(__dirname</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">build</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">filename</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">[name].js</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// 这里配置了处理各模块的 loader ，包括 css 预处理 loader ，es6 编译 loader，图片处理 loader。</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">module</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">loaders</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">test</span><span style="color:#89DDFF;">:</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">\\.</span><span style="color:#C3E88D;">js</span><span style="color:#89DDFF;">$</span><span style="color:#89DDFF;">/</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">loader</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">babel</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">query</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">presets</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">es2015</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">react</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">noParse</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [pathToReact]</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// webpack 各插件对象，在 webpack 的事件流中执行对应的方法。</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> webpack</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">HotModuleReplacementPlugin</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">  ]</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><p><code>webpack</code> 将 <code>webpack.config.js</code> 中的各个配置项拷贝到 <code>options</code> 对象中，并加载用户配置的 <code>plugins</code></p><p>完成上述步骤之后，则开始初始化<code>Compiler</code>编译对象，该对象掌控着<code>webpack</code>声明周期，不执行具体的任务，只是进行一些调度工作</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Compiler</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Tapable</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">constructor</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">super</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">hooks</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      beforeCompile</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">AsyncSeriesHook</span><span style="color:#F07178;">([</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">params</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">])</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      compile</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">SyncHook</span><span style="color:#F07178;">([</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">params</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">])</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      afterCompile</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">AsyncSeriesHook</span><span style="color:#F07178;">([</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">compilation</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">])</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      make</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">AsyncParallelHook</span><span style="color:#F07178;">([</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">compilation</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">])</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      entryOption</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">SyncBailHook</span><span style="color:#F07178;">([</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">context</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">entry</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">])</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">// 定义了很多不同类型的钩子</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// ...</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">webpack</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">options</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">var</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">compiler</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Compiler</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// ... 检查options,若watch字段为true,则开启watch线程</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">compiler</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;">// ...</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p><code>Compiler</code> 对象继承自 <code>Tapable</code>，初始化时定义了很多钩子函数</p><h3 id="编译构建流程" tabindex="-1">编译构建流程 <a class="header-anchor" href="#编译构建流程" aria-hidden="true">#</a></h3><p>根据配置中的 <code>entry</code> 找出所有的入口文件</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">entry</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./src/file.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>初始化完成后会调用<code>Compiler</code>的<code>run</code>来真正启动<code>webpack</code>编译构建流程，主要流程如下：</p><ul><li><code>compile</code> 开始编译</li><li><code>make</code> 从入口点分析模块及其依赖的模块，创建这些模块对象</li><li><code>build-module</code> 构建模块</li><li><code>seal</code> 封装构建结果</li><li><code>emit</code> 把各个 chunk 输出到结果文件</li></ul><h4 id="compile-编译" tabindex="-1">compile 编译 <a class="header-anchor" href="#compile-编译" aria-hidden="true">#</a></h4><p>执行了<code>run</code>方法后，首先会触发<code>compile</code>，主要是构建一个<code>Compilation</code>对象</p><p>该对象是编译阶段的主要执行者，主要会依次下述流程：执行模块创建、依赖收集、分块、打包等主要任务的对象</p><h4 id="make-编译模块" tabindex="-1">make 编译模块 <a class="header-anchor" href="#make-编译模块" aria-hidden="true">#</a></h4><p>当完成了上述的<code>compilation</code>对象后，就开始从<code>Entry</code>入口文件开始读取，主要执行<code>_addModuleChain()</code>函数，如下：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#82AAFF;">_addModuleChain</span><span style="color:#A6ACCD;">(context</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> dependency</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> onModule</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> callback) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">//  ...</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// 根据依赖查找对应的工厂函数</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Dep</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#676E95;">/** </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">type</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">DepConstructor</span><span style="color:#89DDFF;">}</span><span style="color:#676E95;"> */</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">dependency</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">constructor</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">moduleFactory</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">dependencyFactories</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">Dep</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// 调用工厂函数NormalModuleFactory的create来生成一个空的NormalModule对象</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">moduleFactory</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">create</span><span style="color:#F07178;">(</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      dependencies</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> [</span><span style="color:#A6ACCD;">dependency</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">//  ...</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">err</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">module</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">//  ...</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">afterBuild</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">processModuleDependencies</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">module,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">err</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">          </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">err</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">callback</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">err</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">          </span><span style="color:#82AAFF;">callback</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">null,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">module</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">buildModule</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">module,</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">err</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;">//  ...</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">afterBuild</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  )</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>过程如下：</p><p><code>_addModuleChain</code>中接收参数<code>dependency</code>传入的入口依赖，使用对应的工厂函数<code>NormalModuleFactory.create</code>方法生成一个空的<code>module</code>对象</p><p>回调中会把此<code>module</code>存入<code>compilation.modules</code>对象和<code>dependencies.module</code>对象中，由于是入口文件，也会存入<code>compilation.entries</code>中</p><p>随后执行<code>buildModule</code>进入真正的构建模块<code>module</code>内容的过程</p><h4 id="build-module-完成模块编译" tabindex="-1">build module 完成模块编译 <a class="header-anchor" href="#build-module-完成模块编译" aria-hidden="true">#</a></h4><p>这里主要调用配置的<code>loaders</code>，将我们的模块转成标准的<code>JS</code>模块</p><p>在用<code>Loader</code> 对一个模块转换完后，使用 <code>acorn</code> 解析转换后的内容，输出对应的抽象语法树（<code>AST</code>），以方便 <code>Webpack</code>后面对代码的分析</p><p>从配置的入口模块开始，分析其 <code>AST</code>，当遇到<code>require</code>等导入其它模块语句时，便将其加入到依赖的模块列表，同时对新找出的依赖模块递归分析，最终搞清所有模块的依赖关系</p><h3 id="输出流程" tabindex="-1">输出流程 <a class="header-anchor" href="#输出流程" aria-hidden="true">#</a></h3><h4 id="seal-输出资源" tabindex="-1">seal 输出资源 <a class="header-anchor" href="#seal-输出资源" aria-hidden="true">#</a></h4><p><code>seal</code>方法主要是要生成<code>chunks</code>，对<code>chunks</code>进行一系列的优化操作，并生成要输出的代码</p><p><code>webpack</code> 中的 <code>chunk</code> ，可以理解为配置在 <code>entry</code> 中的模块，或者是动态引入的模块</p><p>根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 <code>Chunk</code>，再把每个 <code>Chunk</code> 转换成一个单独的文件加入到输出列表</p><h4 id="emit-输出完成" tabindex="-1">emit 输出完成 <a class="header-anchor" href="#emit-输出完成" aria-hidden="true">#</a></h4><p>在确定好输出内容后，根据配置确定输出的路径和文件名</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#FFCB6B;">output</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">path</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">__dirname</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">build</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">filename</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">[name].js</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>在 <code>Compiler</code> 开始生成文件前，钩子 <code>emit</code> 会被执行，这是我们修改最终文件的最后一个机会</p><p>从而<code>webpack</code>整个打包过程则结束了</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-hidden="true">#</a></h3><p><img src="https://static.vue-js.com/d77fc560-a658-11eb-85f6-6fac77c0c9b3.png" alt=""></p><h2 id="参考文献" tabindex="-1">参考文献 <a class="header-anchor" href="#参考文献" aria-hidden="true">#</a></h2><ul><li><a href="https://github.com/Cosen95/blog/issues/48" target="_blank" rel="noreferrer">https://github.com/Cosen95/blog/issues/48</a></li><li><a href="https://developer.aliyun.com/article/61047" target="_blank" rel="noreferrer">https://developer.aliyun.com/article/61047</a></li></ul>`,50),o=[e];function c(r,t,F,y,D,i){return a(),n("div",null,o)}const A=s(p,[["render",c]]);export{C as __pageData,A as default};
