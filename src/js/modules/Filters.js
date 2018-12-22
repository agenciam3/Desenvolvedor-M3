import {
    store
} from '../store';
import {
    events
} from '../events';
export default class Filters {
    constructor() {
        this.selectors();
        this.eventListeners();
    }
    selectors() {
        this.orderByForm = document.getElementById("order-by-desktop");
        this.colorForm = document.querySelectorAll("#color-desktop div label input[type='radio']");
        this.sizeForm = document.querySelectorAll("#size-desktop label input[type='radio']");
        this.priceForm = document.querySelectorAll("#price-desktop div label input[type='radio']");
    }

    eventListeners() {
        this.orderByForm.addEventListener('change', this.sortByOrderBy);
        for (let input of this.colorForm) {
            input.addEventListener('change', this.filterByColor);
        }
        for (let input of this.sizeForm) {
            input.addEventListener('change', this.filterBySize);
        }
        for (let input of this.priceForm) {
            input.addEventListener('change', this.filterByPrice);
        }
    }

    sortByOrderBy(e) {
        let products = store.getData();
        switch (e.target.options[e.target.selectedIndex].value) {
            case 'newest':
                products.sort((a, b) => {
                    return Date.parse(a.date) - Date.parse(b.date)
                });
                store.setData(products);
                break;
            case 'lowest-price':
                products.sort((a, b) => {
                    return a.price - b.price;
                })
                store.setData(products);
                break;
            case 'highest-price':
                products.sort((a, b) => {
                    return b.price - a.price;
                })
                store.setData(products);
                break;
            default:
                break;
        }
    }

    filterByColor(e) {
        let products = store.getData();
        let filteredProducts = products.filter((product) => {
            return product.color.includes(e.target.value);
        });
        events.emit('renderProducts', filteredProducts)
    }

    filterBySize(e) {
        let products = store.getData();
        let filteredProducts = products.filter((product) => {
            return product.sizes.includes(e.target.value);
        });
        events.emit('renderProducts', filteredProducts)
        console.log(e.target.value);
    }
    filterByPrice(e) {
        let products = store.getData();
        let range = e.target.value.split("-");
        const minPrice = Number(range[0]);
        const maxPrice = Number(range[1]) || 999999999999;
        let filteredProducts = products.filter((product) => {
            if (product.price >= minPrice) {
                if (product.price <= maxPrice) {
                    return true;
                }
            }
            return false;
        });
        console.log(filteredProducts);
        events.emit('renderProducts', filteredProducts);
    }
}