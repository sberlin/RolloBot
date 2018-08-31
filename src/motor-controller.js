const motorService = require('./motor-service');

class MotorController {
    constructor() {
        throw "Class not instantiable";
    }

    static post(mapping, model) {
        return motorService.create(mapping, model);
    }

    static get(id) {
        let motor = null;
        if (id >= 0) {
            motor = motorService.find(Number(id));
        } else {
            throw { "code": 400, "message": `Invalid motor id '${id}'` };
        }
        return motor;
    }

    static getAll() {
        return motorService.getAll();
    }

    static start(id, paramMap) {
        motorService.start(id, paramMap.speed, paramMap.seconds, paramMap.reverse);
    }

    static stop(id) {
        motorService.stop(id);
    }

    static delete(id) {
        motorService.remove(id);
    }

    static resolve(path, method, body) {
        const result = {};
        const pathParts = path.substring(1).split("/");
        const reqObj = JSON.parse(body);

        switch (method) {
            case "GET":
                if (pathParts[1]) {
                    result.data = this.get(pathParts[1]);
                } else {
                    result.data = this.getAll();
                }
                result.code = 200;
                result.message = "OK";
                break;
            case "POST":
                if (!pathParts[1]) {
                    if (reqObj) {
                        result.data = this.post({
                            "pwm": reqObj["pwm"],
                            "fwd": reqObj["fwd"],
                            "rev": reqObj["rev"]
                        }, reqObj["model"]);
                        result.code = 201;
                        result.message = "Created";
                    } else {
                        throw {"code": 400, "message": "Motor parameters missing in request body"};
                    }
                } else {
                    throw {"code": 400, "message": "POST request does not accept path parameters"};
                }
                break;
            case "PUT":
                if (pathParts[1]) {
                    switch (reqObj["state"]) {
                        case "started":
                            // no GET parameters available :(
                            const {speed, seconds, reverse} = reqObj;
                            result.data = this.start(pathParts[1], {speed, seconds, reverse});
                            result.code = 204;
                            result.message = "No content";
                            break;
                        case "stopped":
                            result.data = this.stop(pathParts[1]);
                            result.code = 204;
                            result.message = "No content";
                            break;
                        default:
                            throw {"code": 400, "message": "Only setting motor state=[started|stopped] supported"};
                    }
                } else {
                    throw {"code": 400, "message": "Motor id is missing"};
                }
                break;
            case "DELETE":
                if (pathParts[1]) {
                    result.data = this.delete(pathParts[1]);
                } else {
                    throw {"code": 400, "message": "Motor id is missing"};
                }
                break;
            default:
                throw {"code": 405, "message": `Invalid method '${method}'`};
        }
        return result;
    }
}

module.exports = MotorController;
