import {

    initialData

} from './store.js';

import {

    events

} from './events.js';




export const iventory = (() => {

    let data = initialData;

    return {

        backToInitialData() {

            data = initialData;

            events.emit('displayProducts', data);

            return data;

        },

        addData() {

            data.push(...data);

            console.log(data);

            events.emit('displayProducts', data);

            return data;

        },

        getData() {
            
            return data;
            
        },

        setData(newData) {

            data = [...newData];

            events.emit('displayProducts', data);
            
            return data;

        }

    }

})();