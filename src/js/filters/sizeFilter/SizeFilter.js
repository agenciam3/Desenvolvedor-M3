import { allSizes } from "../../utils";

export default class SizeFilter extends HTMLElement {
  constructor() {
    super();

    this._data = {};

    const shadow = this.attachShadow({ mode: "open" });

    const sizeFilterContainer = document.createElement("fieldset");
    sizeFilterContainer.setAttribute("id", "sizeFilterContainer");
    shadow.append(sizeFilterContainer);

    const filterTitle = document.createElement("legend");
    filterTitle.innerHTML = "TAMANHOS";
    sizeFilterContainer.appendChild(filterTitle);
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

    allSizes.map(size => {
      const sizeOption = document.createElement("size-option");
      sizeOption.data = {
        size: size,
        disabled: false
      };

      sizeFilterContainer.appendChild(sizeOption);
    });
  }
}