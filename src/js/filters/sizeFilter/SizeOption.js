export default class SizeOption extends HTMLElement {
  constructor() {
    super();

    this._data = {};

    const shadow = this.attachShadow({ mode: "open" });

    const SizeOptionContainer = document.createElement("div");
    SizeOptionContainer.setAttribute("id", "SizeOptionContainer");
    shadow.append(SizeOptionContainer);
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
    const SizeOptionContainer = shadow.getElementById("SizeOptionContainer");

    const optionInput = document.createElement("input");
    optionInput.setAttribute("type", "checkbox");
    optionInput.setAttribute("name", this.data.size);
    optionInput.setAttribute("id", this.data.size);
    optionInput.setAttribute("value", this.data.size);

    const optionLabel = document.createElement("label");
    const optionSpan = document.createElement("span");
    optionSpan.innerHTML = this.data.size;

    optionLabel.appendChild(optionInput);
    optionLabel.appendChild(optionSpan);
    SizeOptionContainer.appendChild(optionLabel);

    optionLabel.addEventListener("change", (event) => this.dispatchOptionSelectedEvent(event, el));
  }
}