const Motor = require("./motor");
const models = require("./models");

class MotorService {
    constructor () {
        this._motors = [];
    }

    find(id) {
        let motor = null;
        if (this._motors.length < id || !this._motors[id]) {
            throw { "code": 404, "message": `Motor with id '${id}' not found` };
        } else {
            motor = this._motors[id];
        }
        return motor;
    }

    getAll() {
        return this._motors;
    }
}

module.exports = new MotorService();
