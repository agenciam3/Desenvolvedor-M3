function filter(){
    var productSelected = listProductsCopy.filter(function (product) {
        if(colorsSelected.length > 0){
            const found = product.color.some(item => colorsSelected.includes(item));
            if(!found){
                return false;
            }
        }
        return true;
    }).filter(function (product) {
        if(sizesSelected.length > 0){
            const found = product.size.some(item => sizesSelected.includes(item));
            if(!found){
                return false;
            }
        }
        return true;
    }).filter(function (product) {
        if(priceSelected != null){
            var price = product.price.replace("R$ ", "");
            price = parseFloat(price);
            var priceArray = priceSelected.split("-");
            var min = parseFloat(priceArray[0]);
            var max = parseFloat(priceArray[1]);
            if(price >= min && price <= max){
                return true
            }
            return false;
        }
        return true;

    });

    console.log(productSelected);

    if(colorsSelected.length == 0 && sizesSelected.length == 0 && priceSelected == null){
        products.itens = sortProducts(listProductsCopy);
        if(document.getElementById("section-products")){
            document.getElementById("section-products").remove();
        }
        if(document.querySelector('#render-container > div')){
            document.querySelector('#render-container > div').remove();
        }
        products.itensLoad = 6;
        renderProducts();
    } else {
        products.itens = sortProducts(productSelected);
        if(document.getElementById("section-products")){
            document.getElementById("section-products").remove();
        }
        if(document.querySelector('#render-container > div')){
            document.querySelector('#render-container > div').remove();
        }
        if(productSelected.length > 6){
            products.itensLoad = 6;
        } else {
            products.itensLoad = productSelected.length;
        }
        renderProducts();
    }
    
}

var applyfilter = document.getElementById("option-aplication");
applyfilter.addEventListener("click", function(){
    filter();
    filterSecret.style.display = "none";
    renderProduct.style.display = "block";
});

var clearFilter = document.getElementById("option-clean");
clearFilter.addEventListener("click", function(){
    console.log(filterColorInput)
    for(var i = 0; i < filterColorInput.length; i++){
        filterColorInput[i].checked = false;
    }  
    colorsSelected = [];
    
    for(var i = 0; i < filterSizeInput.length; i++){
        filterSizeInput[i].checked = false;
    }
    sizesSelected = [];

    for(var i = 0; i < filterPriceInput.length; i++){
        filterPriceInput[i].checked = false;
    }
    priceSelected = null;

    filter();
    filterSecret.style.display = "none";
    renderProduct.style.display = "block";
});
