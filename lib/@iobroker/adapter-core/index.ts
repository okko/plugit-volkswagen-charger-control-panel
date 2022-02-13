class Adapter {
    config = {}
    registered: { [key: string]: any} = {}
    objectStore: { [key: string]: any} = {}
    state: { [key: string]: any} = {}
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
    on(name: string, func: any) {
        this.registered[name] = func;
    }
    sendEvent(dippa: string) {
        this.registered[dippa]();
    }
    setState(name: string, value: any) {
        console.log('state ' + name)
        console.log(value)
        this.state[name] = value
    }
    subscribeStates(param: string) {
        console.log('subscribing requested to ' + param);
    }
    setObjectNotExists(name: string, value: any) {
        this.objectStore[name] = value;
    }
    setObjectNotExistsAsync(name: string, value: any) {
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

export { Adapter }
