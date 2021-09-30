const container = document.querySelector('.productList')

let products = []
let cloths_color = []
let cloths_size = []
let cloths_prices = ''
let current_products = []

let carrinho = []

let currentProductsLength = 0
let productsLimit = true

prices = {
    "R$0 até R$50": {low:0.0,high:50.0},
    "R$51 até R$150":{low:51.0,high:150.0},
    "R$151 até R$300":{low:151.0,high:300.0},
    "R$301 até R$500":{low:301.0,high:500.0},
    "R$ 01":{low:1.0,high:-1}
}

function SortByLowestPrice(){
    current_products.sort(function (a, b) {
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });
    updateProducts()
}

function SortByBiggestPrice(){

    current_products.sort(function (a, b) {
        if (a.price < b.price) {
          return 1;
        }
        if (a.price > b.price) {
          return -1;
        }
        return 0;
      });
    updateProducts()
}

function ToggleOrganizeMenu(){
    let arrow = document.querySelector('.arrowup')
    arrow.classList.toggle('arrowdown')

    let drop_list = document.querySelector('.dropdown_list');
    drop_list.classList.toggle('dropdown_list_on')
}

function ToggleFilterMenu(){
    let menu = document.querySelector('.filter_menu')
    menu.classList.toggle('filter_menu_off')
}


function ToggleOptionsList(component_id,component_id_off){
    let list = document.querySelector(component_id)
    list.classList.toggle(component_id_off)
}

function ToggleLoadButton(){
    let button = document.querySelector('.loadButton')
    button.classList.toggle('loadButton_off')

    productsLimit = false;
    updateProducts()
} 


function SetClothsByColor(){
    cloths_color = [];
    var pacote = document.getElementsByName("color_list");
    for (var i = 0; i < pacote.length; i++){
        if ( pacote[i].checked ) {
            cloths_color += pacote[i].value;
        }
    }
    updateProducts()
}


function SetClothsByPrice(){
    cloths_prices = document.querySelector('input[name="price_list"]:checked').value
    updateProducts()
}

function SetClothsBySize(){
    cloths_size = [];
    var pacote = document.getElementsByName("size_list");
    for (var i = 0; i < pacote.length; i++){
        if ( pacote[i].checked ) {
            cloths_size.push(pacote[i].value);
        }
    }
    updateProducts()
}

function GetClothPriceCategory(prod){
    if(cloths_prices != ''){
        if(prices[cloths_prices].high == -1){
            if(prod.price >= prices[cloths_prices].low){
                return true
            }
        }else{
            if((prod.price >= prices[cloths_prices].low) && (prod.price <= prices[cloths_prices].high)){
                return true
            }
        }
        return false
    }else{
        return true;
    }
    return false
}

function GetClothColorCategory(prod){
    if(cloths_color.length > 0){
        if(cloths_color.indexOf(prod.color) > -1){
            return true
        }
        return false
    }
    return true
}

function GetClothSizeCategory(prod){
    //let x = document.querySelector(".teste")
    if(cloths_size.length > 0){
        for (var i = 0; i < (prod.size).length; i++){
            if(cloths_size.indexOf(prod.size[i])> -1){
                //x.innerHTML = prod.size
                //x.innerHTML = prod.size[i]
                return true
            }
        }
        return false
    }
    return true
}

function GetProductsLimitSize(){
    if(productsLimit){
        if(currentProductsLength < 9){
            return true
        }
        return false
    }
    return true
}

function AddProductCart(product_id){
        let x = document.querySelector(".cart_counter")
        //x.innerHTML = "foI"
        if(carrinho.indexOf(product_id) <= -1){
            carrinho.push(product_id);
        }
        x.innerHTML = `<h1>${carrinho.length}</h1>`
       
}


function updateProducts(){
    template = ``
    currentProductsLength = 0

    current_products.forEach(prod => {

        if(GetProductsLimitSize() && GetClothPriceCategory(prod) && GetClothColorCategory(prod) && GetClothSizeCategory(prod)){
            template += `
            <div class = "product_card">
                <img src = ${"./images/" + prod.image}></img>
                <h2>${prod.name}</h2>
                <h3>${"R$" + prod.price.toFixed(2).toString().replace(".", ",")}</h3>
                <h4>${"Até " + prod.parcelamento + "x de R$" + (prod.price/prod.parcelamento).toFixed(2)}</h4>
                <button onclick = "AddProductCart('${prod.id}')">
                    <h3>Comprar</h3>
                </button>
            </div>
            `
            currentProductsLength ++   

        }

        
    });
    container.innerHTML = template;

}

const renderPosts = async() =>{
    let uri = "http://localhost:3000/products"

    const res = await fetch(uri)
    products = current_products = await res.json()

    updateProducts()
    
}

window.addEventListener('DOMContentLoaded',()=>renderPosts());
