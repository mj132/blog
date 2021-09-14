# 如何写优雅的 SQL 原生语句？

## 语句中各子句完整执行顺序概括（按照顺序号执行）

1. from (注:这里也包括 from 中的子语句)
2. join
3. on
4. where
5. group by(开始使用 select 中的别名，后面的语句中都可以使用)
6. avg,sum.... 等聚合函数
7. having
8. select
9. distinct
10. order by
11. limit

### 每个子句执行顺序分析

所有的 查询语句都是从 from 开始执行的，在执行过程中，每个步骤都会为下一个步骤生成一个虚拟表，这个虚拟表将作为下一个执行步骤的输入。

#### 1. from

form 是一次查询语句的开端。

- 如果是一张表，会直接操作这张表；
- 如果这个 from 后面是一个子查询，会先执行子查询中的内容，子查询的结果也就是第一个虚拟表 T1。（注意：子查询中的执行流程也是按照本篇文章讲的顺序哦）。
- 如果需要关联表，使用 join，请看 2，3

#### 2. join

如果 from 后面是多张表，join 关联，会首先对前两个表执行一个笛卡尔乘积，这时候就会生成第一个虚拟表 T1（注意：这里会选择相对小的表作为基础表）；

#### 3. on

对虚表 T1 进行 ON 筛选，只有那些符合`<join-condition>`的行才会被记录在虚表 T2 中。（注意，这里的这里如果还有第三个表与之关联，会用 T2 与第三个表进行笛卡尔乘积生产 T3 表，继续重复 3. on 步骤生成 T4 表，不过下面的顺序讲解暂时不针对这里的 T3 和 T4，只是从一个表关联查询 T2 继续说）

#### 4. where

对虚拟表 T2 进行 WHERE 条件过滤。只有符合`<where-condition>`的记录才会被插入到虚拟表 T3 中。

#### 5.group by

group by 子句将中的唯一的值组合成为一组，得到虚拟表 T4。如果应用了 group by，那么后面的所有步骤都只能操作 T4 的列或者是执行 6.聚合函数（count、sum、avg 等）。（注意：原因在于分组后最终的结果集中只包含每个组中的一行。谨记，不然这里会出现很多问题，下面的代码误区会特别说。）

#### 6. avg,sum.... 等聚合函数

聚合函数只是对分组的结果进行一些处理，拿到某些想要的聚合值，例如求和，统计数量等，并不生成虚拟表。

#### 7. having

应用 having 筛选器，生成 T5。HAVING 子句主要和 GROUP BY 子句配合使用，having 筛选器是第一个也是为唯一一个应用到已分组数据的筛选器。

#### 8. select

执行 select 操作，选择指定的列，插入到虚拟表 T6 中。

#### 9. distinct

对 T6 中的记录进行去重。移除相同的行，产生虚拟表 T7.（注意：事实上如果应用了 group by 子句那么 distinct 是多余的，原因同样在于，分组的时候是将列中唯一的值分成一组，同时只为每一组返回一行记录，那么所以的记录都将是不相同的。 ）

#### 10. order by

应用 order by 子句。按照 order_by_condition 排序 T7，此时返回的一个游标，而不是虚拟表。sql 是基于集合的理论的，集合不会预先对他的行排序，它只是成员的逻辑集合，成员的顺序是无关紧要的。对表进行排序的查询可以返回一个对象，这个对象包含特定的物理顺序的逻辑组织。这个对象就叫游标。

oder by 的几点说明

- 因为 order by 返回值是游标，那么使用 order by 子句查询不能应用于表表达式。
- order by 排序是很需要成本的，除非你必须要排序，否则最好不要指定 order by，
- order by 的两个参数 asc（升序排列） desc（降序排列）

#### 11. limit

取出指定行的记录，产生虚拟表 T9, 并将结果返回。

limit 后面的参数可以是 一个 limit m ，也可以是 limit m n，表示从第 m 条到第 n 条数据。

（注意：很多开发人员喜欢使用该语句来解决分页问题。对于小数据，使用 LIMIT 子句没有任何问题，当数据量非常大的时候，使用 LIMIT n, m 是非常低效的。因为 LIMIT 的机制是每次都是从头开始扫描，如果需要从第 60 万行开始，读取 3 条数据，就需要先扫描定位到 60 万行，然后再进行读取，而扫描的过程是一个非常低效的过程。所以，对于大数据处理时，是非常有必要在应用层建立一定的缓存机制）

## 开发某需求写的一段 sql

```sql
SELECT `userspk`.`avatar` AS `user_avatar`,
`a`.`user_id`,
`a`.`answer_record`,
 MAX(`score`) AS `score`
FROM (select * from pkrecord  order by score desc) as a
INNER JOIN `userspk` AS `userspk`
ON `a`.`user_id` = `userspk`.`user_id`
WHERE `a`.`status` = 1
AND `a`.`user_id` != 'm_6da5d9e0-4629-11e9-b5f7-694ced396953'
GROUP BY `user_id`
ORDER BY `a`.`score` DESC
LIMIT 9;
```

查询结果：

![sql_01](https://imgvip.meishubao.com/msb_global/img/sql_01.png)

- 先简要说一下我要查询的内容：

想要查询 pk 记录表中分数最高的 9 个用户记录和他们的头像。

- 通过这段 sql 实际想一遍 sql 各字句的执行顺序

pk 记录表的数据结构设计，每个用户每天每个馆下可能会有多条记录，所以需要进行分组，并且**查询结果只想拿到每个分组内最高的那条记录**。

这段 sql 的一些说明：

1. 可能有些同学会认为子查询没有必要，直接查询 pk 记录表就可以，但是并不能拿到预期的结果，因为**分组后的每个组结果是不进行排序的**，而且 max 拿到的最高分数肯定是对应的该分组下最高分数，但是其它记录可能就不是最高分数对应的那条记录。所以子查询非常有必要，**它能够对原始的数据首先进行排序**，分数最高的那条就是第一条对应的第一条记录。

看一下代码和执行结果与带有子查询的进行比较，就能理解我上面说的一段话：

```sql
-- 不使用子查询
SELECT `userspk`.`avatar` AS `user_avatar`,
`pkrecord`.`user_id`,
`pkrecord`.`answer_record`,
`pkrecord`.`id`,
 MAX(`score`) AS `score`
FROM pkrecord
INNER JOIN `userspk` AS `userspk`
ON `pkrecord`.`user_id` = `userspk`.`user_id`
WHERE `pkrecord`.`status` = 1
AND `pkrecord`.`user_id` != 'm_6da5d9e0-4629-11e9-b5f7-694ced396953'
GROUP BY `user_id`
ORDER BY `pkrecord`.`score` DESC
LIMIT 9;
```

查询结果

![](https://imgvip.meishubao.com/msb_global/img/sql_02.png)

2. 在子查询中对数据已经进行排序后，外层排序方式如果和子查询排序分数相同，都是分数倒序，外层的排序可以去掉，没有必要写两遍。

## sql 语句中的别名

#### 别名在哪些情况使用

在 SQL 语句中，可以为表名称及字段（列）名称指定别名

- 表名称指定别名

同时查询两张表的数据的时候：

未设置别名前：

```sql
SELECT article.title,article.content,user.username FROM article, user

WHERE article.aid=1 AND article.uid=user.uid
```

设置别名后：

```sql
SELECT a.title,a.content,u.username FROM article AS a, user AS u where a.aid=1 and a.uid=u.uid
```

好处：使用表别名查询，可以使 SQL 变得简洁而更易书写和阅读，尤其在 SQL 比较复杂的情况下

- 查询字段指定别名

查询一张表，直接对查询字段设置别名

```sql
SELECT username AS name,email FROM user
```

查询两张表

好处：字段别名一个明显的效果是可以自定义查询数据返回的字段名；当两张表有相同的字段需要都被查询出，使用别名可以完美的进行区分，避免冲突

```sql
SELECT a.title AS atitle,u.username,u.title AS utitle FROM article AS a, user AS u where a.uid=u.uid
```

- 关联查询时候，关联表自身的时候，一些分类表，必须使用别名。

- 别名也可以在 group by 与 having 的时候都可使用
- 别名可以在 order by 排序的时候被使用查看上面一段 sql
- delete ， update MySQL 都可以使用别名，别名在多表（级联）删除尤为有用

```sql
delete t1,t2 from t_a t1 , t_b t2 where t1.id = t2.id
```

- 子查询结果需要使用别名查看上面一段 sql

#### 别名使用注意事项

- 虽然定义字段别名的 AS 关键字可以省略，但是在使用别名时候，建议不要省略 AS 关键字

## 书写 sql 语句的注意事项

#### 书写规范上的注意

- 字符串类型的要加单引号
- select 后面的每个字段要用逗号分隔，但是最后连着 from 的字段不要加逗号
- 使用子查询创建临时表的时候要使用别名，否则会报错。

#### 为了增强性能的注意

- 不要使用“select \* from ……”返回所有列，只检索需要的列，可避免后续因表结构变化导致的不必要的程序修改，还可降低额外消耗的资源
- 不要检索已知的列

```sql
select  user_id,name from User where user_id = ‘10000050’
```

- 使用可参数化的搜索条件，如=, >, >=, <, <=, between, in, is null 以及 like `<literal>%`；尽量不要使用非参数化的负向查询，这将导致无法使用索引，如<>, !=, !>, !<, not in, not like, not exists, not between, is not null, like `%<literal>`
- 当需要验证是否有符合条件的记录时，使用 exists，不要使用 count(\*)，前者在第一个匹配记录处返回，后者需要遍历所有匹配记录
- Where 子句中列的顺序与需使用的索引顺序保持一致，不是所有数据库的优化器都能对此顺序进行优化，保持良好编程习惯（索引相关）
- 不要在 where 子句中对字段进行运算或函数（索引相关）

1. 如 where amount / 2 > 100，即使 amount 字段有索引，也无法使用，改成 where amount > 100 \* 2 就可使用 amount 列上的索引
2. 如 where substring( Lastname, 1, 1) = ‘F’就无法使用 Lastname 列上的索引，而 where Lastname like ‘F%’或者 where Lastname >= ‘F’ and Lastname < ‘G’就可以

- 在有 min、max、distinct、order by、group by 操作的列上建索引，避免额外的排序开销（索引相关）
- 小心使用 or 操作，and 操作中任何一个子句可使用索引都会提高查询性能，但是 or 条件中任何一个不能使用索引，都将导致查询性能下降，如 where member_no = 1 or provider_no = 1，在 member_no 或 provider_no 任何一个字段上没有索引，都将导致表扫描或聚簇索引扫描（索引相关）

- Between 一般比 in/or 高效得多，如果能在 between 和 in/or 条件中选择，那么始终选择 between 条件，并用>=和<=条件组合替代 between 子句，因为不是所有数据库的优化器都能把 between 子句改写为>=和<=条件组合，如果不能改写将导致无法使用索引（索引相关）
- 调整 join 操作顺序以使性能最优，join 操作是自顶向下的，尽量把结果集小的两个表关联放在前面，可提高性能。（join 相关）

> 注意：索引和关联我会单独拿出来两篇文章进行详细讲解，在这个注意事项中只是简单提一下。
