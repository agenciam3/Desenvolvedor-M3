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

    this.dataToSort = {
      dates: [],
      prices: []
    }

    this.filteredData = [];

    this.itemsInCart = 0;

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

  sortFilter(sortBy, node) {
    let sortedData = [];

    switch (sortBy) {
      case "Mais recentes":
        node.data.forEach(product => this.dataToSort.dates.push(product.date));
        this.dataToSort.dates = this.dataToSort.dates.sort((a, b) => a - b);

        this.dataToSort.dates.forEach(date => {
          node.data.forEach(product => {
            if(product.date === date) {
              sortedData.unshift(product);
            }
          })
        })
        break;

      case "Menor preço":
        node.data.forEach(product => this.dataToSort.prices.push(product.price));
        this.dataToSort.prices = this.dataToSort.prices.sort((a, b) => a - b);

        this.dataToSort.prices.forEach(price => {
          node.data.forEach(product => {
            if(product.price === price) {
              sortedData.push(product);
            }
          })
        })
        break;

      case "Maior preço":
        node.data.forEach(product => this.dataToSort.prices.push(product.price));
        this.dataToSort.prices = this.dataToSort.prices.sort((a, b) => a - b);

        this.dataToSort.prices.forEach(price => {
          node.data.forEach(product => {
            if(product.price === price) {
              sortedData.unshift(product);
            }
          })
        })
        break;

      default:
        break;
    }

    sortedData = new Set(sortedData);
    const uniqueSortedData = Array.from(sortedData);
    node.data = uniqueSortedData;
  }

  filter(value, valueIsChecked, filterType, node, sortFilterElement) {
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

    const valueToSortBy = sortFilterElement.firstChild.options[sortFilterElement.firstChild.selectedIndex].value;
    node.data = this.filteredData;

    if(valueToSortBy !== sortFilterElement.firstChild.options[0].value) {
      this.sortFilter(valueToSortBy, node)
    }
  }

  updateItemsInCartCount(node) {
    this.itemsInCart++;

    node.itemsInCart = this.itemsInCart;
  }

  updateComponent(node) {
    const shadow = node.shadowRoot;
    const appContainer = document.createElement("div");
    appContainer.setAttribute("class", "app-container");
    shadow.append(appContainer);

    const pageHeader = document.createElement("header");
    const pageTitle = document.createElement("h1");
    pageTitle.classList.add("page-header__title");
    pageTitle.innerHTML = "blusas";

    const navbar = document.createElement("my-navbar");
    navbar.itemsInCart = this.itemsInCart;
    const footer = document.createElement("my-footer");

    const productsContainer = document.createElement("products-container");
    productsContainer.classList.add("products-container");
    productsContainer.data = this.state.data;
    productsContainer.addEventListener("productbought", () => this.updateItemsInCartCount(navbar));

    const filtersForm = document.createElement("form");
    filtersForm.classList.add("filters-form");

    const sortFilter = document.createElement("sort-filter");
    sortFilter.addEventListener("optionselected", (e) => this.sortFilter(e.detail.value, productsContainer));

    const colorFilter = document.createElement("color-filter");
    colorFilter.addEventListener("optionselected", (e) => this.filter(e.detail.value, e.detail.isChecked, "color", productsContainer, sortFilter));

    const sizeFilter = document.createElement("size-filter");
    sizeFilter.addEventListener("optionselected", (e) => this.filter(e.detail.value, e.detail.isChecked, "size", productsContainer, sortFilter));

    const priceFilter = document.createElement("price-filter");
    priceFilter.addEventListener("optionselected", (e) => this.filter(e.detail.value, e.detail.isChecked, "priceRange", productsContainer, sortFilter));

    filtersForm.appendChild(colorFilter);
    filtersForm.appendChild(sizeFilter);
    filtersForm.appendChild(priceFilter);

    pageHeader.appendChild(pageTitle);
    pageHeader.appendChild(sortFilter);
    pageHeader.classList.add("page-header");

    const pageMainContent = document.createElement("main");
    pageMainContent.classList.add("main-content");
    const pageAsideContent = document.createElement("aside");
    pageAsideContent.classList.add("aside-content");

    pageAsideContent.appendChild(filtersForm);

    pageMainContent.appendChild(pageAsideContent);
    pageMainContent.appendChild(productsContainer);

    appContainer.appendChild(navbar);
    appContainer.appendChild(pageHeader);
    appContainer.appendChild(pageMainContent);
    appContainer.appendChild(footer);
  }
}