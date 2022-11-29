export default class PriceOption extends HTMLElement {
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
    optionInput.classList.add("option__input");
    optionInput.setAttribute("type", "checkbox");
    optionInput.setAttribute("name", "priceRange");
    optionInput.setAttribute("value", this.data.range);

    const optionContainer = document.createElement("label");
    optionContainer.classList.add("option__container");
    const optionSpan = document.createElement("span");
    optionSpan.classList.add("option__checkmark");
    optionContainer.innerHTML = this.data.labelText;

    optionContainer.appendChild(optionInput);
    optionContainer.appendChild(optionSpan);
    node.appendChild(optionContainer);

    optionInput.addEventListener("change", (event) => this.dispatchOptionSelectedEvent(event, node));
  }
}