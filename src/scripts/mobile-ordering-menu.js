// Funcionamento do menu de ordenação na versão mobile

// Abertura e fechamento do menu 'Ordenar'
function setOrderingMenu() {
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
}

setOrderingMenu();
