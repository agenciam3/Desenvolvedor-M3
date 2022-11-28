import { allPriceRanges } from "../../utils";

export default class PriceFilter extends HTMLElement {
  constructor() {
    super();

    this._data = {};

    const shadow = this.attachShadow({ mode: "open" });

    const priceFilterContainer = document.createElement("fieldset");
    priceFilterContainer.setAttribute("id", "priceFilterContainer");
    shadow.append(priceFilterContainer);

    const filterTitle = document.createElement("legend");
    filterTitle.innerHTML = "FAIXA DE PREÇO";
    priceFilterContainer.appendChild(filterTitle);
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

  dispatchOptionSelectedEvent(event, node) {
    console.log("dispatch")

    const optionSelected = new CustomEvent('optionselected', {
      detail: {
        value: event.detail.value,
        isChecked: event.detail.isChecked
      }
    })

    node.dispatchEvent(optionSelected)
  }

  updateComponent(el) {
    const shadow = el.shadowRoot;
    const priceFilterContainer = shadow.getElementById("priceFilterContainer");

    allPriceRanges.map((priceRange, i) => {
      const priceOption = document.createElement("price-option");
      const range = `${priceRange[0]}, ${priceRange[1]}`;
      let labelText;

      if(i === (allPriceRanges.length - 1)) {
        labelText = `a partir de R$${priceRange[0]}`;
      } else {
        labelText = `de R$${priceRange[0]} até R$${priceRange[1]}`;
      }

      priceOption.data = {
        labelText: labelText,
        range: range,
        disabled: false
      }

      priceOption.addEventListener("optionselected", (e) => this.dispatchOptionSelectedEvent(e, el));
      priceFilterContainer.appendChild(priceOption);
    });
  }
}