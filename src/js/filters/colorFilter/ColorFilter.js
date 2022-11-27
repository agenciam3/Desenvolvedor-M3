import { allColors } from "../../utils";

export default class ColorFilter extends HTMLElement {
  constructor() {
    super();

    this._data = {};

    const shadow = this.attachShadow({ mode: "open" });

    const colorFilterContainer = document.createElement("fieldset");
    colorFilterContainer.setAttribute("id", "colorFilterContainer");
    shadow.append(colorFilterContainer);
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
    const colorFilterContainer = shadow.getElementById("colorFilterContainer");

    const filterTitle = document.createElement("h3");
    filterTitle.innerHTML = "CORES";
    colorFilterContainer.appendChild(filterTitle);

    let colors = [];
    this.data.forEach(product => colors.push(product.color));
    const availableColors = new Set(colors);


    allColors.map(color => {
      const colorOption = document.createElement("color-option");
      colorOption.data = color;

      availableColors.has(color) ?
        colorOption.data = {
          color: color,
          disabled: false
        }
      :
        colorOption.data = {
          color: color,
          disabled: true
        }

      colorFilterContainer.appendChild(colorOption);
    });
  }
}