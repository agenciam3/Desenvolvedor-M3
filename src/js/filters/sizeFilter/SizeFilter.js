import { allSizes } from "../../utils";

export default class SizeFilter extends HTMLElement {
  constructor() {
    super();
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

  updateComponent(node) {
    const sizeFilterContainer = document.createElement("fieldset");
    sizeFilterContainer.classList.add("filter__container--size");
    sizeFilterContainer.setAttribute("id", "sizeFilterContainer");
    node.append(sizeFilterContainer);

    const filterTitle = document.createElement("legend");
    filterTitle.classList.add("filter__title")
    filterTitle.innerHTML = "TAMANHOS";
    sizeFilterContainer.appendChild(filterTitle);

    allSizes.map(size => {
      const sizeOption = document.createElement("size-option");
      sizeOption.data = {
        size: size,
        disabled: false
      };

      sizeOption.addEventListener("optionselected", (e) => this.dispatchOptionSelectedEvent(e, node));
      sizeFilterContainer.appendChild(sizeOption);
    });
  }
}