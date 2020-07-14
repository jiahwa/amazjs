'use strict';
var sourceMapping; //数据源

// 拆分的方法；递归拆分
// 第一层按不同范畴划分
// 按执行时间的先后顺序划分，分为初始化声明、运行轨迹、销毁（原vsure采用的结构）
// 按大小体量的包含顺序划分，分为前端系统，并列的模块，子模块，执行体，语句
// 按其他划分

// 逻辑构成
var logic;
// 时间优先，大小优先
logic = ["timeOrder","sizeOrder"];

/*-- "timeOrder"开始 --*/
// 初始化声明
var initial;
// 常量，变量
initial = ["variable", "constant"];
// ..

//运行轨迹
var trace;
// 栈调用结构，出栈元素执行
trace = ["stackCallee", "execute"];
// ..

//销毁
var destory;
// 释放空间，抛出异常
destory = ["spaceFree", "throwError"];
// ..
/*-- "timeOrder"结束 --*/