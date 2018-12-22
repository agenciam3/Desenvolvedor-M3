import {
    initialData
} from './data';
import {
    events
} from '../events';

export const store = (() => {
    let data = initialData;
    return {
        getData() {
            return data;
        },
        setData(newData) {
            data = [...newData];
            events.emit('renderProducts', data);
            return data;
        }
    }
})();