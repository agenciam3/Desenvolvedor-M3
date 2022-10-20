import { api } from "./services/api.js";
import ProductHandler from "./handlers/ProductHandler.js";
import FilterHandler from "./handlers/FilterHandler.js";
import { disableLoadButton, enableLoadButton } from "./utils/LoadButton.js";

localStorage.clear();

api.getAll().then((products) => {
  ProductHandler.addProductsToLocalStorage(products);
  ProductHandler.showProducts(products);
});

const loadMoreButton = document.querySelector(".loadMore__area__button");
const applyFilterButton = document.querySelector(".action__button--blue");

loadMoreButton.addEventListener("click", ProductHandler.loadMoreProducts);

FilterHandler.markOrMarkOffCheckbox();

if (window.screen.width < 1100) {
  applyFilterButton.addEventListener("click", () => {
    FilterHandler.filterProducts();
  });
}

document.querySelector(".cart-icon").addEventListener("click", () => {
  FilterHandler.filterProducts();
});
