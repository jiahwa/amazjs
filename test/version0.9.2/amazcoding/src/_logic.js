'use strict';

var logic;      // 逻辑根目录
var initial;    // 初始化test实例
var variable;   // 变量test实例
var constant;   // 常量test实例
var axios;      // 通讯test实例

// 面向对象编程
// 此处是构造函数的声明和调用

/**
 * 逻辑部分
 * @param {string} mode 
 */
function Logic( mode ) {

    // 当前模式
    this.mode = mode;
    // 模式集合
    this.modeset = "";
    // 具体方法
    this.method = "";
};
Logic.prototype.setModeset = function() {
    this.modeset = this.modeset === ""
    ? [].slice.call(arguments)
    : this.modeset.concat([].slice.call(arguments));
};
Logic.prototype.getModeset = function() {
    return this.modeset;
};
Logic.prototype.setMethod = function() {
    this.method = this.method === ""
    ? [].slice.call(arguments)
    : this.method.concat([].slice.call(arguments));
};
Logic.prototype.getMethod = function() {
    return this.method;
};
/* 调用Logic测试 */
logic = new Logic("timeOrder");
logic.setModeset("timeOrder", "sizeOrder");
logic.setMethod(
    {"initial": Function},
    {"trace": Function},
    {"destory": Function}
);
/* 测试终止 */

/**
 * 初始化声明
 */
function Initial() {

    // 初始化进程
    this.process = "";
};
Initial.prototype.setProcess = function() {
    this.process = this.process === ""
    ? [].slice.call(arguments)
    : this.process.concat([].slice.call(arguments));
};
Initial.prototype.getProcess = function() {
    return this.process;
};

/* 调用Initial测试 */
initial = new Initial();
initial.setProcess(
    {"variable": Array},
    {"constant": Array},
);
/* 测试终止 */

/**
 * 变量
 */
function Variable() {
    // 集合
    this.setMap = "";
};
Variable.prototype.set = function(key, value) {
    var con = {};
    con[key] = value;
    this.setMap = this.setMap === ""
    ? [con]
    : this.setMap.concat(con);
};
Variable.prototype.get = function() {
    return this.setMap;
};

/* 调用Variable测试 */
variable = new Variable();

var trndt = new Axios().request("TRDATE");
variable.set("trnDt", trndt);
var bizbrn = new Axios().request("BZBRCH");
variable.set("bizBrn", bizbrn);
variable.set("disBizBrn", true);
variable.set("disTrnDt", true);

variable.get();

// console.log(variable);

// 问题1：解决异步的请求顺序执行问题
// var trndt = new Axios().request("TRDATE");
// variable.set("trnDt", trndt); 如何定义和执行
/* 测试终止 */

/**
 * 常量
 */
var Constant = new Variable;
constant = new Constant();

/* 调用Constant测试 */
constant.set("page","1");
constant.get("size", "10");
/* 测试终止 */

/**
 * 通讯
 */
function Axios() {
    this.session = {
        TRDATE: "20200713",
        BZBRCH: "18101"
    };
};
Axios.prototype.request = function(arg) {
    return this.session === ""
    ? {}[arg]
    : this.response(arg);
};
Axios.prototype.response = function(arg) {
    return this.session[arg];
    
};

/* 调用Axios测试 */
axios = new Axios();
/* 测试终止 */


