
if (process && process.env.NODE_ENV === "DEBUG") {
    const readline = require('readline');
    const Motor = require('./src/motor');
    const models = require('./src/models');

    console.log("Running on Node.js in debug mode");
    console.log("Use basic CLI for debugging");

    // mock pins
    const motor = new Motor({pwm: 4, fwd: 17, rev: 18}, models.MOCK);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('Forward/Reverse/Stop ([f|r|s] [speed] [seconds]): ');
    rl.prompt();

    rl.on('line', (line) => {
        if (line.trim()) {
            let input = line.trim().toLowerCase().split(' ');
            if (input[0] === 'f') {
                console.log(`Forward with speed ${input[1]} for ${input[2]} seconds`);
                motor.forward(input[1], input[2]);
            }
            if (input[0] === 'r') {
                console.log(`Reverse with speed ${input[1]} for ${input[2]} seconds`);
                motor.reverse(input[1], input[2]);
            }
            if (input[0] === 's') {
                console.log('Stop');
                motor.stop();
            }
        }
    });
} else {
    console.log("Running in production mode");

    require('./src/index.js');
}
