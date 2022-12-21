import{_ as s}from"./chunks/npx_npm_02.c975b85e.js";import{_ as n,c as a,o as l,a as e}from"./app.0f29970b.js";const y=JSON.parse('{"title":"Shell","description":"","frontmatter":{},"headers":[{"level":2,"title":"含义","slug":"含义","link":"#含义","children":[]},{"level":2,"title":"分类","slug":"分类","link":"#分类","children":[]},{"level":2,"title":"Bash","slug":"bash","link":"#bash","children":[{"level":3,"title":"命令行环境","slug":"命令行环境","link":"#命令行环境","children":[]},{"level":3,"title":"基本语法","slug":"基本语法","link":"#基本语法","children":[]},{"level":3,"title":"快捷键","slug":"快捷键","link":"#快捷键","children":[]},{"level":3,"title":"模式扩展","slug":"模式扩展","link":"#模式扩展","children":[]},{"level":3,"title":"变量","slug":"变量","link":"#变量","children":[]},{"level":3,"title":"Here 文档","slug":"here-文档","link":"#here-文档","children":[]},{"level":3,"title":"脚本","slug":"脚本","link":"#脚本","children":[]}]},{"level":2,"title":"cmd.exe","slug":"cmd-exe","link":"#cmd-exe","children":[]}],"relativePath":"front-end/linux/shell_script.md"}'),p={name:"front-end/linux/shell_script.md"},r=e(`<h1 id="shell" tabindex="-1">Shell <a class="header-anchor" href="#shell" aria-hidden="true">#</a></h1><h2 id="含义" tabindex="-1">含义 <a class="header-anchor" href="#含义" aria-hidden="true">#</a></h2><ul><li>Shell 是一个程序，提供一个与用户对话的环境。这个环境只有一个命令提示符，让用户从键盘输入命令，所以又称为命令行环境（commandline，简写为 CLI）。Shell 接收到用户输入的命令，将命令送入操作系统执行，并将结果返回给用户</li><li>Shell 是一个命令解释器，解释用户输入的命令。它支持变量、条件判断、循环操作等语法，所以用户可以用 Shell 命令写出各种小程序，又称为脚本（script）。这些脚本都通过 Shell 的解释执行，而不通过编译</li><li>Shell 是一个工具箱，提供了各种小工具，供用户方便地使用操作系统的功能</li><li>在排序算法中，Shell 是希尔排序的名称。</li></ul><h2 id="分类" tabindex="-1">分类 <a class="header-anchor" href="#分类" aria-hidden="true">#</a></h2><p>不同系统有不同的 shell</p><ul><li>Bourne Shell（sh）</li><li><strong>Bourne Again shell（bash）</strong> <a href="https://wangdoc.com/bash/intro.html" target="_blank" rel="noreferrer">Bash 脚本教程</a></li><li>C Shell（csh）</li><li>TENEX C Shell（tcsh）</li><li>Korn shell（ksh）</li><li>Z Shell（zsh）</li><li>Friendly Interactive Shell（fish）</li></ul><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># 查看当前运行的 Shell</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ </span><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">SHELL</span></span>
<span class="line"><span style="color:#A6ACCD;">MacOS: /bin/zsh</span></span>
<span class="line"><span style="color:#A6ACCD;">Linux: /bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 查看当前的 Linux 系统安装的所有 Shell</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ cat /etc/shells</span></span>
<span class="line"><span style="color:#A6ACCD;">/bin/bash</span></span>
<span class="line"><span style="color:#A6ACCD;">/bin/csh</span></span>
<span class="line"><span style="color:#A6ACCD;">/bin/ksh</span></span>
<span class="line"><span style="color:#A6ACCD;">/bin/sh</span></span>
<span class="line"><span style="color:#A6ACCD;">/bin/tcsh</span></span>
<span class="line"><span style="color:#A6ACCD;">/bin/zsh</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="bash" tabindex="-1">Bash <a class="header-anchor" href="#bash" aria-hidden="true">#</a></h2><p>Bash 是目前最常用的 Shell。在 linux 系统中，通常是 Bash。<code>/bin/zsh</code> Z Shell 是 Bash 扩展，带有数量庞大的改进。</p><p>Bash，Unix shell 的一种，在 1987 年由布莱恩·福克斯为了 GNU 计划而编写。其能运行于大多数 Unix 系统的操作系统之上，包括 Linux 和 Mac OS 都将他作为默认 shell。</p><blockquote><p>GNU 计划（英语：GNU Project）：目标是创建一套完全自由的操作系统，称为 GNU。附带一份《GNU 宣言》等解释为何发起该计划的文章，其中一个理由就是要“重现当年软件界合作互助的团结精神”。 在一般的 linux 系统当中（如 redhat），使用 sh 调用执行脚本相当于打开了 bash 的 POSIX 标准模式</p></blockquote><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ ll -h /bin/sh</span></span>
<span class="line"><span style="color:#A6ACCD;">lrwxrwxrwx. 1 root root 4 10 月 19 2018 /bin/sh -</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> bash</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="命令行环境" tabindex="-1">命令行环境 <a class="header-anchor" href="#命令行环境" aria-hidden="true">#</a></h3><p>终端模拟器，一个模拟命令行窗口的程序，让用户在一个窗口中使用命令行环境，并且提供各种附加功能，比如调整颜色、字体大小、行距等等。</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># 启动 Bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 退出 Bash 环境（也可以同时按下 Ctrl + d）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ </span><span style="color:#82AAFF;">exit</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="基本语法" tabindex="-1">基本语法 <a class="header-anchor" href="#基本语法" aria-hidden="true">#</a></h3><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#82AAFF;">command</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;"> arg1 ... </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;"> argN </span><span style="color:#89DDFF;">]]</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul><li>使用空格（或 Tab 键）区分不同的参数</li><li>分号（;）是命令的结束符，使得一行可以放置多个命令</li><li><code>Command1 &amp;&amp; Command2</code> 如果 <code>Command1</code> 命令运行成功，则继续运行 <code>Command2</code> 命令</li><li><code>Command1 || Command2</code> 如果 <code>Command1</code> 命令运行失败，则继续运行 <code>Command2</code> 命令</li><li></li></ul><p>echo：在屏幕输出一行文本，可以将该命令的参数原样输出</p><ul><li>-n：可以取消末尾的回车符，使得下一个提示符紧跟在输出内容的后面</li><li>-e：会解释引号（双引号和单引号）里面的特殊字符（比如换行符\\n）；否则原样输出</li><li></li></ul><h3 id="快捷键" tabindex="-1">快捷键 <a class="header-anchor" href="#快捷键" aria-hidden="true">#</a></h3><ul><li>Ctrl + L：清除屏幕并将当前行移到页面顶部。</li><li>Ctrl + C：中止当前正在执行的命令。</li><li>Shift + PageUp：向上滚动。</li><li>Shift + PageDown：向下滚动。</li><li>Ctrl + U：从光标位置删除到行首。</li><li>Ctrl + K：从光标位置删除到行尾。</li><li>Ctrl + D：关闭 Shell 会话。</li><li>↑，↓：浏览已执行命令的历史记录。</li></ul><h3 id="模式扩展" tabindex="-1">模式扩展 <a class="header-anchor" href="#模式扩展" aria-hidden="true">#</a></h3><p>模式扩展与正则表达式的关系是，模式扩展早于正则表达式出现，可以看作是原始的正则表达式。它的功能没有正则那么强大灵活，但是优点是简单和方便</p><p><img src="`+s+`" alt="npx_npm_02"></p><h3 id="变量" tabindex="-1">变量 <a class="header-anchor" href="#变量" aria-hidden="true">#</a></h3><p>环境变量是 Bash 环境自带的变量，进入 Shell 时已经定义好了，可以直接使用</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># 示所有环境变量</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ env</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol><li>Bash 变量名区分大小写，HOME 和 home 是两个不同的变量</li><li>Bash 没有数据类型的概念，所有的变量值都是字符串</li></ol><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># 创建变量</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ myvar=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">hello world</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 读取变量</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ </span><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">myvar</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 删除变量</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ </span><span style="color:#82AAFF;">unset</span><span style="color:#A6ACCD;"> myvar</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 输出变量</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ </span><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> myvar=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">hello world</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><code>declare</code> 声明一些特殊类型的变量，比如声明只读类型的变量和整数类型的变量</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ </span><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> -i val1=12</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="3"><li>子 Shell 如果修改继承的变量，不会影响父 Shell</li></ol><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># 输出变量 $foo</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ </span><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> foo=bar</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 新建子 Shell</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 读取 $foo</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ </span><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">foo</span></span>
<span class="line"><span style="color:#A6ACCD;">bar</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 修改继承的变量</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ foo=baz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 退出子 Shell</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ </span><span style="color:#82AAFF;">exit</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 读取 $foo</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ </span><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">foo</span></span>
<span class="line"><span style="color:#A6ACCD;">bar</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h3 id="here-文档" tabindex="-1">Here 文档 <a class="header-anchor" href="#here-文档" aria-hidden="true">#</a></h3><p>Here 文档（here document）是一种输入多行字符串的方法，格式如下。</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">token</span></span>
<span class="line"><span style="color:#C3E88D;">text</span></span>
<span class="line"><span style="color:#89DDFF;">token</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>它的格式分成开始标记（<code>&lt;&lt; token</code>）和结束标记（<code>token</code>）。开始标记是两个小于号 + Here 文档的名称，名称可以随意取，后面必须是一个换行符；结束标记是单独一行顶格写的 Here 文档名称，如果不是顶格，结束标记不起作用。两者之间就是多行字符串的内容。</p><h3 id="脚本" tabindex="-1">脚本 <a class="header-anchor" href="#脚本" aria-hidden="true">#</a></h3><h4 id="shebang-行" tabindex="-1">Shebang 行 <a class="header-anchor" href="#shebang-行" aria-hidden="true">#</a></h4><p>脚本的第一行通常是指定解释器，即这个脚本必须通过什么解释器执行。这一行以#!字符开头，这个字符称为 Shebang，所以这一行就叫做 Shebang 行。</p><p><code>#!</code> 后面就是脚本解释器的位置，Bash 脚本的解释器一般是 <code>/bin/sh</code> 或 <code>/bin/bash</code>。</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">#!/bin/sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 或者</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">#!/bin/bash</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><code>#!</code> 与脚本解释器之间有没有空格，都是可以的。</p><p>如果 Bash 解释器不放在目录 <code>/bin</code>，脚本就无法执行了。为了保险，可以写成下面这样：</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">#!/usr/bin/env bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># node 脚本</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">#!/usr/bin/env node</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><code>#!/usr/bin/env NAME</code> 这个语法的意思是，让 Shell 查找 <code>$PATH</code> 环境变量里面第一个匹配的 NAME。如果你不知道某个命令的具体路径，或者希望兼容其他用户的机器，这样的写法就很有用。</p><h4 id="执行权限和路径" tabindex="-1">执行权限和路径 <a class="header-anchor" href="#执行权限和路径" aria-hidden="true">#</a></h4><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># 给所有用户读权限和执行权限</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ chmod 755 script.sh</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>一般需要指定脚本的路径（比如 <code>path/script.sh</code>）。如果将脚本放在环境变量<code>$PATH</code> 指定的目录中，就不需要指定路径了。因为 <code>Bash</code> 会自动到这些目录中，寻找是否存在同名的可执行文件。</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># ~/.bashrc 或 ~/.bash_profile</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 在 ~/.bin 目录下不需要再加 path</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ </span><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> PATH=</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">PATH:</span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/bin</span></span>
<span class="line"><span style="color:#A6ACCD;">$ </span><span style="color:#82AAFF;">source</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/.bash_profile</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="脚本参数" tabindex="-1">脚本参数 <a class="header-anchor" href="#脚本参数" aria-hidden="true">#</a></h4><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ script.sh word1 word2 word3</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>脚本文件内部，可以使用特殊变量，引用这些参数。</p><ul><li><code>$0</code>：脚本文件名，即 <code>script.sh</code>。</li><li><code>$1~$9</code>：对应脚本的第一个参数到第九个参数。</li><li><code>$#</code>：参数的总数。</li><li><code>$@</code>：全部的参数，参数之间使用空格分隔。</li><li><code>$*</code>：全部的参数，参数之间使用变量 <code>$IFS</code> 值的第一个字符分隔，默认为空格，但是可以自定义。</li></ul><h4 id="脚本错误处理" tabindex="-1">脚本错误处理 <a class="header-anchor" href="#脚本错误处理" aria-hidden="true">#</a></h4><p>如果脚本里面有运行失败的命令（返回值非 0），Bash 默认会继续执行后面的命令（只是显示有错误，并没有终止执行）。</p><p>这种行为很不利于脚本安全和除错。实际开发中，如果某个命令失败，往往需要脚本停止执行，防止错误累积。这时，一般采用下面的写法。</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ </span><span style="color:#82AAFF;">command</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">||</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">exit</span><span style="color:#A6ACCD;"> 1</span></span>
<span class="line"><span style="color:#A6ACCD;">$ </span><span style="color:#82AAFF;">command</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">||</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">command failed</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">exit</span><span style="color:#A6ACCD;"> 1</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="set-命令" tabindex="-1">set 命令 <a class="header-anchor" href="#set-命令" aria-hidden="true">#</a></h4><p><a href="https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html" target="_blank" rel="noreferrer">set 可以控制脚本的安全性和可维护性。</a></p><p>Bash 执行脚本的时候（包括上述讲述的 <code>npm run script</code>），会创建一个新的 Shell（这个 Shell 就是脚本的执行环境，Bash 默认给定了这个环境的各种参数）set 命令用来修改 Shell 环境的运行参数，也就是可以定制环境</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">#!/usr/bin/env bash</span></span>
<span class="line"><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> -euxo</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li><code>set -u</code>：遇到不存在的变量就会报错，并停止执行（默认忽略跳过）</li><li><code>set -x</code>：在运行结果之前，先输出执行的那一行命令（默认情况下，脚本执行后，屏幕只显示运行结果，没有其他内容）</li><li><code>set -e</code>：使得脚本只要发生错误，就终止执行（彻底解决上述「错误处理」；不适用于管道命令）</li><li><code>set -o</code>：只要一个子命令失败，整个管道命令就失败，脚本就会终止执行</li></ul><h4 id="其他" tabindex="-1">其他 <a class="header-anchor" href="#其他" aria-hidden="true">#</a></h4><ul><li>read [-options][variable...]：脚本需要在执行过程中，由用户提供一部分数据，这时可以使用 read 命令；它将用户的输入存入一个变量，方便后面的代码使用。用户按下回车键，就表示输入结束</li><li>if commands; then commands</li><li>循环</li></ul><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">while</span><span style="color:#A6ACCD;"> condition</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">do</span></span>
<span class="line"><span style="color:#A6ACCD;">commands</span></span>
<span class="line"><span style="color:#89DDFF;">done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># for...in</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">for</span><span style="color:#A6ACCD;"> variable </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> list</span></span>
<span class="line"><span style="color:#89DDFF;">do</span></span>
<span class="line"><span style="color:#A6ACCD;">commands</span></span>
<span class="line"><span style="color:#89DDFF;">done</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="cmd-exe" tabindex="-1">cmd.exe <a class="header-anchor" href="#cmd-exe" aria-hidden="true">#</a></h2><p>cmd.exe 是微软 Windows 系统的命令处理程序。命令提示符为用户提供了一个命令行界面，该功能通过 Win32 控制台实现。用户可通过命令行运行程序和批处理文件，从而进行系统管理等。此外，命令提示符还支持管道和重定向功能。</p><p>Windows 上的旧命令行工具 cmd.exe 处于维护模式，PowerShell 则代表着未来。</p><p>PowerShell 是一个 Windows 任务自动化的框架，它由一个命令行 shell 和内置在这个 .NET 框架上的编程语言组成，可以利用 .NET Framework 的强大功能。</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ .\\node_modules\\.bin\\webpack</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div>`,72),c=[r];function i(o,t,d,b,h,u){return l(),a("div",null,c)}const A=n(p,[["render",i]]);export{y as __pageData,A as default};
