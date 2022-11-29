export default class Navbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.updateComponent(this);
  }

  updateComponent(node) {
    const navbar = document.createElement("nav");
    navbar.classList.add("navbar");

    const logo = document.createElement("img");
    logo.setAttribute("src", "../img/logo-m3.png");
    logo.classList.add("navbar__first-element")

    const cart = document.createElement("img");
    cart.setAttribute("src", "../img/cart.png");
    cart.classList.add("navbar__second-element")
    
    navbar.appendChild(logo);
    navbar.appendChild(cart);

    node.appendChild(navbar);
  }
}