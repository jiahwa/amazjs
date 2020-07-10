const http = require("http");

const c = require("./App.config");

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World!\n This is zorro server");
});

server.listen(c.port, c.hostname, ()=> {
    console.log(`Zorro server running at ${c.domain}: ${c.port}`);
});