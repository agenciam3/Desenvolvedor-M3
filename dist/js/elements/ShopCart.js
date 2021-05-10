"use strict"
import Generic from '../core/Generic.js';
import ProductsView from './ProductsView.js';
import SizesBoxes from './SizesBoxes.js';

var cart_itens = [];
var __initialized = false;
var __icon_callback = ()=>{};
var __cart_icon_container = '';
var changeIconInfo__allow_ADDEVENTLISTENER = true;

function getHeaderIconHTML(quantity = 0){
    return `<div class="shopping-cart-icon-container" id="shopping-cart-icon-container-id">
                <img src="./images/shopping-bag.svg">
                <div class="synalyzer-container">
                    <label>${quantity}</label>
                </div>
            </div>`;
}


function changeIconInfo(quantity, container = ''){

    if(container){
        __cart_icon_container = container;
    }
    container = Generic().exists_id_on_document(__cart_icon_container);
    let close_button = Generic().exists_id_on_document('shopping-cart-close-button');
    container.innerHTML = getHeaderIconHTML(quantity);
    if(container && close_button){
        if(changeIconInfo__allow_ADDEVENTLISTENER){
            changeIconInfo__allow_ADDEVENTLISTENER = !changeIconInfo__allow_ADDEVENTLISTENER;
            
            container.addEventListener('click', (evt) => {
                showOrHideCart();
            })

            close_button.addEventListener('click', (evt) => {
                showOrHideCart();
            })
            
        }

        let labelElement = container.getElementsByTagName('label')[0];
        if(labelElement){
            labelElement.innerText = quantity;
        }
        
    } else {
        console.log('Erro ao adicionar o listener para o filtro de ordenação.');
    }
}

function createCart(){
    document.body.innerHTML += `
        <div class="shopping-cart-backdrop closed" id="shopping-cart-backdrop-id"></div>
        <div class="shopping-cart closed" id="shopping-cart-id">
            <div class="container">
                <div class="info-container">
                    <div class="heading">
                        <label class="info-title">Resumo</label>
                        <img src="./images/cancel.svg" id="shopping-cart-close-button">
                    </div>
                    <div class="itens-list">
                    </div>
                    <div class="info">
                        <div class="total-container">
                        <label>Total</label>
                        <label>R$1560</label>
                        </div>
                        <button class="show-more-blue">Finalizar Compra</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getCartItemHTML(item){
    return `
        <div class="shop-cart-item">
            <img src="${item.image}">
            <div class="subdivision">
            <label>${item.name}</label>
            <label>R$${item.price.toFixed(2)} ou 3x de ${item.division_price.toFixed(2)}</label>
            <label>Tamanho escolhido: ${item.size_choosed}</label>
            </div>
            <img src="./images/cancel.svg" class="close-btn" data-product="${item.id}">
        </div>
    `;
}

function updateVisualItensOnCartContainer(){
    let container = Generic().exists_id_on_document('shopping-cart-id');
    if(container){
        let itens_container = container.getElementsByClassName('itens-list')[0];
        let information_container = container.getElementsByClassName('info-container')[0];
        itens_container.innerHTML = '';
        let valores = 0;
        cart_itens.forEach((item) => {
            itens_container.innerHTML += getCartItemHTML(item);

            valores += item.price;
        })
        let remove_item_buttons = information_container.getElementsByClassName('close-btn');
        for(let i = 0; i < remove_item_buttons.length; i++){
            remove_item_buttons[i].addEventListener('click', ()=>{
                removeItem(remove_item_buttons[i].dataset.product, ()=>{
                    ProductsView().create();
                });
                
                console.log("updated?");
            })
        }
        let price_tag = information_container.getElementsByTagName('label')[0];
        if(price_tag){
            price_tag.innerText = `Suas compras totalizaram R$${valores}`;
        }
    }
}

function addItem(item, callback = ()=>{}){
    let item_found;
    cart_itens.forEach((cart_item) => {
        if(cart_item.id == item.id){
            item_found = item;
        }
    })
    if(!item_found){
        cart_itens.push(item);
        changeIconInfo(cart_itens.length);
        updateVisualItensOnCartContainer();
        callback();
    } else {
        removeItem(item.id, callback)
    }
    
}

function removeItem(id = '', callback = ()=>{}){
    cart_itens = cart_itens.filter((item) => {return item.id !== id});
    changeIconInfo(cart_itens.length);
    updateVisualItensOnCartContainer();
    callback();
}

function showOrHideCart(){
    let el = Generic().exists_id_on_document('shopping-cart-id');
    let backdrop = Generic().exists_id_on_document('shopping-cart-backdrop-id');
    if(el && backdrop){
        if(!el.classList.contains("opened")){
            el.classList.add("opened");
            el.classList.remove("closed");
            backdrop.classList.add("opened");
            backdrop.classList.remove("closed");
        } else {
            el.classList.add("closed");
            el.classList.remove("opened");
            backdrop.classList.add("closed");
            backdrop.classList.remove("opened");
        }
    } else {
        console.log('MUDOU NADA!')
    }
}


export default function ShopCart() {
    if(!__initialized){
        createCart();
        __initialized = true;
    }
    return {
        create(div_id = ''){
            changeIconInfo(0, div_id);
        },
        addItem(item, callback = ()=>{}){
            addItem(item, callback);
        },
        removeItem(id = '', callback = ()=>{}){
            removeItem(id = '', callback);
        },
        getCartItens(){
            return cart_itens;
        }
    }
}