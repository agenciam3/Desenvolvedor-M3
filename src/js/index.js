import { api } from "./services/api.js";
import ProductHandler from "./handlers/ProductHandler.js";

localStorage.clear();

api.getAll().then((products) => {
  ProductHandler.showProducts(products);
});

const loadMoreButton = document.querySelector(".loadMore__area__button");

loadMoreButton.addEventListener("click", () => {
  ProductHandler.loadMoreProducts();
});
