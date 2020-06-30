(function(window,module){

var jQ = function (selector, context) { 
    return new jQ.fn.init();
};
jQ.fn = jQ.prototype = { 
    version:'1.01',
    options:{
        undressMap:[]
    }
};
var init = jQ.fn.init = function () { 
    this.name = 'lin';
} 

init.prototype = jQ.fn;

return module.exports = window.jQ = jQ;
    
})(typeof window!== "undefined" ? window : this, typeof module!== "undefined" ? module : {});