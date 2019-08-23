// Funcionalidades presentes na versão desktop

// Alterna a vizualização de mais ou menos cores
function showOtherColors() {
    const moreColors = document.getElementById('more-colors');
    const otherColors = document.querySelector('div.other-colors');
    
    moreColors.onclick = function() {
        if(otherColors.getAttribute('id') === 'hidden-colors') {
            otherColors.setAttribute('id', 'showed-colors');
            moreColors.textContent = 'Ver menos cores ▴';
        }
        else {
            otherColors.setAttribute('id', 'hidden-colors');
            moreColors.textContent = 'Ver todas as cores ▾';
        }
    }
}

// Alterna entre a exibição ou não das opções do menu 'Ordenar por'
function showOrderingOptions() {
    const desktopOrdering = document.getElementById('desktop-ordering');
    const orderingOptions = document.querySelector('div.ordering-options');
    
    desktopOrdering.onclick = function() {
        orderingOptions.setAttribute('id', 'ordering-showed-options');
    }
    
    document.onclick = function(event) {
        if(event.target !== desktopOrdering) {
            orderingOptions.setAttribute('id', 'ordering-hidden-options');
        }
    }
}

showOtherColors();
showOrderingOptions();
