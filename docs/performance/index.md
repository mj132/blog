## 前端需要性能优化么？

性能优化一直以来都是前端工程领域中的一个重要部分。很多资料<sup>[1]</sup><sup>[2]</sup><sup>[3]</sup>表明，网站应用的性能（加载速度、交互流畅度）优化对于提高用户留存、转化率等都有积极影响。可以理解为，提升你的网站性能，就是提升你的业务数据（甚至是业务收入）。

性能优化广义上会包含前端优化和后端优化。后端优化的关注点更多的时候是在增加资源利用率、降低资源成本以及提高稳定性上。相较于后端，前端的性能优化会更直接与用户的体验挂钩。从用户体验侧来说，前端服务 5s 的加载时间优化缩减 80%(1s) 与后端服务 50ms 的响应优化缩减 80%(10ms) 相比，用户的体验提升会更大。因此很多时候，与体验相关的性能的瓶颈会出现在前端。

> 当然后端性能优化非常重要，正如上面所说，它们的关注点可能不同。前端类似于最后一公里，由于和用户最近，所以性能问题会直接影响到用户体验。这一系列文章关注点会放在“前端性能优化”上。

![waterfall](./img/waterfall.jpg)

## 如何学习前端性能优化？

在我和一些同学接触的过程中，发现作为前端工程师，大家其实都具备一定的性能优化意识，同时也有自己的优化“武器库”，例如懒加载、资源合并、避免 reflow 等等。虽然大家对性能优化都有自己的思路，不过大多是分散在某几个点，较难形成一个完整的体系。业界也有很多优质的资料，例如[雅虎的性能优化 35 条](https://github.com/creeperyang/blog/issues/1)<sup>[4]</sup>，但是**性能优化作为一个系统性工程**，大家想要系统性地去学习并不容易。

从用户开始来访问你的网站应用，到最终它在上面浏览信息、操作交互，其间经历了非常多的环节，每个环节都有可能出现性能问题，同时也是我们实现性能提升机会。所以，前端性能优化会要求你从整体维度来分析系统，甚至是业务。

那么如何能够更有效地梳理与理解性能优化呢？回想到每每面试都会被问到：“从地址栏输入XXX到访问之间经历了什么？”其实我们也可以从这个视角来看待性能优化。

从访问开始，用户可能会经历类似「查询缓存 -> 发送请求 -> 等待响应 -> 页面解析 -> 下载并处理各类静态资源 -> 运行时 -> 预加载（等待后续的请求）」这样一个不断往复的“旅程” —— 也就是我们的「性能优化之旅」。Web 应用在其中每一站都可能遇到性能问题，当然也会有对应的优化手段。

所以在这次的「性能优化之旅」会沿着这条路径具体介绍每个环节中常见的性能问题以及优化技术。通过与 Web 应用的访问流程相结合，帮助大家全面理解与掌握前端的性能优化。

如果准备好了，咱们就可以出发了 ——

[第一站 - 缓存 🔜](./cache.md)

## 旅途的行程路线

![overall](./img/overall.svg)

## 参考资料

1. [Driving user growth with performance improvements](https://medium.com/@Pinterest_Engineering/driving-user-growth-with-performance-improvements-cfc50dafadd7)
1. [How Fast Should A Website Load in 2019?](https://www.hobo-web.co.uk/your-website-design-should-load-in-4-seconds/)
1. [How long will you wait for a shopping website to load?](https://www.bbc.com/news/business-37100091)
1. [Best Practices for Speeding Up Your Web Site (Yahoo)](https://github.com/creeperyang/blog/issues/1)
1. [17 Things People Absolutely Hate About Your Website](https://blog.hubspot.com/blog/tabid/6307/bid/32307/15-things-people-absolutely-hate-about-your-website.aspx)
1. [Why Performance Matters](https://developers.google.com/web/fundamentals/performance/why-performance-matters/)
