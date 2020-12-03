function waterfall(tasks, context) {
  var defer = $q.defer()
      defer.resolve(context)

  return tasks.reduce(function(promise, task){
    return promise.then(ctx => task(ctx));
  }, defer.promise);
}

  function generator() {
    var defer = $q.defer
      setTimeout(function(){

        ctx[++ctx.count] = 'done'
        console.log('async: '+ctx.count)

        defer.resolve(ctx)
      },1000)
      
      return defer.promise
  }
  
  const ctx = { hello: 123,count:0};

  var array = [1,2,3,4,5]
  var queue = []

  var afterForStatement = function(ctx) {
    console.log('get rest from async: ')
    console.dir(ctx);
    
  } // 在for循环里的异步请求都完成之后执行的语句

  for (var index = 0; index < array.length; index++) {
      queue.push(generator)
      
  }
  waterfall(queue, ctx).then(function(ctx) {
    afterForStatement(ctx)
  })