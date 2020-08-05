// generic array type: Array<elemType>
// 数组泛型
let list:Array<number> = [1,2,3];

// Type assertions
// angle-bracket 尖括号断言
let someValue: any = "This is a programe";
let len: number = (<string>someValue).length;
// 类型断言 2
let n:number[] = [1,2,3];
let roa: ReadonlyArray<number> = n;
n = roa as number[];

// enum
enum Color {'Red', 'Orange'}
let r: string = Color[1];
let c: Color = Color.Orange;

// Destructuring
let o = {
    a: 'foo',
    b: 12,
    c: 'bar'
}
let { a: newName1, b: newName2 } = o;
let { a, b=1001 }: { a: string, b: number } = o;
function f({ a, b = 0 } = { a: "" }): void {
    // ...
}
f();