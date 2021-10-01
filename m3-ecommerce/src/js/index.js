class ProductController{
    
    constructor(products){
        this.products = products
        this.cloths_color = []
        this.cloths_size = []
        this.cloths_prices = ''
        this.current_products = products
        this.carrinho = []

        this.currentProductsLength = 0
        this.productsLimitStatus = true
        this.productsLimit = 9
        this.container = document.querySelector('.productList')

        this.prices = {
            "R$0 até R$50": {low:0.0,high:50.0},
            "R$51 até R$150":{low:51.0,high:150.0},
            "R$151 até R$300":{low:151.0,high:300.0},
            "R$301 até R$500":{low:301.0,high:500.0},
            "R$ 01":{low:1.0,high:-1}
        }

    }

    GetClothPriceCategory(prod){
        if(this.cloths_prices != ''){
            if(this.prices[this.cloths_prices].high == -1){
                if(prod.price >= this.prices[this.cloths_prices].low){
                    return true
                }
            }else{
                if((prod.price >= this.prices[this.cloths_prices].low) && (prod.price <= this.prices[this.cloths_prices].high)){
                    return true
                }
            }
            return false
        }else{
            return true;
        }
        return false
    }
    
    GetClothColorCategory(prod){
        if(this.cloths_color.length > 0){
            if(this.cloths_color.indexOf(prod.color) > -1){
                return true
            }
            return false
        }
        return true
    }
    
     GetClothSizeCategory(prod){
        //let x = document.querySelector(".teste")
        if(this.cloths_size.length > 0){
            for (var i = 0; i < (prod.size).length; i++){
                if(this.cloths_size.indexOf(prod.size[i])> -1){
                    //x.innerHTML = prod.size
                    //x.innerHTML = prod.size[i]
                    return true
                }
            }
            return false
        }
        return true
    }

    AddProductCart(product_id){
        let x = document.querySelector(".cart_counter")
        //x.innerHTML = "foI"
        if(this.carrinho.indexOf(product_id) <= -1){
            this.carrinho.push(product_id);
        }
        x.innerHTML = `<h1>${this.carrinho.length}</h1>`
       
    }

    SetClothsByColor(){
        this.cloths_color = [];
        var pacote = document.getElementsByName("color_list");
        for (var i = 0; i < pacote.length; i++){
            if ( pacote[i].checked ) {
                this.cloths_color += pacote[i].value;
            }
        }
        this.UpdateProducts()
    }

    SetClothsByPrice(){
        this.cloths_prices = document.querySelector('input[name="price_list"]:checked').value
        this.UpdateProducts()
    }

    SetClothsBySize(){
        this.cloths_size = [];
        var pacote = document.getElementsByName("size_list");
        for (var i = 0; i < pacote.length; i++){
            if ( pacote[i].checked ) {
                this.cloths_size.push(pacote[i].value);
            }
        }
        this.UpdateProducts()
    }

    SortByLowestPrice(){
        this.current_products.sort(function (a, b) {
            if (a.price > b.price) {
              return 1;
            }
            if (a.price < b.price) {
              return -1;
            }
            return 0;
          });
        this.UpdateProducts()
        ToggleOrganizeMenu()
    }
    
    SortByBiggestPrice(){
    
        this.current_products.sort(function (a, b) {
            if (a.price < b.price) {
              return 1;
            }
            if (a.price > b.price) {
              return -1;
            }
            return 0;
          });
        this.UpdateProducts()
        ToggleOrganizeMenu()
    }

    GetProductsLimitSizeStatus(){
        if(this.productsLimitStatus){
            if(this.currentProductsLength < this.productsLimit){
                return true
            }
            return false
        }
        return true
    }

    ShowLoadButton(){
        let button = document.querySelector('.loadButton')
        if(this.currentProductsLength < this.productsLimit){
            button.classList.add('loadButton_off')
        }else{
            if(this.productsLimitStatus){
                button.classList.remove('loadButton_off')
            }else{
                button.classList.add('loadButton_off')
            }
        }
    }

    UpdateProducts(){
        let template = ``
        this.currentProductsLength = 0
        this.current_products.forEach(prod => {

            if(this.GetProductsLimitSizeStatus() && this.GetClothPriceCategory(prod) && this.GetClothColorCategory(prod) && this.GetClothSizeCategory(prod)){
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
                this.currentProductsLength++   

            }
            
        });

        this.ShowLoadButton()

        this.container.innerHTML = template;

    }

}


function ToggleOptionsList(component_id,component_id_off,sign_id){
    let list = document.querySelector(component_id)
    list.classList.toggle(component_id_off)

    let sign = document.querySelector('.' + sign_id)
    //let teste = document.querySelector('.teste')
    //teste.innerHTML = (sign_id + '_off')
    sign.classList.toggle(sign_id + '_minus')
    //let t = new Teste()

}

function ToggleLoadButton(){
    productsLimitStatus = false;
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

// Fazendo a Requisição dos produtos para a Api
const renderPosts = async() =>{
    let uri = "http://localhost:3000/products"

    const res = await fetch(uri)
    let products = await res.json()

    productsController = new ProductController(products)
    
    productsController.UpdateProducts()
    
}

window.addEventListener('DOMContentLoaded',()=>renderPosts());
