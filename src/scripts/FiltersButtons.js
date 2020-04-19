
import { iventory } from './manageStore.js';
import { events } from './events.js';




export default class Filters {

    constructor() {

        this.selectors();

        this.eventListeners();


    }

    selectors() {

        this.products = iventory.getData();
        this.priceOrder = document.querySelectorAll('.select option');

        this.colorGroup = document.querySelectorAll("#colorFilter label input[type='checkbox']");

        this.colorClicked = {};

        this.sizeGroup = document.querySelectorAll("#sizeFilter label input[type='checkbox']");

        this.sizeClicked = {};

        this.priceGroup = document.querySelectorAll("#priceFilter label input[type='radio']");

        this.priceCliked = {};
        this.filterOn = {};


    }

    eventListeners() {

        

        for (let input of this.colorGroup) {
            input.addEventListener('change', this.filterColor.bind(this));

            input.addEventListener('click', this.colorOut.bind(this));

            
            
    }
        for (let input of this.sizeGroup) {
            input.addEventListener('change', this.filterSize.bind(this));
            input.addEventListener('click', this.sizeOut.bind(this));
        }
        for (let input of this.priceOrder) {
            input.addEventListener('click', this.comboselect.bind(this));
        }
        for (let input of this.priceGroup) {
            input.addEventListener('change', this.filterprice.bind(this));
            input.addEventListener('change', this.priceOut.bind(this));
        }
        
    }


    comboselect(e) {
        let datemax = [];
        let pricemin = [];
        let pricemax = [];
        function ordenacaoasc(a, b) {
            return a - b;
        }
        function ordenacaodesc(a, b) {
            return b - a;
        }
        if (e.target.checked.value == "date") {
            datemax = this.products.map(date.reverse());
            iventory.setData(this.products);

        } else if (e.target.value == "pricemin") {

            pricemin = this.products.sort(ordenacaoasc);
            iventory.setData(this.pricemin);
        } else if (e.target.value == "pricemax") {
            pricemax = iventory.data[price].map(product.price.sort(ordenacaodesc));
            iventory.setData(this.products);
        } else {
            iventory.backToInitialData();
        }

        return true;

    }

    filterColor(e) {

        

        if (this.filterOn[e.target.name]) {

            this.products = iventory.backToInitialData();

            this.products = this.products.filter(product=> 

             product.color.includes(e.target.value)

        );

        iventory.setData(this.products);

    }else {

        this.products = this.products.filter((product) => {

            return product.color.includes(e.target.value);

        });
       

        iventory.setData(this.products);

        

        this.filterOn = {

            [e.target.name]: false

        }

    }

    }
    colorOut(e) {

        if(this.colorClicked[e.target.name]) {
 
             this.products = iventory.backToInitialData();
 
             iventory.setData(this.products);
 
             
 
         }else {
            
             this.colorClicked = {[event.target.value]: false};
 
         }
 
     }

    filterSize(e) {


        if (this.filterOn[e.target.name]) {
            this.products = iventory.backToInitialData();
            this.products = this.products.filter(product =>
                product.sizes.includes(e.target.value)
            );
            iventory.setData(this.products);
        } else {
            this.products = this.products.filter(product =>
                product.sizes.includes(e.target.value)
            );

            iventory.setData(this.products);
            this.filterOn = {
                [e.target.name]: true
            }
        }





    }


    sizeOut(e) {
        if (this.sizeClicked[e.target.name]) {

            this.products = iventory.backToInitialData();
            iventory.setData(this.products);
            this.sizeClicked = { [event.target.value]: true };
        } else {
            this.colorClicked = { [event.target.value]: false };
        }
    }
    filterprice(e) {
        let priceChecks = [];
        let input = document.querySelectorAll("#priceFilter label input[type='radio']");
        for (let i = 0; i < input.length; i++) {

            switch (input[i].value) {

                case "0-50":

                    priceChecks.push(0.00, 50.00);
                    if (priceChecks.length > 0) {

                        this.products = this.products.filter((product) => {

                            for (let y = 0; y < priceChecks.length - 1; y += 1) {

                                if (product.price >= priceChecks[y] && product.price <= priceChecks[y + 1]) {

                                    return true;

                                }

                            } this.products.pull(this.products.includes(priceChecks));
                            iventory.setData(this.products);

                        })

                    }

                    break;



                case "51-150":

                    priceChecks.push(51.00, 150.00)

                    break;



                case "151-300":

                    priceChecks.push(151.00, 300.00)

                    break;



                case "301-500":

                    priceChecks.push(301.00, 500.00)

                    break;



                case "1":

                    priceChecks.push(500.00, 999.00)

                    break;



                default:

                    priceChecks = [];

            }

        } iventory.setData(priceChecks);
    }

    priceOut(e) {
        if (this.priceClicked[e.target.name]) {

            this.products = iventory.backToInitialData();
            iventory.setData(this.products);
            this.priceClicked = { [event.target.name]: true };
        } else {
            this.priceClicked = { [event.target.name]: false };
        }
    }
}