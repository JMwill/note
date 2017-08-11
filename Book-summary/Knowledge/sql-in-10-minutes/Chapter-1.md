# SQL 必知必会

## 第一章 数据库基础 (复习)

数据库: 数据库相当于文件柜, 是用于保存**有组织**的数据的容器. MySql 等 DBMS(数据库管理系统)就是用来创建和操纵数据库这个容器的软件.

表: 是一种结构化文件, 用于存储某种**特定类型**的数据. 即: 某种特定类型数据的结构化清单.

模式: 描述数据库以及表的布局和数据特性的信息, 包括如何存储, 存储什么样的数据, 数据如何分解, 各部分信息如何命名等信息.

列: 组成表的基本元素, 存储表中某部分的信息, 代表表中的的一个字段, 所有表由一个或多个列组成.

行: 表中的一个记录, 每个记录存储在自己的行内.

主键: 一列 (或一组列) 值能够唯一标识表中的每一行.

任何列都可以作为主键, 但需要满足条件:

- 任意两行都不具有相同的主键值
- 每行都必须要具有一个主键值 (主键值不允许 NULL 值)
- 主键列中的值不允许修改或更新
- 主键值不能重用 (某行从表中删除, 主键不能赋给以后的新行)

当多个列组合作为主键时, 组合出来的值必须要是唯一的, 单个列的值可以不唯一.

## 第二章 检索数据

使用 SELECT 语句必须至少给出两条信息: **想选择什么**, **从什么地方选择**.

```sql
-- 选择单列
SELECT prod_name
FROM Products;

-- 选择多列
SELECT prod_id, prod_name, prod_price
FROM Products;

-- 检索所有列, 一般不要这么做, 除了真的需要
SELECT *
FROM Products;

-- 如果要限制检索到的值为不重复, 可以添加 DISTINCT 关键字
-- DISTINCT 不能对部分列来起作用.
SELECT DISTINCT vend_id
FROM Products;

-- MySql 中限制结果数, LIMIT 后接数量, OFFSET 后接偏移量
SELECT prod_name
FROM Products
LIMIT 5 OFFSET 5;
-- 可以缩写为
SELECT prod_name
FROM Products
LIMIT 3, 4; -- 相当于 LIMIT 4 OFFSET 3

/*
 * SQL 中可以通过这个方式来写大段的注释
 */

-- 或者写小段行内注释
```

## 第三章 排序检索数据

**子句**: SQL 语句由子句构成, 有的为必需, 有的则是可选的. 一个子句通常由**一个关键字**加上所提供的**数据**组成

### 对数据排序

`ORDER BY` 子句的位置需要保证为 SELECT 语句中的最后一条子句. 而且可以使用非选择的列名来指定排序顺序.

```sql
-- 使用 ORDER BY 子句
SELECT prod_name
FROM Products
ORDER BY prod_name;

-- 按照多个列排序
SELECT prod_id, prod_price, prod_name
FROM Products
ORDER BY prod_price, prod_name

-- 按照列的位置来排序
SELECT prod_id, prod_price, prod_name
FROM Products
ORDER BY 2, 3; -- 这里的意思就是先对第二列进行排序, 遇到相同的再以第三列为标准进行排序
```

### 指定排序方向

通过添加 `DESC` 关键字来将排序结果调整为降序排序, `DESC` 只应用到直接位于其前面的列名. 在对多个列进行降序排序时, 必须对每一列指定 `DESC` 关键字.

```sql
SELECT prod_id, prod_price, prod_name
FROM Products
ORDER BY prod_price DESC;

-- 多个列排序
SELECT prod_id, prod_price, prod_name
FROM Products
ORDER BY prod_price DESC, prod_name
```

## 第四章 过滤数据

在 `SELECT` 语句中, 数据根据 `WHERE` 子句中指定的搜索条件来对数据进行过滤. `WHERE` 子句在表名之后给出. 同时使用 `ORDER BY` 以及 `WHERE` 时, `ORDER BY` 应该位于 `WHERE` 之后.

比较操作符为一般的操作符, 像 `>` `<` 等, `=` 代表等于. 而额外的有 `BETWEEN` 过滤处于指定值之间的数据, 以及 `IS NULL` 判断是否是 NULL 值.

`BETWEEN` 关键字需要两个值, 开始与结束, 使用时必须都要指定, 且必须要用 `AND` 关键字来分隔, 匹配到的值包括开始值与结束值

`IS NULL` 子句是特殊的 `WHERE` 子句, 可以用来检查具有 `NULL` 值的列.

```sql
-- 检查单个值
SELECT prod_name, prod_price
FROM Products
WHERE prod_price = 3.49;

-- 找出小于等于10的数据
SELECT prod_name, prod_price
FROM Products
WHERE prod_price <= 10;

-- 不匹配检查
SELECT vend_id, prod_name
FROM Products
WHERE vend_id <> 'DLL01'; -- WHERE vend_id != 'DLL01' 具有相同的效果, 当列值为字符串时需要用引号包起来

-- 范围值检查
SELECT prod_name, prod_price
FROM Products
WHERE prod_price BETWEEN 5 AND 10;

-- 空值检查
SELECT cust_name
FROM Customers
WHERE cust_email IS NULL;
```
