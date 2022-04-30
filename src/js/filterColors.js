import { cards } from "./index";
import { colors } from "../data/colors";
import { filteredBlousesColors } from "./filteredBlouses";

const btnFilterAllColors = document.querySelector(".btn-filter-all-colors");
const filterColors = document.querySelector(".filter-color");

btnFilterAllColors.addEventListener("click", (e) =>
    handleBtnFilterAllColors(e)
);

export const handleBtnFilterAllColors = (e) => {
    e.preventDefault();
    let text = e.target.textContent;
    let textAux = "Mostrar mais";

    filterColors.innerHTML = "";

    if (text === textAux) {
        insert();
        e.target.textContent = "Mostrar menos";
        return;
    }

    createdFilterColor(filterColors);
    e.target.textContent = textAux;
};

const insert = () => {
    for (let color of colors) {
        const label = createFilterColor(color);
        filterColors.appendChild(label);
    }
};

// funções para criar o filtro de cores

const createdFilterColor = (filter) => {
    for (let color = 0; color < 5; color++) {
        const label = createFilterColor(colors[color]);
        filter.appendChild(label);
    }

    return filter;
};

const createLabelColor = () => {
    const label = document.createElement("label");
    label.classList.add("label-filter-color");
    return label;
};

const createCheckboxColor = (color) => {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("value", color.toLowerCase());
    checkbox.setAttribute("class", "checkbox");

    handleFilterBlousesColors(checkbox);
    return checkbox;
};

const createFilterColor = (color) => {
    const label = createLabelColor();
    const checkbox = createCheckboxColor(color);
    label.appendChild(checkbox);
    label.append(color);

    return label;
};

const handleFilterBlousesColors = (btn) => {
    btn.addEventListener("click", (e) => {
        let color = e.target.value;
        filteredBlousesColors(color, btn);
    });
};

export default createdFilterColor;
