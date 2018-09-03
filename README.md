# RolloBot
Control a motor via GPIO to open and close shutters

## Hardware
This project is targeting the [Neonious One](https://www.neonious.com/) as
hardware. For local development the code is written with runtime compatibility
to [Node.JS](https://nodejs.org/) and a
[Raspberry Pi](https://www.raspberrypi.org/) in mind.

## Usage
### Node.JS
Start the application with `npm install && npm start`. It uses the
[pigpio](https://www.npmjs.com/package/pigpio) library available on Raspberry Pi.

### Neonious One
Upload the files located in `src/` by using the integrated IDE. Take care of the
maximum module depth limited by stack size by copying errornous module's code
into the depending module.

## TODO
* Use a build tool to generate a single JS file to use on Neonious One

## Resources

* https://www.neonious.com/TPManual
* https://github.com/neoniousTR/table_radar

