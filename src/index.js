const http = require("http");
const url = require("url");
const MotorController = require("./motor-controller");

http.createServer(function (req, res) {
    const parsedUrl = new url.parse(req.url);
    res.setHeader("Content-Type", "application/json");

    let chunks = [];
    req.on("error", (err) => {
        console.error(err);
    }).on("data", (chunk) => {
        chunks.push(chunk);
    }).on("end", () => {
        const body = chunks.length ? Buffer.concat(chunks).toString() : null;

        if (/^\/motor.*/.test(parsedUrl.pathname)) {
            let result = null;
            console.log("REST endpoint 'motor' called");

            try {
                result = MotorController.resolve(parsedUrl.pathname, req.method, body);
            } catch (err) {
                res.statusCode = err.code || 500;
                res.statusMessage = err.message || "Oops";
                console.error(res.statusCode, res.statusMessage);
            }

            if (result) {
                res.statusCode = result.code || 200;
                res.statusMessage = result.message || "OK";
                res.end(JSON.stringify(result.data));
            } else {
                res.setHeader("Content-Length", "0");
                res.write("");
                res.end();
            }
        } else {
            res.setHeader("Content-Length", "0");
            res.statusCode = 404;
            res.statusMessage = "Not found";
            res.end();
        }
    });
}).listen(80);

console.log("RolloBot API running!");
