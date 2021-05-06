import Generic from '../core/Generic.js';


var cart_itens = [];
var __initialized = false;
var __icon_callback = ()=>{}

function getHeaderIconHTML(quantity = 0){
    return `<div class="shopping-cart-icon-container" id="shopping-cart-icon-container-id">
                <img src="./images/shopping-bag.svg">
                <div class="synalyzer-container">
                    <label>${quantity}</label>
                </div>
            </div>`;
}

var changeIconInfo__allow_ADDEVENTLISTENER = true;
function changeIconInfo(container, quantity){
    container.innerHTML = getHeaderIconHTML(quantity);
    let element = document.getElementById('shopping-cart-icon-container-id');
    if(element){
        if(changeIconInfo__allow_ADDEVENTLISTENER){
            changeIconInfo__allow_ADDEVENTLISTENER = !changeIconInfo__allow_ADDEVENTLISTENER;
            element.addEventListener('click', (evt) => {
                showOrHideCart();
            })
        }

        let labelElement = element.getElementsByTagName('label')[0];
        if(labelElement){
            labelElement.innerText = quantity;
        }
        
    } else {
        console.log('Erro ao adicionar o listener para o filtro de ordenação.');
    }
}

function createCart(){
    document.body.innerHTML += `
        <div class="shopping-cart" id="shopping-cart-id">
            <div class="left"></div>
            <div class="right">
                <div class="info">
                    <label>Total:</label>
                    <button>Finalizar Compra</button>
                </div>
            </div>
        </div>
    `;
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
        let container = Generic().exists_id_on_document('shopping-cart-id');
        if(container){
            changeIconInfo(container, cart_itens.length)
        }
        callback();
    } else {
        removeItem(item.id, callback)
    }
    
}

function removeItem(id = '', callback = ()=>{}){
    cart_itens = cart_itens.filter((item) => {return item.id !== id});
    let container = Generic().exists_id_on_document('shopping-cart-id');
    if(container){
        changeIconInfo(container, cart_itens.length)
    }
    callback();
}

function showOrHideCart(){
    let el = Generic().exists_id_on_document('shopping-cart-id');
    if(el){
        if(el.style.height != "100vh"){
            el.style.zIndex = 2;
            el.style.height = '100vh';
            el.style.opacity = '1';
        } else {
            el.style.height = '0vh';
            el.style.opacity = '0';
            el.style.zIndex = -2;
        }
    }
}


export default function ShopCart() {
    if(!__initialized){
        createCart();
        __initialized = true;
    }
    return {
        create(div_id = ''){
            let container = Generic().exists_id_on_document(div_id);
            if(container){
                changeIconInfo(container, 0)
            }
        },
        addItem(item, callback = ()=>{}){
            addItem(item, callback)
        },
        removeItem(id = '', callback = ()=>{}){
            removeItem(id = '', callback);
        },
        getCartItens(){
            return cart_itens;
        }
    }
}