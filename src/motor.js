
class Motor {
    constructor (mapping = {}, model) {
        this.model = model;
        this.pins = {};
        const pinKeys = ["pwm", "fwd", "rev"];
        for (let i in pinKeys) {
            const key = pinKeys[i];
            const pinNumber = mapping[pinKeys[i]];
            if (pinNumber) {
                this.pins[key] = this.model.newPin(pinNumber);
            }
        }
    }
    _start (speed) {
        this.model.write(this.pins["pwm"], speed || this.HIGH);
    }
    stop () {
        this.model.write(this.pins["pwm"], this.LOW);
    }
    forward (speed, seconds) {
        this._timeout(seconds);
        this.model.write(this.pins["fwd"], this.HIGH);
        this.model.write(this.pins["rev"], this.LOW);
        this._start(speed);
    }
    reverse (speed, seconds) {
        this._timeout(seconds);
        this.model.write(this.pins["fwd"], this.LOW);
        this.model.write(this.pins["rev"], this.HIGH);
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

