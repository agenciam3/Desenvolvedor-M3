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

  dispatchOptionSelectedEvent(event, node) {
    const optionSelected = new CustomEvent('optionselected', {
      detail: {
        value: event.target.value,
        isChecked: event.target.checked
      }
    })

    node.dispatchEvent(optionSelected)
  }

  updateComponent(el) {
    const shadow = el.shadowRoot;
    const colorOptionContainer = shadow.getElementById("colorOptionContainer");

    const optionInput = document.createElement("input");
    optionInput.setAttribute("type", "checkbox");
    optionInput.setAttribute("name", this.data.color);
    optionInput.setAttribute("id", this.data.color);
    optionInput.setAttribute("value", this.data.color);

    const optionName = document.createElement("label");
    optionName.innerHTML = this.data.color;
    optionName.setAttribute("for", this.data.color);

    colorOptionContainer.appendChild(optionInput);
    colorOptionContainer.appendChild(optionName);
    optionInput.addEventListener("change", (event) => this.dispatchOptionSelectedEvent(event, el));
  }
}