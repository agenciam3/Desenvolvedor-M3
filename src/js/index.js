import addEventListeners, { listenToProductsButton } from "./eventListeners";
import { api } from "./utils/api";
import { generateCards } from "./utils/products";

addEventListeners();
export let products = [];
let from = 0;
let offset = 9;
let filteredProducts = [];
export let selectedProducts = [];

api.get("/products").then((res) => {
  products = filteredProducts = res.data;
  renderProducts();
  listenToProductsButton();
});

export function setFilterdProducts(filtered) {
  filteredProducts = filtered;
}

export function renderProducts() {
  const productsContainer = document.querySelector(".products-container");
  const productsToShow = filteredProducts.slice(
    from,
    Math.min(products.length, offset)
  );

  productsContainer.innerHTML = "";

  if (productsToShow.length === 0) {
    productsContainer.innerHTML = `
      <h2 class="text-center">Nenhum produto encontrado com esses filtros</h2>
    `;
  } else {
    generateCards(productsToShow);
  }

  if (filteredProducts.length <= offset) {
    document.querySelector(".load-more").classList.add("hidden");
    return;
  }

  document.querySelector(".load-more").classList.remove("hidden");
  document.querySelector(".loader").classList.add("hidden");
}

export function loadMore() {
  offset += offset;
  renderProducts();
  listenToProductsButton();
}
