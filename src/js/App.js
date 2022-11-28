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

  filter(value, valueIsChecked, filterType, node) {
    this.filteredData = this.state.data;

    switch (filterType) {
      case "size":
        valueIsChecked ?
          this.dataToFilter.sizes.push(value)
        :
          this.dataToFilter.sizes = this.dataToFilter.sizes.filter(productToFilter => productToFilter !== value);
        break;
      
      case "color":
        valueIsChecked ?
          this.dataToFilter.colors.push(value)
        :
          this.dataToFilter.colors = this.dataToFilter.colors.filter(productToFilter => productToFilter !== value);
        break;

      case "priceRange":
        const rangeArr = value.split(',').map(str => Number(str));

        valueIsChecked ?
          this.dataToFilter.priceRanges.push(rangeArr)
        :
          this.dataToFilter.priceRanges = this.dataToFilter.priceRanges.filter(productToFilter => productToFilter !== rangeArr);
        break;

      default:
        return;
    }

    this.state.data.forEach(product => {
      this.dataToFilter.priceRanges.forEach(priceRange => {
        if(!(product.price > priceRange[0] && product.price <= priceRange[1])) {
          this.filteredData = this.filteredData.filter(productToFilter => productToFilter !== product);
        }
      });

      // if(this.dataToFilter.colors.includes(product.color)) {
        
      // }

      this.dataToFilter.colors.forEach(color => {
        if(product.color !== color) {
          this.filteredData = this.filteredData.filter(productToFilter => productToFilter !== product);
        }
      });

      if(!product.size.some(size => this.dataToFilter.sizes.includes(size))) {
        this.filteredData = this.filteredData.filter(productToFilter => productToFilter !== product);
      }
    })
    console.log(this.dataToFilter);
    console.log(this.filteredData);

    node.data = this.filteredData;
  }

  updateComponent(el) {
    const shadow = el.shadowRoot;
    const appContainer = shadow.getElementById("appContainer");

    const productsContainer = document.createElement("products-container");
    productsContainer.data = this.state.data;

    const filtersForm = document.createElement("form");

    const colorFilter = document.createElement("color-filter");
    colorFilter.data = this.state.data;

    const sizeFilter = document.createElement("size-filter");
    sizeFilter.data = this.state.data;
    sizeFilter.addEventListener("optionselected", (e) => this.filter(e.detail.value, e.detail.isChecked, "size", productsContainer));

    const priceFilter = document.createElement("price-filter");
    priceFilter.data = this.state.data;

    filtersForm.appendChild(colorFilter);
    filtersForm.appendChild(sizeFilter);
    filtersForm.appendChild(priceFilter);

    appContainer.append(productsContainer);
    appContainer.appendChild(filtersForm);
  }
}