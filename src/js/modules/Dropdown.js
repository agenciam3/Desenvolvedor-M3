export default class Dropdown {
    constructor() {
        this.selectors();
        this.eventListeners();
    }
    selectors() {
        this.dropDownColor = document.getElementById('dropdown-colors');
        this.colorForm = document.getElementById("color");
        this.mobileMenu = document.getElementById("mobile-menu");
        //menus
        this.mobileMenuFilter = document.querySelector(".mobile-menu__filter");
        this.mobileMenuOrderBy = document.querySelector(".mobile-menu__order-by");
        this.sideMenu = document.querySelector(".side-menu");
        //menus buttons
        this.mobileOrderByMenuBtn = document.getElementById('order-by-mobile-button');
        this.mobileFilterMenuBtn = document.getElementById('filter-mobile-button');
        //close buttons
        this.btnXOrderBy = document.getElementById('btn-x-order-by');
        this.btnXFilter = document.getElementById('btn-x-filter');
        //plus buttons
        this.btnPlusColor = document.getElementById('btn-plus-color');
        this.btnPlusSize = document.getElementById('btn-plus-sizes');
        this.btnPlusPrice = document.getElementById('btn-plus-price');
        //menu forms
        this.mobileMenuFormColor = document.querySelector('.side-menu__form-color');
        this.mobileMenuFormSize = document.querySelector('.side-menu__form-sizes');
        this.mobileMenuFormPrice = document.querySelector('.side-menu__form');

        //apply mobile button
        this.filterMobileApplyBtn = document.querySelector('.filter-mobile-btn__apply');
    }
    eventListeners() {
        this.dropDownColor.addEventListener('click', this.toggleColorsMenu.bind(this));
        this.mobileOrderByMenuBtn.addEventListener('click', this.toggleMobileOrderByMenu.bind(this));
        this.mobileFilterMenuBtn.addEventListener('click', this.toggleMobileFilterMenu.bind(this));
        this.btnXOrderBy.addEventListener('click', this.closeOrderByMobileMenu.bind(this));
        this.btnXFilter.addEventListener('click', this.closeFilterMobileMenu.bind(this));
        this.btnPlusColor.addEventListener('click', this.toggleColorMobileMenu.bind(this));
        this.btnPlusSize.addEventListener('click', this.toggleSizeMobileMenu.bind(this));
        this.btnPlusPrice.addEventListener('click', this.togglePiceMobileMenu.bind(this));
        this.filterMobileApplyBtn.addEventListener('click', this.closeFilterMobileMenu.bind(this));
    }
    toggleColorsMenu(e) {
        e.preventDefault();
        if (!this.colorForm.classList.value.includes('show-colors')) {
            this.colorForm.classList.add('show-colors');
        } else {
            this.colorForm.classList.remove('show-colors');
        }
    }
    toggleMobileOrderByMenu() {
        if (
            !this.mobileMenu.classList.value.includes('show') &&
            !this.mobileMenuOrderBy.classList.value.includes('show')
        ) {
            this.mobileMenu.classList.add('show');
            this.mobileMenuOrderBy.classList.add('show');
        }
    }
    closeOrderByMobileMenu() {
        this.mobileMenu.classList.remove('show');
        this.mobileMenuOrderBy.classList.remove('show');
    }
    toggleMobileFilterMenu() {
        if (
            !this.sideMenu.classList.value.includes('show') &&
            !this.mobileMenuFilter.classList.value.includes('show')
        ) {
            this.mobileMenuFilter.classList.add('show');
            this.sideMenu.classList.add('show');
        }
    }
    closeFilterMobileMenu() {
        this.mobileMenuFilter.classList.remove('show');
        this.sideMenu.classList.remove('show');
    }

    toggleColorMobileMenu() {
        if (!this.mobileMenuFormColor.classList.value.includes('show')) {
            this.mobileMenuFormColor.classList.add('show');
            this.btnPlusColor.children[0].classList.add('close');
            this.btnPlusColor.children[1].classList.add('close');
        } else {
            this.mobileMenuFormColor.classList.remove('show');
            this.btnPlusColor.children[0].classList.remove('close');
            this.btnPlusColor.children[1].classList.remove('close');
        }
    }
    toggleSizeMobileMenu() {
        if (!this.mobileMenuFormSize.classList.value.includes('show')) {
            this.mobileMenuFormSize.classList.add('show');
            this.btnPlusSize.children[0].classList.add('close');
            this.btnPlusSize.children[1].classList.add('close');
        } else {
            this.mobileMenuFormSize.classList.remove('show');
            this.btnPlusSize.children[0].classList.remove('close');
            this.btnPlusSize.children[1].classList.remove('close');
        }
    }
    togglePiceMobileMenu() {
        if (!this.mobileMenuFormPrice.classList.value.includes('show')) {
            this.mobileMenuFormPrice.classList.add('show');
            this.btnPlusPrice.children[0].classList.add('close');
            this.btnPlusPrice.children[1].classList.add('close');
        } else {
            this.mobileMenuFormPrice.classList.remove('show');
            this.btnPlusPrice.children[0].classList.remove('close');
            this.btnPlusPrice.children[1].classList.remove('close');
        }
    }

}