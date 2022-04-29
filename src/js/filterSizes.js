import { sizes } from "../data/sizes";
import { filteredBlousesSizes } from "./filteredBlouses";

const createdFilterSize = (filter) => {
    for (let size of sizes) {
        const btnSize = createBtn(size);
        filter.appendChild(btnSize);
    }

    return filter;
};

const createBtn = (size) => {
    const btn = document.createElement("button");
    btn.classList.add("btn-filter-size");
    btn.innerHTML = size;
    changeBtnActive(btn);
    return btn;
};

const changeBtnActive = (btn) => {
    btn.addEventListener("click", (e) => {
        filteredBlousesSizes(e.target.textContent, btn);
    });
};

export default createdFilterSize;
