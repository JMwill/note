# SQL 必知必会

## 第一课 数据库基础 (复习)

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

## 第二课 检索数据

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

## 第三课 排序检索数据

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

## 第四课 过滤数据

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

## 第五课 高级数据过滤

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

## 第六课 用通配符进行过滤

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

## 第七课 创建计算字段

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

## 第八课 使用函数处理数据

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

## 第九课 汇总数据

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

## 第十课 分组数据

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

## 第十一课 使用子查询

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

## 第十二课 联结表

关系数据库的可伸缩性比非关系型数据库要好. **可伸缩**: 能够适应不断增加的工作量而不失败. 设计良好的数据库或应用程序称为可伸缩性良好.

当数据存储在多个表中, 需要使用一条 SELECT 语句来检索出数据时, 就需要使用联结. 联结是一种机制, 用来在一条 SELECT 语句中关联表, 使用特殊的语法, 可以联结多个表返回一组输出, 联结在运行时关联表中正确的行.

创建联结只需要指定要联结的所有表以及关联它们的方式即可.

```sql
SELECT vend_name, prod_name, prod_price
FROM Vendors, Products
WHERE Vendors.vend_id = Products.vend_id;
```

在一条 SELECT 语句中联结几个表时, 相应的关系是运行中构造的, 数据库表的定义里没有指示 DBMS 如何对表进行联结的内容, 需要自行实现, 因此使用 WHERE 子句作为过滤条件能够只包含匹配给定条件(联结条件)的行, 而不会使得第一个表中的每一行都与第二个表中的每一行配对.

没有指定联结条件的表关系返回的结果为笛卡尔积, 检索出的行的数目是第一个表中的行数乘以第二个表中的行数.

```sql
SELECT vend_name, prod_name, prod_price
FROM Vendors, Products;
```

上面的 SQL 代码输出结果是无意义的, 组合相互之间没有关系的结果行出来, 因此需要保**证所有的联结**都有 WHERE 子句, 并保证子句的正确性.

### 內联结

上面使用的联结称为**等值联结**, 基于两个表之间的相等测试. 也称为**內联结**. 可以通过使用不同的语法, 明确指定联结类型得到相同的结果.

```sql
SELECT vend_name, prod_name, prod_price
FROM Vendors INNER JOIN Products
ON Vendors.vend_id = Products.vend_id;
```

### 联结多个表

SQL 并不限制一条 SELECT 语句中联结的表的数目, 创建联结的规则一样, 列出所有的表, 然后定义表之间的关系.

避免联结不必要的表, 联结的表越多性能下降得越厉害. SQL 本身不限制每个联结约束中表的数目, 但多数 DBMS 都有限制.

```sql
SELECT prod_name, vend_name, prod_price, quantity
FROM OrderItems, Products, Vendors
WHERE Products.vend_id = Vendors.vend_id
      AND OrderItems.prod_id = Products.prod_id
      AND order_num = 20007;
```

```sql
-- 十一课中的例子:
SELECT cust_name, cust_contact
FROM Customers
WHERE cust_id IN (SELECT cust_id
                  FROM Orders
                  WHERE order_num IN (SELECT order_num
                                       FROM OrderItems
                                       WHERE prod_id = 'RGAN01'));

-- 使用联结实现相同查询
SELECT cust_name, cust_contact
FROM Customers, Orders, OrderItems
WHERE Customers.cust_id = Orders.cust_id
      AND Orders.order_num = OrderItems.order_num
      AND prod_id = 'RGAN01';
```

## 第十三课 创建高级联结

### 使用表别名

SQL 允许对表起别名, 主要有两个理由:

- 缩短 SQL 语句
- 允许在同一条 SELECT 语句中多次使用相同的表.

```sql
SELECT cust_name, cust_contact
FROM Customers AS C, Orders as O, OrderItems as OI
WHERE C.cust_id = O.cust_id
      AND OI.order_num = O.order_num
      AND prod_id = 'RGAN01';
```

### 使用不同类型的联结

#### 自联结

查找出与 Jim Jones 同一公司的所有顾客

- 先找出 Jim Jones 工作的公司
- 找出在该公司工作的顾客

```sql
-- 子查询的方法
SELECT cust_id, cust_name, cust_contact
FROM Customers
WHERE cust_name = (SELECT cust_name
                   FROM Customers
                   WHERE cust_contact = 'Jim Jones');

-- 自联结
SELECT c1.cust_id, c1.cust_name, c1.cust_contact
FROM Customers AS c1, Customers AS c2
WHERE c1.cust_name = c2.cust_name
      AND c2.cust_contact = 'Jim Jones';

-- 或者
SELECT c1.cust_id, c1.cust_name, c1.cust_contact
FROM Customers AS c1 INNER JOIN Customers AS c2
ON c1.cust_name = c2.cust_name
	AND c2.cust_contact = 'Jim Jones';
```

#### 自然联结

自然联结排除多次出现, 使每一列只返回一次. 自然联结要求只能选择唯一的列, 且不由系统完成, 一般通过对一个表使用通配符, 而对其他表的列使用明确的子集来完成.

```sql
-- 通配符只对第一个表使用, 所有其他列明确列出, 因此没有重复的列被检索出来
-- 一般的内联结都是自然联结, 几乎不会用到不是自然联结的內联结
SELECT C.*, O.order_num, O.order_date,
       OI.prod_id, OI.quantity, OI.item_price
FROM Customers AS C, Orders AS O, OrderItems as OI
WHERE C.cust_id = O.cust_id
      AND OI.order_num = O.order_num
      AND prod_id = 'RGAN01';
```

#### 外联结

将一个表中的行与另一个表中的行相关联, 并包含没有关联的行, 如:

- 对每个顾客下的订单进行计数, 包括至今尚未下订单的顾客
- 列出所有产品以及订购数量, 包括没有人订的产品
- 计算平均销售规模, 包括至今尚未下订单的顾客

联结包含了在相关表中没有关联行的行, 这种联结称为**外联结**

```sql
-- 这里包含了左边的表: Customers 中的所有行, 包括没有关联的
-- 如果需要包括右边的表: Orders 中的所有行, 可以使用: RIGHT OUTER JOIN
SELECT Customers.cust_id, Orders.order_num
FROM Customers LEFT OUTER JOIN Orders
      ON Customers.cust_id = Orders.cust_id;
```

还有一种全外联结的 `FULL OUTER JOIN` 语法, 但是较多 DBMS 不支持, 这种语法会检索两个表中所有的行并关联可以关联的行.

### 使用带聚集函数的联结

聚集函数可以与联结一起使用. 如: 检索所有顾客以及每个顾客所下的订单数

```sql
SELECT Customers.cust_id, COUNT(Orders.order_num) AS num_ord
FROM Customers INNER JOIN Orders
      ON Customers.cust_id = Orders.cust_id
GROUP BY Customers.cust_id;

-- 与其他联结一起使用
SELECT Customers.cust_id, COUNT(Orders.order_num) AS num_ord
FROM Customers LEFT OUTER JOIN Orders
      ON Customers.cust_id = Orders.cust_id
GROUP BY Customers.cust_id;
```

## 第十四课 组合查询

SQL 除了有从一个或多个表中返回数据的单条 SELECT 语句外, 还允许执行多个查询 (多条 SELECT 语句) 并将结果作为一个查询结果返回, 这种查询被称为并(union)或复合查询. 使用的情况主要有两种:

- 在一个查询中从不同的表返回结构数据
- 对一个表执行多个查询, 按照一个查询返回数据

大多数情况下组合相同表的两个查询所完成的工作与具有多个 WHERE 子句条件的一个查询完成的工作相同. 也就是任何具有多个 WHERE 子句的 SEELCT 语句都可以作为一个组合查询.

### 创建组合查询

组合查询只需要在每条 SELECT 语句之间放上关键字 UNION 就能实现组合查询.

```sql
-- 单条语句实现
SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_state IN ('IL', 'IN', 'MI');

-- 单条语句实现
SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_name = 'Fun4All';

-- 组合两条语句
SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_state IN ('IL', 'IN', 'MI')
UNION
SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_name = 'Fun4All';

-- WHERE 的相同实现
SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_state IN ('IL', 'IN', 'MI')
    OR cust_name = 'Fun4All';
```

简单例子中, UNION 会比 WHERE 复杂, 但在复杂过滤条件下, 或从多个表中检索数据时, 用 UNION 处理会更简单.

#### UNION 规则

- UNION 必须由两条或以上的 SELECT 语句组成, 语句之间用关键字分隔
- UNION 每个查询必须包含相同的列, 表达式或聚集函数, 列的次序不重要
- 列数据的类型必须要兼容: 类型不用完全相同, 但必须是 DBMS 可以隐含转换的类型

#### 包含或取消重复的行

UNION 默认行为与 WHERE 那样会去掉重复的行, 如果需要显示重复的行, 可以使用 `UNION ALL`, 这个功能 WHERE 子句无法实现

```sql
SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_state IN ('IL', 'IN', 'MI')
UNION ALL
SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_name = 'Fun4All';
```

#### 对组合查询结果排序

在用 UNION 组合查询时, 只能使用一条 `ORDER BY` 子句, 所以需要位于最后一条 SELECT 语句之后, 不存在对一部分使用排序, 另一部分使用另一个排序的用法.

```sql
SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_state IN ('IL', 'IN', 'MI')
UNION
SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_name = 'Fun4All'
ORDER BY cust_name, cust_contact;
```

## 第十五课 插入数据

### 数据插入

INSERT 用来将行插入 (或添加) 到数据库表. 方式有以下几种:

- 插入完整的行
- 插入行的一部分
- 插入某些查询的结果

#### 插入完整的行

基本的 INSERT 语法要求指定表名和插入到新行中的值.

```sql
-- 使用这种简单的语法并不安全, 没法保证在下一次表结构发生变化时插入语句也对应修改了次序
INSERT INTO Customers
VALUES ('1000000006',
        'Toy Land',
        '123 Any Street',
        'New York',
        'NY',
        '11111',
        'USA',
        NULL,
        NULL);

-- 所以最好的做法是提供插入的对应字段名称
INSERT INTO Customers(cust_id,
                      cust_name,
                      cust_address,
                      cust_city,
                      cust_state,
                      cust_zip,
                      cust_country,
                      cust_contact,
                      cust_email)
VALUES ('1000000006',
        'Toy Land',
        '123 Any Street',
        'New York',
        'NY',
        '11111',
        'USA',
        NULL,
        NULL);
```

#### 插入部分行

使用列值还可以只给某些列提供值, 其他列不提供值. 省略的列需要满足条件为:

- 列定义允许 NULL 值(无值或空值)
- 表定义中设置了默认值

```sql
INSERT INTO Customers(cust_id,
                      cust_name,
                      cust_address,
                      cust_city,
                      cust_state,
                      cust_zip,
                      cust_country)
VALUES ('1000000006',
        'Toy Land',
        '123 Any Street',
        'New York',
        'NY',
        '11111',
        'USA');
```

#### 插入检索出的数据

INSERT 一般用于给表插入具有指定列值的行, INSERT 还可以通过 SELECT 语句的结果来插入新行, 也就是所谓的 `INSERT SELECT`.

其中 SELECT 语句可以包含 WHERE 子句, 以过滤插入的数据.

```sql
-- 把另一表中的顾客列合并到 Customers 表中
INSERT INTO Customers(cust_id,
                      cust_contact,
                      cust_email,
                      cust_address,
                      cust_city,
                      cust_state,
                      cust_zip,
                      cust_country)
SELECT cust_id,
       cust_contact,
       cust_email,
       cust_name,
       cust_address,
       cust_city,
       cust_state,
       cust_zip,
       cust_country
FROM CustNew;
```

### 从一个表复制到另一个表

要将一个表的数据内容复制到一个全新的表(运行中创建的表), 可以 `SELECT INTO` 语句, `INSERT SELECT` 与 `SELECT INTO` 的主要差别是: 前者导出数据, 后者导入数据.

使用 `SELECT INTO` 时:

- 任何 SELECT 选项和子句都可以使用, 包括 WHERE 和 GROUP BY
- 可以利用联结从多个表插入数据
- 不管从多少个表中检索数据, 数据都只能插入到一个表中

进行新 SQL 语句试验前, 先复制对应的表, 在进行测试, 可以避免影响到原有数据.

```sql
SELECT *
INTO CustCopy
FROM Customers;

-- MySql, Oracle 等的 DBMS 用法
CREATE TABLE CustCopy AS
SELECT * FROM Customers;
```

## 第十六课 更新和删除数据

### 更新数据

更新表中的数据需要使用 UPDATE 语句, 有两种方式:

- 更新表中的特定行
- 更新表中的所有行

使用 UPDATE 时不要省略 WHERE 子句, 否则会更新表中的所有行, 基本的 UPDATE 语句由三部分组成, 分别是:

- 要更新的表
- 列名和对应的新值
- 确定要更新哪些行的过滤条件

```sql
-- 更新客户 1000000005 的电子邮件地址
UPDATE Customers
SET cust_email = 'kim@thetoystore.com'
WHERE cust_id = '1000000005';

-- 更新多个列
UPDATE Customers
SET cust_contact = 'Sam Roberts',
    cust_email = 'sam@toyland.com'
WHERE cust_id = '1000000006';
```

### 删除数据

删除表中的数据需要使用 DELETE 语句, 有两种方式:

- 从表中删除特定的行
- 从表中删除所有行

同样地, 使用 DELETE 时不要省略 WHERE 子句, 否则会删除表中所有的行:

```sql
DELETE FROM Customers
WHERE cust_id = '1000000006';
```

DELETE 后的 FROM 可选, 但是为了保持可移植性, 最好保留.

如果想要快速删除所有的行, 使用 `TRUNCATE TABLE`, 能完成 DELETE 删除全部行的工作, 且速度更快.

### 更新和删除的指导原则

- 除非确实打算更新和删除每一行,否则绝对不要使用不带 WHERE 子句的 UPDATE 或 DELETE 语句。
- 保证每个表都有主键, 尽可能像 WHERE 子句那样使用它(可以指定各主键、多个值或值的范围)。
- 在 UPDATE 或 DELETE 语句使用 WHERE 子句前,应该先用 SELECT 进行测试,保证它过滤的是正确的记录,以防编写的 WHERE 子句不正确。
- 使用强制实施引用完整性的数据库, 这样 DBMS 将不允许删除其数据与其他表相关联的行。
- 有的 DBMS 允许数据库管理员施加约束,防止执行不带 WHERE 子句的 UPDATE 或 DELETE 语句。如果所采用的 DBMS 支持这个特性,应该使用它。

## 第十七课 创建和操纵表

### 创建表

要创建表格可以通过使用 SQL 语句 `CREATE TABLE` 语句来实现. 但有些 DBMS 的语法可能会不一样.

#### 表创建基础

使用 CREATE TABLE 创建表需要给出下列信息:

- 新表名字, 在 CREATE TABLE 后给出
- 表列的名字和定义, 用逗号分隔
- 部分 DBMS 需要指定表的位置

```sql
CREATE TABLE Products
(
      prod_id     CHAR(10)          NOT NULL,
      vend_id     CHAR(10)          NOT NULL,
      prod_name   CHAR(254)         NOT NULL,
      prod_price  DECIMAL(8, 2)     NOT NULL,

      -- Oracle 用:
      -- prod_desc      VARCHAR(1000)   NULL,
      prod_desc   TEXT(1000)     NULL
);

-- 大部分 DBMS 不指定 NOT NULL 则 NULL 为默认值
-- 具体信息还是需要参考 DBMS 文档
CREATE TABLE Vendors
(
      vend_id           CHAR(10)    NOT NULL,
      vend_name         CHAR(50)    NOT NULL,
      vend_address      CHAR(50)    ,
      vend_city         CHAR(50)    ,
      vend_state        CHAR(5)     ,
      vend_zip          CHAR(10)    ,
      vend_country      CHAR(50)    ,
);
```

在 DBMS 中通过关键字 `DEFAULT` 来指定默认值, 默认值常用于日期或时间戳列, 如通过引用系统日期的函数或变量, 将系统日期用作默认日期. MySql 中指定 `DEFAULT CURRENT_DATE()`. 各个系统获取日期的命令都不太一样, 需要时可参考对应的 DBMS 文档.

```sql
CREATE TABLE OrderItems
(
      order_name        INTEGER           NOT NULL,
      order_item        INTEGER           NOT NULL,
      prod_id           CHAR(10)          NOT NULL,
      quantity          INTEGER           NOT NULL    DEFAULT 1,
      item_price        DECIMAL(8, 2)     NOT NULL
);
```


### 更新表

更新表定义可以使用 `ALTER TABLE` 语句, 由于不同 DBMS 允许更新的内容差别很大, 所以需要考虑一下事情:

- 理想情况下, 不要在表中包含数据时对其更新, 设计之初就要考虑好未来可能的需求, 避免后期对表的结构做大改动
- 所有的 DBMS 都允许给现有的表增加列, 但对增加列的数据类型有所限制
- 许多 DBMS 不允许删除或更改表中的列
- 多数 DBMS 允许重新命名表中的列
- 许多 DBMS 限制对已经填有数据的列进行更改, 对未填充有数据的列几乎没有限制

为已有表增加列可能是所有 DBMS 都支持的唯一操作:

```sql
ALTER TABLE Vendors
ADD vend_phone CHAR(20);

-- 更改或删除列, 增加约束或增加键, 也使用类似的语法
ALTER TABLE Vendors
DROP COLLMN vend_phone;
```

复杂的表结构更改一般需要手动删除, 涉及到以下步骤:

1. 用新的列布局创建一个新表
2. 使用 INSERT SELECT 语句从旧表复制数据到新表, 有必要可以使用转换函数和计算字段
3. 检验包含所需数据的新表
4. 重命名旧表(如果确定,可以删除它);
5. 用旧表原来的名字重命名新表;
6. 根据需要, 重新创建触发器, 存储过程, 索引和外键。

使用 `ALTER TABLE` 需要十分小心, 在改动前应做完整备份 (模式和数据的备份). 避免数据丢失.

### 删除表


删除表而不是里面的内容, 使用 `DROP TABLE` 语句即可, 表的删除没有确认, 不能撤销, 表会被永久删除. 可以通过关系规则防止意外删除表

```sql
DROP TABLE CustCopy;
```

### 重命名表

每个 DBMS 对表重命名的支持有所不同, MySql 使用 RENAME. 但全部的重命名操作基本语法都要求指定旧表名和新表名

## 第十八课 使用视图

视图: 虚拟的表, 只包含使用时动态检索数据的查询. 但各方 DBMS 对视图的支持不一, 具体需要查看对应版本的手册.

视图在我的理解中就是一个包含了预设 SQL 语句的函数, 使用视图时会执行函数, 并得到得到对应的 SQL 语句执行的结果. 且这个结果的行为像是一张表, 能够对其执行对表进行的操作. 如: SELECT 操作, 过滤, 排序, 将视图联结到其他视图或表, 添加或更新数据等.

视图本身不包括数据, 它返回的数据为对应表中检索出来的数据, 因此当表数据更改时, 视图中的数据也会更改.

使用视图的原因:

- 重用 SQL 语句
- 简化复杂的 SQL 操作. 在编写查询后,可以方便地重用它而不必知道其基本查询细节
- 使用表的一部分而不是整个表
- 保护数据. 可以授予用户访问表的特定部分的权限,而不是整个表的访问权限
- 更改数据格式和表示. 视图可返回与底层表的表示和格式不同的数据

视图创建和使用的一些最常见的规则和限制:

- 与表一样, 视图必须唯一命名(不能给视图取与别的视图或表相同的名字).
- 对于可以创建的视图数目没有限制.
- 创建视图, 必须具有足够的访问权限. 这些权限通常由数据库管理人员授予
- 视图可以嵌套, 即可以利用从其他视图中检索数据的查询来构造视图.所允许的嵌套层数在不同的 DBMS 中有所不同(嵌套视图可能会严重降低查询的性能, 因此在产品环境中使用之前, 应该对其进行全面测试).
- 许多 DBMS 禁止在视图查询中使用ORDER BY子句.
- 有些 DBMS 要求对返回的所有列进行命名, 如果列是计算字段, 则需要使用别名(关于列别名的更多信息, 请参阅第 7 课).
- 视图不能索引, 也不能有关联的触发器或默认值.
- 有些 DBMS 把视图作为只读的查询, 这表示可以从视图检索数据, 但不能将数据写回底层表. 详情请参阅具体的 DBMS 文档.
- 有些 DBMS 允许创建这样的视图, 它不能进行导致行不再属于视图的插入或更新. 例如有一个视图, 只检索带有电子邮件地址的顾客. 如果更新某个顾客, 删除他的电子邮件地址, 将使该顾客不再属于视图. 这是默认行为, 而且是允许的,但有的 DBMS 可能会防止这种情况发生.

### 创建视图

创建视图语句为： `CREATE VIEW`, 只能用于创建不存在的视图. 如果需要重命名视图, 需要先删除: `DROP VIEW viewname;`. 然后再重新创建.

#### 通过视图简化复杂联结

视图常见的应用是隐藏复杂的 SQL, 通常也涉及联结.

```sql
CREATE VIEW ProductCustomers AS
SELECT cust_name, cust_contact, prod_id
FROM Customers, Orders, OrderItems
WHERE Customers.cust_id = Orders.cust_id
      AND OrderItems.order_num = Orders.order_num;

-- 创建完成视图后可以当作表来使用
-- 检索订购了产品 RGAN01 的顾客
SELECT cust_name, cust_contact
FROM ProductCustomers
WHERE prod_id = 'RGAN01';
```

视图极大地简化了复杂 SQL 语句的使用, 可以利用视图, 一次性编写基础的 SQL, 在根据需要多次使用. 创建不绑定特定数据的视图, 扩展视图的范围能够使得视图更能被重用, 而无需创建多个和维护多个类似的试图. 就像编程里面进行函数抽象, 不绑定特定数据的函数能够更好地重用.

#### 用视图重新格式化检索出的数据

```sql
SELECT RTRIM(vend_name) + ' (' + RTRIM(vend_country) + ')' AS vend_title
FROM Vendors
ORDER BY vend_name;

-- MySql 实现
SELECT CONCAT(RTRIM(vend_name), ' (', RTRIM(vend_country), ')') AS vend_title
FROM Vendors
ORDER BY vend_name;

-- 假设经常需要相同格式的结果, 可以创建一个试图, 在需要时使用即可
CREATE VIEW VendorLocations AS
SELECT CONCAT(RTRIM(vend_name), ' (', RTRIM(vend_country), ')') AS vend_title
FROM Vendors;

-- 就可以正常使用
SELECT *
FROM VendorLocations;
```

#### 用视图过滤不想要的数据

```sql
CREATE VIEW CustomerEMailList AS
SELECT cust_id, cust_name, cust_email
FROM Customers
WHERE cust_email IS NOT NULL;

-- 将不具有邮件的用户过滤掉之后, 就能获取到有邮件的所有用户了
SELECT *
FROM CustomerEMailList;
```

#### 使用视图与计算字段

使用第七课中的例子, 检索某个订单的物品, 计算每种物品的总价格.

```sql
SELECT prod_id,
       quantity,
       item_price,
       quantity * item_price AS expanded_price
FROM OrderItems
WHERE order_num = 20008;

-- 转换为视图
CREATE VIEW OrderItemsExpanded AS
SELECT order_num,
       prod_id,
       quantity,
       item_price,
       quantity * item_price AS expanded_price
FROM OrderItems;

-- 使用
SELECT *
FROM OrderItemsExpanded
WHERE order_num = 20008;
```

视图为虚拟的表. 它们包含的不是数据而是根据需要检索数据的查询. 视图提供了一种封装SELECT语句的层次, 可用来简化数据处理, 重新格式化或保护基础数据.

## 第十九课 使用存储过程

大多数 SQL 语句是针对一个或多个表的单条语句, 但有时有些复杂的操作需要多条语句才能完成, 如:

- 处理订单时, 必须核对以保证库存中有相应的物品
- 如果物品有库存, 需要预定, 不再出售给别人, 并减少物品数据以反映正确的库存量
- 库存中没有的物品需要订购, 需要与供应商进行某种交互
- 关于哪些物品入库(并可以立即发货)和哪些物品退订, 需要通知相应的顾客

上面的处理需要针对许多表的多条 SQL 语句, 且执行的具体 SQL 语句以及其次序不是固定的. 可能会根据物品是否在库存中而变化.

这个情况下可以创建存储过程, 而存储过程简单说就是**为以后使用而保存的一条或多条 SQL 语句**, 可以视为**批文件**, 但存储过程的作用不仅限于批处理.

### 使用存储过程的理由

- 通过把处理封装在一个易用的单元中, 可以简化复杂的操作(如前面例子所述)
- 由于不要求反复建立一系列处理步骤, 因而保证了数据的一致性. 如果所有开发人员和应用程序都使用同一存储过程, 则所使用的代码都是相同的. <br>这一点的延伸就是防止错误. 需要执行的步骤越多, 出错的可能性就越大. 防止错误保证了数据的一致性.
- 简化对变动的管理, 如果表名, 列名或业务逻辑(或别的内容)有变化, 那么只需要更改存储过程的代码. 使用它的人员甚至不需要知道这些变化. <br> 这一点的延伸就是安全性. 通过存储过程限制对基础数据的访问, 减少了数据讹误(无意识的或别的原因所导致的数据讹误)的机会.
- 因为存储过程通常以编译过的形式存储, 所以 DBMS 处理命令的工作较少, 提高了性能.
- 存在一些只能用在单个请求中的 SQL 元素和特性, 存储过程可以使用它们来编写功能更强更灵活的代码.

换句话说, 存储过程有三个主要好处: 简单, 安全, 高性能.

存储过程的一些缺点:

- 可移植性差, 但存储过程的自我调用(名字以及数据如何传递)可以相对保持可移植. 因此, 如果需要移植到别的 DBMS, 至少客户端应用代码不需要变动.
- 比编写基本 SQL 语句复杂, 需要更高的技能与更丰富的经验.

### 执行存储过程

执行存储过程的 SQL 语句为: `EXECUTE`, 语句接受存储过程名和需要传递给它的任何参数.

```sql
EXECUTE AddNewProduct('JTS01',
                      'Stuffed Eiffel Tower',
                      6.49,
                      'Plush stuffed toy with the text La
Tour Eiffel in red white and blue');
```

### 创建存储过程

```sql
-- 对邮件发送清单中具有邮件地址的顾客进行计数
-- Oracle 版本
CREATE PROCEDURE MailingListCount (
      ListCount OUT INTERGE
)
IS
v_rows INTEGER;
BEGIN
      SELECT COUNT(*) INTO v_rows
      FROM Customers
      WHERE NOT cust_email IS NULL;
      ListCount := v_rows;
END;

-- Oracle 调用方式
var ReturnValue NUMBER
EXEC MailingListCount(:ReturnValue);
SELECT ReturnValue;
```

## 第二十课 管理事务处理

使用事务处理, 通过确保成批的 SQL 操作要么完全执行, 要么完全不执行, 来维护数据库的完整性.

事务处理的几个术语:

- 事务(transaction)指一组 SQL 语句
- 回退(rollback)指撤销指定 SQL 语句的过程
- 提交(commit)指将未存储的 SQL 语句结果写入数据库表
- 保留点(savepoint)指事务处理中设置的临时占位符( placeholder ), 可以对它发布回退(与回退整个事务处理不同)

事务处理用来管理INSERT、UPDATE和DELETE语句, 但无法回退 SELECT 语句, CREATE 或 DROP 操作. 不同的 DBMS 实现事务处理的语法有所不同, 使用时需要参阅文档.

管理事务的关键在于将 SQL 语句组分解为逻辑块, 明确规定数据何时回退, 何时不应该回退.

```sql
-- SQL Server
BEGIN TRANSACTION
...
COMMIT TRANSACTION

-- MySql 用法
START TRANSACTION
...
-- 没有规定结束, 事务一直存在, 直到被中断.
```

### 使用 ROLLBACK

SQL 的 ROLLBACK 命令用来回退(撤销) SQL 语句

```sql
-- 这里没有什么用, 但可以说明 DELETE 与 INSERT, UPDATE 一样, 并不是最终的结果
DELETE FROM Orders
ROLLBACK;
```

### 使用 COMMIT

一般的 SQL 语句是针对数据库表直接执行和编写的, 属于隐式提交, 提交操作是自动进行的. 而事务处理块中, 提交不会隐式进行. 进行明确的提交, 使用 COMMIT 语句.

```sql
BEGIN TRANSACTION
DELETE OrderItems WHERE order_num = 12345
DELETE Orders WHERE order_num 12345
COMMIT TRANSACTION
```

### 使用保留点

对简单的事务使用 ROLLBACK 和 COMMIT 就可以写入或撤销整个事务. 但对于复杂的事务可能需要部分提交或回退. 要支持部分回退, 需要在事务处理块中合适位置放置占位符. 在需要回退时, 回到某个占位符. SQL 中这些占位符称为保留点. 每个保留点都需要唯一识别的名字, 供回退时使用.

```sql
-- MySql, Oracle 等里面可以使用 `SAVEPOINT` 语句.
SAVEPOINT delete1;

-- SQL Server 版本
SAVE TRANSACTION delete1;

-- 回退
ROLLBACK TRANSACTION delete1;

-- MySql 中
ROLLBACK TO delete1;
```

一个完整的 SQL Server 例子

```sql
BEGIN TRANSACTION
INSERT INTO Customers(cust_id, cust_name)
VALUES('1000000010', 'Toys Emporium');
SAVE TRANSACTION StartOrder;
INSERT INTO Orders(order_num, order_date, cust_id)
VALUES(20100,'2001/12/1','1000000010');
IF @@ERROR <> 0 ROLLBACK TRANSACTION StartOrder;
INSERT INTO OrderItems(order_num, order_item, prod_id, quantity, item_price)
VALUES(20100, 1, 'BR01', 100, 5.49);
IF @@ERROR <> 0 ROLLBACK TRANSACTION StartOrder;
INSERT INTO OrderItems(order_num, order_item, prod_id, quantity, item_price)
VALUES(20100, 2, 'BR03', 100, 10.99);
IF @@ERROR <> 0 ROLLBACK TRANSACTION StartOrder;
COMMIT TRANSACTION
```

`@@ERROR` 作为 DBMS 中的一个特殊变量, 用其可查看是否有错误发生, 不同的 DBMS 获取错误信息的方式可能不一样.

