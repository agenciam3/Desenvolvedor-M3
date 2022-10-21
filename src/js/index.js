import { api } from "./services/api.js";
import ProductHandler from "./handlers/ProductHandler.js";
import FilterHandler from "./handlers/FilterHandler.js";
import OrderHandler from "./handlers/OrderHandler.js";

const loadMoreButton = document.querySelector(".loadMore__area__button");
const applyFilterButton = document.querySelector(".action__button--blue");
const orderButtons = document.querySelectorAll(".order__body__option");
const orderOpen = document.querySelector(".order__title .open");

localStorage.clear();

api.getAll().then((products) => {
  ProductHandler.addProductsToLocalStorage(products);
  FilterHandler.addFilteredProductsToLocalStorage(products);
  ProductHandler.showProducts(products);
});

loadMoreButton.addEventListener("click", ProductHandler.loadMoreProducts);

FilterHandler.markOrMarkOffCheckbox();

if (window.screen.width < 1100) {
  applyFilterButton.addEventListener("click", () => {
    FilterHandler.filterProducts();
  });
}

orderButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let products = JSON.parse(
      localStorage.getItem("@m3commerce:filteredProducts")
    );
    OrderHandler.orderProducts(
      e.currentTarget.getAttribute("data-order"),
      products
    );
  });
});

orderOpen.addEventListener("click", () => {
  const orderBody = document.querySelector(".order__body");

  orderBody.classList.toggle("orderOpen");
});
