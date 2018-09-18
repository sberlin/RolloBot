const models = require("./models");

class ButtonService {
    constructor () {
        this._events = [];
    }

    on(eventName, action, modelName) {
        const model = models[modelName];
        if (model) {
            model.getButton().on(eventName, action);
            this._events.filter((event) => event.eventName === eventName).forEach((event) => {
                model.getButton().removeListener(event.eventName, event.action);
            });
            this._events = this._events.filter((event) => event.eventName !== eventName);
            this._events.push({eventName, action});
        } else {
            throw { "code": 400, "message": `Hardware model '${modelName}' not found` };
        }
    }
}

module.exports = new ButtonService();
