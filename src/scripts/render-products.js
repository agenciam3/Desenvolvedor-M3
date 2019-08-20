const loadMore = document.getElementById('load-more-products');
var initialIndex = 0;
var finalIndex = 9;

// Apresenta os primeiros produtos da página
function showInitialProducts() {
    getProducts(initialIndex, finalIndex);
}

// Uma vez clicado, o botão carregará mais produtos na página 
loadMore.onclick = function() {
    initialIndex = finalIndex;
    finalIndex += 6;
    getProducts(initialIndex, finalIndex);
}

// Busca os produtos no arquivo JSON e chama a função que os renderiza
function getProducts(initial, final) {
    const url = './assets/data/products.json';
    
    fetch(url)
    .then(response => response.json())
    .then(result => {
        const products = result.slice(initial, final);
        renderProducts(products);
    });
}

// Renderiza os produtos na página com base em suas propriedades
function renderProducts(products) {
    const main = document.querySelector('main');
    
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
        buttonBuy.textContent = 'COMPRAR';

        newProduct.appendChild(img);
        newProduct.appendChild(productName);
        newProduct.appendChild(productPrice);
        newProduct.appendChild(p);
        newProduct.appendChild(buttonBuy);
        main.insertBefore(newProduct, loadMore);
    });    
}

showInitialProducts();
