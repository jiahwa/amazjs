let p1 = Promise.resolve(555);
let p2 = 'abc';
let p3 = new Promise((resolve) => {
  setTimeout(resolve, 1000, 'timeout');
}); 
Promise.all([p1, p2, p3]).then(values => { 
  console.log(values);
}).catch((err)=>{console.log(err)})