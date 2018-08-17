const Gpio = require('pigpio').Gpio;

class Motor {
    constructor (mapping = {}) {
        this.LOW = 0;
        this.HIGH = 255;
        this.pins = {};
        const pinKeys = ["pwm", "fwd", "rev"];
        for (let i in pinKeys) {
            const key = pinKeys[i];
            const pinNumber = mapping[pinKeys[i]];
            if (pinNumber) {
                this.pins[key] = new Gpio(
                    pinNumber,
                    {mode: Gpio.OUTPUT}
                );
            }
        }
    }
    _start (speed) {
        this.pins.pwm.pwmWrite(speed || this.HIGH);
    }
    stop () {
        this.pins.pwm.pwmWrite(this.LOW);
    }
    forward (speed, seconds) {
        this._timeout(seconds);
        this.pins.fwd.pwmWrite(this.HIGH);
        this.pins.rev.pwmWrite(this.LOW);
        this._start(speed);
    }
    reverse (speed, seconds) {
        this._timeout(seconds);
        this.pins.fwd.pwmWrite(this.LOW);
        this.pins.rev.pwmWrite(this.HIGH);
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

