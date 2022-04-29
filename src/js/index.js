import { api } from "./api";

import createdFilterColor from "./filterColors";
import createdFilterSize from "./filterSizes";
import createdFilterPrice from "./filterPrices";
import createdCard from "./cards";
import { filteredBlousesOptions } from "./filteredBlouses";

export const products = api();
export const cards = document.querySelector(".cards");

const filterPrices = document.querySelector(".filter-price");
const filterColors = document.querySelector(".filter-color");
const filterSizes = document.querySelector(".filter-size");

const option = document.querySelector(".select");

option.addEventListener("change", () => {
    filteredBlousesOptions(option.value);
});

const main = () => {
    createdCard(products, cards);
    createdFilterColor(filterColors);
    createdFilterSize(filterSizes);
    createdFilterPrice(filterPrices);
};

main();
