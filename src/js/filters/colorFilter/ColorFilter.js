import { allColors } from "../../utils";

export default class ColorFilter extends HTMLElement {
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
    const colorFilterContainer = document.createElement("fieldset");
    colorFilterContainer.classList.add("filter__container");
    colorFilterContainer.setAttribute("id", "colorFilterContainer");
    node.append(colorFilterContainer);

    const filterTitle = document.createElement("legend");
    filterTitle.classList.add("filter__title")
    filterTitle.innerHTML = "CORES";
    colorFilterContainer.appendChild(filterTitle);

    allColors.map(color => {
      const colorOption = document.createElement("color-option");
      colorOption.data = {
        color: color,
        disabled: false
      };

      colorOption.addEventListener("optionselected", (e) => this.dispatchOptionSelectedEvent(e, node));
      colorFilterContainer.appendChild(colorOption);
    });
  }
}