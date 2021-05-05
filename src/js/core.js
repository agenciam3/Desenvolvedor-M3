import ColorsCheckboxes from './elements/ColorsCheckboxes.js';
import PriceRangeCheckboxes from './elements/PriceRangeCheckboxes.js';
import SizesBoxes from './elements/SizesBoxes.js';
import ProductsView from './elements/ProductsView.js';
import showcase from './ASP/showcase.js';

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

var __first_init = true;

function createPriceCBXs(){

    if(filters.price_range_available[0] > filters.price_range_available[1]){
        PriceRangeCheckboxes().hide('price-range-filter-container-id');    
    }
    
    PriceRangeCheckboxes().create('price-range-filter-container-id', [filters.price_range_available[0], filters.price_range_available[1]], function (value) {
        filters.price_range = value;
        show();
    });
}

function createColorCBXs(){
    ColorsCheckboxes().create('colors-filter-container-id', filters.colors_available, function (value) {
        filters.colors = value;
        filters.price_range = [];
        show();
        createSizeCBXs();
    });
}

function createSizeCBXs(){
    SizesBoxes().create('size-filter-container-id', filters.size_available, function (value) {
        filters.size = value;
        show();
        createPriceCBXs();
    });
}



function show(){
    showcase(filters.last_page_end, 10, { colors_name: filters.colors, sizes: filters.size, price_range: filters.price_range}).then((result) => {
        filters.price_range_available = [result.extra.cheapest_price, result.extra.expensive_price];
        filters.colors_available = result.extra.unique_colors;
        filters.size_available = result.extra.unique_sizes;
        createColorCBXs();
        if(__first_init){
            createSizeCBXs();
            createPriceCBXs();
            __first_init = false;
        }
        console.log(result);
    })
}

show();
