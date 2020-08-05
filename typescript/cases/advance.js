// way 2: assign the object to another variable
var squareOptions = { colour: "red", width: 100 };
// Indexable Types, array index signature
// String index structrues, is good at describing "dictionary" pattern
// 我们还可以使用带有调用签名的对象字面量来定义泛型函数
function identity(arg) {
    return arg;
}
var myIdentity = identity;
