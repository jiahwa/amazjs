// 绕过参数检查的方式
// way 1: index signatures 索引签名
interface inter{
    [propName: string]: any;
}
// way 2: assign the object to another variable
let squareOptions = { colour: "red", width: 100 };

// Function Types
interface SearchFunc {
    (source: string, subString: string): boolean;
  }

// Indexable Types, array index signature
// String index structrues, is good at describing "dictionary" pattern