import{_ as s,c as n,o as a,a as p}from"./app.0f29970b.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"对象着手","slug":"对象着手","link":"#对象着手","children":[]},{"level":2,"title":"原型链详解","slug":"原型链详解","link":"#原型链详解","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"relativePath":"front-end/javascript/prototype.md"}'),l={name:"front-end/javascript/prototype.md"},o=p(`<h2 id="对象着手" tabindex="-1">对象着手 <a class="header-anchor" href="#对象着手" aria-hidden="true">#</a></h2><p>在谈原型链之前，先了解对象。</p><ul><li>所有引用类型（函数，数组，对象）都拥有__proto__属性（隐式原型）</li><li>所有函数拥有prototype属性（显式原型）（仅限函数）</li><li>原型对象：拥有prototype属性的对象，在定义函数时就被创建</li></ul><p><strong>prototype与__proto__两个概念</strong></p><ul><li><code>prototype</code>：此属性只有构造函数才有，它指向的是当前构造函数的原型对象。</li><li><code>__proto__</code>：此属性是任何对象在创建时都会有的一个属性，它指向了产生当前对象的构造函数的原型对象，由于并非标准规定属性，不要随便去更改这个属性的值，以免破坏原型链，但是可以借助这个属性来学习，所谓的原型链就是由__proto__连接而成的链。</li></ul><h2 id="原型链详解" tabindex="-1">原型链详解 <a class="header-anchor" href="#原型链详解" aria-hidden="true">#</a></h2><p>在js代码中 通过对象创建(下面一段简单的代码)详细分析原型链 一段简单代码:</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Fun</span><span style="color:#89DDFF;">(){}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Fun</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">z</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> obj</span><span style="color:#89DDFF;">=new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Fun</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">y</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">//调用</span></span>
<span class="line"><span style="color:#A6ACCD;">  obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;">//1</span></span>
<span class="line"><span style="color:#A6ACCD;">  obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">y</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;">//2</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">z</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;">//3</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">toString</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;">//&#39;function&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">z</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> obj</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;">//true</span></span>
<span class="line"><span style="color:#A6ACCD;">  obj</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hasOwnProperty</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">z</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;">//false</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">z</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">z</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;">//5</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">z</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> obj</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;">//true</span></span>
<span class="line"><span style="color:#A6ACCD;">  obj</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hasOwnProperty</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">z</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;">//true</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">foo</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">z</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;">//3</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p><strong>代码简单分析</strong></p><p>上面一段代码，声明第一个函数Fun的时候，它就会带一个Fun.prototype的属性，这个属性是一个对象属性，用new Fun();构造器的方式构造一个新的对象obj。这时候这个obj的原型会指向Fun的prototype属性。 对于这个Fun函数的原型也会指向Object.prototype,这个Object.prototype也是有原型的，它的原型指向null。</p><ul><li>对象的 hasOwnProperty() 来检查对象自身中是否含有该属性</li><li>使用 in 检查对象中是否含有某个属性时，如果对象中没有但是原型链中有，也会返回 true</li></ul><p><strong>代码对象原型链图:</strong></p><p><img src="https://imgvip.meishubao.com/msb_global/img/js_prototype_01.png" alt=""></p><p><strong>对象访问属性顺序</strong></p><p>对象访问属性的顺序，是采用向上查找，如果当前对象没有，它会一直向上原型链中查找，一直找到null，如果还没有会返回undefind。</p><p><strong>对象中值修改说明</strong></p><p>代码中修改obj.z的值后，再次输出obj.z的时候是5,foo.prototype.z是3，说明我们在修改或添加对象的属性的时候，只是修改了对象本身obj.prototype.z中的值，而原型链中foo.prototype.z的值并不会修改。</p><p><strong>in，hasOwnProperty等方法的出现</strong></p><p>首先查看整个原型链，会想这两个方法是怎么来的，在foo的的proto指向上一级Object.prototype的时候，就可以访问Object中的一些函数和属性了，其中就包括这两个方法。</p><p>第一次调用</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">z</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> obj</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;">//true  </span></span>
<span class="line"><span style="color:#A6ACCD;">obj</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hasOwnProperty</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">z</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;">//false</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>表示的是z并不是obj这个对象上的，而是对象的原型链上的。</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">z</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> obj</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;">//true</span></span>
<span class="line"><span style="color:#A6ACCD;">  obj</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hasOwnProperty</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">z</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;">//true</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">foo</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">z</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;">//3</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>第二次修改了obj.z的值，z就是obj这个对象上的了，但是也并没有修改原型链中的z的值。</p><p><strong>特殊说明</strong></p><p>_proto_是每一个对象都有的属性，它的指向会有一个特殊说明，大多数情况下 _proto_指向了<strong>产生当前对象的构造函数的原型对象</strong>，也就是那个 prototype。但是会有特殊的情况</p><ul><li>特殊情况</li></ul><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> a</span><span style="color:#89DDFF;">={};</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> b</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">create</span><span style="color:#A6ACCD;">(a)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>object.create是创建了一个空对象，空对象的原型指向a，a也是空对象，这其中不存在prototype;Object.create在继承中也常被使用，创建一个空对象指向()内的对象，这这样实现了b继承a，也不会篡改a中的内容，在这里就不具体说明了。</p><p>原理图分析 <img src="https://imgvip.meishubao.com/msb_global/img/js_prototype_02.png" alt=""></p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-hidden="true">#</a></h2><p>proto是任何对象都有的属性，在js中会形成一条proto连起来的链条，递归访问proto必须最终到头，并且值是null。 <img src="https://imgvip.meishubao.com/msb_global/img/js_prototype_03.png" alt=""></p>`,32),e=[o];function r(t,c,y,D,i,F){return a(),n("div",null,e)}const b=s(l,[["render",r]]);export{A as __pageData,b as default};
