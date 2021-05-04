import ShopView from "./view/ShopView.js";

function start(){
    ShopView().init();
}

function addToCart(id){
    
}

start();

document.body.addEventListener('click', function (evt) {
    if (evt.target.className === 'show-more-blue') {
        ShopView().loadMore();
    }

    if (evt.target.className === 'buy-black') {
        console.log("ADICIONAR:", evt.target.dataset.product, "AO CARRINHO")
    }


}, false);