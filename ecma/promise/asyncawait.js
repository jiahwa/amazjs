let swi = false;

async function testfn(){
    await swi
    ?setup()
    :`ccc`

    return 'aaa'
}
function setup() {
    setTimeout(()=>{
        console.log(`bbb`)
    },5000)
}
testfn();
console.log(`ddd`)