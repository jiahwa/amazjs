// spread testing operator in es6
var _console = (...arg) => console.dir(arg);
function spread() {
    _console('newArg', ...arguments);
}

// test
spread(1,2,3,4,5,6)