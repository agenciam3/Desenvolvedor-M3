import ColorsCheckboxes from './elements/ColorsCheckboxes.js';
import PriceRangeCheckboxes from './elements/PriceRangeCheckboxes.js';
import SizesBoxes from './elements/SizesBoxes.js';
import ProductsView from './elements/ProductsView.js';
import showcase from './ASP/showcase.js';
import OrdenationCombobox from './elements/OrdenationCombobox.js';

var filters = {
    colors:[],
    colors_available:[],
    price_range:[],
    price_range_available:[],
    size:[],
    size_available:[],
    orderBy:'recent',
    last_page_end: 0
}

var data = [];

var __first_init = true;

function createOrdenationCBBX(){
    OrdenationCombobox().create('select-ordernation-filter-container-id', (value) => {
        filters.orderBy = value;
        show();
    })
}

function createColorCBXs(){
    ColorsCheckboxes().create('colors-filter-container-id', filters.colors_available, function (value) {
        filters.colors = value;
        filters.price_range = [];
        filters.size = [];
        show();
        createSizeCBXs();
        createPriceCBXs();
    });
}

function createSizeCBXs(){
    SizesBoxes().create('size-filter-container-id', filters.size_available, function (value) {
        filters.size = value;
        filters.price_range = [];
        createPriceCBXs();
        show();
        
    });
}

function createPriceCBXs(){
    PriceRangeCheckboxes().create('price-range-filter-container-id', [filters.price_range_available[0], filters.price_range_available[1]], data.length, function (value) {
        filters.price_range = value;
        show();
    });
}

function loadShopItens(){
    ProductsView().create('ShopCardItensContainer', data.data, ()=>{

    })
}



function show(){
    showcase(filters.last_page_end, 10, { colors_name: filters.colors, sizes: filters.size, price_range: filters.price_range, orderBy: filters.orderBy}).then((result) => {
        filters.price_range_available = [result.extra.cheapest_price, result.extra.expensive_price];
        filters.colors_available = result.extra.unique_colors;
        filters.size_available = result.extra.unique_sizes;
        data = result;
        if(__first_init){
            __first_init = false;
            createColorCBXs();
            createOrdenationCBBX();
        }
        loadShopItens();
        console.log(result);
    })
}

show();
