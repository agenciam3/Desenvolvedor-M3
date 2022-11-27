import { allSizes } from "../../utils";

export default class SizeFilter extends HTMLElement {
  constructor() {
    super();

    this._data = {};

    const shadow = this.attachShadow({ mode: "open" });

    const sizeFilterContainer = document.createElement("fieldset");
    sizeFilterContainer.setAttribute("id", "sizeFilterContainer");
    shadow.append(sizeFilterContainer);
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
    const sizeFilterContainer = shadow.getElementById("sizeFilterContainer");

    const filterTitle = document.createElement("h3");
    filterTitle.innerHTML = "TAMANHOS";
    sizeFilterContainer.appendChild(filterTitle);

    let sizes = [];
    this.data.forEach(product => product.size.forEach(size => sizes.push(size)));
    const availableSizes = new Set(sizes);


    allSizes.map(size => {
      const sizeOption = document.createElement("size-option");
      sizeOption.data = size;

      availableSizes.has(size) ?
        sizeOption.data = {
          size: size,
          disabled: false
        }
      :
        sizeOption.data = {
          size: size,
          disabled: true
        }

      sizeFilterContainer.appendChild(sizeOption);
    });
  }
}