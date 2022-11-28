import { arrayEquals } from "./utils";

export default class App extends HTMLElement {
  constructor() {
    super();

    this._state = {};

    this.dataToFilter = {
      colors: [],
      sizes: [],
      priceRanges: []
    }

    this.filteredData = [];

    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        @import "main.css"
      </style>
    `;
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


  filter(value, valueIsChecked, filterType, node) {
    this.filteredData = this.state.data;

    switch (filterType) {
      case "size":
        valueIsChecked ?
          this.dataToFilter.sizes.push(value)
        :
          this.dataToFilter.sizes = this.dataToFilter.sizes.filter(sizeToFilter => sizeToFilter !== value);
        break;
      
      case "color":
        valueIsChecked ?
          this.dataToFilter.colors.push(value)
        :
          this.dataToFilter.colors = this.dataToFilter.colors.filter(colorToFilter => colorToFilter !== value);
        break;

      case "priceRange":
        const rangeArr = value.split(',').map(str => Number(str));

        valueIsChecked ?
          this.dataToFilter.priceRanges.push(rangeArr)
        :
          this.dataToFilter.priceRanges = this.dataToFilter.priceRanges.filter(rangeToFilter => !arrayEquals(rangeToFilter, rangeArr));
        break;

      default:
        return;
    }

    this.filteredData.forEach(product => {
      const IsPriceInRange = (priceRange) => product.price > priceRange[0] && product.price <= priceRange[1];

      if(!this.dataToFilter.priceRanges.some(IsPriceInRange) && this.dataToFilter.priceRanges.length > 0) {
        this.filteredData = this.filteredData.filter(productToFilter => productToFilter !== product);
      }

      if(!(this.dataToFilter.colors.some(color => product.color === color)) && this.dataToFilter.colors.length > 0) {
        this.filteredData = this.filteredData.filter(productToFilter => productToFilter !== product);
      }

      if(!(this.dataToFilter.sizes.some(size => product.size.includes(size))) && this.dataToFilter.sizes.length > 0) {
        this.filteredData = this.filteredData.filter(productToFilter => productToFilter !== product);
      }
    })

    node.data = this.filteredData;
  }

  updateComponent(node) {
    const shadow = node.shadowRoot;
    const appContainer = document.createElement("div");
    appContainer.setAttribute("class", "app-container");
    shadow.append(appContainer);

    const navbar = document.createElement("my-navbar");

    const productsContainer = document.createElement("products-container");
    productsContainer.data = this.state.data;

    const filtersForm = document.createElement("form");

    const colorFilter = document.createElement("color-filter");
    colorFilter.data = this.state.data;
    colorFilter.addEventListener("optionselected", (e) => this.filter(e.detail.value, e.detail.isChecked, "color", productsContainer));

    const sizeFilter = document.createElement("size-filter");
    sizeFilter.data = this.state.data;
    sizeFilter.addEventListener("optionselected", (e) => this.filter(e.detail.value, e.detail.isChecked, "size", productsContainer));

    const priceFilter = document.createElement("price-filter");
    priceFilter.data = this.state.data;
    priceFilter.addEventListener("optionselected", (e) => this.filter(e.detail.value, e.detail.isChecked, "priceRange", productsContainer));

    filtersForm.appendChild(colorFilter);
    filtersForm.appendChild(sizeFilter);
    filtersForm.appendChild(priceFilter);

    appContainer.appendChild(navbar);
    appContainer.appendChild(productsContainer);
    appContainer.appendChild(filtersForm);
  }
}