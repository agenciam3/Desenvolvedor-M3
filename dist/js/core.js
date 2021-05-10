"use strict"
import ColorsCheckboxes from './elements/ColorsCheckboxes.js';
import PriceRangeCheckboxes from './elements/PriceRangeCheckboxes.js';
import SizesBoxes from './elements/SizesBoxes.js';
import ProductsView from './elements/ProductsView.js';
import showcase from './ASP/showcase.js';
import OrdenationCombobox from './elements/OrdenationCombobox.js';
import ShopCart from './elements/ShopCart.js';

var filters = {
    colors:[],
    colors_available:[],
    price_range:[],
    price_range_available:[],
    size:[],
    size_available:[],
    orderBy:'recent',
    last_page_end: 0,
    hasMorePages: false,
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
        filters.last_page_end = 0;
        filters.colors = value;
        show();
    });
}

function createSizeCBXs(){
    
    SizesBoxes().create('size-filter-container-id', filters.size_available, function (value) {
        filters.last_page_end = 0;
        filters.size = value;
        
        show();
    });
}

function createPriceCBXs(){
    
    PriceRangeCheckboxes().create('price-range-filter-container-id', [filters.price_range_available[0], filters.price_range_available[1]], data.length, function (value) {
        filters.last_page_end = 0;
        filters.price_range = value;
        show();
    });
}

function loadShopItens(){
    ProductsView().create('ShopCardItensContainer', data.data, filters.size, filters.hasMorePages, ()=>{
        showMore();
    });
}

function showMore(){
    let newData = [];
    showcase(filters.last_page_end, 10, { colors_name: filters.colors, sizes: filters.size, price_range: filters.price_range, orderBy: filters.orderBy}).then((result) => {
        if(result.data && data.data){
            for (let i = 0; i < result.data.length; i++) {
                let found = false;                
                for (let j = 0; j < data.data.length; j++) {
                    if(result.data[i].id == data.data[j].id){
                        console.log('FOUND!')
                        found = !found;
                    }
                }
                if(!found){
                    newData.push(result.data[i]);
                }
            }
            console.log('FINISHED!');
            data.data = [...data.data, ...newData];
            filters.last_page_end = result.pagination.final_range;
            filters.hasMorePages = result.pagination.hasMorePages;
            loadShopItens();
            
        } else {
            console.log('There\'s no more pages available!');
        }
    });
}
function show(){
    showcase(filters.last_page_end, 10, { colors_name: filters.colors, sizes: filters.size, price_range: filters.price_range, orderBy: filters.orderBy}).then((result) => {
        
       data = result;

        if(__first_init){
            __first_init = false;
            filters.price_range_available = [result.extra.cheapest_price, result.extra.expensive_price];
            filters.colors_available = result.extra.unique_colors;
            filters.size_available = result.extra.unique_sizes;
            
            ShopCart().create('head-cart-icon-container');
            createColorCBXs();
            createSizeCBXs();
            createOrdenationCBBX();
            createPriceCBXs();
            
        }

        filters.hasMorePages = result.pagination.hasMorePages;
        filters.last_page_end = result.pagination.final_range;

        loadShopItens();
        console.log(result);
    })
}

show();
