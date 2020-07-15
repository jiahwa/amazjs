'use strict';
module.exports = {
    addPrivateProperty, 
    trace, 
    isFunction, 
    isArray, 
    memorizer,
    memorize, 
    array, 
    partial, 
    enumeration
};
/**
 * 对象添加私有属性
 * @param {object} config
 * @arg {object} object
 * @arg {string} name
 * @arg {function} check
 */
function addPrivateProperty(conf){
    var value; // 属性值
    // 参数配置
    conf = {
        object: conf.object,  // 对象
        name: conf.name,      // 属性
        check: conf.check     // 合法性检查规则
    };
    // 定义setter方法
    conf.object["set" + name] = function(arg) {
        if(conf.check && !conf.check(arg)) {
            throw Error("set " + name + ", invalid value: " + arg);  
        } else {
            value = arg;
        }
    };
    // 定义getter方法
    conf.object["get" + name] = function() {
        return value;
    };

}
// 自执行匿名函数
(function(){
    if(typeof Object.beget !== "function") {
        /**
         * 继承对象原型
         * @param {object} conf
         * @arg {object} object 
         */
        Object.beget = function(conf) {
            conf = {
                object: conf.object
            };
            var Fn = function() {};
            Fn.prototype = conf.object;
            return new Fn();
        };
    }
}());
/**
 * 方法执行追踪
 * @param {object} conf
 * @arg {object} object 
 * @arg {string} method 
 */
function trace(conf) {
    conf = {
        object: conf.object,
        method: conf.method
    };
    //在闭包中保存原始值
    var original = conf.object[conf.method];

    conf.object[conf.method] = function() {
        var method_z;
        // 执行前
        console.log(new Date(), "Entring", conf.method);
        // apply函数的第二个参数是实参数组
        method_z = original.apply(this, arguments);
        console.log(method_z);
        // 执行后
        console.log(new Date(), "Escaping", conf.method);
        return method_z;
    };
}
/**
 * 类型检查，函数对象（且具有函数方法）
 * @param {any} arg
 * @description 此处的校验函数，没有特别地传入conf对象类型参数
 */
function isFunction(arg) {
    return Object.prototype.toString.call(arg) === "[object Function]";
}
/**
 * 类型检查，数组
 * @param {any} arg 
 * @description 此处的校验函数，没有特别地传入conf对象类型参数
 */
function isArray(arg) {
    return Array.isArray 
    ? Array.isArray(arg)
    : typeof arg === "object" && Object.prototype.toString.call(arg) === "[object Array]";
}
// 匿名函数
(function(){
    if(typeof Array.prototype.reduce !== "function") {
        /**
         * 数组reduce函数
         * @param {object} conf
         * @arg {function} fn 
         * @arg {number} initial 
         */
        Array.prototype.reduce = function(conf) {
            conf = {
                fn: conf.fn,
                initial: conf.initial
            };
            var arr = this;
            var i = 0, len = this.length, next;

            if(arguments.length > 2) {
                next = conf.initial;
            } else {
                if(len == 0) {
                    throw TypeError();
                }
                while(i < len) {
                    if(i in arr) {
                        next = arr[i++];
                        break;
                    }
                    i++;
                }
                if(i == len) {
                    throw TypeError();
                }
            }
            while(i < len) {
                if(i in arr) {
                    next = conf.fn.call(undefined, next, arr[i], i, arr); // ? 任意形式的fn
                }
                i++;
            }
            return next;
        };
    }
    if(typeof Array.prototype.map !== "function") {
        /**
         * 数组map函数
         * @param {object} conf
         * @arg {function} fn 
         */
        Array.prototype.map = function(conf) {
            conf = {
                fn: conf.fn
            };
            var arr = this, len = arr.length;
            var result = [];

            for (var i = 0; i < len; i++) {
                if( i in arr) {
                    result[i] = conf.fn.call(undefined, arr[i], i, arr); // ?
                }
            }
            return result;

        };
    }
}());
/**
 * 记忆功能函数构造1
 * @example 
 * 例如：使用memorizer来定义fibonacci函数，提供初始的memo数组
 * 和fundamental函数：
 * // var fibonacci = memorizer({
 * //   memo: [0, 1],
 * //   fundamental: function(shell, n) {
 * //       return shell(n - 1) + shell(n - 2);
 * //   }
 * // });
 * //
 * //
 * @param {object} conf
 * @arg {Array} meno 
 * @arg {function} fundamental 
 */
function memorizer(conf) {
    conf = {
        memo: memo,
        fundamental: fundamental
    };
    var shell = function (n) {
        var result = conf.memo[n];
        if(typeof result !== "number") {
            result = conf.fundamental(shell, n);
            meno[n] = result;
        }
        return result;
    }
    return shell;
}
/**
 * 记忆功能函数构造2
 * @description 构造函数在它的内部创建了一个私有对象cache，
 * 作为缓存容器，把一个子函数作为返回函数。所返回的子函数将它的
 * 实参数组转换成字符串，并将字符串用作缓存对象的属性名，将执行函数
 * fn的执行结果作为缓存对象的属性值。完成创建的记忆函数被访问
 * 时，如果缓存中存在相同属性名，就直接返回它的值；否则，就调用执行
 * 函数fn对当前实参进行计算，按照旧有的形式存入缓存对象并返回。
 * @example 当我们写一个递归函数的时候，往往需要实现记忆功能，然而
 * 我们更倾向于调用实现了记忆功能的递归函数，而不是调用原递归函数。
 * 例如：阶乘函数
 * // var factorial = memorize({
 * // fn: function(n) {
 * //       return (n <= 1) ? 1: n * factorial(n-1);
 * //   }
 * // });
 * //
 * // factorial(5); // => 120，再次调用4~1都能快速取出缓存值
 * @param {object} conf 
 * @returns {function}
 */
function memorize(conf) {
    conf = {
        fn: conf.fn
    }
    // 值存储
    var cache = {};
    return function() {
        var key = arguments.length + Array.prototype.join.call(arguments, ",");
        if(key in cache) {
            return cache[key];
        } else {
            return cache[key] = conf.fn.apply(this, arguments);
        }
    }
}
//匿名函数
(function(){
     if(typeof Function.prototype.method !== "function") {
        /**
         * 函数原型增加方法
         * @param {object} conf 
         * @arg {string} name 
         * @arg {function} fn
         */
        Function.prototype.method = function(conf) {
            conf = {
                name: conf.name,
                fn: conf.fn
            }
            this.prototype[conf.name] = conf.fn;
            return this;
        }
     }
     if(typeof Function.prototype.inherits !== "function") {
        // 调用method方法，构造inherits函数级联编程
        Function.method({
            name: "inherits",
            fn: function(Parent) {
                console.log(Parent);
                this.prototype = new Parent();
                return this;
            }
        });
     }
}());
/**
 * 类型转化，类数组（或对象）转数组
 * @param {object} conf
 * @argument {arrayLike|object} object
 * @argument {number} n
 */
function array(conf) {
    conf = {
        object: conf.object,
        n: conf.n || 0      // default 0
    };
    return Array.prototype.slice.call(conf.object, conf.n);
}
/**
 * 不完全函数
 * 函数式编程的重要方法
 * @param {object} conf 
 * @param {any} x1
 * @param {any} x2
 * ...
 * @description 不完全函数编程风格的需要，此处未特别的传入conf对象类型参数
 */
function partial(fn/*, ...*/) {
    // 保存外部
    var args = arguments;
    return function() {
        // args参数列表的第2个下标，也是实参的第1个下标
        var arr = array(args, 1);
        var i = 0, j = 0;
        // 遍历args，内部函数的实参依次填充值是undefined的位置
        for(; i < arr.length; i++) {
            if(arr[i] === undefined) {
                arr[i] = arguments[j++];
            }
        }
        // 追加剩余的内部函数实参
        arr = arr.concat(array(arguments, j));
        return fn.apply(this, arr);
    };
}
/**
 * 枚举类型工厂函数
 * @description 工厂函数，不是构造函数，每次调用都会产生一个新类，自动
 * 追加实参作为新类的实例
 * @param {object} conf 
 * @argument {object} instance
 * @extends inherits
 */
function enumeration(conf) {
    conf = {
        instance: conf.instance
    };
    var Enumeration = function() {
        // throw TypeError("Arguments is needed, can not instantiate enumerations");
    };
    // 枚举实例继承扩展原型
    // 返回名字
    Enumeration.prototype.toString = function() {
        return this.name;
    };
    // 返回值
    Enumeration.prototype.valueOf = function() {
        return this.value;
    };
    // 转换JSON
    // ?
    Enumeration.prototype.toJson = function() {
        return JSON.parse(this.name);
    };
    // 类方法
    Enumeration.forEach = function(fn, c) {
        for (var i = 0; i < this.values.length; i++) {
            var val = this.values[i];
            fn.call(c, val);
        }
    };
    // 存放枚举实例对象，类成员的功能
    Enumeration.values = [];
    // 遍历每个传入值，创建新类型的实例
    for(var key in conf.instance){
        var ins = Object.beget(Enumeration.prototype);  // 创建一个实例对象
        ins.name = key;                             // name属性
        ins.value = conf.instance[key];             // value属性
        Enumeration[key] = ins;                    // 构造函数的属性，类成员
        Enumeration.values.push(ins);               // 存放到值数组
    }
    return Enumeration;
}