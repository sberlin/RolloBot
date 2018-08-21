
const Motor = require('./src/motor');

const motor = new Motor({pwm: 7, fwd: 8, rev: 9});
motor.forward(1, 2);
