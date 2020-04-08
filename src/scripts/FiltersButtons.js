
import {iventory} from './manageStore.js';
import {events} from './events.js';




export default class Filters {

    constructor() {

        this.selectors();

        this.eventListeners();
        

    }

    selectors() {

        this.products = iventory.getData();

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
      
        
    }
    

    filterColor(e) {
        
        if (this.filterOn[e.target.name]) {
            this.products = iventory.backToInitialData();
            this.products = this.products.filter((product)=> {
            return product.color.includes(e.target.value);
        });
        
    }else {
        this.products = this.products.filter((product) => {
            return product.color.includes(e.target.value);
        });
        
        
        
       
        iventory.setData(this.products);
        
        this.filterOn = {
            [e.target.name]: true
        }
       
        
    }
    }


    colorOut(e) {
       if(this.colorClicked[e.target.name]) {
            this.products = iventory.backToInitialData();
            iventory.setData(this.products);
            this.colorClicked = {[event.target.value]: true};
        }else {
            this.colorClicked = {[event.target.value]: false};
        }
    }


    filterSize(e) {
        if (this.filterOn[e.target.name]) {
            this.products = iventory.backToInitialData();
            this.products = this.products.filter((product)=> {
            return product.sizes.includes(e.target.value);
        });
        
    }else {
        this.products = this.products.filter((product) => {
            return product.sizes.includes(e.target.value);
        });
        iventory.setData(this.products);
        this.filterOn = {
            [e.target.name]: true
        }
       
        
    }
    }


    sizeOut(e) {
       if(this.sizeClicked[e.target.name]) {
            
            this.products = iventory.backToInitialData();
            iventory.setData(this.products);
            this.sizeClicked = {[event.target.value]: true};
        }else {
            this.colorClicked = {[event.target.value]: false};
        }
    }

   
   
}