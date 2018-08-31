const Motor = require("./motor");
const models = require("./models");

// use these pins on Neonious One as default
const motor = new Motor({pwm: 7, fwd: 8, rev: 9}, models.NEONIOUS_ONE);

// TODO
motor.forward(1, 10);
