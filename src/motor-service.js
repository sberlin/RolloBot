const Motor = require("./motor");
const models = require("./models");

class MotorService {
    constructor () {
        this._motors = [];
    }

    create(mapping, modelName) {
        const model = models[modelName];
        let newMotor = null;
        if (model) {
            newMotor = new Motor(this._motors.length, mapping, model);
            this._motors.push(newMotor);
        } else {
            throw { "code": 400, "message": `Hardware model '${modelName}' not found` };
        }
        return newMotor;
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

    start(id, speed, seconds, reverse = false) {
        const motor = this.find(id);
        if (motor) {
            if (reverse) {
                motor.reverse(speed, seconds);
            } else {
                motor.forward(speed, seconds);
            }
        }
        return motor;
    }

    stop(id) {
        const motor = this.find(id);
        if (motor) {
            motor.stop();
        }
        return motor;
    }

    remove(id) {
        const motor = this.find(id);
        if (motor) {
            motor.stop();
            delete this._motors[id];
        }
        return motor;
    }
}

module.exports = new MotorService();
