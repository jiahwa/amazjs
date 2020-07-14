const {} = require("./interface");
// 词法分析中对作用域的处理
// 作用域类比嵌套层级关系，因此可以借鉴用来对语句嵌套的情况进行分析
/**
 * @description 当遇到{开始block被调用。
 * parse函数从作用域中寻找符号，并且当定义新的符号时，扩充scope。
 * @see http://zh.wikipedia.org/wiki/TeX
 * 功能强大的排版软件，词法符号分析借鉴
 */
var block = function() {
    // 当前作用域作记录
    var lastScope = scope;
    // 构造一个包含了当前作用域中所有对象的新作用域
    scope = Object.beget(scope);
    // advance接收所有字符，先是将{传入
    advance("{");
    // 使用新的作用域解析
    parse(scope);
    // 后接着传递}给advance，同时抛弃新作用域，恢复上一个作用域
    advance("}");
    scope = lastScope;
};