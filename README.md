# RolloBot
Control a motor via GPIO to open and close shutters

## Hardware
This project is targeting the [Neonious One](https://www.neonious.com/) as
hardware. For local development the code is written with runtime compatibility
to [Node.JS](https://nodejs.org/) and a
[Raspberry Pi](https://www.raspberrypi.org/) in mind.

## Usage
### Node.JS
Start the application with `npm install && npm debug`. It uses the
[pigpio](https://www.npmjs.com/package/pigpio) library also available on Raspberry
Pi.

### Neonious One
Build the application with `npm install && npm neonious`. Upload the file
`dist/bundle.js` by using the integrated IDE. Bundling prevents errors regarding
the maximum module depth limited by stack size.

### API
The implemented web server provides an API to manage motor instances and their
states. For further information read the OpenAPI spec:
[Swagger UI](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/sberlin/RolloBot/master/swagger.yml)

## Resources

* [Technology Preview Manual](TPManual.pdf)
* https://www.neonious.com/Documentation/one
* https://github.com/neonious/neonone_examples
