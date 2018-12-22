export default class Dropdown {
    constructor() {
        this.selectors();
        this.eventListeners();
    }
    selectors() {
        this.dropDownColor = document.getElementById('dropdown-colors');
        this.colorForm = document.getElementById("color-desktop");
    }
    eventListeners() {
        this.dropDownColor.addEventListener('click', this.toggleMenu.bind(this));
    }
    toggleMenu(e) {
        e.preventDefault();
        if (!this.colorForm.classList.value.includes('show-colors')) {
            this.colorForm.classList.add('show-colors');
        } else {
            this.colorForm.classList.remove('show-colors');
        }
    }

}