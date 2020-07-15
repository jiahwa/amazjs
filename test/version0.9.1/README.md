# vesion0.9.1
对css的管理，包括兼容，资源管理

## 如何检测浏览器对html5的样式的支持
Shiv的思路是通过定义一个超链接元素a，然后检测在当前浏览器中a元素是否具备hidden属性，hidden为html5中新增的一个属性，使用该属性可以对元素进行隐藏
```javascript
    supportsHtml5Styles = ('hidden' in a);
```

|浏览器|版本|兼容情况|
|-----|---|-------|
|Chrome|18。0.1025.168|true|
|FireFox|12.0|true|
|Safari|5.1.7|true|
|Opera|11.64|true|
|IE|9|false|
|IE|8|false|
|IE|7|false|
## 如何检测浏览器对未知元素的支持情况
Shiv的思路是，给定义的a元素填充一未知元素，然后检测a的子元素的个数，若等于1则表示支持未知元素，否则不支持。其次通过检查一个错位执行的支持情况(document.createElement)('a')。最后，通过对文档碎片节点的一些方法的支持情况来进行判断