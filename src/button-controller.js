const buttonService = require('./button-service');

class ButtonController {
    constructor() {
        throw "Class not instantiable";
    }

    static onPress(action, modelName) {
        return this._on("fall", action, modelName);
    }

    static onRelease(action, modelName) {
        return this._on("rise", action, modelName);
    }

    static _on(eventName, action, modelName) {
        buttonService.on(eventName, action, modelName);
        return this;
    }
}

module.exports = ButtonController;
