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
        this.orderByForm.addEventListener('change', this.sortByOrderBy.bind(this));
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
        this.products = this.products.filter((product) => {
            return product.color.includes(e.target.value);
        });
        store.setData(this.products);
        events.emit('renderProducts', this.products)
    }
    removeColorFilter(e) {
        if (this.isColorClicked[e.target.value]) {
            this.uncheckAllRadioButtons();
            this.isColorClicked = {
                [event.target.value]: false
            };
            this.products = store.backToInitialData();
            store.setData(this.products);
        } else {
            this.isColorClicked = {
                [event.target.value]: true
            };
        }

    }

    filterBySize(e) {
        this.products = this.products.filter((product) => {
            return product.sizes.includes(e.target.value);
        });
        store.setData(this.products);
        events.emit('renderProducts', this.products)
    }

    removeSizeFilter(e) {
        if (this.isSizeFormClicked[e.target.value]) {
            this.uncheckAllRadioButtons();
            this.isSizeFormClicked = {
                [event.target.value]: false
            };
            this.products = store.backToInitialData();
            store.setData(this.products);
        } else {
            this.isSizeFormClicked = {
                [event.target.value]: true
            };
        }


    }

    filterByPrice(e) {
        let range = e.target.value.split("-");
        const minPrice = Number(range[0]);
        const maxPrice = Number(range[1]) || 999999999999;
        this.products = this.products.filter((product) => {
            if (product.price >= minPrice) {
                if (product.price <= maxPrice) {
                    return true;
                }
            }
            return false;
        });
        store.setData(this.products);
        events.emit('renderProducts', this.products);
    }

    removePriceFilter(e) {
        if (this.isPriceFormCliked[e.target.value]) {
            this.uncheckAllRadioButtons();
            this.isPriceFormCliked = {
                [event.target.value]: false
            };
            this.products = store.backToInitialData();
            store.setData(this.products);
        } else {
            this.isPriceFormCliked = {
                [event.target.value]: true
            };
        }


    }

    uncheckAllRadioButtons() {
        for (let input of this.colorForm) {
            input.checked = false;
        }
        for (let input of this.sizeForm) {
            input.checked = false;
        }
        for (let input of this.priceForm) {
            input.checked = false;
        }
    }
}