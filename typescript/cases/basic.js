// generic array type: Array<elemType>
// 数组泛型
var list = [1, 2, 3];
// Type assertions
// 类型断言
var n = [1, 2, 3];
var roa = n;
n = roa;
// enum
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Orange"] = 1] = "Orange";
})(Color || (Color = {}));
var r = Color[1];
var c = Color.Orange;
// Destructuring
var o = {
    a: 'foo',
    b: 12,
    c: 'bar'
};
var newName1 = o.a, newName2 = o.b;
var a = o.a, _a = o.b, b = _a === void 0 ? 1001 : _a;
function f(_a) {
    var _b = _a === void 0 ? { a: "" } : _a, a = _b.a, _c = _b.b, b = _c === void 0 ? 0 : _c;
    // ...
}
f();
