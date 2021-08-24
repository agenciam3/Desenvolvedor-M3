const sizes  = document.querySelectorAll("#sizes label");
const colors = document.querySelectorAll("input[name='color']");
const prices = document.querySelectorAll("input[name='price']");

let quantShowed = 6;

function updateProducts() {
    const checkedColor = document.querySelector("input[name='color']:checked");
    const checkedSize  = document.querySelector("input[name='size']:checked");
    const checkedPrice = document.querySelector("input[name='price']:checked");

    fetch(path)
        .then(response => response.json())
        .then(products => {
            productsContainer.innerHTML = "";
            
            let prods = products.slice();
            
            if(checkedColor) prods = prods.filter(prod => prod.color == checkedColor.value);
            if(checkedSize)  prods = prods.filter(prod => prod.size  == checkedSize.value);
            if(checkedPrice) prods = prods.filter(prod => prod.price >= checkedPrice.min && prod.price <= checkedPrice.max);

            if(sortBy.trim() != "") {
                if(sortBy == "Menor preço") {
                    prods = prods.sort((a, b) => {
                        if(a.price < b.price) {
                            return -1;
                        }

                        return 1;
                    });
                } else if(sortBy == "Maior preço") {
                    prods = prods.sort((a, b) => {
                        if(a.price > b.price) {
                            return -1;
                        }

                        return 1;
                    });
                } else if(sortBy == "Mais recentes") {
                    prods = prods.sort((a, b) => {
                        if(new Date(a.date) > new Date(b.date)) {
                            return -1;
                        }

                        return 1;
                    });
                }
            }

            for(let i = 0; i < quantShowed && i < prods.length; i++) {
                addProductCard(prods[i]);
            }

            if(quantShowed >= prods.length) {
                document.querySelector(".more-container").style.display = "none";
            } else {
                document.querySelector(".more-container").style.display = "flex";
            }
        });
}

function sizeStyles(e, radio) {
    sizes.forEach(radio2 => {
        radio2.style.border = "1px solid #ccc";
        radio2.style.color  = "#ccc";
    })

    if(radio.querySelector("input").checked) {
        radio.style.border = "2px solid #2196F3";
        radio.style.color  = "black";
    }
}

function addMore() {
    quantShowed += 3;
    updateProducts();
}

sizes.forEach(radio => radio.addEventListener("click", e => { 

    if(e.target.previous) {
        e.target.checked = false;
    }

    sizes.forEach(src => src.previous = false);

    e.target.previous = e.target.checked;

    updateProducts(); 

    sizeStyles(e, radio); 
}));

colors.forEach(color => color.addEventListener("click", e => { 
    
    if(e.target.previous) {
        e.target.checked = false;
    }

    colors.forEach(src => src.previous = false);

    e.target.previous = e.target.checked;
    
    updateProducts(); 
}));

prices.forEach(price => price.addEventListener("click", e => { 
    
    if(e.target.previous) {
        e.target.checked = false;
    }

    prices.forEach(src => src.previous = false);

    e.target.previous = e.target.checked;
    
    updateProducts();
}));

updateProducts();