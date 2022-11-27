import { allColors } from "../../utils";

export default class ColorFilter extends HTMLElement {
  constructor() {
    super();

    this._data = {};

    const shadow = this.attachShadow({ mode: "open" });

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

  updateComponent(el) {
    const shadow = el.shadowRoot;
    const colorFilterContainer = shadow.getElementById("colorFilterContainer");

    allColors.map(color => {
      const colorOption = document.createElement("color-option");
      colorOption.data = {
        color: color,
        disabled: false
      };

      colorFilterContainer.appendChild(colorOption);
    });
  }
}