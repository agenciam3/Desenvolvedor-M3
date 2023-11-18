import { Product } from "./Product";

const serverUrl = "http://localhost:5000/products";

function getDataFromApi() {
  fetch("http://localhost:5000/products")
    .then((data) => data.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

getDataFromApi();

// function productsList() {
//   console.log(serverUrl);
// }

// productsList();
// document.addEventListener("DOMContentLoaded", main);
