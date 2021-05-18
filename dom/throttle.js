// 节流函数
var throttle = function(func, delay) {
    var timer = null;
    return function inner() {   
        var context = this;  
        var args = arguments;
        if (!timer) {
            timer = setTimeout(function() {
                func.apply(context, args);
                timer = null;
            }, delay);
        }
    }
}

window.onload = function() {
    var t = 3000; // 间隔时长，可以根据需求改动为3分钟: 1000*60*3
    var current = Date.now()
    
    function handle() {
        /** 可以被任意执行代码替换的区域 start */
        var p = document.createElement("p");
        var id = document.getElementById("id");
        var next  =  Date.now()

        p.textContent = "There is " + (next - current) + " ms break between Function handle execute." 
        console.log(p.textContent);

        id.append(p)

        current = next
         /** 可以被任意执行代码替换的区域 end */
    }

    // 为 mousemove 和 keydown 创建一个公用回调
    var callback = throttle(handle, t);
    window.onunload = function(){
        window.removeEventListener('mousemove', callback);
        window.removeEventListener('keydown', callback);
    };
    
    window.addEventListener('mousemove', callback);
    window.addEventListener('keydown', callback);
}
