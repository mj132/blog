import{_ as s,c as n,o as a,a as l}from"./app.0f29970b.js";const C=JSON.parse('{"title":"提高 webpack 的构建速度","description":"","frontmatter":{},"headers":[{"level":2,"title":"一、背景","slug":"一、背景","link":"#一、背景","children":[]},{"level":2,"title":"二、如何优化","slug":"二、如何优化","link":"#二、如何优化","children":[{"level":3,"title":"优化 loader 配置","slug":"优化-loader-配置","link":"#优化-loader-配置","children":[]},{"level":3,"title":"合理使用 resolve.extensions","slug":"合理使用-resolve-extensions","link":"#合理使用-resolve-extensions","children":[]},{"level":3,"title":"优化 resolve.modules","slug":"优化-resolve-modules","link":"#优化-resolve-modules","children":[]},{"level":3,"title":"优化 resolve.alias","slug":"优化-resolve-alias","link":"#优化-resolve-alias","children":[]},{"level":3,"title":"使用 DLLPlugin 插件","slug":"使用-dllplugin-插件","link":"#使用-dllplugin-插件","children":[]},{"level":3,"title":"使用 cache-loader","slug":"使用-cache-loader","link":"#使用-cache-loader","children":[]},{"level":3,"title":"terser 启动多进程","slug":"terser-启动多进程","link":"#terser-启动多进程","children":[]},{"level":3,"title":"合理使用 sourceMap","slug":"合理使用-sourcemap","link":"#合理使用-sourcemap","children":[]},{"level":3,"title":"三、总结","slug":"三、总结","link":"#三、总结","children":[]}]},{"level":2,"title":"参考文献","slug":"参考文献","link":"#参考文献","children":[]}],"relativePath":"front-end/webpack/improve_build.md"}'),e={name:"front-end/webpack/improve_build.md"},p=l(`<h1 id="提高-webpack-的构建速度" tabindex="-1">提高 webpack 的构建速度 <a class="header-anchor" href="#提高-webpack-的构建速度" aria-hidden="true">#</a></h1><p><img src="https://static.vue-js.com/3a1b8620-b01b-11eb-85f6-6fac77c0c9b3.png" alt=""></p><h2 id="一、背景" tabindex="-1">一、背景 <a class="header-anchor" href="#一、背景" aria-hidden="true">#</a></h2><p>随着我们的项目涉及到页面越来越多，功能和业务代码也会随着越多，相应的 <code>webpack</code> 的构建时间也会越来越久</p><p>构建时间与我们日常开发效率密切相关，当我们本地开发启动 <code>devServer</code> 或者 <code>build</code> 的时候，如果时间过长，会大大降低我们的工作效率</p><p>所以，优化<code>webpack</code> 构建速度是十分重要的环节</p><h2 id="二、如何优化" tabindex="-1">二、如何优化 <a class="header-anchor" href="#二、如何优化" aria-hidden="true">#</a></h2><p>常见的提升构建速度的手段有如下：</p><ul><li>优化 loader 配置</li><li>合理使用 resolve.extensions</li><li>优化 resolve.modules</li><li>优化 resolve.alias</li><li>使用 DLLPlugin 插件</li><li>使用 cache-loader</li><li>terser 启动多进程</li><li>合理使用 sourceMap</li></ul><h3 id="优化-loader-配置" tabindex="-1">优化 loader 配置 <a class="header-anchor" href="#优化-loader-配置" aria-hidden="true">#</a></h3><p>在使用<code>loader</code>时，可以通过配置<code>include</code>、<code>exclude</code>、<code>test</code>属性来匹配文件，接触<code>include</code>、<code>exclude</code>规定哪些匹配应用<code>loader</code></p><p>如采用 ES6 的项目为例，在配置 <code>babel-loader</code>时，可以这样：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">module</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">rules</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;">// 如果项目源码中只有 js 文件就不要写成 /\\.jsx?$/，提升正则表达式性能</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">test</span><span style="color:#89DDFF;">:</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">\\.</span><span style="color:#C3E88D;">js</span><span style="color:#89DDFF;">$</span><span style="color:#89DDFF;">/</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;">// babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">use</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">babel-loader?cacheDirectory</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;">// 只对项目根目录下的 src 目录中的文件采用 babel-loader</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">include</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(__dirname</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">src</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="合理使用-resolve-extensions" tabindex="-1">合理使用 resolve.extensions <a class="header-anchor" href="#合理使用-resolve-extensions" aria-hidden="true">#</a></h3><p>在开发中我们会有各种各样的模块依赖，这些模块可能来自于自己编写的代码，也可能来自第三方库， <code>resolve</code>可以帮助<code>webpack</code>从每个 <code>require/import</code> 语句中，找到需要引入到合适的模块代码</p><p>通过<code>resolve.extensions</code>是解析到文件时自动添加拓展名，默认情况如下：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// ...</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">extensions</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>当我们引入文件的时候，若没有文件后缀名，则会根据数组内的值依次查找</p><p>当我们配置的时候，则不要随便把所有后缀都写在里面，这会调用多次文件的查找，这样就会减慢打包速度</p><h3 id="优化-resolve-modules" tabindex="-1">优化 resolve.modules <a class="header-anchor" href="#优化-resolve-modules" aria-hidden="true">#</a></h3><p><code>resolve.modules</code> 用于配置 <code>webpack</code> 去哪些目录下寻找第三方模块。默认值为<code>[&#39;node_modules&#39;]</code>，所以默认会从<code>node_modules</code>中查找文件 当安装的第三方模块都放在项目根目录下的 <code>./node_modules</code>目录下时，所以可以指明存放第三方模块的绝对路径，以减少寻找，配置如下：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">resolve</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// 其中 __dirname 表示当前工作目录，也就是项目根目录</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">modules</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(__dirname</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">node_modules</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="优化-resolve-alias" tabindex="-1">优化 resolve.alias <a class="header-anchor" href="#优化-resolve-alias" aria-hidden="true">#</a></h3><p><code>alias</code>给一些常用的路径起一个别名，特别当我们的项目目录结构比较深的时候，一个文件的路径可能是<code>./../../</code>的形式</p><p>通过配置<code>alias</code>以减少查找过程</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// ...</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">resolve</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">alias</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">@</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(__dirname</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./src</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="使用-dllplugin-插件" tabindex="-1">使用 DLLPlugin 插件 <a class="header-anchor" href="#使用-dllplugin-插件" aria-hidden="true">#</a></h3><p><code>DLL</code>全称是 动态链接库，是为软件在 winodw 种实现共享函数库的一种实现方式，而 Webpack 也内置了 DLL 的功能，为的就是可以共享，不经常改变的代码，抽成一个共享的库。这个库在之后的编译过程中，会被引入到其他项目的代码中</p><p>使用步骤分成两部分：</p><ul><li>打包一个 DLL 库</li><li>引入 DLL 库</li></ul><h4 id="打包一个-dll-库" tabindex="-1">打包一个 DLL 库 <a class="header-anchor" href="#打包一个-dll-库" aria-hidden="true">#</a></h4><p><code>webpack</code>内置了一个<code>DllPlugin</code>可以帮助我们打包一个 DLL 的库文件</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// ...</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> webpack</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">DllPlugin</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">dll_[name]</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(__dirname</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./dll/[name].manifest.json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="引入-dll-库" tabindex="-1">引入 DLL 库 <a class="header-anchor" href="#引入-dll-库" aria-hidden="true">#</a></h4><p>使用 <code>webpack</code> 自带的 <code>DllReferencePlugin</code> 插件对 <code>manifest.json</code> 映射文件进行分析，获取要使用的<code>DLL</code>库</p><p>然后再通过<code>AddAssetHtmlPlugin</code>插件，将我们打包的<code>DLL</code>库引入到<code>Html</code>模块中</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// ...</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> webpack</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">DllReferencePlugin</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">context</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(__dirname</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./dll/dll_vue.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">manifest</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(__dirname</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./dll/vue.manifest.json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">AddAssetHtmlPlugin</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">outputPath</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./auto</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">filepath</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(__dirname</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./dll/dll_vue.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="使用-cache-loader" tabindex="-1">使用 cache-loader <a class="header-anchor" href="#使用-cache-loader" aria-hidden="true">#</a></h3><p>在一些性能开销较大的 <code>loader</code>之前添加 <code>cache-loader</code>，以将结果缓存到磁盘里，显著提升二次构建速度</p><p>保存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的 <code>loader</code> 使用此<code>loader</code></p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">module</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">rules</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">test</span><span style="color:#89DDFF;">:</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">\\.</span><span style="color:#C3E88D;">ext</span><span style="color:#89DDFF;">$</span><span style="color:#89DDFF;">/</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">use</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">cache-loader</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">loaders]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">include</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">src</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="terser-启动多进程" tabindex="-1">terser 启动多进程 <a class="header-anchor" href="#terser-启动多进程" aria-hidden="true">#</a></h3><p>使用多进程并行运行来提高构建速度</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">optimization</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">minimizer</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">TerserPlugin</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">parallel</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="合理使用-sourcemap" tabindex="-1">合理使用 sourceMap <a class="header-anchor" href="#合理使用-sourcemap" aria-hidden="true">#</a></h3><p>打包生成 <code>sourceMap</code> 的时候，如果信息越详细，打包速度就会越慢。对应属性取值如下所示：</p><p><img src="https://static.vue-js.com/11647af0-b01d-11eb-85f6-6fac77c0c9b3.png" alt=""></p><h3 id="三、总结" tabindex="-1">三、总结 <a class="header-anchor" href="#三、总结" aria-hidden="true">#</a></h3><p>可以看到，优化<code>webpack</code>构建的方式有很多，主要可以从优化搜索时间、缩小文件搜索范围、减少不必要的编译等方面入手</p><h2 id="参考文献" tabindex="-1">参考文献 <a class="header-anchor" href="#参考文献" aria-hidden="true">#</a></h2><ul><li><a href="https://github.com/ly2011/blog/issues/44" target="_blank" rel="noreferrer">https://github.com/ly2011/blog/issues/44</a></li><li><a href="https://xie.infoq.cn/article/541418eb82a674741a0ad8865" target="_blank" rel="noreferrer">https://xie.infoq.cn/article/541418eb82a674741a0ad8865</a></li><li><a href="https://zhuanlan.zhihu.com/p/139498741" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/139498741</a></li></ul>`,51),o=[p];function r(c,t,D,i,F,y){return a(),n("div",null,o)}const A=s(e,[["render",r]]);export{C as __pageData,A as default};
