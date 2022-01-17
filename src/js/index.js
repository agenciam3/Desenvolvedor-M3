(function () {
    //p=para js que intereage juntamente com o html/css na inicialização
    


})();

function processProducts(data) {
    var product = {
        products: data,
        
        init: function () {
            product.bindEvent();
            //product.render(this.products);
            
        },

        render: function (products, found=true) {
            //cria e exibe os elementos | recebe a array de elemetos

            console.log(products);
            if (!found) {
                console.log("Can't find any products with current selection");
            }
        },

        filter: function (user_input) {
            // inicializa/reseta a temporary products
            let tmp_products = [];

            //varre todos os elementos
            this.products.forEach(element => {
                //inicializa os fatores de filtro
                let size = false;
                let color = false;
                let price = false;

                //size
                if (user_input.size.length !== 0) {
                    element.size.forEach(product_size => {
                        user_input.size.forEach(key => {
                            if (product_size == key) {
                                size = true;
                            }
                        });
                    });  
                }else size = true;

                //color
                if (user_input.color.length !== 0) {
                    user_input.color.forEach(key => {
                        if (element.color == key) {
                            color = true;
                        }
                    });
                } else color = true;
                
                //price_range
                if (!isNaN(user_input.price_range[0])) {
                    if (element.price>= user_input.price_range[0] && element.price < user_input.price_range[1]) {
                        price = true;
                    }
                } else price = true;
                
                //verifica se o produto atende os requisitos
                if (size && color && price) 
                    tmp_products.push(element);
                
            });

            if (order = user_input.order_by.length !== 0) {
                switch (user_input.order_by) {
                    case "Menor Preço":
                        tmp_products.sort((element1, element2) => {
                            return element1.price - element2.price; 
                        });
                        break;
                    
                    case "Maior Preço":
                        tmp_products.sort((element1, element2) => {
                            return element2.price - element1.price; 
                        });
                        break;
                    
                    case "Mais Recentes":
                        tmp_products.sort((element1, element2) => {
                            return new Date(element2.date) - new Date(element1.date); 
                        });
                        break;
                
                    //caso o usuário tente interferir nas opções
                    default:
                        break;
                }
            }

            //caso o temporary esteja vazio verifica se pelo menos um filtro foi ativado
            //caso verdadeiro significa que nenhum produto foi encontrado
            if (tmp_products.length !== 0) {
                this.render(tmp_products);
            } else if (user_input.size.length !== 0 || user_input.color.length !== 0 || !isNaN(user_input.price_range[0])) {
                this.render(this.products, false)
            }

        },
 
        bindEvent: function () {
            function setLastChecked () {
                //set last checked for further loop become automatic
                return {0: {nextSibling: {textContent: ""}}};
            }
            let last_select_checked = setLastChecked();
            
            function uncheck () {
                var current_checked = Array.prototype.slice.call(document.getElementsByName("price_range")).filter(function(element){
                    return element.checked;
                });
                if (current_checked[0].nextSibling.textContent === last_select_checked[0].nextSibling.textContent) {
                    current_checked[0].checked = false;
                    last_select_checked = setLastChecked();
                } else {
                    last_select_checked = current_checked;
                }
            }
            
            selected.onclick = (function() {
                options_container.classList.toggle("active");
            });

            let order = document.getElementById("selected");                 
            let options_container = document.getElementById("options_container");
            let options_list = document.getElementsByClassName("option");
            for (let element of options_list) {
                element.onclick = (function() {
                    let swap_text = selected.innerHTML 
                    order.innerHTML = element.firstChild.nextSibling.innerText;
                    element.firstChild.nextSibling.innerHTML = swap_text;
                    options_container.classList.remove("active");
                });
            
            }
            
            

            document.getElementById("container").onclick = (function(event) { 
                //only run for child elements
                if(event.target.type === 'checkbox' || event.path.filter(element => element.id === "order_by_select").length !== 0 && event.path.filter(element => element.id === "options_container").length !== 0 || event.target.type === 'radio' ) { //(event.path.filter(element => element.id === "order_by_select") !== [] && event.path.filter(element => element.id === "options_container") !== [] )||
                    //uncheck select if selected
                    if (event.target.name == "price_range") {
                        uncheck();
                    }
                    


                    let filter_data = document.getElementsByClassName("filters");
                    //filter_data = selected;
                    product.processUserInput(filter_data, order);
                }
            })
        },

        processUserInput: function (filter_data, order) {
            let user_input = {
                color: [],
                size: [],
                price_range: [],
                order_by: "",
                
            }
            
            for (let item of filter_data) {
                if (item.checked) {
                    user_input[item.defaultValue].push(item.nextSibling.textContent.trim());
                }                
            }            
            user_input.order_by = order.textContent.trim();



            let tmp_price_array = [];
            let tmp_price = user_input.price_range.toString();
            index = tmp_price.lastIndexOf("$");
            tmp_price_array.push(parseInt(tmp_price.substring(index, 0).replace(/[^0-9]/g,'')));
            tmp_price_array.push(parseInt(tmp_price.substring(index).replace(/[^0-9]/g,'')));
            user_input.price_range = tmp_price_array;
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
    request.open('get', 'http://localhost:5000/products', true);
    request.send();
}

getProducts();