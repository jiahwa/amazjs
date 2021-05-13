export.testing.js
```js
export const abc = () => false
const A = 'a'
const B = 'b'
export {
    A,
    B
}
export default true
```

import.testing.js
```js
import {abc} from './export.testing'
import  * as ex  from './export.testing'
import expor from './export.testing'

console.dir(abc)
console.dir(ex)
console.dir(expor)
```


## VS 编译后

export.testing.js
```js
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.B = exports.A = exports.abc = void 0;

var abc = function abc() {
  return false;
};

exports.abc = abc;
var A = 'a';
exports.A = A;
var B = 'b';
exports.B = B;
var _default = true;
exports["default"] = _default;
```
import.testing.js
```js
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ex = _interopRequireWildcard(require("./export.testing"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

console.dir(ex.abc);
console.dir(ex);
console.dir(ex["default"]);

```