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

// 我们还可以使用带有调用签名的对象字面量来定义泛型函数
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: {<T>(arg: T): T} = identity;

// 在泛型里使用类类型
function create<T>(c: {new(): T; }): T {
  return new c();
}

// let x,y;
// 难点：类型兼容的三种情况
// 1. 对象类型。如果y要赋值给x，那么要检查x的每一条属性是否在y中也能找到对应
(function(){
  interface X {
    name: string
  }
  interface Y {
    name: string,
    age: number
  }
  let x: X;
  let y: Y;
  x = y;
  y = x;
})();
// 2. 函数类型先比较参数。
// 1) 如果x要赋值给y，那么要检查参数列表，x的每一个参数是否能在y中也找到对应类型的参数
(function(){
let x = (a: number) => 0;
let y = (a: number, b: string) => 0;
x = y; //Error
y = x; //Ok
})();
// 2) 再检查返回值，类型系统强制源函数的返回值类型必须是目标函数返回值类型的子类型
(function(){
  interface X {
    name: string
  }
  interface Y {
    name: string,
    age: number
  }
// let x = function(a: X, b: Y): X {
//   return a;
// }
// let y = function(a: X, b: Y, c: number): Y {
//   return b;
// }
//简写
let x = (a: X, b: Y) :X => a;
let y = (a: X, b: Y): Y => b;

x = y; //Error
y = x; //Error

// 扩展：怎样让该等式也不成立，只要让y的参数列表(避免重名，用z代替)，
//    在x的参数中有不存在的项就可以了
let z = (a: X, b: Y, c: X): Y => b;
x = z; //Error
})();

// 函数参数双向协变

/**
listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + ',' + (<MouseEvent>e).y));
listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + ',' + e.y)));

*/

// 映射类型，动态改变已定义的接口
/**
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
type Partial<T> = {
    [P in keyof T]?: T[P];
}

type ReadonlyPerson = Readonly<Person>
 */
// 类似于动态变量name的使用
(function(){
  let a: object = {};
  let name: any = '0';
  name = 1;
  name = true;
  name = null;
  name = undefined;

  a[name] = 'abc';
})

// 包装和拆包，就类似于创建一个对象和属性，遍历分析对象属性

// 扩展模块
/**
declare module "./observable" {
  interface Observable<T> {
      map<U>(f: (x: T) => U): Observable<U>;
  }
}
*/
