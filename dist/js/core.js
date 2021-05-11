"use strict"
import ColorsCheckboxes from './elements/ColorsCheckboxes.js';
import PriceRangeCheckboxes from './elements/PriceRangeCheckboxes.js';
import SizesBoxes from './elements/SizesBoxes.js';
import ProductsView from './elements/ProductsView.js';
import showcase from './ASP/showcase.js';
import OrdenationCombobox from './elements/OrdenationCombobox.js';
import ShopCart from './elements/ShopCart.js';
import Generic from './core/Generic.js';

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

var __mobile_mode = false;

function windowResizeEvent(w){
     //alterna o JS para o modo mobile;
     if(window.innerWidth < 900){
        __mobile_mode = true;
    } else {
        __mobile_mode = false;
    }

    createOrdenationCBBX();
}

windowResizeEvent();
window.addEventListener('resize', windowResizeEvent);


/**
 * Funções para tratamento da interface no modo MOBILE;
 */

var __last_DOM_filterMenu;
function openOrCloseFilterMenu(filtersMenu){
    if(!filtersMenu){
        filtersMenu = __last_DOM_filterMenu;
    }
    if(__mobile_mode){
        
        let ShopCardItensContainer = document.getElementById('ShopCardItensContainer');
        console.log(filtersMenu.style.display);
        if(filtersMenu.classList.contains('open')){
            filtersMenu.classList.remove('open');
            filtersMenu.classList.add('closed');
            
            ShopCardItensContainer.classList.remove('hide')
            ShopCardItensContainer.classList.add('showing')
        } else {
            filtersMenu.classList.remove('closed');
            filtersMenu.classList.add('open');
            ShopCardItensContainer.classList.remove('showing')
            ShopCardItensContainer.classList.add('hide')
        }
        if(filtersMenu){
            __last_DOM_filterMenu = filtersMenu;
        }
    }
    
}

document.addEventListener("DOMContentLoaded", ()=>{

    //Tratamento dos menu de filtros caso MOBILE
    const buttons = document.querySelectorAll(".filterOpenOrClose")
    for (const button of buttons) {
      button.addEventListener('click', function(event) {
          let filtersMenu;
          
          if(event.target.dataset.menuclass == "filters"){
              filtersMenu = document.getElementsByClassName('shopping-filter-menu-container')[0];
          }

          if(event.target.dataset.menuclass == "ordernation"){
            filtersMenu = document.getElementsByClassName('select-ordernation-filter-container')[0];
        }

        openOrCloseFilterMenu(filtersMenu);
      })
    }

    const filter_headings = document.querySelectorAll(".filter-heading");
    for(const fh of filter_headings){
        fh.addEventListener("click", ()=>{
            let content = document.getElementById(fh.dataset.headingof);
            
            if(content){
                
                if(fh.classList.contains('closed')){
                    content.style.height = 'max-content';
                    fh.classList.add('open');
                    fh.classList.remove('closed');
                } else {
                    content.style.height = '0px';
                    fh.classList.add('closed');
                    fh.classList.remove('open');
                }
            }
        })
    }
})


/**
 * Filtros e tratamento dos dados;
 */
function createOrdenationCBBX(){

    let type;
    (__mobile_mode) ? type = 'list' : type = 'combobox';

    console.log(__mobile_mode);

    OrdenationCombobox().create('select-ordernation-filter-container-id', (value) => {
        filters.orderBy = value;
        if(__mobile_mode){
            openOrCloseFilterMenu();
        }
        show(true);

    }, type);
}

function createColorCBXs(){
    
    ColorsCheckboxes().create('colors-filter-container-id', filters.colors_available, function (value) {
        filters.last_page_end = 0;
        filters.colors = value;
        show(true);
    });
}

function createSizeCBXs(){
    
    SizesBoxes().create('size-filter-container-id', filters.size_available, function (value) {
        filters.last_page_end = 0;
        filters.size = value;
        
        show(true);
    });
}

function createPriceCBXs(){
    
    PriceRangeCheckboxes().create('price-range-filter-container-id', [filters.price_range_available[0], filters.price_range_available[1]], data.length, function (value) {
        filters.last_page_end = 0;
        filters.price_range = value;
        show(true);
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

function show(escapeFinalRange = false){
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

        if(!escapeFinalRange){
            filters.last_page_end = result.pagination.final_range;
        }
        

        loadShopItens();
        console.log(result);
    })
}

show();
