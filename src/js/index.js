main();

var productsArray;
var filtered = new Array;
var ordered = new Array;
var filtersApplyed = new Array;
var filterDesktop = true;

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
        return (product.price>501) ? true : false; 
    }
}

function applyFilter(filtersApplyed){ 
    var filteredColors = new Array
    var filteredSizes = new Array
    var filteredPrices = new Array

    filtersApplyed.sort(function compare(a, b) {
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
        return 0;
    })

    filteredColors = filtersApplyed.filter(elem => elem[0] == 'color').map(elem => elem[1])
    filteredSizes = filtersApplyed.filter(elem => elem[0] == 'size').map(elem => elem[1])
    filteredPrices = filtersApplyed.filter(elem => elem[0] == 'price').map(elem => elem[1])


    var filteredProducts = new Array

    filteredProducts = productsArray.filter(product =>{
        if((filteredColors.length == 0 ? true : filteredColors.some(color => product.color == color)) && (filteredSizes.length == 0 ? true :filteredSizes.some(size => product.size.some(elem => elem == size))) && (filteredPrices.length == 0 ? true : filteredPrices.some(price => filterPrice(product, price)))){
            return product
        }
    })

    filtered = filteredProducts;

    if(ordered.length == 0){
        document.querySelector(".products").innerHTML = ""; 
        showProducts(filteredProducts)

    }else{
        orderProducts(ordered[0][0], ordered[0][1])
    }
}

function removeFilter(param){   
    filtersApplyed = filtersApplyed.filter(filter => filter[1] != param[1])
    if(filterDesktop){
        if(filtersApplyed.length === 0){
            document.getElementById("products").innerHTML = "";
            showProducts(productsArray)
        }else{
            applyFilter(filtersApplyed)
        }
    }
        
}

function checkbox(){    
    var btn = Array.from(document.querySelectorAll(".checkbox"));
    btn.map(elem => {
        elem.onclick = function (e) {  
            e.preventDefault();
            if(window.innerWidth > 800){
                filterDesktop = true;
            } 
            var checked = elem.firstElementChild;
            if(checked.style.display === 'block'){
                checked.style.display = 'none';
                if(filterDesktop){
                    if(elem.getAttribute("id")=='color'){
                        removeFilter([elem.getAttribute("id"), elem.getAttribute("color")])     
                    }else{
                        removeFilter([elem.getAttribute("id"), elem.getAttribute("price")])                 
                    }  
                }                      
            }else{
                checked.style.display = 'block';
                if(elem.getAttribute("id")=='color'){
                    filtersApplyed.push([elem.getAttribute("id"), elem.getAttribute("color")])
                    if(filterDesktop){
                        applyFilter(filtersApplyed)
                    }            
                }else{
                    filtersApplyed.push(["price", elem.getAttribute("price")])
                    if(filterDesktop){
                        applyFilter(filtersApplyed)
                    }             
                }              
            }
        };
    });
}

function checkboxBtn(){
    var btn = Array.from(document.querySelectorAll(".checkbox-btn"));
    btn.map(elem => {
        elem.onclick = function (e) { 
            if(window.innerWidth > 800){
                filterDesktop = true;
            } 
            if(elem.getAttribute('active')=='false'){
                elem.setAttribute('active','true');
                elem.style.border = "1.5px solid #00c0ee";
                filtersApplyed.push(["size",elem.getAttribute('size')]);
                if(filterDesktop){      
                    applyFilter(filtersApplyed);
                }             
            }else{
                elem.setAttribute('active','false');
                elem.style.border = "1.5px solid gray";
                if(filterDesktop){
                    removeFilter(['size', elem.getAttribute("size")]);      
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
    var orderedArray = filtersApplyed.length === 0 ? productsArray : filtered;

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
            ordered.length = 0;
            if(orderType == "recent"){
                ordered.push(["date",true]);
                orderProducts("date",true);
            }else if(orderType == "low-price"){
                ordered.push(["price",true]);
                orderProducts("price",true);
            }else{
                ordered.push(["price",false]);
                orderProducts("price",false)
            }
        };
    });
}

function getProducts(){
    fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then((res) => {
           productsArray = res;
           showProducts(productsArray);
        })
        .catch((error) => {
            console.log(error);
        });
}

function showProducts(products){   
    if(products.length > 6){
        showMoreProducts(products)
        document.querySelector(".load-more-btn").style.display = 'block' 
    }else{
        document.querySelector(".load-more-btn").style.display = 'none'
    }
    products = products.slice(0,6);
    
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
    });
    addToCart();
}

function showMoreProducts(products){
    products = products.slice(6);
    document.querySelector(".load-more-btn").onclick = function(){
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
        });
        document.querySelector(".load-more-btn").style.display = 'none';
    }
    addToCart();
}

function addToCart(){
    let productToAdd = Array.from(document.querySelectorAll(".add"));
    productToAdd.map(elem => {
        elem.onclick = function (e) {
            e.preventDefault();
            
            let id = elem.getAttribute('productId');
            let price = elem.getAttribute('price');
            localStorage.setItem(`${id}`,`${price}`); 
            console.log(localStorage);     
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
            document.getElementById("order-back-icon").onclick = function (e){
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
            let selectDesktop = document.querySelector(".catalog .selector")

            if(orderType == "recent"){
                orderProducts("date",true);
                selectDesktop.firstChild.data = 'Mais recentes';
            }else if(orderType == "low-price"){
                orderProducts("price",true);
                selectDesktop.firstChild.data = 'Menor preço';
            }else{
                orderProducts("price",false)
                selectDesktop.firstChild.data = 'Maior preço';
            }
        };
    });

}

function showCheckedDesktop(){
    let allChecks = Array.from(document.querySelectorAll(".filters .checkbox-div .checkbox"))
    allChecks.map(elem =>{
        elem.firstElementChild.style.display = 'none';
        filtersApplyed.map(element => {
            if (elem.getAttribute("content") == element[1])
                elem.firstElementChild.style.display = 'block';
        })
    })

    let allChecksBtn = Array.from(document.querySelectorAll(".filters .sizes .checkbox-btn"))
    allChecksBtn.map(elem =>{
        elem.style.border = "1.5px solid gray";
        filtersApplyed.map(element => {
            if(elem.getAttribute('content') == element[1]){
                elem.setAttribute('active','true');
                elem.style.border = "1.5px solid #00c0ee";
            }
        })
    })
    
}

function showCheckedMobile(){
    let allChecks = Array.from(document.querySelectorAll(".expand .checkbox-div .checkbox"))
    allChecks.map(elem =>{
        elem.firstElementChild.style.display = 'none';
        filtersApplyed.map(element => {
            if (elem.getAttribute("content") == element[1])
                elem.firstElementChild.style.display = 'block';
        })
    })

    let allChecksBtn = Array.from(document.querySelectorAll(".expand .sizes .checkbox-btn"))
    allChecksBtn.map(elem =>{
        elem.style.border = "1.5px solid gray";
        filtersApplyed.map(element => {
            if(elem.getAttribute('content') == element[1]){
                elem.setAttribute('active','true');
                elem.style.border = "1.5px solid #00c0ee";
            }
        })
    })
}

function expandFilter(){
    let expand = Array.from(document.querySelectorAll(".material-icons.expand-filter"));
    let applyDiv = document.querySelector(".apply-filters")
    expand.map(elem => {
        let divColor = elem.parentElement.nextElementSibling
        elem.onclick = function (e) {
            e.preventDefault();
            if(divColor.style.display == 'block'){
                divColor.style.display = 'none'
                elem.textContent = "add"
                
            }else{
                divColor.style.display = 'block'
                applyDiv.style.display = 'flex'
                elem.textContent = "remove"
            }

            let expanded = expand.filter(elem => elem.textContent == "remove");
            if(expanded.length == 0){
                applyDiv.style.display = 'none'
            }
        };
    });
}

function filterMobile(){
    var btn = document.getElementById("filter-mobile");
    var divFilter = document.querySelector(".div-mobile-filter");
    var divDesktop = document.querySelector(".desktop");
    btn.onclick = function (e) {  
        e.preventDefault();
        showCheckedMobile();
        filterDesktop = false;
        if(divFilter.style.display === 'flex'){
            divFilter.style.display = 'none';
            divDesktop.style.display = 'block';
        }else{
            divFilter.style.display = 'flex';
            divDesktop.style.display = 'none';
            document.getElementById("filter-back-icon").onclick = function (e){
                e.preventDefault();
                divFilter.style.display = 'none';
                divDesktop.style.display = 'block';
            }
        }
    };
    expandFilter();

    var checked = Array.from(document.querySelectorAll(".checked"));
    var checkbox = Array.from(document.querySelectorAll(".expand .checkbox"));
    var allChecksBtn = Array.from(document.querySelectorAll(".expand .sizes .checkbox-btn"))
    
    document.querySelector(".apply").onclick = function(e){
        e.preventDefault();
        filtersApplyed.length = 0;
        checkbox.map(elem => {
            if(elem.firstElementChild.style.display == 'block'){
                filtersApplyed.push([elem.getAttribute('id'), elem.getAttribute('content') ])
            }
        })
        allChecksBtn.map(elem =>{
            if(elem.style.border == '1.5px solid rgb(0, 192, 238)'){
                filtersApplyed.push(['size', elem.getAttribute('content') ])
            }
        })

        document.querySelector(".products").innerHTML = "";
        filtersApplyed.length == 0 ? showProducts(productsArray) : applyFilter(filtersApplyed)       
        divFilter.style.display = 'none';
        divDesktop.style.display = 'block';
        showCheckedDesktop();
    }
    
    document.querySelector(".remove").onclick = function(){
        filtersApplyed.length = 0;
        filtered.length = 0;
        showCheckedDesktop();
        document.querySelector(".products").innerHTML = "";
        checked.map(elem =>{
            elem.style.display = 'none';
        });
        showProducts(productsArray);
    }
}

function main(){
    getProducts();
    localStorage.clear();
    filterMobile();
    checkbox();
    checkboxBtn();
    selector();
    getAdditionalColors();
    orderMobile();
}
