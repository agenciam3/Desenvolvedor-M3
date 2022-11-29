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
    optionInput.classList.add("option__input--size");
    optionInput.setAttribute("type", "checkbox");
    optionInput.setAttribute("name", this.data.size);
    optionInput.setAttribute("id", this.data.size);
    optionInput.setAttribute("value", this.data.size);

    const optionContainer = document.createElement("label");
    optionContainer.classList.add("option__container--size");
    const optionSpan = document.createElement("span");
    optionSpan.classList.add("option__checkmark--size");

    const optionText = document.createElement("span");
    optionText.classList.add("option__text--size");
    optionText.innerHTML = this.data.size;
    optionSpan.appendChild(optionText)

    optionContainer.appendChild(optionInput);
    optionContainer.appendChild(optionSpan);
    node.appendChild(optionContainer);

    optionInput.addEventListener("change", (event) => this.dispatchOptionSelectedEvent(event, node));
  }
}