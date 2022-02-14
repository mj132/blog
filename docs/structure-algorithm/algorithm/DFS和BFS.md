## 广度优先搜索

广度优先搜索（`BFS`）是一种遍历或搜索数据结构（如树或图）的算法，也可以在更抽象的场景中使用。

它的特点是越是接近根结点的结点将越早地遍历。

例如，我们可以使用 `BFS` 找到从起始结点到目标结点的路径，特别是最短路径。

在`BFS`中，结点的处理顺序与它们添加到队列的顺序是完全相同的顺序，即先进先出，所以广度优先搜索一般使用队列实现。

- [单词接龙](https://leetcode-cn.com/problems/word-ladder/)
- [员工的重要性](https://leetcode-cn.com/problems/employee-importance/)
- [岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)

### 不分行从上到下打印二叉树

从上往下打印出二叉树的每个节点，同层节点从左至右打印。

#### 思路

- 在打印第一行时，将左孩子节点和右孩子节点存入一个队列里
- 队列元素出队列打印，同时分别将左孩子节点和右孩子节点存入队列
- 这样打印二叉树的顺序就是每行从左到右打印

#### 代码

```js
function PrintFromTopToBottom(root) {
  const result = []
  const queue = []
  if (root) {
    queue.push(root)
    while (queue.length > 0) {
      const current = queue.shift()
      if (current.left) {
        queue.push(current.left)
      }
      if (current.right) {
        queue.push(current.right)
      }
      result.push(current.val)
    }
  }
  return result
}
```

### 把二叉树从上到下打印成多行

从上到下按层打印二叉树，同一层结点从左至右输出。每一层输出一行。

#### 思路

- 使用一个队列存储当前层遍历的节点
- 使用两个变量来标记当前遍历的状态
- currentNums：当前层剩余的节点数
- childNums：孩子节点数
- 当前层遍历完成后开始遍历孩子节点，currentNums 赋值为 childNums，childNums 赋值为 0，

#### 代码

```js
function Print(root) {
  const result = []
  const queue = []
  let tempArr = []
  let currentNums = 1
  let childNums = 0
  if (root) {
    queue.push(root)
    while (queue.length > 0) {
      const current = queue.shift()
      if (current.left) {
        queue.push(current.left)
        childNums++
      }
      if (current.right) {
        queue.push(current.right)
        childNums++
      }
      tempArr.push(current.val)
      currentNums--
      if (currentNums === 0) {
        currentNums = childNums
        childNums = 0
        result.push(tempArr)
        tempArr = []
      }
    }
  }
  return result
}
```

## 深度优先搜索

和广度优先搜索一样，深度优先搜索（`DFS`）是用于在树/图中遍历/搜索的一种重要算法。

与 `BFS` 不同，更早访问的结点可能不是更靠近根结点的结点。因此，你在`DFS` 中找到的第一条路径可能不是最短路径。

![](https://i.loli.net/2019/08/19/uNAkPfLY9HRjVQU.png)

在`DFS`中，结点的处理顺序是完全相反的顺序，就像它们被添加到栈中一样，它是后进先出。所以深度优先搜索一般使用栈实现。

- [路径总和](https://leetcode-cn.com/problems/path-sum/)
- [课程表](https://leetcode-cn.com/problems/course-schedule/)
- [岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)

### 二叉树的中序遍历

给定一个二叉树，返回它的 中序 遍历。

示例:

```js
输入: [1, null, 2, 3]
  1
   \
    2
   / 
  3
输出: [1, 3, 2]
```

进阶: 递归算法很简单，你可以通过迭代算法完成吗？

#### 代码

递归实现

```js
var inorderTraversal = function(root, array = []) {
  if (root) {
    inorderTraversal(root.left, array)
    array.push(root.val)
    inorderTraversal(root.right, array)
  }
  return array
}
```

非递归实现

- 取根节点为目标节点，开始遍历
- 1.左孩子入栈 -> 直至左孩子为空的节点
- 2.节点出栈 -> 访问该节点
- 3.以右孩子为目标节点，再依次执行 1、2、3

```js
var inorderTraversal = function(root) {
  const result = []
  const stack = []
  let current = root
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current)
      current = current.left
    }
    current = stack.pop()
    result.push(current.val)
    current = current.right
  }
  return result
}
```

### 二叉树的最大深度

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：

给定二叉树 `[3,9,20,null,null,15,7]`，

```
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最大深度 3 。

#### 思路

- 深度优先遍历 + 分治
- 一棵二叉树的最大深度等于左子树深度和右子树最大深度的最大值 + 1

#### 代码

```js
function TreeDepth(pRoot) {
  return !pRoot ? 0 : Math.max(TreeDepth(pRoot.left), TreeDepth(pRoot.right)) + 1
}
```
