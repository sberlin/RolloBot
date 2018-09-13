const path = require('path');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    externals: {
        gpio: 'gpio',
        pigpio: 'pigpio'
    }
};
