import { Product } from "./Product";

const serverUrl = "http://localhost:5000";

function main() {
  console.log(serverUrl);
}

document.addEventListener("DOMContentLoaded", main);

const apiUrl = "http://localhost:5000/products";

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erro ao recuperar os dados da API");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Foi");
    console.log(data);
  })
  .catch((error) => {
    console.error("Erro:", error);
  });
