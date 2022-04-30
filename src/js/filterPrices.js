import { rangePrice } from "../data/rangePrice";

const createdFilterPrice = (filter) => {
    for (let price of rangePrice) {
        const priceText = `de R$ ${price[0]},00 até R$ ${price[1]},00`;
        const label = createFilterPrice(priceText);
        filter.appendChild(label);
    }

    return filter;
};

const createLabelPrice = () => {
    const label = document.createElement("label");
    label.classList.add("label-filter-price");

    return label;
};

const createCheckboxPrice = () => {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    return checkbox;
};

const createFilterPrice = (price) => {
    const label = createLabelPrice();
    const checkbox = createCheckboxPrice();

    label.appendChild(checkbox);
    label.append(price);

    return label;
};

export default createdFilterPrice;
