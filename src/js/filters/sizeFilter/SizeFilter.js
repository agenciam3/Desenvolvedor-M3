import { allSizes } from "../../utils";

export default class SizeFilter extends HTMLElement {
  constructor() {
    super();

    this._data = {};

    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        @import "main.css"
      </style>
    `;

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

  dispatchOptionSelectedEvent(event, node) {
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
    const sizeFilterContainer = shadow.getElementById("sizeFilterContainer");

    allSizes.map(size => {
      const sizeOption = document.createElement("size-option");
      sizeOption.data = {
        size: size,
        disabled: false
      };

      sizeOption.addEventListener("optionselected", (e) => this.dispatchOptionSelectedEvent(e, el));
      sizeFilterContainer.appendChild(sizeOption);
    });
  }
}