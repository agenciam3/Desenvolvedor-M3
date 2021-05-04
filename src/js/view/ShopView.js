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
            ProductService().load().then((list) => {
                loadItens(list.data);
            })
        }

    }
    
}