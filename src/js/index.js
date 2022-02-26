console.log("Dev m3");
getProducts();
checkbox();
selector();


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
            btn.childNodes[0].data = elem.childNodes[0].data
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
        var products = request.response;
        showProducts(products);
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
                <span style="font-weight:500px">R$${Number(elem.price).toFixed(2)} </span>
                <span>até ${elem.parcelamento[0]}x de R$${Number(elem.parcelamento[1]).toFixed(2)} </span>
                <button class="add" productId=${elem.id}>
                    COMPRAR
                </button>   
            </div>
        `

        listAllProducts.insertAdjacentHTML('beforeend', htmlInsert);    
    });
}
