var http = require('http');
var data = require('./data');
http.createServer((req,res)=>{
    if(req.url ==='/' ){
        res.write("Hello from Node");
        res.end();
    }
    if(req.url ==='/api/students'){
        res.write(JSON.stringify([1,2,3,4,5]));
        res.end();
    }
    if(req.url === '/data'){
        res.write(JSON.stringify(data));
        res.end();
    }
}).listen(3000);

console.log('Listening on port 3000');