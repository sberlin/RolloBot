
class Model {
    constructor (id, low, high, newPin, write, getButton) {
        this.id = id;
        this.LOW = low;
        this.HIGH = high;
        this.newPin = newPin;
        this.write = write;
        this.getButton = getButton;
    }
}

module.exports = Model;
