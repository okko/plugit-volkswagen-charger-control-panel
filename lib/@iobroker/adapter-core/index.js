class Adapter {
    config = {}
    registered = {}
    objectStore = {}
    state = {}
    log = console
    constructor() {
        console.log('creating adapter adapter')
        this.config = {
            type: process.env['WECONNECT_TYPE'] || "id",
            user: process.env['WECONNECT_USERNAME'],
            password: process.env['WECONNECT_PASSWORD'],
            historyLimit: -1,
            interval: process.env['WECONNECT_INTERVAL'] || 3,
        }
    }
    on(name, func) {
        this.registered[name] = func;
    }
    sendEvent(dippa) {
        this.registered[dippa]();
    }
    setState(name, value) {
        console.log('state ' + name)
        console.log(value)
        this.state[name] = value
    }
    subscribeStates(param) {
        console.log('subscribing requested to ' + param);
    }
    setObjectNotExists(name, value) {
        this.objectStore[name] = value;
    }
    setObjectNotExistsAsync(name, value) {
        this.objectStore[name] = value;
        return Promise.resolve(this.objectStore);
    }
    getState() {
        return this.state;
    }
    getObjectStore() {
        return this.objectStore;
    }
}

module.exports = { Adapter }
