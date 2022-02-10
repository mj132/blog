## React、Vue2、Vue3 的三种 Diff 算法

## 前言

本文将讨论三种 diff 算法，下面的 diff 算法中会出现几个方法，在这里进行罗列，并说明其功能

- mount(vnode, parent, [refNode]): 通过 vnode 生成真实的 DOM 节点。parent 为其父级的真实 DOM 节点，refNode 为真实的 DOM 节点，其父级节点为 parent。如果 refNode 不为空，vnode 生成的 DOM 节点就会插入到 refNode 之前；如果 refNode 为空，那么 vnode 生成的 DOM 节点就作为最后一个子节点插入到 parent 中

- patch(prevNode, nextNode, parent): 可以简单的理解为给当前 DOM 节点进行更新，并且调用 diff 算法对比自身的子节点

## React-Diff

React 的思路是递增法。通过对比新的列表中的节点，在原本的列表中的位置是否是递增，来判断当前节点是否需要移动。

### 实现原理

来看这样一个例子。

|  index   |  0  |  1  |  2  |  3  |
| :------: | :-: | :-: | :-: | :-: |
| prevList |  1  |  2  |  3  |  4  |
| nextList |  1  |  2  |  3  |  4  |

`nextList` 为新的列表，`prevList` 为旧列表。这个例子我们一眼能看出来，新列表是不需要进行移动的。下面我用 react 的递增思想，解释一下为什么新列表中的节点不需要移动。
我们首先遍历 `nextList`，并且找到每一个节点，在 `prevList` 中的位置。

```js
function foo(prevList, nextList) {
  for (let i = 0; i < nextList.length; i++) {
    let nextItem = nextList[i]
    for (let j = 0; j < prevList.length; j++) {
      let prevItem = prevList[j]
      if (nextItem === prevItem) {
      }
    }
  }
}
```

找到位置以后，与上一个节点的位置进行对比，如果当前的位置大于上一个位置，说明当前节点不需要移动。因此我们要定义一个 `lastIndex` 来记录上一个节点的位置。

```js
function foo(prevList, nextList) {
  let lastIndex = 0
  for (let i = 0; i < nextList.length; i++) {
    let nextItem = nextList[i]
    for (let j = 0; j < prevList.length; j++) {
      let prevItem = prevList[j]
      if (nextItem === prevItem) {
        if (j < lastIndex) {
          // 需要移动节点
        } else {
          // 不需要移动节点，记录当前位置，与之后的节点进行对比
          lastIndex = j
        }
      }
    }
  }
}
```

在上面的例子中，`nextList` 每个节点在 `prevList` 的位置为 0 1 2 3。每一项都要比前一项要大，所以不需要移动，这就是 `react` 的 `diff` 算法的原理。

### 找到需要移动的节点

在上一小节中，我们是通过对比值是否相等，查找的对应位置。但是在 vdom 中，每一个节点都是一个 vNode，我们应该如何进行判断呢？

答案就是 `key`，我们通过对每个节点的 `key` 进行赋值，并且让处于同一 `children` 数组下的`vnode`的`key`都不相同，以此来确定每个节点的唯一性，并进行新旧列表的对比。

```js
function reactDiff(prevChildren, nextChildren, parent) {
  let lastIndex = 0
  for (let i = 0; i < nextChildren.length; i++) {
    let nextChild = nextChildren[i]
    for (let j = 0; j < prevChildren.length; j++) {
      let prevChild = prevChildren[j]
      if (nextChild.key === prevChild.key) {
        patch(prevChild, nextChild, parent)
        if (j < lastIndex) {
          // 需要移动节点
        } else {
          // 不需要移动节点，记录当前位置，与之后的节点进行对比
          lastIndex = j
        }
      }
    }
  }
}
```

### 移动节点

首先我们先明确一点，移动节点所指的节点是`DOM`节点。`vnode.el`指向该节点对应的真实`DOM`节点。`patch`方法会将更新过后的`DOM`节点，赋值给新的`vnode`的`el`属性。

> 为了画图方便，我们用`key`的值来表示`vnode`节点。为了行文方便，我们把`key`值为`a`的`vnode`简写为`vnode-a`，`vnode-a`对应的真实 DOM 节点为`DOM-A`

|   DOM    |  A  |  B  |  C  |  D  |
| :------: | :-: | :-: | :-: | :-: |
| prevList |  a  |  b  |  c  |  d  |
| nextList |  a  |  c  |  d  |  b  |

我们来将上图的例子代入`reactDiff`中执行。我们遍历新列表，并查找`vnode`在旧列表中的位置。当遍历到`vnode-d`时，之前遍历在旧列表的位置为`0 < 2 < 3`，说明`A C D`这三个节点都是不需要移动的。此时`lastIndex = 3`, 并进入下一次循环，发现`vnode-b`在旧列表的`index`为`1`，`1 < 3`，说明`DOM-B`要移动。

通过观察我们能发现，只需要把`DOM-B`移动到`DOM-D`之后就可以了。也就是找到需要移动的`VNode`，我们称该`VNode`为`α`，将`α`对应的真实的`DOM`节点移动到，`α`在新列表中的前一个`VNode`对应的真实 DOM 的后面。

在上述的例子中，就是将`vnode-b`对应的真实 DOM 节点`DOM-B`, 移动到`vnode-b`在新列表中的前一个`VNode——vnode-d`对应的真实 DOM 节点`DOM-D`的后面。

```js
function reactDiff(prevChildren, nextChildren, parent) {
  let lastIndex = 0
  for (let i = 0; i < nextChildren.length; i++) {
    let nextChild = nextChildren[i]
    for (let j = 0; j < prevChildren.length; j++) {
      let prevChild = prevChildren[j]
      if (nextChild.key === prevChild.key) {
        patch(prevChild, nextChild, parent)
        if (j < lastIndex) {
          // 移动到前一个节点的后面
          let refNode = nextChildren[i - 1].el.nextSibling
          parent.insertBefore(nextChild.el, refNode)
        } else {
          // 不需要移动节点，记录当前位置，与之后的节点进行对比
          lastIndex = j
        }
      }
    }
  }
}
```

为什么是这样移动的呢？首先我们列表是`从头到尾`遍历的。这就意味着对于当前`VNode`节点来说，该节点之前的所有节点都是排好序的，如果该节点需要移动，那么只需要将 DOM 节点移动到前一个`vnode`节点之后就可以，因为在新列表中`vnode`的顺序就是这样的。

### 添加节点

上一小节我们只讲了如何移动节点，但是忽略了另外一种情况，就是在新列表中有全新的`VNode`节点，在旧列表中找不到。遇到这种情况，我们需要根据新的`VNode`节点生成 DOM 节点，并插入 DOM 树中。

至此，我们面临两个问题：

1. 如何发现全新的节点
2. 生成的 DOM 节点插入到哪里

|   DOM    |  A  |  B  |     |  D  |
| :------: | :-: | :-: | :-: | :-: |
| prevList |  a  |  b  |     |  d  |
| nextList |  a  |  b  |  c  |  d  |

我们先来解决第一个问题，找节点还是比较简单的，我们定义一个`find`变量值为`false`。如果在旧列表找到了`key`相同的`vnode`，就将`find`的值改为`true`。当遍历结束后判断`find`值，如果为`false`，说明当前节点为新节点。

```js
function reactDiff(prevChildren, nextChildren, parent) {
  let lastIndex = 0
  for (let i = 0; i < nextChildren.length; i++) {
    let nextChild = nextChildren[i],
      find = false
    for (let j = 0; j < prevChildren.length; j++) {
      let prevChild = prevChildren[j]
      if (nextChild.key === prevChild.key) {
        find = true
        patch(prevChild, nextChild, parent)
        if (j < lastIndex) {
          // 移动到前一个节点的后面
          let refNode = nextChildren[i - 1].el.nextSibling
          parent.insertBefore(nextChild.el, refNode)
        } else {
          // 不需要移动节点，记录当前位置，与之后的节点进行对比
          lastIndex = j
        }
        break
      }
    }
    if (!find) {
      // 插入新节点
    }
  }
}
```

找到新节点后，下一步就是插入到哪里了，这里的逻辑其实是和移动节点的逻辑是一样的。我们观察上图可以发现，新的`vnode-c`是紧跟在`vnode-b`后面的，并且`vnode-b`的 DOM 节点——`DOM-B`是已经排好序的，所以我们只需要将`vnode-c`生成的 DOM 节点插入到`DOM-B`之后就可以了。

但是这里有一种特殊情况需要注意，就是新的节点位于新列表的第一个，这时候我们需要找到旧列表第一个节点，将新节点插入到原来第一个节点之前就可以了。

```js
function reactDiff(prevChildren, nextChildren, parent) {
  let lastIndex = 0
  for (let i = 0; i < nextChildren.length; i++) {
    let nextChild = nextChildren[i],
      find = false
    for (let j = 0; j < prevChildren.length; j++) {
      let prevChild = prevChildren[j]
      if (nextChild.key === prevChild.key) {
        find = true
        patch(prevChild, nextChild, parent)
        if (j < lastIndex) {
          // 移动到前一个节点的后面
          let refNode = nextChildren[i - 1].el.nextSibling
          parent.insertBefore(nextChild.el, refNode)
        } else {
          // 不需要移动节点，记录当前位置，与之后的节点进行对比
          lastIndex = j
        }
        break
      }
    }
    if (!find) {
      // 插入新节点
      let refNode = i <= 0 ? prevChildren[0].el : nextChildren[i - 1].el.nextSibling
      mount(nextChild, parent, refNode)
    }
  }
}
```

### 移除节点

有增就有减，当旧的节点不在新列表中时，我们就将其对应的 DOM 节点移除。

|   DOM    |  A  |  B  |  C  |  D  |
| :------: | :-: | :-: | :-: | :-: |
| prevList |  a  |  b  |  c  |  d  |
| nextList |  a  |  b  |     |  d  |

```js
function reactDiff(prevChildren, nextChildren, parent) {
  let lastIndex = 0
  for (let i = 0; i < nextChildren.length; i++) {
    let nextChild = nextChildren[i],
      find = false
    for (let j = 0; j < prevChildren.length; j++) {
      let prevChild = prevChildren[j]
      if (nextChild.key === prevChild.key) {
        find = true
        patch(prevChild, nextChild, parent)
        if (j < lastIndex) {
          // 移动到前一个节点的后面
          let refNode = nextChildren[i - 1].el.nextSibling
          parent.insertBefore(nextChild.el, refNode)
        } else {
          // 不需要移动节点，记录当前位置，与之后的节点进行对比
          lastIndex = j
        }
        break
      }
    }
    if (!find) {
      // 插入新节点
      let refNode = i <= 0 ? prevChildren[0].el : nextChildren[i - 1].el.nextSibling
      mount(nextChild, parent, refNode)
    }
  }
  for (let i = 0; i < prevChildren.length; i++) {
    let prevChild = prevChildren[i],
      key = prevChild.key,
      has = nextChildren.find((item) => item.key === key)
    if (!has) parent.removeChild(prevChild.el)
  }
}
```

### 优化与不足

以上就是`React`的`diff`算法的思路。
目前的`reactDiff`的时间复杂度为`O(m*n)`，我们可以用空间换时间，把`key`与`index`的关系维护成一个`Map`，从而将时间复杂度降低为`O(n)`。

我们接下来看这样一个例子

|  index   |  0  |  1  |  2  |
| :------: | :-: | :-: | :-: |
| prevList |  A  |  B  |  C  |
| nextList |  C  |  A  |  B  |

根据`reactDiff`的思路，我们需要先将`DOM-A`移动到`DOM-C`之后，然后再将`DOM-B`移动到`DOM-A`之后，完成`Diff`。但是我们通过观察可以发现，只要将`DOM-C`移动到`DOM-A`之前就可以完成`Diff`。

这里是有可优化的空间的，接下来我们介绍`vue2.x`中的`diff`算法—— `双端比较`，该算法解决了上述的问题
