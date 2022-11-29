import { allSortOptions } from "../../utils";

export default class SortFilter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.updateComponent(this);
  }

  dispatchOptionSelectedEvent(event, node) {
    const optionSelected = new CustomEvent('optionselected', {
      detail: {
        value: event.target.value
      }
    })

    node.dispatchEvent(optionSelected)
  }

  updateComponent(node) {
    const sortSelect = document.createElement("select");
    node.append(sortSelect);

    const sortOption = document.createElement("option");
    sortOption.setAttribute("value", "Ordenar por:");
    sortOption.setAttribute("selected", true);
    sortOption.setAttribute("disabled", true);
    sortOption.setAttribute("hidden", true);
    sortOption.innerHTML = "Ordenar por:";
    sortSelect.appendChild(sortOption);

    allSortOptions.map(option => {
      const sortOption = document.createElement("option");
      sortOption.setAttribute("value", option);
      sortOption.innerHTML = option;
      sortSelect.appendChild(sortOption);
    });

    sortSelect.addEventListener("change", (event) => this.dispatchOptionSelectedEvent(event, node))
  }
}