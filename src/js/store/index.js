import {
    initialData
} from './data';
import {
    events
} from '../events';

export const store = (() => {
    let data = initialData;
    return {
        backToInitialData() {
            data = initialData;
            return data;
        },
        addData() {
            data.push(...data);
            console.log(data);
            events.emit('renderProducts', data);
            return data;
        },
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