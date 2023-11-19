import { Product } from "./Product";



const serverUrl = "http://localhost:5000";

function main() {
  console.log(serverUrl);
}

document.addEventListener("DOMContentLoaded", main);

// constants ids
const btn_open = document.querySelector("#show-icons-btn");

// constants classes
const show_list_items = document.querySelector(".show-list-items");


const colorsData = [
  { id: "orange", name: "Laranja" },
  { id: "green", name: "Verde" },
  { id: "red", name: "Vermelho" },
  { id: "black", name: "Preto" },
  { id: "pink", name: "Rosa" },
  { id: "wine", name: "Vinho" }
];

// click events
function showColorsList() {
  btn_open.classList.remove('show-icons-btn');
  btn_open.classList.add('hidden');

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

btn_open.addEventListener('click', showColorsList);
