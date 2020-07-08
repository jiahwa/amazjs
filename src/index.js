async function getComponent() {
    var element = document.createElement("div");

    const _ = await import(/* webpackChunkName:"lodash"*/"lodash");
    // Lodash, imported by this script
    element.innerHTML = join(["Hello", "webpack"], "");

    return element;
}

getComponent().then(component => {
   
    document.body.appendChild(component);
});