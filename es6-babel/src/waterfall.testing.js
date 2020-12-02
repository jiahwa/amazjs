function waterfall(tasks, context) {
    return tasks.reduce((promise, task) => {
      return promise.then(ctx => task(ctx));
    }, Promise.resolve(context));
  }
  
  function task1(ctx) {
    return new Promise(function(resolve, reject) {
      console.log('task1 create...');
      setTimeout(() => {
        ctx.task1Res = 'task1 res...';
        console.log('task1 resolved', ctx);
        resolve(ctx);
      }, 1000);
    });
  }
  
  function task2(ctx) {
    return new Promise(function(resolve, reject) {
      console.log('task2 create...');
      setTimeout(() => {
        ctx.task2Res = 'task2 res...';
        console.log('task2 resolved', ctx);
        resolve(ctx);
      }, 50);
    });
  }
  
  function task3(ctx) {
    return new Promise(function(resolve, reject) {
      console.log('task3 create...');
      setTimeout(() => {
        ctx.task3Res = 'task3 res...';
        console.log('task3 resolved', ctx);
        resolve(ctx);
      }, 250);
    });
  }
  
  const ctx = { hello: 123 };
  
  waterfall([task1, task2, task3], ctx).then(function(ctx) {
    // console.log(ctx);
  });
  