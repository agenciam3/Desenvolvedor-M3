export default class Navbar extends HTMLElement {
  constructor() {
    super();

    this._itemsInCart = 0;
  }

  connectedCallback() {
    this.updateComponent(this);
  }

  set itemsInCart(value) {
    this._itemsInCart = value;
    this.updateComponent(this);
  }

  get itemsInCart() {
    return this._itemsInCart;
  }

  updateComponent(node) {
    node.innerHTML = "";

    const navbar = document.createElement("nav");
    navbar.classList.add("navbar");

    const logo = document.createElement("img");
    logo.setAttribute("src", "../img/logo-m3.png");
    logo.classList.add("navbar__first-element");

    const cart = document.createElement("div");
    cart.classList.add("navbar__second-element");

    const cartIcon = document.createElement("img");
    cartIcon.setAttribute("src", "../img/cart.png");
    cart.appendChild(cartIcon);
    
    const itemsInCartContainer = document.createElement("div");
    const itemsInCartLabel = document.createElement("label");
    itemsInCartLabel.innerHTML = this.itemsInCart;

    itemsInCartContainer.appendChild(itemsInCartLabel);
    cart.appendChild(itemsInCartContainer);
    
    navbar.appendChild(logo);
    navbar.appendChild(cart);

    node.appendChild(navbar);
  }
}