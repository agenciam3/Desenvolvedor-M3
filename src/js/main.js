import ShopView from "./view/ShopView.js";

var INTERFACE_FILTERS = {colors_name:[], sizes:[], price_range:[], orderBy: 'recent'};

var INTERFACE_SIZES_FILTER_OPTIONS = {
    available : [],
    selected : ""
}

var INTERFACE_COLORS_FILTER_OPTIONS = {
    available : [],
    selected : []
}

var INTERFACE_PRICE_FILTER_OPTIONS = {
    available : [],
    selected : []
}

function loadItens(){
    ShopView().init().then((result) => {
        INTERFACE_SIZES_FILTER_OPTIONS.available = result.extra.unique_sizes;
        INTERFACE_COLORS_FILTER_OPTIONS.available = result.extra.unique_colors;
        INTERFACE_PRICE_FILTER_OPTIONS.available = [result.extra.cheapest_price,result.extra.expensive_price];
        ShopView().loadColorsOnView(INTERFACE_COLORS_FILTER_OPTIONS.available);
        ShopView().loadPricesOnView(INTERFACE_PRICE_FILTER_OPTIONS.available);
    })
}

function applyFiltersOnPage(){
    ShopView().setFilter(INTERFACE_FILTERS);
}

loadItens();


document.getElementsByClassName('shopping-cart-container')[0].addEventListener('click', ()=>{
    console.log('Ver carrinho');
});

document.getElementById('select-ordernation-filter').addEventListener('change', (evt) => {
    INTERFACE_FILTERS.orderBy = evt.target.value;
    applyFiltersOnPage();
    console.log(evt.target.value);
})

document.body.addEventListener('click', function (evt) {
    
    if (evt.target.className === 'show-more-blue') {
        ShopView().loadMore();
    }

    if (evt.target.className === 'buy-black') {
        console.log("ADICIONAR:", evt.target.dataset.product, "AO CARRINHO")
    }

}, false);