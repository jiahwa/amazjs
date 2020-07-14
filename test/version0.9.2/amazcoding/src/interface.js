'use strict';
module.exports = {addPrivateProperty, trace, isFunction, isArray, memoizer};
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
 * @description 此处的校验函数，没有特别地传入cof对象类型参数
 */
function isFunction(arg) {
    return Object.prototype.toString.call(arg) === "[object Function]";
}
/**
 * 类型检查，数组
 * @param {any} arg 
 * @description 此处的校验函数，没有特别地传入cof对象类型参数
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
 * 记忆功能构造函数
 * @param {object} conf
 * @arg {Array} meno 
 * @arg {function} fundamental 
 */
function memoizer(conf) {
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
                this.prototype = new Parent();
                return this;
            }
        });
     }
}());