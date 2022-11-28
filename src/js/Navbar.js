export default class Navbar extends HTMLElement {
  constructor() {
    super();

    this._data = {};
  }

  set data(value) {
    this._data = value;
  }

  get data() {
    return this._data;
  }

  connectedCallback() {
    this.updateComponent(this);
  }

  updateComponent(node) {
    const navbar = document.createElement("nav");

    const logo = document.createElement("img");
    logo.setAttribute("src", "../img/logo-m3.png");

    const cart = document.createElement("img");
    cart.setAttribute("src", "../img/cart.png");
    
    navbar.appendChild(logo);
    navbar.appendChild(cart);

    node.appendChild(navbar);
  }
}