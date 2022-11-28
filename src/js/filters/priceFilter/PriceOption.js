export default class PriceOption extends HTMLElement {
  constructor() {
    super();

    this._data = {};

    const shadow = this.attachShadow({ mode: "open" });

    const priceOptionContainer = document.createElement("div");
    priceOptionContainer.setAttribute("id", "priceOptionContainer");
    shadow.append(priceOptionContainer);
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
    const priceOptionContainer = shadow.getElementById("priceOptionContainer");

    const optionInput = document.createElement("input");
    optionInput.setAttribute("type", "checkbox");
    optionInput.setAttribute("name", "priceRange");
    optionInput.setAttribute("value", this.data.range);

    const optionName = document.createElement("label");
    optionName.innerHTML = this.data.labelText;
    optionName.setAttribute("for", this.data.range);

    priceOptionContainer.appendChild(optionInput);
    priceOptionContainer.appendChild(optionName);
    optionInput.addEventListener("change", (event) => this.dispatchOptionSelectedEvent(event, el));
  }
}