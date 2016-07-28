var http = require('http');
var UglifyJS = require('uglify-js');
var uglifycss = require('uglifycss');


const PORT=8080;

function handleRequest(req, resp){
    var body='';
    req.on('data',function(chunk){
        body += chunk;
    });
    req.on('end',function(){
        console.log(req.url);

        if (req.url.startsWith("/js")) {
            try {
                var result = UglifyJS.minify(body, {fromString: true});
                resp.end(result.code);
            } catch (err) {
                console.log(err);
                resp.writeHead(400, {'Content-Type': 'text/plain'});
                resp.end("parse error");
            }
        } else {
            try {
                var result = uglifycss.processString(body);
                resp.end(result);
            } catch (err) {
                console.log(err);
                resp.writeHead(400, {'Content-Type': 'text/plain'});
                resp.end("parse error");
            }
        }
    });
}

var server = http.createServer(handleRequest);
server.listen(PORT, function(){
    console.log("Server listening on port %s", PORT);
});
