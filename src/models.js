const Model = require("./model");

let idCounter = 0;

const models = {
    "NEONIOUS_ONE": new Model("NEONIOUS_ONE", 0, 1,
        (pinNumber) => {
            const gpio = require("gpio");
            const pin = gpio.pins[pinNumber];
            pin.setType(gpio.OUTPUT);
            return pin;
        },
        (pin, speed) => pin.setValue(speed),
        () => require("gpio").pins[gpio.BUTTON]
    ),
    "RASPBERRY_PI": new Model("RASPBERRY_PI", 0, 255,
        (pinNumber) => {
            const Gpio = require("pigpio").Gpio;
            const pin = new Gpio(
                pinNumber,
                { mode: Gpio.OUTPUT }
            );
            return pin;
        },
        (pin, speed) => pin.pwmWrite(speed),
        () => null
    ),
    "MOCK": new Model("MOCK", 0, 255,
        () => null,
        () => null,
        () => null
    )
};

module.exports = models;
