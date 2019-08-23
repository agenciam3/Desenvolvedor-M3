// Funcionamento dos inputs de filtragem

// Alterna o preenchimento do checkbox por meio da classe 'checked'
function setToggleCheckbox() {
    const inputsCheckbox = document.querySelectorAll('div.checkbox');

    inputsCheckbox.forEach(inputCheckbox => {
        inputCheckbox.onclick = function() {
            if(this.classList.contains('checked')) {
                this.classList.remove('checked');
            }
            else {
                this.classList.add('checked');
            }
        };
    });
}

// Alterna a seleção do elemento 'tamanho' por meio da classe 'selected'
function setToggleSize() {
    const inputsSize = document.querySelectorAll('div.size');

    inputsSize.forEach(inputSize => {
        inputSize.onclick = function() {
            if(this.classList.contains('selected')) {
                this.classList.remove('selected');
            }
            else {
                this.classList.add('selected');
            }
        };
    });
}

// Transferência dos inputs de filtragem entre mobile e desktop, com base no tamanho da tela
function shareFilterInputs() {
    const desktopColors = document.getElementById('desktop-colors');
    const desktopOtherColors = document.querySelector('div.other-colors');
    const desktopSizes = document.getElementById('desktop-sizes');
    const desktopPriceRanges = document.getElementById('desktop-price-ranges');

    document.body.onresize = function() {
        if(window.innerWidth >= 790) {
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
}

setToggleCheckbox();
setToggleSize();
shareFilterInputs();
