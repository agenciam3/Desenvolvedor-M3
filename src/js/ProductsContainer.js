export default class ProductsContainer extends HTMLElement {
  constructor() {
    super();

    this._data = [];
  }

  set data(value) {
    this._data = value;
    this.updateComponent(this);
  }

  get data() {
    return this._data;
  }

  connectedCallback() {
    this.updateComponent(this);
  }

  updateComponent(node) {
    node.innerHTML = "";

    this.data.map(productData => {
      const productCard = document.createElement("product-card");
      productCard.data = productData;

      node.appendChild(productCard);
    })
  }
}