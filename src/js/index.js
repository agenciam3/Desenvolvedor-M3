console.log("Dev m3");
main();

var productsArray;
var filteredProducts = new Array;
var filtersApplyed = new Array;

function filterPrice(product, key){  
    if(key == "0-to-50"){
        return (product.price>= 0 && product.price<=50) ? true : false; 
    }else if (key == "51-to-150"){
        return (product.price>= 51 && product.price<=150) ? true : false; 
    }else if (key == "151-to-300"){
        return (product.price>= 151 && product.price<=300) ? true : false; 
    }else if(key == "301-to-500"){
        return (product.price>= 301 && product.price<=500) ? true : false; 
    }else{
        return (product.price<500) ? true : false; 
    }
}

function applyFilter(filtersApplyed){ 
    filteredProducts = new Array
    filtersApplyed.forEach(elem => {
        if(elem[0] == 'color'){      
            filteredProducts = filteredProducts.concat(productsArray.filter(produto => produto.color == elem[1]));
        }else if(elem[0] == 'size'){
            filteredProducts = filteredProducts.concat(productsArray.filter(produto => produto.size == elem[1]));
        }else{
            filteredProducts = filteredProducts.concat(productsArray.filter(elem => filterPrice(elem, elem[0])));
        }    
    });
    document.getElementById("products").innerHTML = "";
    showProducts(filteredProducts)
}

function removeFilter(param){
    filtersApplyed = filtersApplyed.filter(filter => filter[1] !== param[1])
    console.log(filtersApplyed.length)
    if(filtersApplyed.length === 0){
        document.getElementById("products").innerHTML = "";
        showProducts(productsArray)
    }else{
        applyFilter(filtersApplyed)
    }
}

function checkbox(){
    var btn = Array.from(document.querySelectorAll(".checkbox"));
    btn.map(elem => {
        elem.onclick = function (e) {  
            e.preventDefault();
            var checked = elem.firstElementChild;
            if(checked.style.display === 'block'){
                checked.style.display = 'none';
                if(elem.getAttribute("id")=='color'){
                    removeFilter([elem.getAttribute("id"), elem.getAttribute("color")])
                }else{
                    removeFilter([elem.getAttribute("price")])       
                }                
            }else{
                checked.style.display = 'block';
                if(elem.getAttribute("id")=='color'){
                    filtersApplyed.push([elem.getAttribute("id"), elem.getAttribute("color")])
                    applyFilter(filtersApplyed)
                }else{
                    filtersApplyed.push(["price", elem.getAttribute("price")])
                    applyFilter(filtersApplyed)
                }              
            }
        };
    });
}

function getAdditionalColors(){
    var link = document.getElementById('see-more');
    var div = document.querySelector(".additional-colors")
    link.onclick = function (e) {  
        e.preventDefault();
        if(div.style.display === 'block'){
             div.style.display = 'none';
             link.innerHTML = `Veja todas as cores <i style="margin-left: 5px;" class="fa fa-solid fa-angle-down"></i>`
        }else{
            div.style.display = 'block';
            link.innerHTML= `Veja menos cores <i style="margin-left: 5px;" class="fa fa-solid fa-angle-up"></i>`
        }
    };
}

function orderProducts(type, asc){
    var orderedArray = productsArray;
    if(asc){
        orderedArray.sort(function compare(a, b) {
            if (a[type] < b[type]) return -1;
            if (a[type] > b[type]) return 1;
            return 0;
        })
    }else{
        orderedArray.sort(function compare(a, b) {
            if (a.price > b.price) return -1;
            if (a.price < b.price) return 1;
            return 0;
        })
    } 
    document.getElementById("products").innerHTML = "";
    showProducts(orderedArray);
}


function selector(){
    var btn = document.getElementById('selector');
    var options = document.querySelector('.options');
    btn.onclick = function(){
        if(options.style.display === 'block'){
            options.style.display = 'none';
        }else{
            options.style.display = 'block';
        }
    }

    let op = Array.from(document.querySelectorAll(".op"));

    op.map(elem => {
        elem.onclick = function (e) {
            e.preventDefault();
            options.style.display = 'none';
            btn.childNodes[0].data = elem.childNodes[0].data;
            let orderType = elem.getAttribute("ordertype");

            if(orderType == "recent"){
                orderProducts("date",true);
            }else if(orderType == "low-price"){
                orderProducts("price",true);
            }else{
                orderProducts("price",false)
            }
        };
    });
}

function getProducts(){
    var requestURL = 'http://localhost:5000/products';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        productsArray = request.response;
        showProducts(productsArray);
    }
}

function showProducts(products){
    console.log("entrou aqui",products)
    products = products.slice(0,9);
    products.map(elem => {
        let listAllProducts = document.getElementById("products");
        let htmlInsert = `
            <div class="product">
                <img src="${elem.image}" alt="erro">
                <h3>${elem.name.toUpperCase()}</h3>
                <span style="font-weight:bold">R$${Number(elem.price).toFixed(2)} </span>
                <span style="font-weight: 300;font-size: 15px;">até ${elem.parcelamento[0]}x de R$${Number(elem.parcelamento[1]).toFixed(2)} </span>
                <button id="add" class="add" productId=${elem.id} price=${elem.price}>
                    COMPRAR
                </button>   
            </div>
        `

        listAllProducts.insertAdjacentHTML('beforeend', htmlInsert); 
        filteredProducts = productsArray
        addToCart();   
    });
}

function addToCart(){
    let productToAdd = Array.from(document.querySelectorAll(".add"));
    productToAdd.map(elem => {
        elem.onclick = function (e) {
            e.preventDefault();
            
            let id = elem.getAttribute('productId');
            let price = elem.getAttribute('price');
            localStorage.setItem(`${id}`,`${price}`);      
            let qtdDisplay = document.querySelector(".qtd");
            
            if(localStorage.length === 1){
                qtdDisplay.style.display = 'block';
                qtdDisplay.innerText = localStorage.length;
            }else{
                qtdDisplay.innerText = localStorage.length;
            }           
        }
    });
}

function orderMobile(){
    var btn = document.getElementById("order-mobile");
    var divOrder = document.querySelector(".div-mobile-order");
    var divDesktop = document.querySelector(".desktop");
    btn.onclick = function (e) {  
        e.preventDefault();
        if(divOrder.style.display === 'flex'){
            divOrder.style.display = 'none';
            divDesktop.style.display = 'block';
        }else{
            divOrder.style.display = 'flex';
            divDesktop.style.display = 'none';
            document.getElementById("back-icon").onclick = function (e){
                e.preventDefault();
                divOrder.style.display = 'none';
                divDesktop.style.display = 'block';
            }
        }
    };

    let op = Array.from(document.querySelectorAll(".op-mobile"));

    op.map(elem => {
        elem.onclick = function (e) {
            e.preventDefault();
            let orderType = elem.getAttribute("ordertype");
            divOrder.style.display = 'none';
            divDesktop.style.display = 'block';

            if(orderType == "recent"){
                orderProducts("date",true);
            }else if(orderType == "low-price"){
                orderProducts("price",true);
            }else{
                orderProducts("price",false)
            }
        };
    });

}

function main(){
    getProducts();
    localStorage.clear();
    checkbox();
    selector();
    getAdditionalColors();
    orderMobile();
}
