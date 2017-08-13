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

## 第五章 高级数据过滤

通过组合 `WHERE` 子句可以建立更强, 更高级的搜索条件.

**操作符**: 用来联结或改变 `WHERE` 子句中的子句的关键词, 也称为逻辑操作符.

SQL 中会优先处理 AND 操作符, 然后才到 OR 操作符. 所以最好使用圆括号进行明确分组. `WHERE` 子句中最好都使用圆括号.

```sql
-- 使用 AND 操作符, 满足所有条件才可
SELECT prod_id, prod_price, prod_name
FROM Products
WHERE vend_id = 'DLL01' AND prod_price <= 4;

-- 使用 OR 操作符, 满足任一条件即可
SELECT prod_name, prod_price
FROM Products
WHERE vend_id = 'DLL01' OR vend_id = 'BRS01';

-- 组合使用 AND 以及 OR, 并使用圆括号进行分组
SELECT prod_name, prod_price
FROM Products
WHERE (vend_id = 'DLL01' OR vend_id = 'BRS01')
      AND prod_price >= 10;
```

`IN` 操作符用来指定范围, 范围中的每个条件都可以进行匹配. 取一组由逗号分隔, 括在圆括号中的合法值. 用来指定要匹配值的清单的关键字, 功能与 OR 相当

```sql
SELECT prod_name, prod_price
FROM Products
WHERE vend_id IN ( 'DLL01', 'BRS01' )
ORDER BY prod_name;
```

`NOT` 操作符, `WHERE` 子句中的 `NOT` 操作符有且只有一个功能: 否定其后所跟的任何条件. `NOT` 无法单独使用, 不仅可以用在要过滤的列之后, 还可以用在要过滤的列前.

一般简单情况下使用 `<>` 或者 `!=` 就可以了, 但是在复杂的子句中, 或者需要与 `IN` 联合使用时, `NOT` 才能体现它的价值.

```sql
SELECT prod_name
FROM Products
WHERE NOT vend_id = 'DLL01'
ORDER BY prod_name;
```

## 第六章 用通配符进行过滤

**通配符**: 用来匹配值的一部分的特殊字符.

**搜索模式**: 由字面值, 通配符或两者组合构成的搜索条件.

通配符本身实际上是 SQL 中的 `WHERE` 子句中具有特殊含义的字符, 而为了在搜索子句中使用通配符, 必须使用 `LIKE` 操作符. `LIKE` 会告诉 DBMS, 后面的搜索模式利用通配符而不是简单的相等匹配进行比较. 同时需要记住, 通配符搜索只能用于**文本字段**, 非文本数据不能使用通配符搜索.

### `%` 通配符

`%` 表示任何字符出现任意次数, 根据 DBMS 的不同以及配置, 搜索可以是区分大小写的. 通配符可以在搜索模式中的任意位置使用.

有某些 DBMS 会用空格填充字段的剩余不足部分, 这时, 使用通配符进行中间匹配的话, 就无法达到预期效果, 可以通过 SQL 中的函数去掉.

只使用 `%` 不会匹配产品名称为 `NULL` 的行.

```sql
-- 检索任意以 Fish 起头的词
SELECT prod_id, prod_name
FROM Products
WHERE prod_name LIKE 'Fish%';

-- 检索任意位置上包含文本 bean bag 的值
SELECT prod_id, prod_name
FROM Products
WHERE prod_name LIKE '%bean bag%';
```

### `_` 通配符

`_` 通配符用于匹配单个字符.

```sql
SELECT prod_id, prod_name
FROM Products
WHERE prod_name LIKE '__ inch teddy bear';
```

### `[]` 通配符

`[]` 通配符用于指定一个字符集, 必须匹配指定位置 (通配符位置) 的一个字符.

但并不是所有的 DBMS 都支持创建集合, 只有微软的 Access 和 SQL Server 支持.

```sql
SELECT cust_contact
FROM Customers
WHERE cust_contact LIKE '[JM]%'
ORDER BY cust_contact;
```

通配符搜索较慢, 如果能够使用其他模式达到效果就需要避免使用通配符, 同时, 使用时应将通配符置于搜索模式尽可能靠后的地方.

## 第七章 创建计算字段

**计算字段**: 是运行在 `SELECT` 语句内创建的. **字段**的意思基本上和列一样, 但数据库列一般称为列, 术语字段通常与计算字段一起使用.

### 拼接字段

**拼接**: 将值联结到一起 (一个值附加到另一个值) 构成单个值. 这个操作根据不同的数据库使用不同的方式, Access, SQL Server 中使用 `+` 号, DB2, Oracle, PostgreSQL, SQLite 使用 `||`, MySql 使用 `Concat` 函数.

```sql
-- MySql 拼接
SELECT Concat(vend_name, ' (', vend_contry, ')')
FROM Vendors
ORDER BY vend_name;
```

如果计算字段的列内容用了空格来填充, 那么就需要使用 SQL 提供的 `RTRIM`, `LTRIM`, `TRIM` 函数来去掉空格.

```sql
SELECT Concat(RTRIM(vend_name), ' (', RTRIM(vend_country), ')')
FROM Vendors
ORDER BY vend_name;
```

#### 使用别名

未命名的列不能用于客户端应用中, 使用别名能够让计算列可以被客户端引用.

```sql
SELECT Concat(RTRIM(vend_name), ' (', RTRIM(vend_country), ')')
       AS vend_title
FROM Vendors
ORDER BY vend_name;
```

### 执行算术计算

计算字段的另一个常见用途是对检索出来的数据进行算术运算.

```sql
SELECT prod_id,
       quantity,
       item_price,
       quantity*item_price AS expanded_price
FROM OrderItems
WHERE order_num = 20008;
```

## 第八章 使用函数处理数据

SQL 可以使用函数来处理数据, 函数一般是在数据上执行的, 为数据的转换和处理提供了方便. 但是只有少数几个函数被所有主要的 DBMS 支持, 所有类型的函数一般都可以在每个 DBMS 中使用, 但各个函数的名称和语法有可能极其不同.

使用函数会降低代码的可移植性, 因此需要做好注释, 表明 SQL 代码的含义.

### 使用函数

大多数 SQL 支持以下类型的函数:

- 用于处理文本字符串的的文本函数
- 用于在数值数据上进行算术操作的数值函数
- 用于处理日期和时间并从这些值中提取特定成分的日期和时间函数
- 返回 DBMS 正使用的特殊信息的系统函数

#### 文本处理函数

`UPPER` 函数

```sql
SELECT vend_name, UPPER(vend_name) AS vend_name_upcase
FROM Vendors
ORDER BY vend_name;
```

下面是一些常用的文本处理函数:

|函数|说明|
---|---
LEFT() (或使用子字符串函数) | 返回字符串左边的字符
LENGTH() (也使用DATALENGTH() 或 LEN()) | 返回字符串的长度
LOWER() (Access 使用 LCASE()) | 将字符串转换为小写
LTRIM() | 去掉字符串左边的空格
RIGHT() (或使用子字符串函数) | 返回字符串右边的字符
RTRIM() | 去掉字符串右边的空格
SOUNDEX() | 返回字符串的 SOUNDEX 值
UPPER() (Access 使用 UCASE()) | 将字符串转换为大写

```sql
-- SOUNDEX() 函数例子, 匹配所有发音类似于 Michael Green 的联系名
SELECT cust_name, cust_contact
FROM Customers
WHERE SOUNDEX(cust_contact) = SOUNDEX('Michael Green');
```

#### 日期和时间处理函数

日期和时间采用相应的数据类型存储在表中, 每种 DBMS 都有自己的特殊形式. 日期和时间值以特殊的格式存储, 以便能够快速和有效地进行排序或过滤.

但是日期和时间函数在 SQL 中的可移植性最差.

```sql
-- MySql的版本, 其他的一些 DBMS 使用的是 DATEPART, 或者 几个函数的
-- 组合来达到想对应的效果, 不同 DBMS 的日期-时间处理函数可能不同.
SELECT order_num
FROM Orders
WHERE YEAR(order_date) = 2012;
```

#### 数值处理函数

仅用于处理数值数据, 一般主要用于代数, 三角或几何运算. 使用频率不高.

常用的数值处理函数有:

函数 | 说明
--- | ---
ABS() | 返回一个数的绝对值
COS() | 返回一个角度的余弦
EXP() | 返回一个数的指数值
PI() | 返回圆周率
SIN() | 返回一个角度的正弦
SQRT() | 返回一个数的平方根
TAN() | 返回一个角度的正切

## 第九章 汇总数据

需要汇总数据而不实际检索出来时, 可以通过专门的函数来实现. 如:

- 确定表中的行数 (满足某个条件或包含某个特定值的行数)
- 获得表中某些行的和
- 找出表列 (所有行或者某些特定行) 的最大值, 最小值, 平均值

这些类型的检索只需要汇总表中的数据, 而不需要实际数据本身. 为了方便这种类型的检索, SQL 给出了5个聚集函数, 这种类型的函数在各种主要 SQL 实现中得到了相当一致的支持.

**聚集函数**: 对某些行运行的函数, 计算并返回一个值.

函数 | 说明
--- | ---
AVG() | 返回某列的平均值
COUNT() | 返回某列的行数
MAX() | 返回某列的最大值
MIN() | 返回某列的最小值
SUM() | 返回某列值之和

### AVG() 函数

对表中的行数计数并计算其列值之和, 求得列的平均值. 可用来返回所有列的平均值, 也可以用来返回特定列或行的平均值.

函数只能用于单个列, 用于确定特定数值列的平均值, 列名必须作为函数参数给出, 要获取多个平均值, 必须使用多个 AVG() 函数.

```sql
-- 所有产品的平均价格
SELECT AVG(prod_price) AS avg_price
FROM Products;

-- 返回特定供应商所提供的产品的平均价格
SELECT AVG(prod_price) AS avg_price
FROM Products
WHERE vend_id = 'DLL01';
```

### COUNT() 函数

用于确定表中行的数目或符合特定条件的行的数目.

函数有两种使用方式:

- 使用 `COUNT(*)` 对表中行的数目进行计数, 不管表列中包含的是空值(NULL) 还是非空值.
- 使用 `COUNT(column)` 对特定列中具有值的行进行计数, 忽略 NULL 值

```sql
-- 对所有行进行计数
SELECT COUNT(*) AS num_cust
FROM Customers;

-- 只对具有电子邮件的客户计数
SELECT COUNT(cust_email) AS num_cust
FROM Customers;
```

### MAX() 函数

返回指定列中的最大值, `MAX()` 要求指定列名. 函数会忽略列值为 NULL 的行.

`MAX()` 函数一般用于找出最大的数值或日期值, 有些 DBMS 也允许使用来返回任意列中的最大值, 包括返回文本列中的最大值. 对文本列作用时, 返回按照该列排序后返回的最后一行.

```sql
-- 返回 Products 表中最贵物品的价格.
SELECT MAX(prod_price) AS max_price
FROM Products;
```

### MIN() 函数

与 MAX() 功能相反, 一样需要指定列名. 特性也跟 MAX 一样

```sql
SELECT MIN(prod_price) AS min_price
FROM Products;
```

### SUM() 函数

用来返回指定列值的和, SUM 函数会忽略列值为 NULL 的行.

```sql
-- 统计某个物品订单中的物品数量之和
SELECT SUM(quantity) AS items_ordered
FROM OrderItems
WHERE order_num = 20005;

-- 合计计算值, 得出总数
SELECT SUM(item_price*quantity) AS total_price
FROM OrderItems
WHERE order_num = 20005;
```

### 聚集不同值

上面的函数都可以:

- 对所有行制定计算, 指定 ALL 参数或不指定参数 (ALL 是默认行为)
- 只包含不同的值, 指定 DISTINCT 参数

```sql
-- DISTINCT 不能在 Access 中像下面那样使用, 需要用子查询返回数据到外部执行运算
-- DISTINCT 不能用于 COUNT(*) 必须要指定列名才能使用
SELECT AVG(DISTINCT prod_price) AS avg_price
FROM Products
WHERE vend_id = 'DLL01';
```

### 组合聚集函数

SELECT 语句可根据需要包含多个聚集函数. 指定别名来包含某个聚集函数的结果时, 不应该使用表中实际的列名.

```sql
SELECT COUNT(*) AS num_items,
       MIN(prod_price) AS price_min,
       MAX(prod_price) AS price_max,
       AVG(prod_price) AS price_avg
FROM Products;
```

## 第十章 分组数据

分组数据涉及到两个新的 SELECT 语句子句: `GROUP BY` 和 `HAVING`.

### 创建分组

```sql
-- 指示 DBMS 按照 vend_id 排序并分组数据, 会对每个 vend_id 计算 num_prods 一次
SELECT vend_id, COUNT(*) AS num_prods
FROM Products
GROUP BY vend_id;
```

GROUP BY 子句可以包含任意数目的列, 因此可以对分组进行嵌套, 更细致地进行数据分组.

- GROUP BY 子句可以包含任意数目的列, 因而可以对分组进行嵌套, 更细致地进行数据分组.
- 如果在 GROUP BY 子句中嵌套了分组, 数据将在最后指定的分组上进行汇总, 也就是建立分组时, 指定的所有列都一起计算 (不能从个别的列取回数据).
- GROUP BY 子句中列出的每一列都必须是检索列或有效的表达式 (不能是聚集函数). 如果在 SELECT 中使用表达式, 则必须在 GROUP BY 子句中指定相同的表达式. 不能使用别名.
- 大多数 SQL 实现不允许 GROUP BY 列带有长度可变的数据类型 (文本或备注型字段)
- 除聚集计算语句外, SELECT 语句中的每一列都必须在 GROUP BY 子句中给出.
- 如果分组列中包含具有 NULL 值的行, 则 NULL 将作为一个分组返回
- GROUP BY 子句必须出现在 WHERE 子句之后, ORDER BY 子句之前.

### 过滤分组

SQL 还可以进行过滤分组, 规定包括哪些分组, 排除哪些分组. 需要用到 HAVING 子句, HAVING 非常类似 WHERE, 差别是: WHERE 过滤行, HAVING 过滤分组.

WHERE 在分组前进行过滤, HAVING 在分组后进行过滤.

```sql
-- 这里无法使用 WHERE, 因为这里的过滤是基于分组聚集值, 而不是特定行的值
SELECT cust_id, COUNT(*) AS orders
FROM Orders
GROUP BY cust_id
HAVING COUNT(*) >= 2;

-- 这里如果没有 WHERE 就会检索出来多一行, 这是 WHERE 与 HAVING 应用时机不同导致的
SELECT vend_id, COUNT(*) AS num_prods
FROM Products
WHERE prod_price >= 4
GROUP BY vend_id
HAVING COUNT(*) >= 2;
```

### 分组和排序

ORDER BY | GROUP BY
--- | ---
对产生的输出排序 | 对行分组, 但输出可能不是分组的顺序
任意列都可以使用(甚至非选择的列) | 只可能使用选择列或表达式列, 而且必须使用每个选择列表达式
不一定需要 | 如果与聚集函数一起使用列(或表达式), 则必须使用

使用 GROUP BY 子句时, 应该给出 ORDER BY 子句, 这是保证数据正确排序的唯一方法.

```sql
SELECT order_num, COUNT(*) AS items
FROM OrderItems
GROUP BY order_num
HAVING COUNT(*) >= 3;

-- 按照订购物品的数目排序输出, 需要添加 ORDER BY 子句
SELECT order_num, COUNT(*) AS items
FROM OrderItems
GROUP BY order_num
HAVING COUNT(*) >= 3
ORDER BY items, order_num;
```

### SELECT 子句顺序

SELECT 语句中的子句使用时必须要遵循一定的次序. 目前为止的子句有:

子句 | 说明 | 是否必须使用
--- | --- | ---
SELECT | 要返回的列表达式 | 是
FROM | 从中检索数据的表 | 仅在从表选择数据时使用
WHERE | 行级过滤 | 否
GROUP BY | 分组说明 | 仅在按组计算聚集时使用
HAVING | 组级过滤 | 否
ORDER BY | 输出排序顺序 | 否

## 第十一章 使用子查询

任何 SQL 语句都是查询, 但此术语一般指 SELECT 语句. SQL 中允许创建子查询, 即嵌套在其他查询中的查询.

### 利用子查询进行过滤

假设需要列出订购物品 RGAN01 的所有顾客, 步骤是:

- 检索包含物品 RGAN01 的所有订单编号
- 检索具有前一步骤列出的订单编号的所有顾客的ID
- 检索前一步骤返回的所有顾客ID的顾客信息

上面的步骤都可以单独作为一个查询来执行, 可以把一条 SELECT 语句返回的结果用于另一条 SELECT 语句的 WHERE 子句. 也可以使用子查询来把3个查询组合成一条语句.

在 SELECT 语句中, 子查询总是由内向外来执行处理的.

作为子查询的 SELECT 语句只能查询**单个列**.

```sql
SELECT cust_name, cust_contact
FROM Customers
WHERE cust_id IN (SELECT cust_id
                  FROM Orders
                  WHERE order_num IN (SELECT order_num
                                      FROM OrderItems
                                      WHERE prod_id = 'RGAN01'));
```

### 作为计算字段使用子查询

假设需要显示 Customers 表中每个顾客的订单总数. 订单与顾客的 ID 存储在 Orders 表中. 需要执行的步骤如下:

- 从 Customers 表中检索顾客列表
- 对于检索出的每个顾客, 统计其在 Orders 表中的订单数目

```sql
-- 对顾客 1000000001 的订单进行计数
SELECT COUNT(*) AS orders
FROM Orders
WHERE cust_id = '1000000001';

-- 将上面的作为子查询嵌入到计算字段中
SELECT cust_name,
       cust_state,
       (SELECT COUNT(*)
        FROM Orders
        WHERE Orders.cust_id = Customers.cust_id) AS orders
FROM Customers
ORDER BY cust_name;
```
