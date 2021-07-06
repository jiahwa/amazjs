var promise = Promise.reject("Boom!");
promise.then(()=>{
    return "success";
}).then((success) => {
    console.log(success);
    throw new Error("Another Boom!");
}).catch((error) => {
    console.log(error); //BOOM!
});