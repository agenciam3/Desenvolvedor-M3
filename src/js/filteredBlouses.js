import createdCard from "./cards";
import { products, cards } from "./index";

let filteredList = [];

export const filteredBlousesColors = (color, checkbox) => {
    filteredList = [];
    if (checkbox.checked) {
        products.forEach((value) => {
            if (value.color.toLowerCase() === color.toLowerCase()) {
                filteredList.push(value);
            }
        });

        createdCard(filteredList, cards);
        return;
    }

    createdCard(products, cards);
};

export const filteredBlousesSizes = (size, btn) => {
    btn.classList.toggle("active");
    filteredList = [];
    if (btn.classList.contains("active")) {
        products.forEach((value) => {
            if (value.size[0] === size || value.size[1] === size) {
                filteredList.push(value);
            }
        });

        createdCard(filteredList, cards);
        return;
    }

    createdCard(products, cards);
};

export const filteredBlousesOptions = (option) => {
    if (option === "0") {
        products.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
            return true;
        });

        createdCard(products, cards);
    }

    if (option === "1") {
        products.sort((a, b) => {
            if (a.price < b.price) {
                return -1;
            }
            return true;
        });

        createdCard(products, cards);
    }

    if (option === "2") {
        products.sort((a, b) => {
            if (a.price > b.price) {
                return -1;
            }
            return true;
        });

        createdCard(products, cards);
    }
};
