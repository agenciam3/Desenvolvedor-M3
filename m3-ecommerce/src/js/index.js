const container = document.querySelector('.productsList_container')

let products = []
let cloths_color = []
let cloths_prices = ''
let current_products = []

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

    var drop_list = document.querySelector('.dropdown_list');
    drop_list.classList.toggle('dropdown_list_on')
}

function ToggleFilterMenu(){

    var x = document.getElementById('sidebar_menu');
    if (x.style.left === '-100%') {
        x.style.left = '0';
    } else {
        x.style.left = '-100%';
    }
}


function ToggleOptionsList(component_id,component_id_off){
    let list = document.querySelector(component_id)
    list.classList.toggle(component_id_off)
}


function SetClothsByColor(){
    console.log("aqui")
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

function updateProducts(){
    template = ``

    current_products.forEach(prod => {

        if(GetClothPriceCategory(prod) && GetClothColorCategory(prod)){
            template += `
            <div class = "prod">
                <img src = ${"./images/" + prod.image}></img>
                <h2>${prod.name}</h2>
                <h3>${"R$" + prod.price}</h3>
                <h4>${"Até " + prod.parcelamento + "x de R$" + prod.price/prod.parcelamento}</h4>
                <button>
                    <h3>Comprar</h3>
                </button>
            </div>
            `   
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
