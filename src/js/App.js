export default class App extends HTMLElement {
  constructor() {
    super();

    this._state = {};

    const shadow = this.attachShadow({ mode: "open" });

    const appContainer = document.createElement("div");
    appContainer.setAttribute("id", "appContainer");
    shadow.append(appContainer);
  }

  set state(value) {
    this._state = value;
  }

  get state() {
    return this._state;
  }

  connectedCallback() {
    this.updateComponent(this);
  }

  updateComponent(el) {
    const shadow = el.shadowRoot;
    const appContainer = shadow.getElementById("appContainer");

    const productsContainer = document.createElement("products-container");
    productsContainer.data = this.state;

    const filtersForm = document.createElement("form");

    const colorFilter = document.createElement("color-filter");
    colorFilter.data = this.state;

    const sizeFilter = document.createElement("size-filter");
    sizeFilter.data = this.state;

    const priceFilter = document.createElement("price-filter");
    priceFilter.data = this.state;

    filtersForm.appendChild(colorFilter);
    filtersForm.appendChild(sizeFilter);
    filtersForm.appendChild(priceFilter);

    appContainer.appendChild(productsContainer);
    appContainer.appendChild(filtersForm);
  }
}