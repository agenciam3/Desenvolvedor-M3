"use strict"
import Generic from '../core/Generic.js';
import ShopCart from './ShopCart.js';

var list_data = [];
function createItemCard(id = '', image = '', name = '', price = 0, division_price = 0, size_choosed = '0'){
    return `<div class="showcase-item">
                <img src="${image}">
                <label>${name}</label>
                <label>R$ ${price.toFixed(2)}</label>
                <label>até 3x de ${division_price.toFixed(2)}</label>
                <button class="buy-black" data-product="${id}" data-size="${size_choosed}">Comprar</button>
            </div>`;
}

function buyCartClick(id, size_choosed){
    let found_item;
    list_data.forEach((item) => {
        if(item.id == id){
            found_item = item;
            console.log('SIZE CHOOSED', size_choosed);
            found_item.size_choosed = size_choosed;
        }
    })
    if(found_item){
        ShopCart().addItem(found_item, ()=>{
            updateButtonSituation(id);
        })
    }
    
}

function updateButtonSituation(id){
    let allElements = document.getElementsByClassName('buy-black');
    let button_to_change;
    for(let i = 0; i < allElements.length; i++){
        if(allElements[i].dataset.product == id){
            button_to_change = allElements[i];
        }
    }

    if(button_to_change){
        if(button_to_change.textContent == 'Comprar'){
            button_to_change.textContent = 'Remover'
            button_to_change.classList.add('clicked');
        } else {
            button_to_change.textContent = 'Comprar'
            button_to_change.classList.remove('clicked');
        }
    }
}

function checkButtonSituation(allElements = []){
    let cart_itens = ShopCart().getCartItens();
    if(cart_itens && cart_itens.length > 0){
        cart_itens.forEach((cart_Item)=>{
            for(let i = 0; i < allElements.length; i++){
                if(cart_Item.id == allElements[i].dataset.product){
                    updateButtonSituation(allElements[i].dataset.product);
                }
            }
           
        })
    }
}

function createHasMoreButtonPage(container){
    container.innerHTML += `
        <div class="shopping-showcase-load-more-container">
            <button class="show-more-blue">Carregar Mais</button>
        </div>
    `;
}

var __last_id;
var __last_data;
var __last_size_choosed;
var __hasMoreExists = false;
var __first_init;
export default function ProductsView() {
    return {
        create: (div_id = '', data = undefined, size_choosed, hasMorePages = false, hasMoreCallback) => {
            if(div_id != ''){
                __last_id = div_id;
            } else {
                div_id = __last_id;
            }

            if(data == undefined){
                data = __last_data;
            } else {
                __last_data = data;
            }

            if(size_choosed == undefined){
                size_choosed = __last_size_choosed;
            } else {
                __last_size_choosed = size_choosed;
            }


            let container = Generic().exists_id_on_document(div_id);
            if(container){
                container.innerHTML = '';
                list_data = data;
                for(let i = 0; i < data.length; i++){
                    container.innerHTML += createItemCard(data[i].id, data[i].image, data[i].name, data[i].price, data[i].division_price, size_choosed);
                }
                if(hasMorePages){
                    console.log('There is more pages!');
                    createHasMoreButtonPage(container);
                    let show_more_buttons = container.getElementsByClassName('show-more-blue');
                    __first_init = true;
                    for (let i = 0; i < show_more_buttons.length; i++) {
                        show_more_buttons[i].addEventListener("click", ()=>{
                            hasMoreCallback();
                        })
                        
                    }
                }
                let allElements = document.getElementsByClassName('buy-black');
                checkButtonSituation(allElements);
                for(let i = 0; i < allElements.length; i++){
                    allElements[i].addEventListener("click", function(el) {
                        buyCartClick(el.target.dataset.product, el.target.dataset.size)
                    });
                }
                
                
            }
        }
    }
}


// allElements[i].addEventListener("click", function() {
//     click(allElements[i], allElements, true, callback)
// });