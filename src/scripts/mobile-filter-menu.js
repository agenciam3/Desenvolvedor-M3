// Funcionamento do menu de filtragem na versão mobile

// Abertura e fechamento do menu 'Filtrar'
function setFilterMenu() {
    const mobileMenuFilterOption = document.getElementById('mobile-menu-filter-option');
    const mobileFilter = document.querySelector('div.mobile-filter');
    
    
    mobileMenuFilterOption.onclick = function() {
        mobileFilter.setAttribute('id', 'mobile-filter-showed');
        document.body.style.overflow = 'hidden';
    }
    
    closeMobileFilter.onclick = function() {
        mobileFilter.setAttribute('id', 'mobile-filter-hidden');
        document.body.style.overflow = 'auto';
    }
}

// Alterna entre a expansão e retração das opções do menu 'Filtrar'

// Expansão e retração da opção 'Cores'
function setColorsOption() {
    const expandMobileColors = document.getElementById('expand-mobile-colors');

    expandMobileColors.onclick = function() {
        if(mobileColors.getAttribute('id') === 'mobile-colors-hidden') {
            colors.forEach(color => mobileColors.appendChild(color));
            mobileColors.setAttribute('id', 'mobile-colors-showed');
            this.textContent = '–';
        }
        else {
            mobileColors.setAttribute('id', 'mobile-colors-hidden');
            this.textContent = '+';
        }
    }
}

// Expansão e retração da opção 'Tamanhos'
function setSizesOption() {
    const expandMobileSizes = document.getElementById('expand-mobile-sizes');

    expandMobileSizes.onclick = function() {
        if(mobileSizes.getAttribute('id') === 'mobile-sizes-hidden') {
            sizes.forEach(size => mobileSizes.appendChild(size));
            mobileSizes.setAttribute('id', 'mobile-sizes-showed');
            this.textContent = '–';
        }
        else {
            mobileSizes.setAttribute('id', 'mobile-sizes-hidden');
            this.textContent = '+';
        }
    }
}

// Expansão e retração da opção 'Faixa de preço'
function setPriceRangesOption() {
    const expandMobilePriceRanges = document.getElementById('expand-mobile-price-ranges');

    expandMobilePriceRanges.onclick = function() {
        if(mobilePriceRanges.getAttribute('id') === 'mobile-price-ranges-hidden') {
            priceRanges.forEach(priceRange => mobilePriceRanges.appendChild(priceRange));
    
            mobilePriceRanges.setAttribute('id', 'mobile-price-ranges-showed');
            this.textContent = '–';
        }
        else {
            mobilePriceRanges.setAttribute('id', 'mobile-price-ranges-hidden');
            this.textContent = '+';
        }
    }
}

setFilterMenu();
setColorsOption();
setSizesOption();
setPriceRangesOption();
