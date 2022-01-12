function processProducts(data) {
    var product = {
        products: data,
        
        init: function () {
            this.bindEvent();
            this.render(this.products);
        },
        render: function (products) {
            //cria e exibe os elementos | recebe a array de elemetos
            
        },

        filter: function () {
            
            //objeto contendo informações para filtragem
            //filtra os elementos
            console.log(user_input);
            return product.products;

        },
        //precisa ser pensado melhor
        bindEvent: function () {
            document.getElementById("wrapper").onclick = (function() {
                let user_input = {
                    color: [],
                    size: [],
                    price_range: [],
                    
                }

                console.log("clicked");
                let fil = document.getElementsByClassName("filters");
                for (let item of fil) {
                    if (item.checked) {
                        let option = item.defaultValue;
                        user_input[option].push(item.nextSibling.textContent.trim());
                    }
                }
                console.log(user_input);
            })
        },
    }
    product.init();
}

function getProducts () {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
             if (request.status == 200) {
                var data = JSON.parse(request.responseText);
                processProducts(data);
                } else {
                    console.log("Error " + request.status)
                }
            }
        };
    request.open('get', 'http://localhost:5500/products', true);
    request.send();
}

getProducts();