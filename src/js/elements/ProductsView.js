import Generic from '../core/Generic.js';
import ShopCart from './ShopCart.js';

var list_data = [];
function createItemCard(id = '', image = '', name = '', price = 0, division_price = 0){
    return `<div class="showcase-item">
                <img src="${image}">
                <label>${name}</label>
                <label>R$ ${price.toFixed(2)}</label>
                <label>até 3x de ${division_price.toFixed(2)}</label>
                <button class="buy-black" data-product="${id}">Comprar</button>
            </div>`;
}

function buyCartClick(id){
    let found_item;
    list_data.forEach((item) => {
        if(item.id == id){
            found_item = item;
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
        console.log(button_to_change.textContent);
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
    console.log(allElements);
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


export default function ProductsView() {
    return {
        create: (div_id = '', data = []) => {
            let container = Generic().exists_id_on_document(div_id);
            if(container){
                container.innerHTML = '';
                list_data = data;
                for(let i = 0; i < data.length; i++){
                    container.innerHTML += createItemCard(data[i].id, data[i].image, data[i].name, data[i].price, data[i].division_price);
                }
                let allElements = document.getElementsByClassName('buy-black');
                checkButtonSituation(allElements);
                for(let i = 0; i < allElements.length; i++){
                    allElements[i].addEventListener("click", function(el) {
                        buyCartClick(el.target.dataset.product)
                    });
                }
                
                
            }
        }
    }
}


// allElements[i].addEventListener("click", function() {
//     click(allElements[i], allElements, true, callback)
// });