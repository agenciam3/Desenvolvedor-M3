export default class SizeOption extends HTMLElement {
  constructor() {
    super();

    this._data = {};
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

  updateComponent(node) {
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
    node.appendChild(optionLabel);

    optionInput.addEventListener("change", (event) => this.dispatchOptionSelectedEvent(event, node));
  }
}