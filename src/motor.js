const gpio = require('gpio');

class Motor {
    constructor (mapping = {}) {
        this.LOW = 0;
        this.HIGH = 1;
        this.pins = {};
        const pinKeys = ["pwm", "fwd", "rev"];
        for (let i in pinKeys) {
            const key = pinKeys[i];
            const pinNumber = mapping[pinKeys[i]];
            if (pinNumber) {
                this.pins[key] = gpio.pins[pinNumber];
                this.pins[key].setType(gpio.OUTPUT);
            }
        }
    }
    _start (speed) {
        this.pins["pwm"].setValue(speed || this.HIGH);
    }
    stop () {
        this.pins["pwm"].setValue(this.LOW);
    }
    forward (speed, seconds) {
        this._timeout(seconds);
        this.pins["fwd"].setValue(this.HIGH);
        this.pins["rev"].setValue(this.LOW);
        this._start(speed);
    }
    reverse (speed, seconds) {
        this._timeout(seconds);
        this.pins["fwd"].setValue(this.LOW);
        this.pins["rev"].setValue(this.HIGH);
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

