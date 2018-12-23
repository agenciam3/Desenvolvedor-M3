export default class Dropdown {
    constructor() {
        this.selectors();
        this.eventListeners();
    }
    selectors() {
        this.dropDownColor = document.getElementById('dropdown-colors');
        this.colorForm = document.getElementById("color-desktop");
        this.mobileMenu = document.getElementById("mobile-menu");
        this.mobileMenuOrderBy = document.querySelector(".mobile-menu__order-by");
        this.mobileOrderByMenuBtn = document.getElementById('order-by-mobile-button');
        this.btnXOrderBy = document.getElementById('btn-x-order-by');
    }
    eventListeners() {
        this.dropDownColor.addEventListener('click', this.toggleColorsMenu.bind(this));
        this.mobileOrderByMenuBtn.addEventListener('click', this.toggleMobileOrderByMenu.bind(this));
        this.btnXOrderBy.addEventListener('click', this.closeOrderByMobileFilter.bind(this));
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
    closeOrderByMobileFilter() {
        this.mobileMenu.classList.remove('show');
        this.mobileMenuOrderBy.classList.remove('show');
    }

}