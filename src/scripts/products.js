const main = document.querySelector('main');
const loadMore = document.getElementById('load-more-products');

var initialIndex = 0;
var finalIndex = 9;

// Funcionamento dos botões de filtragem
// Botão 'Aplicar' filtros
function setAplyFilters() {
    const filterAply = document.querySelectorAll('button.filter-aply');
    
    filterAply.forEach(buttonAply => {
        buttonAply.onclick = function() {
            const checkboxesColorChecked = [...document.querySelectorAll('div.check-color.checked')];
            const colorsChecked = checkboxesColorChecked.map(checkbox => checkbox.getAttribute('id'));
            const labelsColor = [...document.querySelectorAll('label.color')];
            const labelsColorChecked = labelsColor.filter(label => colorsChecked.includes(label.getAttribute('for')));
            const colors = labelsColorChecked.map(label => label.textContent);
    
            const sizesSelected = [...document.querySelectorAll('div.selected')];
            const sizes = sizesSelected.map(size => size.textContent);
    
            const checkboxesPriceRangeChecked = [...document.querySelectorAll('div.check-price-range.checked')];
            const priceRangesChecked = checkboxesPriceRangeChecked.map(checkbox => checkbox.getAttribute('id'));
            const labelsPriceRange = [...document.querySelectorAll('label.price-range')];
            const labelsPriceRangeChecked = labelsPriceRange.filter(label => priceRangesChecked.includes(label.getAttribute('for')));
            const priceRanges = labelsPriceRangeChecked.map(label => label.textContent);
    
            const regex = /\d+/g;
            const prices = [];
            
            priceRanges.forEach(priceRange => {
                priceRange.match(regex).forEach(price => prices.push(price));
            });
    
            const priceRange = [];
    
            if(priceRanges.find(priceRange => priceRange.includes('a partir de'))) {
                if(prices.length > 1) {
                    priceRange.push(Number(prices.shift()));
                    priceRange.push(Number(prices[prices.length - 2]));
                    priceRange.push(Number(prices.pop()));
                }
                else {
                    priceRange.push(Number(prices.pop()));
                }  
            }
            else if(priceRanges.length > 0) {
                priceRange.push(Number(prices.shift()));
                priceRange.push(Number(prices.pop()));
            }
    
            if(colors.length > 0 || sizes.length > 0 || priceRange.length > 0) {
                const filter = {
                    colors,
                    sizes,
                    priceRange
                };
    
                const mainProducts = document.querySelectorAll('div.product');
                mainProducts.forEach(product => main.removeChild(product));
    
                initialIndex = 0;
                finalIndex = 9;
    
                setLoadMore(filter);
                getProducts(initialIndex, finalIndex, filter);
                closeMobileFilter.click();
            }
        }
    });
}

// Botão 'Limpar' filtros
function setCleanFilters() {
    const filterClean = document.querySelectorAll('button.filter-clean');

    filterClean.forEach(buttonClean => {
        buttonClean.onclick = function() {
            const checkboxesChecked = document.querySelectorAll('div.checked');
            const sizesSelected = document.querySelectorAll('div.selected');
            
            checkboxesChecked.forEach(checkbox => checkbox.classList.remove('checked'));
            sizesSelected.forEach(size => size.classList.remove('selected'));

            showInitialProducts();
            closeMobileFilter.click();
        }
    })
}

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
    const url = './assets/data/products.json';
    
    fetch(url)
    .then(response => response.json())
    .then(result => {
        var products;

        if(filter) {
            const filteredProducts = filterProducts(result, filter);
            products = filteredProducts.slice(initial, final);
            renderProducts(products);
        }
        else {
            products = result.slice(initial, final);
            renderProducts(products);
        }
    });
}

// Filtra os produtos com base nas opções selecionadas
function filterProducts(products, filter) {
    const filteredProducts = products.filter(product => {
        var color;
        var size;
        var priceRange;

        if(filter.colors.length > 0) {
            color = filter.colors.includes(product.color);
        }
        else {
            color = true;
        }

        if(filter.sizes.length > 0) {
            size = product.size.find(size => filter.sizes.includes(size)) ? true : false;
        }
        else {
            size = true;
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
        else {
            priceRange = true;
        }
        
        return color && size && priceRange;
    });

    return filteredProducts;
}

// Renderiza os produtos na página com base em suas propriedades
function renderProducts(products) {
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

// Uma vez clicado, o botão carregará mais produtos na página 
function setLoadMore(filter) {
    loadMore.onclick = function() {
        initialIndex = finalIndex;
        finalIndex += 6;
        getProducts(initialIndex, finalIndex, filter);
    }
}

setAplyFilters();
setCleanFilters();
showInitialProducts();
