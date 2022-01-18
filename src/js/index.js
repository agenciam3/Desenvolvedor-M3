function processProducts(data) {
    var product = {
        products: data,
        current_shown_items: 0,
        tmp_products: undefined,
        
        init: function () {
            this.bindEvent();
            this.tmp_products = this.products;
            this.load();            
        },
        
        render: function (products, found) {
            // create and display elements | get the array of elements
            let products_div = document.getElementById("products");
            
            products.forEach(element => {
                //console.log(element);
                new_product = document.createElement("div");
                new_product.innerHTML = "<div class='product'> <img src='"+ element.image +"' class='image'> <p class='name'>"+ element.new +"</p> <p class='price'>R$ "+ element.price.toFixed(2) +"</p> <p class= 'parcelamento'>Até "+ element.parcelamento[0] +"x de R$"+ element.parcelamento[1] +"</p> <button class='comprar' value='"+ element.id +"'>Comprar</button>";
                products_div.appendChild(new_product);
            });
            
            if (!found) {
                console.log("Can't find any products with current selection");
            }
        },
        
        filter: function (user_input) {
            // initialize/reset temporary products
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
                
                // checks if the product meets the requirements
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
                            
            // if the temporary is empty check if at least one filter has been activated
            // true case means no product was found
            if (tmp_products.length !== 0) {
                this.tmp_products = tmp_products;
                this.load();
            } else if (user_input.size.length !== 0 || user_input.color.length !== 0 || !isNaN(user_input.price_range[0])) {
                this.load(false)
            }
            
        },
        
        bindEvent: function () {
            
            // allows the radio to be deselected
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
            
            // open the order select
            selected.onclick = (function() {
                options_container.classList.toggle("active");
            });
            
            // close the order select and assign selected value
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
            
            
            // properly the event that captures de user input 
            document.getElementById("container").onclick = (function(event) { 
                //only run for child elements
                if(event.target.type === 'checkbox' || event.path.filter(element => element.id === "order_by_select").length !== 0 && event.path.filter(element => element.id === "options_container").length !== 0 || event.target.type === 'radio' ) {
                    //uncheck select if selected
                    if (event.target.name == "price_range") {
                        uncheck();
                    }
                    
                    let filter_data = document.getElementsByClassName("filters");
                    
                    // reset shown items
                    product.current_shown_items = 0;
                    
                    // enable load more again
                    load_more_btn.textContent = "Carregar mais";
                    load_more_btn.disabled = false;
                    
                    // send to process
                    product.processUserInput(filter_data, order);
                }
            })
            
            load_more_btn = document.getElementById("load_more")
            load_more_btn.onclick = (function() {
                if(product.load()) {
                    load_more_btn.textContent = "fim da lista";
                    load_more_btn.disabled = true;
                }
            });
            
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
        
        load: function (found=true) {
            if (found) {
                var products = this.tmp_products;
            } else {
                var products = this.products;
            }
            let current_shown_items = this.current_shown_items;
            let sliced = undefined;
            let   device = window.innerWidth;
            switch (true) {

                case (device>=320 && device<600) :
                    sliced = products.slice(current_shown_items,(current_shown_items+4));
                    this.current_shown_items += sliced.length;
                    break;

                case (device>=600) :
                    sliced = products.slice(current_shown_items,(current_shown_items+9));
                    this.current_shown_items += sliced.length;
                    break;

                default:
                    break;

            }
            this.render(sliced, found);
            if (this.current_shown_items == products.length) {
                return true;
            }
        },
    }
    
    product.init();

    var cart = {
        products_in_cart: [],
        
        init: function() {
            this.bindEvent();
        },
        
        bindEvent: function() {
            //ao clicar em comprar adicionar produto no carrinho
            document.getElementById("products").onclick = function(event) {
                if (event.target.classList.contains("comprar")) {
                    cart.products_in_cart.push(event.target.value);
                    cart.renderCart();
                }
            };
            
        },

        renderCart: function() {
            document.getElementById("cart_count").innerHTML = this.products_in_cart.length;
        },
    }
    cart.init();
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