// Funcionalidades para renderização dos produtos na página

// Apresenta os primeiros produtos da página
function showInitialProducts() {
    const mainProducts = document.querySelectorAll('div.product');
    mainProducts.forEach(product => main.removeChild(product));
    
    initialIndex = 0;
    finalIndex = 9;

    getProducts(initialIndex, finalIndex);
    setLoadMore();
}

// Busca os produtos no arquivo JSON
function getProducts(initial, final, filter) {
    const url = 'http://localhost:5555/products';
    
    fetch(url)
    .then(response => response.json())
    .then(result => {
        var products;

        if(filter) {
            const filteredProducts = filterProducts(result, filter);
            
            if(initial < filteredProducts.length || filteredProducts.length === 0) {
                products = filteredProducts.slice(initial, final);
                renderProducts(products);
            }
        }
        else {
            if(initial < result.length) {
                products = result.slice(initial, final);
                renderProducts(products);
            }
        } 
    })
    .catch(error => console.error(`Erro ao buscar os produtos a serem renderizados.\nError: ${error}`));
}

// Filtra os produtos com base nas opções selecionadas
function filterProducts(products, filter) {
    const filteredProducts = products.filter(product => {
        var color = true;
        var size = true;
        var priceRange = true;

        if(filter.colors.length > 0) {
            color = filter.colors.includes(product.color);
        }

        if(filter.sizes.length > 0) {
            size = product.size.find(size => filter.sizes.includes(size)) ? true : false;
        }

        if(filter.priceRange.length === 1) {
            priceRange = product.price > filter.priceRange[0];
        }
        else if(filter.priceRange.length === 2) {
            priceRange = product.price >= filter.priceRange[0] && product.price <= filter.priceRange[1];
        }
        else if(filter.priceRange.length === 3) {
            priceRange = (product.price >= filter.priceRange[0] && product.price <= filter.priceRange[1]) || 
                (product.price > filter.priceRange[2]);
        }
        
        return color && size && priceRange;
    });

    return filteredProducts;
}

// Renderiza os produtos na página com base em suas propriedades
function renderProducts(products) {
    if(products.length > 0) {
        products.forEach(product => {
            const newProduct = document.createElement('div');
            const img = document.createElement('img');
            const productName = document.createElement('p');
            const productPrice = document.createElement('p');
            const p = document.createElement('p');
            const buttonBuy = document.createElement('button');

            const installments = product.price > 250 ? 5 : 3;
    
            newProduct.setAttribute('class', 'product');
            img.setAttribute('src', product.image);
    
            productName.setAttribute('id', 'product-name');
            productName.textContent = product.name;
    
            productPrice.setAttribute('id', 'product-price');
            productPrice.textContent = `R$ ${(product.price).toLocaleString('pt-br', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;
    
            p.textContent = `em até ${installments}x de ${(product.price / installments).toLocaleString('pt-br', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;
    
            buttonBuy.setAttribute('class', 'buy-product');
            buttonBuy.setAttribute('product-id', product.id)
            buttonBuy.textContent = 'COMPRAR';

            buttonBuy.onclick = function() {
                const productId = this.getAttribute('product-id');
                findProduct(productId);
            }
    
            newProduct.appendChild(img);
            newProduct.appendChild(productName);
            newProduct.appendChild(productPrice);
            newProduct.appendChild(p);
            newProduct.appendChild(buttonBuy);
            main.appendChild(newProduct);
        });  
    
        main.appendChild(loadMoreProducts);
        productsNotFound.remove();
    }
    else {
        main.appendChild(productsNotFound);
    }
}

// Uma vez clicado, o botão carregará mais produtos na página 
function setLoadMore(filter) {
    loadMoreProducts.onclick = function() {
        initialIndex = finalIndex;
        finalIndex += 6;
        getProducts(initialIndex, finalIndex, filter);
    }
}

showInitialProducts();
