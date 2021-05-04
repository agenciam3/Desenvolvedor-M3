'use strict';

import ProductService from "../services/ProductService.js";


function loadItens (itensList = [{color: [],creation_date: Object,division_price: 0,id: "",image: "",name: "",price: 0,sizes: []}]){
    let container = document.getElementById('ShopCardItensContainer');
    container.innerHTML = '';
    itensList.forEach(element => {
        let nCard = createItemCard(element.id, element.image, element.name, element.price, element.division_price);
        container.innerHTML += nCard;
    });
}

function createItemCard(id = '', image = '', name = '', price = 0, division_price = 0){
    return `<div class=\"showcase-item"">
                <img src="${image}">
                <label>${name}</label>
                <label>R$ ${price.toFixed(2)}</label>
                <label>até 3x de ${division_price.toFixed(2)}</label>
                <button class="buy-black" data-product="${id} onclick="addToCart('${id}')">Comprar</button>
            </div>`;
}

function loadColorsOptions(colors = []){
    let container = document.getElementById('colors-filter-container-id');
    container.innerHTML = '';
    console.log(colors);
    colors.forEach((color) => {
        container.innerHTML += createColorOption(color);
    })
}
function createColorOption(color = ''){
    return `<span class="colorcheck"><input type="checkbox" value="${color}"><label>${color}</label></span>`
}

function loadPriceRangeOptions(prices = []){
    console.log(prices);
    let container = document.getElementById('price-range-filter-container-id');
    container.innerHTML = '';
    let diff = prices[1] - prices[0];
    let percentage = diff * 0.33;
    container.innerHTML += createPriceRangeOption(0, percentage);
    for(let i = 0; i < 3; i++){
        container.innerHTML += createPriceRangeOption(percentage * i, percentage * (i+1));
    }
}
function createPriceRangeOption(minimum, maximum){
    return `<span class="pricecheck"><input type="checkbox" name="pricerangebox" value="${[minimum, maximum]}"><label>entre R$${minimum.toFixed(2)} e R$${maximum.toFixed(2)}</label></span>`;
}

export default function ShopView(){
    return {
        loadMore: () => {
            ProductService().loadMore().then((list) => {
                loadItens(list.data);
                if(!ProductService().hasMorePages()){
                    let button_load_more = document.getElementsByClassName('show-more-blue')[0];
                    button_load_more.style.display = 'none';
                }
            })
        },
        
        init: () => {
            return new Promise((resolve, reject) => {
                ProductService().load().then((list) => {
                    loadItens(list.data);
                    resolve(list);
                })
            });
            
        },

        setFilter: (filters) => {
            ProductService().setFilters(filters);
            ProductService().load().then((list) => {
                loadItens(list.data);
            })
        },
        loadPricesOnView(prices_range = []){
            loadPriceRangeOptions(prices_range);
        },
        loadColorsOnView(unique_colors = []){
            loadColorsOptions(unique_colors);
        }

    }
    
}