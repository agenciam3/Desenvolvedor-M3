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
        this.products = store.getData();
        this.orderByForm = document.getElementById("order-by-desktop");
        this.colorForm = document.querySelectorAll("#color-desktop div label input[type='radio']");
        this.isColorClicked = {};
        this.sizeForm = document.querySelectorAll("#size-desktop label input[type='radio']");
        this.isSizeFormClicked = {};
        this.priceForm = document.querySelectorAll("#price-desktop div label input[type='radio']");
        this.isPriceFormCliked = {};
    }
    eventListeners() {
        this.orderByForm.addEventListener('change', this.sortByOrderBy);
        for (let input of this.colorForm) {
            input.addEventListener('change', this.filterByColor.bind(this));
            input.addEventListener('click', this.removeColorFilter.bind(this));
        }
        for (let input of this.sizeForm) {
            input.addEventListener('change', this.filterBySize.bind(this));
            input.addEventListener('click', this.removeSizeFilter.bind(this));
        }
        for (let input of this.priceForm) {
            input.addEventListener('change', this.filterByPrice.bind(this));
            input.addEventListener('click', this.removePriceFilter.bind(this));
        }
    }

    sortByOrderBy(e) {
        switch (e.target.options[e.target.selectedIndex].value) {
            case 'newest':
                this.products.sort((a, b) => {
                    return Date.parse(a.date) - Date.parse(b.date)
                });
                store.setData(this.products);
                break;
            case 'lowest-price':
                this.products.sort((a, b) => {
                    return a.price - b.price;
                })
                store.setData(this.products);
                break;
            case 'highest-price':
                this.products.sort((a, b) => {
                    return b.price - a.price;
                })
                store.setData(this.products);
                break;
            default:
                break;
        }
    }

    filterByColor(e) {
        let filteredProducts = this.products.filter((product) => {
            return product.color.includes(e.target.value);
        });
        events.emit('renderProducts', filteredProducts)
    }
    removeColorFilter(e) {
        if (this.isColorClicked[e.target.value]) {
            e.target.checked = false;
            this.isColorClicked = {
                [event.target.value]: false
            };
            this.products = store.getData();
            store.setData(this.products);
        }
        this.isColorClicked = {
            [event.target.value]: true
        };

    }

    filterBySize(e) {
        let filteredProducts = this.products.filter((product) => {
            return product.sizes.includes(e.target.value);
        });
        events.emit('renderProducts', filteredProducts)
    }

    removeSizeFilter(e) {
        if (this.isSizeFormClicked[e.target.value]) {
            e.target.checked = false;
            this.isSizeFormClicked = {
                [event.target.value]: false
            };
            this.products = store.getData();
            store.setData(this.products);
        }
        this.isSizeFormClicked = {
            [event.target.value]: true
        };

    }

    filterByPrice(e) {
        let range = e.target.value.split("-");
        const minPrice = Number(range[0]);
        const maxPrice = Number(range[1]) || 999999999999;
        let filteredProducts = this.products.filter((product) => {
            if (product.price >= minPrice) {
                if (product.price <= maxPrice) {
                    return true;
                }
            }
            return false;
        });
        events.emit('renderProducts', filteredProducts);
    }

    removePriceFilter(e) {
        if (this.isPriceFormCliked[e.target.value]) {
            e.target.checked = false;
            this.isPriceFormCliked = {
                [event.target.value]: false
            };
            this.products = store.getData();
            store.setData(this.products);
        }
        this.isPriceFormCliked = {
            [event.target.value]: true
        };

    }
}