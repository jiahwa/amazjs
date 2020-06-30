# version 0.9
仍处于开发阶段的版本

- 功能不完整
- 文档结构未编排
- 无实质性输入输出

<h3 align="center">Design mode</h3>
<h3 align="center">禅院</h3>

- [Vsurecoding]
- [AI]

[vsurecoding]:###vsurecoding
[AI]:###Artificial-Intelligence

<h3 align="center">VSureCoding</h3>

### Vsurecoding
A platform for website desgin, develpment

---
### API

| 方法 | 参数 | 参数类型 | 参数举例 | 含义 | 调用举例 |
|-----|------|--------|---------|-----|---------|
| filesystem ||||文件系统，包含[元指令]、[解集合] [定向生成]||
|            | fileseq | number | n > 0，如：1，2 ...         | 元指令名称，范围是 [ 1, 99999] 的递增序列   | [见示例1] | 
|            | data    | object | { ^0 : {}, 0: {}, $0: {} } | 解集合，以^0、0、$0组成的对象结构           | [见示例1] |
|||||||

[见示例1]:###示例1
[元指令]:###元指令
[解集合]:###解集合
[定向生成]:###定向生成

---
### Documents

### 元指令

> 元指令，用Dir表示，是给业务范畴的功能元件。

示例：

如，Dir_table

### 解集合

> 构成某一业务功能元件的多个元指令解的集合，解集合有最优解。

示例：
```javascript
//解集合举例
//
//同时假定:
//      1. Dir1，表示预定义元指令，功能是html文本中的要素放置行为
//      2. S1，表示某一数据域录入值多选非空，具备从静态数据集中取值的特性
//
//那么，S1 + Dir1，就构成一个指令求解，含义是在网页录入特定要素，输入有校验。
const S1 = { name, value, In, multiple, notNull, options_static }


```

### 定向生成

> 变量，定向生成相对路径：

```javascript

const REATIVEPATH = "/dist/Dir"；

```

目标文件目录根目录，是当前启动程序的预设值目录。

## coding area

### 示例1：

```javascript
const vs = require( "./extend" ); 
vs.filesystem( 1, { "^0" : {},
                    "0"  : {},
                    "$0" : {} 
                                });
```
---
<h3 align="center">AI</h3>

### Artificial-Intelligence
AI, let web brighter, smarter, stronger

---
### Rust engine