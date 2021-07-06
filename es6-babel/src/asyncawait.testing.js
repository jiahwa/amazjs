async function asyncFn(arg) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log(arg)
            resolve(`--${arg} done!--`)
        }, 1000);
    })
}
var array = [1,2,3,4,5]
async function main() {
    for (var i = 0; i < array.length; i++) {
        var res = await asyncFn(array[i])
        console.log(res)
    }
}

main() // 运行主函数
