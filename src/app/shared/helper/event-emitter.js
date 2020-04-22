export class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(channel, cb) {
        if (Array.isArray(this.events[channel])) {
            this.events[channel].push(cb);
        } else {
            this.events[channel] = [cb];
        }
    }
    emit(channel, ...args) {
        if (Array.isArray(this.events[channel])) {
            this.events[channel].forEach(cb => cb.apply(null, args));
        }
    }
}
