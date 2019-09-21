//filter
var filter = {

    colors: [],
    sizes: [],
    prices: [],

    addColor: function (color) {
        this.colors.push(color);
        eraseProducts();
        load();
    },
    addSize: function (size) {
        this.sizes.push(size);
        eraseProducts();
        load();
    },
    addPrice: function (price) {
        this.prices.push(price);
        eraseProducts();
        load();
    },
    removeColor: function (color) {
        for (var i = 0; i < this.colors.length; i++) {
            if (this.colors[i] == color) {
                this.colors.splice(i, 1);
                eraseProducts();
                load();
            }
        }
    },
    removeSize: function (size) {
        for (var i = 0; i < this.sizes.length; i++) {
            if (this.sizes[i] == size) {
                this.sizes.splice(i, 1);
                eraseProducts();
                load();
            }
        }
    },
    removePrice: function (price) {
        for (var i = 0; i < this.prices.length; i++) {
            if (this.prices[i] == price) {
                this.prices.splice(i, 1);
                eraseProducts();
                load();
            }
        }
    },
    removeAllFilters: function () {
        colors: [];
        sizes: [];
        prices: [];
    },
    getTempFilter: function () {
        var temp = [];
        for (var i in this.prices) {
            var range = this.prices[i].split('-');
            for (var j in range) {
                range[j] = Number(range[j]);
                temp.push(range[j]);
                range.sort(function (a, b) {
                    return a - b;
                });
            }
        }
        return temp;
    },
    getFilter: function () {
        return this;
    }
};
// adiciona o filtro no objeto filter
function addFilter(type, value) {
    switch (type) {
        case 'color':
            filter.addColor(value);
            break;
        case 'size':
            filter.addSize(value);
            break;
        case 'price':
            filter.addPrice(value);
            break;
    }
}
//remove o filtro no objeto filter
function removeFilter(type, value) {
    switch (type) {
        case 'color':
            filter.removeColor(value);
            break;
        case 'size':
            filter.removeSize(value);
            break;
        case 'price':
            filter.removePrice(value);
            break;
    }
}

//verifica se o filtro é para retirar ou adicionar no objeto
function controlFilter(type, value) {
    if (type == 'size') {
        var isClicked = document.getElementById(value);
        if (isClicked.classList.contains("sizeBtnClicked")) {
            isClicked.classList.remove("sizeBtnClicked");
            removeFilter(type, value);

        } else {
            isClicked.classList.toggle("sizeBtnClicked");
            addFilter(type, value);
        }
    } else {
        var isToAdd = document.getElementById(value).checked;
        if (!isToAdd) {
            removeFilter(type, value);
        } else {
            addFilter(type, value);
        }
    }
}
