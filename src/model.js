
class Model {
    constructor (id, low, high, newPin, write, btn) {
        this.id = id;
        this.LOW = low;
        this.HIGH = high;
        this.newPin = newPin;
        this.write = write;
        this.btn = btn;
    }
}

module.exports = Model;
