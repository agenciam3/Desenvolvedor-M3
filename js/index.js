let cartItems = 0;
let products = [];
let productCount = 0;
const productsPerPage = 6;
let totalProducts = 0;

let selectedFilters = 0;
let filterSizes = [];

function showOrdenar(){
    let menu = document.getElementById("menu");
    let leftOptions = document.getElementById("left-options");
    menu.style.display = "block";
    leftOptions.style.display = "block";
}

function showFilter(){
    let leftOptions = document.getElementById("left-options");
    let menu = document.getElementById("category");

    leftOptions.style.display = "block";
    menu.style.position = "fixed";
    menu.style.display = "block";
}

function showSubmenu(btn, submenuId) {
    let submenu = document.getElementById(submenuId);
    if (btn.innerHTML === "+") {
        btn.innerHTML = "-"
        submenu.style.display = 'block';
    } else {
        btn.innerHTML = "+"
        submenu.style.display = 'none';
    }
}

function hideOrdenar() {
    let menu = document.getElementById("menu");
    let options = document.getElementById("options");
    let leftOptions = document.getElementById("left-options");
    
    menu.style.display = "none";

    let isMobile = window.getComputedStyle(document.getElementById('options')).display != "none";

    if (isMobile) {
        leftOptions.style.display = "none";
    }
}

function hideCategories() {
    let options = document.getElementById("options");           // movil
    let leftOptions = document.getElementById("left-options");  // desktop

    let category = document.getElementById("category");         // menu

    let isMobile = window.getComputedStyle(document.getElementById('options')).display != "none";

    if (isMobile) {
        category.style.display = "none";
    }
}

/** Activar boton de Talla */
function activateSize(btn) {
    btn.classList.toggle("size-pressed-btn");
    
    if (btn.classList.contains("size-pressed-btn")) {
        selectedFilters++;
        filterSizes.push(btn.dataset.value);
    }
    else {
        selectedFilters--;
        filterSizes = filterSizes.filter((item) => item !== btn.dataset.value)
    }

    document.getElementById("apply-list").style.display = selectedFilters ? "flex" : "none";
}

/** Activar solo un Checkbox */
function activatePrice(price) {
    let prices = document.getElementsByName('price')

    prices.forEach( (item) => {
        if (item !== price) {
            if(item.checked) {
                selectedFilters--;
            }
            item.checked = false;
        }
    })

    if (price.checked) 
        selectedFilters++;
    else
        selectedFilters--;

    document.getElementById("apply-list").style.display = selectedFilters ? "flex" : "none";
}

/** Cargar productos desde el JSON */
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("../products.json", function(text) {
    let json = JSON.parse(text);
    products = json;
    totalProducts = products.length;
    
    /** Obteniendo Colores */
    let colors = [];
    json.map((item) => {
        colors.push(...item.colors);
    });
    colors = [...new Set(colors)].sort();

    /** Obteniendo Tallas */
    let sizes = [];
    json.map((item) => {
        sizes.push(...item.sizes);
    });
    sizes = [...new Set(sizes)].sort();

    /** Obteniendo Tallas */
    let prices = [];
    json.map((item) => {
        prices.push(item.price);
    });
    prices = [...new Set(prices)].sort(function(a, b) {
        return a - b;
    });

    /** Crear lista de Colores */
    createColorList(colors);

    /** Crear lista de Tallas */
    createSizeList(sizes);

    /** Clear Product List */
    clearProductList();

    /** Mostrar Productos */
    printProducts();

});

function clearProductList() {
    document.getElementById("product-list").innerHTML = "";
}

function createColorList(colors) {
    let list = document.getElementById("color-list");
    let htmlList = ""

    colors.forEach(color => {
        htmlList+= `<label class="label-container"> ${color}
                        <input type="checkbox" name="color" value="${color}" onclick="filterSelected(this)"> <span class="checkmark"></span>
                    </label>`;
    });

    list.innerHTML = htmlList;
}

function filterSelected(btn) {
    if (btn.checked) 
        selectedFilters++;
    else
        selectedFilters--;

    document.getElementById("apply-list").style.display = selectedFilters ? "flex" : "none";
}

function createSizeList(sizes) {
    let list = document.getElementById("size-list");
    let htmlList = ""

    sizes.forEach(size => {
        htmlList+= `<a class="size-btn" name="size" data-value="${size}" onclick="activateSize(this)">${size}</a>`;
    });

    list.innerHTML = htmlList;
}

function printProducts() {
    let list = document.getElementById("product-list");
    let htmlList = ""

    products.slice(productCount, productCount + productsPerPage).forEach(product => {
        htmlList+= `<div class="product">
                        <div class="product-image">
                            <img src="${product.image}" alt="">
                        </div>
                        <div class="product-info">
                            <h3>${product.title}</h3>
                            <h4>R$ ${parseFloat(product.price).toFixed(2)}</h4>
                            <h5>até ${product.plus_units}x de R$ ${parseFloat(product.plus_price).toFixed(2)}
                            </h5>
                        </div>
                        <div class="product-button">
                            <h5 onclick="addItemToCart()">COMPRAR</h5>
                        </div>
                    </div>`;
        productCount++;
    });

    list.innerHTML+= htmlList;

    if (productCount >= totalProducts) {
        document.getElementById("btn-load").disabled = true;
    }
}

function addItemToCart() {
    cartItems++;
    document.getElementById("cartItems").innerHTML = cartItems;
}

function orderProductsBy(type, asc) {
    if (type == 'price') {
        products = products.sort((a, b) => ((a.price > b.price)? asc: !asc))
    }

    if (type == 'date') {
        products = products.sort((a, b) => {
            aDate = new Date(a.date);
            bDate = new Date(b.date);
            return (aDate < bDate);
        });
    }

    productCount = 0;
    hideOrdenar();
    clearProductList();
    printProducts();
}


function getProducts() {
    let filterColors = [];
    let filterPrices = [];

    /* Obteniendo colores para filtrar */
    document.getElementsByName("color").forEach( (item) => {
        if (item.checked) {
            filterColors.push(item.value);
        }
    });

    /* Obteniendo precios para filtrar */
    document.getElementsByName("price").forEach( (item) => {
        if (item.checked) {
            filterPrices['min'] = item.dataset.min;
            filterPrices['max'] = item.dataset.max;
        }
    });

    filteredProducts = products.filter( (item) => {
        filterByColor = false;
        item.colors.forEach(color => {
            if (filterColors.includes(color) ) {
                filterByColor = true;
            }
        });

        filterBySize = false;
        item.sizes.forEach(size => {
            if (filterSizes.includes(size) ) {
                filterBySize = true;
            }
        });

        filterByPrice = false;
        
        if (item.price >= filterPrices['min'] && item.price <= filterPrices['max']) {
            filterByPrice = true;
        }

        return filterByColor || filterBySize || filterByPrice;

    })

    products = filteredProducts;
    productCount = 0;

    clearProductList();
    printProducts();

    hideCategories();

    readTextFile("../products.json", function(text) {
        let json = JSON.parse(text);
        products = json;
        totalProducts = products.length;
    });
}

function cleanFilters() {

    console.log("clean");

    document.getElementsByName("color").forEach( (item) => {
        item.checked = false;
    });
    document.getElementsByName("price").forEach( (item) => {
        item.checked = false;
    });
    filterSizes = [];
    document.getElementsByName("size").forEach( (item) => {
        item.classList.remove("size-pressed-btn");
    })

    document.getElementById("apply-list").style.display = "none";
}

function filterSelect(select){
    console.log(select.value);
    switch(select.value){
        case "1" : orderProductsBy('date', true);
                break;
        case "2" : orderProductsBy('price', true);
                break;
        case "3" : orderProductsBy('price', false);
                break;
    }
}