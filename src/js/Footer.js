export default class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.updateComponent(this);
  }

  updateComponent(node) {
    const footer = document.createElement("footer");
    footer.classList.add("footer");
    const label = document.createElement("label");
    label.classList.add("footer__label");
    label.innerHTML = "M3: IMPLEMENTAÇÃO DE E-COMMERCE VTEX";
    
    footer.appendChild(label);
    node.appendChild(footer);
  }
}