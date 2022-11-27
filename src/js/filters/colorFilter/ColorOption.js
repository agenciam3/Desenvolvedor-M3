export default class ColorOption extends HTMLElement {
  constructor() {
    super();

    this._data = {};

    const shadow = this.attachShadow({ mode: "open" });

    const colorOptionContainer = document.createElement("div");
    colorOptionContainer.setAttribute("id", "colorOptionContainer");
    shadow.append(colorOptionContainer);
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
    const colorOptionContainer = shadow.getElementById("colorOptionContainer");

    const optionName = document.createElement("label");
    optionName.innerHTML = this.data.color;
    optionName.setAttribute("for", this.data.color);

    const optionInput = document.createElement("input");
    optionInput.setAttribute("type", "checkbox");
    optionInput.setAttribute("name", this.data.color);

    if(this.data.disabled) {
      optionInput.setAttribute("disabled", true);
    }

    colorOptionContainer.appendChild(optionInput);
    colorOptionContainer.appendChild(optionName);
  }
}