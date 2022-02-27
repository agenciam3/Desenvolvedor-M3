console.log("Dev m3");
getProducts();
checkbox();
selector();

var productsArray;

function checkbox(){
    var btn = Array.from(document.querySelectorAll(".checkbox"));
    btn.map(elem => {
        elem.onclick = function (e) {  
            e.preventDefault();
            var checked = elem.firstElementChild;
            if(checked.style.display === 'block'){
                 checked.style.display = 'none';
            }else{
                checked.style.display = 'block';
            }
        };
    });
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
            let text = elem.childNodes[0].data;
            btn.childNodes[0].data = elem.childNodes[0].data;
            let orderType = elem.getAttribute("ordertype");
            var orderedArray = productsArray;

            if(orderType == "recent"){
                orderedArray.sort(function compare(a, b) {
                    if (a.date < b.date) return -1;
                    if (a.date > b.date) return 1;
                    return 0;
                })
                document.getElementById("products").innerHTML = "";
                showProducts(orderedArray);
            }else if(orderType == "low-price"){
                orderedArray.sort(function compare(a, b) {
                    if (a.price < b.price) return -1;
                    if (a.price > b.price) return 1;
                    return 0;
                })
                document.getElementById("products").innerHTML = "";
                showProducts(orderedArray);
            }else{
                orderedArray.sort(function compare(a, b) {
                    if (a.price > b.price) return -1;
                    if (a.price < b.price) return 1;
                    return 0;
                })
                document.getElementById("products").innerHTML = "";
                showProducts(orderedArray);

            }
        };
    });
}

function getProducts(){
    var requestURL = ' http://localhost:5000/products';
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
    products = products.slice(0,9);
    products.map(elem => {
        console.log(elem);
        let listAllProducts = document.getElementById("products");
        let htmlInsert = `
            <div class="product">
                <img src="${elem.image}" alt="erro">
                <h3>${elem.name.toUpperCase()}</h3>
                <span style="font-weight:bold">R$${Number(elem.price).toFixed(2)} </span>
                <span style="font-weight: 300;font-size: 15px;">até ${elem.parcelamento[0]}x de R$${Number(elem.parcelamento[1]).toFixed(2)} </span>
                <button class="add" productId=${elem.id}>
                    COMPRAR
                </button>   
            </div>
        `

        listAllProducts.insertAdjacentHTML('beforeend', htmlInsert);    
    });
}
