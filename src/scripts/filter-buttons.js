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
                loadMoreProducts.remove();
    
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

setAplyFilters();
setCleanFilters();
