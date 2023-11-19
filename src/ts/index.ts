import { Product } from "./Product";

const serverUrl = "http://localhost:5000";

function main() {
  console.log(serverUrl);
}

document.addEventListener("DOMContentLoaded", main);

// constants ids
const show_list_colors = document.querySelector("#show-icons-btn");
const filters_btn = document.querySelector("#filters-btn");
const order_btn = document.querySelector("#order-btn");
const close_filters_btn = document.querySelector("#close-filters-btn");
const close_order_btn = document.querySelector("#close-order-btn");

// constants classes
const show_list_items = document.querySelector(".show-list-items");
const filter_order_mobile = document.querySelector(".filter-order-mobile");
const filters_mobile = document.querySelector(".rest-filters-mobile");

// data
const colorsData = [
  { id: "orange", name: "Laranja" },
  { id: "green", name: "Verde" },
  { id: "red", name: "Vermelho" },
  { id: "black", name: "Preto" },
  { id: "pink", name: "Rosa" },
  { id: "wine", name: "Vinho" }
];

// click events functions
const showColorsList = () => {
  show_list_colors.classList.remove('show-icons-btn');
  show_list_colors.classList.add('hidden');

  colorsData.forEach(color => {
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = color.id;
    checkbox.name = color.name;

    const label = document.createElement("label");
    label.htmlFor = color.id;
    label.textContent = color.name;

    inputContainer.appendChild(checkbox);
    inputContainer.appendChild(label);

    show_list_items.appendChild(inputContainer);
  });
}

const showFiltersList = () => {
  if (filters_mobile) {
    (filters_mobile as HTMLElement).style.display = 'inline-block';
  }
}

const showOrderList = () => {
  if (filter_order_mobile) {
    (filter_order_mobile as HTMLElement).style.display = 'inline-block';
  }
}

const closeOrderList = () => {
  if (filter_order_mobile) {
    (filter_order_mobile as HTMLElement).style.display = 'none';
  }
}

const closeFiltersList = () => {
  if (filters_mobile) {
    (filters_mobile as HTMLElement).style.display = 'none';
  }
}

// click events
// colors list
show_list_colors.addEventListener('click', showColorsList);
show_list_colors.addEventListener('click', showColorsList);

// filters btns mobile
filters_btn.addEventListener('click', showFiltersList);
order_btn.addEventListener('click', showOrderList);
close_order_btn.addEventListener('click', closeOrderList);
close_filters_btn.addEventListener('click', closeFiltersList);
