function processProducts(data) {
    var product = {
        products: data,
        
        init: function () {
            product.bindEvent();
            //product.render(this.products);
            let testa = [];
            let testo = [];
            let test = "de R$0 até R$50";
            index = test.lastIndexOf("$");
            testo.push(parseInt(test.substring(0, index).replace(/[^0-9]/g,'')));
            testo.push(parseInt(test.substring(index).replace(/[^0-9]/g,'')));

            testa.push(testo);
            console.log(testo);




        },

        render: function (products, found=true) {
            //cria e exibe os elementos | recebe a array de elemetos
            console.log(products);
            if (!found) {
                console.log("Can't find any products with current selection");
            }
        },

        filter: function (user_input) {
            //filtra os elementos
            let tmp_products = [];

                    this.products.forEach(element => {
                        let size = false;
                        let color = false;
                        let price = false;
                        if (user_input.size.length !== 0) {
                            element.size.forEach(product_size => {
                                user_input.size.forEach(key => {
                                    if (product_size == key) {
                                        size = true;
                                    }
                                });
                            });  
                        }else size = true;

                        if (user_input.color.length !== 0) {
                            user_input.color.forEach(key => {
                                if (element.color == key) {
                                    color = true;
                                }
                            });
                        } else color = true;
                    
                    
                        if (size && color) 
                        tmp_products.push(element);
                        
                });
        


            if (!tmp_products.length == 0) {
                this.render(tmp_products);
            } else if (user_input.size.length !== 0 || user_input.color.length !== 0 || user_input.price.length !== 0) {
                this.render(this.products, false)
            }

        },
 
        bindEvent: function () {
            document.getElementById("wrapper").onclick = (function(event) {
                if(event.target.type == 'checkbox'){
                    let filter_data = document.getElementsByClassName("filters");
                    product.processUserInput(filter_data);
                  }
            })
        },

        processUserInput: function (filter_data) {
            console.log(filter_data);
            let user_input = {
                color: [],
                size: [],
                price_range: [],
                
            }
            
            for (let item of filter_data) {
                if (item.checked) {
                    let option = item.defaultValue;
                    user_input[option].push(item.nextSibling.textContent.trim());
                }
            }
            //console.log(user_input);
            this.filter(user_input);
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