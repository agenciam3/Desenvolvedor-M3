
export const events = {

    events: {},

    on: function (eventName, fn) {

        this.events[eventName] = this.events[eventName] || [];

        this.events[eventName].push(fn);

    },
    once: function(eventName, fn) {    
             this.listeners[eventName] = this.listeners[eventName] || [];   
                const onceWrapper = () => {      
                 fn();     
                 this.off(eventName, onceWrapper);  
                }    
                this.listeners[eventName].push      (onceWrapper);    
                return this; 
        
            },

    off: function (eventName, fn) {

        if (this.events[eventName]) {

            for (var i = 0; i < this.events[eventName].length; i++) {

                if (this.events[eventName][i] === fn) {

                    this.events[eventName].splice(i, 1);

                    break;

                }

            };

        }

    },

    emit: function (eventName, data) {

        if (this.events[eventName]) {

            this.events[eventName].forEach(function (fn) {

                fn(data);

            });

        }

    }

};




