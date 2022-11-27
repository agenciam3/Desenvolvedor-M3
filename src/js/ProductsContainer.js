export default class ProductsContainer extends HTMLElement {
  constructor() {
    super();

    this._data = [];

    const shadow = this.attachShadow({ mode: "open" });

    const productsContainer = document.createElement("div");
    productsContainer.setAttribute("id", "productsContainer");
    shadow.append(productsContainer);
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

  updateComponent(el) {
    const shadow = el.shadowRoot;
    const productsContainer = shadow.getElementById("productsContainer");

    this.data.map(productData => {
      const productCard = document.createElement("product-card")
      productCard.data = productData;

      productsContainer.appendChild(productCard);
    })
  }
}