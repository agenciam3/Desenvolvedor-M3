import { allColors } from "../../utils";

export default class ColorFilter extends HTMLElement {
  constructor() {
    super();

    this._data = {};

    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        @import "main.css"
      </style>
    `;

    const colorFilterContainer = document.createElement("fieldset");
    colorFilterContainer.setAttribute("id", "colorFilterContainer");
    shadow.append(colorFilterContainer);

    const filterTitle = document.createElement("legend");
    filterTitle.innerHTML = "CORES";
    colorFilterContainer.appendChild(filterTitle);
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
    const colorFilterContainer = shadow.getElementById("colorFilterContainer");

    allColors.map(color => {
      const colorOption = document.createElement("color-option");
      colorOption.data = {
        color: color,
        disabled: false
      };

      colorOption.addEventListener("optionselected", (e) => this.dispatchOptionSelectedEvent(e, el));
      colorFilterContainer.appendChild(colorOption);
    });
  }
}