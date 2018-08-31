const motorService = require('./motor-service');

class MotorController {
    constructor() {
        throw "Class not instantiable";
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

    static resolve(url, method, body) {
        const result = {};
        const pathParts = url.pathname.substring(1).split("/");

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
            default:
                throw {"code": 405, "message": `Invalid method '${method}'`};
        }
        return result;
    }
}

module.exports = MotorController;
