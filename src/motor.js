
class Motor {
    constructor (id, mapping, model) {
        if (!model || typeof model !== "object") {
            throw { "code": 405, "message": `Unknown motor model '${model}'` };
        } else {
            this.id = id;
            this.model = model;
            this.pins = {};
            this.state = "stopped";
            const pinKeys = ["pwm", "fwd", "rev"];
            for (let i in pinKeys) {
                const key = pinKeys[i];
                const pinNumber = mapping[key] || mapping[key.toUpperCase()];
                if (pinNumber) {
                    this.pins[key] = this.model.newPin(pinNumber);
                } else {
                    throw { "code": 405, "message": `Pin number to control motor function '${key}' missing` };
                }
            }
        }
    }
    _start (speed) {
        this.model.write(this.pins["pwm"], speed || this.model.HIGH);
        this.state = "started";
    }
    stop () {
        this.model.write(this.pins["pwm"], this.model.LOW);
        this.state = "stopped";
    }
    forward (speed, seconds) {
        this._timeout(seconds);
        this.model.write(this.pins["fwd"], this.model.HIGH);
        this.model.write(this.pins["rev"], this.model.LOW);
        this._start(speed);
    }
    reverse (speed, seconds) {
        this._timeout(seconds);
        this.model.write(this.pins["fwd"], this.model.LOW);
        this.model.write(this.pins["rev"], this.model.HIGH);
        this._start(speed);
    }
    _timeout (seconds = 0) {
        if (seconds) {
            setTimeout(() => {
                this.stop();
            }, seconds * 1000);
        }
    }
}

module.exports = Motor;

