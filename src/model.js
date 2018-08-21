
class Model {
    constructor (id, low, high, newPin, write) {
        this.id = id;
        this.LOW = low;
        this.HIGH = high;
        this.newPin = newPin;
        this.write = write;
    }
}

module.exports = Model;
