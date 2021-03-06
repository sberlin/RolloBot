const http = require("http");
const url = require("url");
const MotorController = require("./motor-controller");
const ButtonController = require("./button-controller");

function attachButton(motorId, modelId) {
    ButtonController.onPress(() => {
        console.log(`Left button has been pressed. Starting motor '${motorId}'`);
        MotorController.start(motorId);
    }, modelId).onRelease(() => {
        console.log(`Left button has been released. Stopping motor '${motorId}'`);
        MotorController.stop(motorId);
    }, modelId);
}

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

        console.log(`[${req.method}] ${req.url}`);
        if (/^\/motor.*/.test(parsedUrl.pathname)) {
            let result = null;

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

                // link button to motor with latest API interaction
                if (result.data.id >= 0 && result.data.model) {
                    console.log(`Use left button to control motor '${result.data.id}'`);
                    attachButton(result.data.id, result.data.model.id);
                }
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
}).listen((process || {env: {NODE_ENV: "production"}}).env.NODE_ENV === 'DEBUG' ? 8080 : 80);

console.log("RolloBot API running!");
