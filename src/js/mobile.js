// Abertura e fechamento do menu 'Filtrar'
const mobileMenuFilterOption = document.getElementById('mobile-menu-filter-option');
const mobileFilter = document.querySelector('div.mobile-filter');
const closeMobileFilter = document.getElementById('close-mobile-filter');

mobileMenuFilterOption.onclick = function() {
    mobileFilter.setAttribute('id', 'mobile-filter-showed');
    document.body.style.overflow = 'hidden';
}

closeMobileFilter.onclick = function() {
    mobileFilter.setAttribute('id', 'mobile-filter-hidden');
    document.body.style.overflow = 'auto';
}

// Alterna entre a expansão e retração das opções do menu 'Filtrar'
// Expansão e retração da opção 'Cores'
const expandMobileColors = document.getElementById('expand-mobile-colors');
const mobileColors = document.querySelector('div.mobile-colors');
const colors = document.querySelectorAll('div.color');

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

// Expansão e retração da opção 'Tamanhos'
const expandMobileSizes = document.getElementById('expand-mobile-sizes');
const mobileSizes = document.querySelector('div.mobile-sizes');
const sizes = document.querySelectorAll('div.size');

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

// Expansão e retração da opção 'Faixa de preço'
const expandMobilePriceRanges = document.getElementById('expand-mobile-price-ranges');
const mobilePriceRanges = document.querySelector('div.mobile-price-ranges');
const priceRanges = document.querySelectorAll('div.price-range');

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

// Transferência dos inputs de filtragem entre mobile e desktop, com base no tamanho da tela
const desktopColors = document.getElementById('desktop-colors');
const desktopOtherColors = document.querySelector('div.other-colors');
const desktopSizes = document.getElementById('desktop-sizes');
const desktopPriceRanges = document.getElementById('desktop-price-ranges');

document.body.onresize = function() {
    if(document.body.clientWidth + 20 >= 790) {
        colors.forEach((color, index) => {
            if(index < 5) {
                desktopColors.insertBefore(color, desktopOtherColors);
            }
            else {
                desktopOtherColors.appendChild(color);
            }
        });

        sizes.forEach(size => desktopSizes.appendChild(size));
        priceRanges.forEach(priceRange => desktopPriceRanges.appendChild(priceRange));
    }
    else {
        colors.forEach(color => mobileColors.appendChild(color));
        sizes.forEach(size => mobileSizes.appendChild(size));
        priceRanges.forEach(priceRange => mobilePriceRanges.appendChild(priceRange));
    }
}

// Funcionamento dos botões do menu 'Filtrar'
// Botão 'Aplicar'

// Botão 'Limpar'
const mobileFilterClean = document.getElementById('mobile-filter-clean');

mobileFilterClean.onclick = function() {
    const checkboxesChecked = document.querySelectorAll('div.checked');
    const sizesSelected = document.querySelectorAll('div.selected');
    
    checkboxesChecked.forEach(checkbox => checkbox.classList.remove('checked'));
    sizesSelected.forEach(size => size.classList.remove('selected'));
}

// Abertura e fechamento do menu 'Ordenar'
const mobileMenuOrderingOption = document.getElementById('mobile-menu-ordering-option');
const mobileOrdering = document.querySelector('div.mobile-ordering');
const closeMobileOrdering = document.getElementById('close-mobile-ordering');

mobileMenuOrderingOption.onclick = function() {
    mobileOrdering.setAttribute('id', 'mobile-ordering-showed');
    document.body.style.overflow = 'hidden';
}

closeMobileOrdering.onclick = function() {
    mobileOrdering.setAttribute('id', 'mobile-ordering-hidden');
    document.body.style.overflow = 'auto';
}
