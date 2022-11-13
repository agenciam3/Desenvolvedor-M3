import { loadMore } from ".";
import { addItemToCart, calcTotalAmount } from "./utils/cartActions";
import clearAllSelected from "./utils/clearSelect";
import { filterAll, sortProducts } from "./utils/filters";

export default function addEventListeners() {
  const selectTitle = document.querySelector(".select-title");
  const selectItemsContainer = document.querySelector(".select-items");
  const selectButtons = document.querySelectorAll(".select-button");
  const selectedColors = new Set();
  const selectedSizes = new Set();
  const selectedPrices = new Set();

  selectTitle.addEventListener("click", (e) => {
    selectItemsContainer.classList.toggle("hidden");
  });

  selectButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.classList.contains("select-title")) return;
      clearAllSelected();
      selectItemsContainer.classList.toggle("hidden");
      selectTitle.textContent = e.target.textContent;
      e.target.classList.add("selected");
      sortProducts(e.target.id);
    });
  });

  const seeMoreColorsButton = document.querySelector("#see-more-colors");

  seeMoreColorsButton.addEventListener("click", (e) => {
    e.target.classList.add("hidden");
    const hiddenColors = document.querySelectorAll(".initially-hidden-color");
    hiddenColors.forEach((color) => {
      color.classList.remove("initially-hidden-color");
    });
  });

  const colors = document.querySelectorAll(".color");

  colors.forEach((color) => {
    color.addEventListener("click", (e) => {
      if (e.target.classList.contains("checked")) {
        e.target.classList.remove("checked");
        selectedColors.delete(e.target.value);
      } else {
        e.target.classList.add("checked");
        selectedColors.add(e.target.value);
      }
      filterAll({
        sizes: Array.from(selectedSizes),
        colors: Array.from(selectedColors),
        prices: Array.from(selectedPrices),
      });
    });
  });

  const sizes = document.querySelectorAll(".shirt-size");

  sizes.forEach((size) => {
    size.addEventListener("click", (e) => {
      if (selectedSizes.has(e.target.value)) {
        e.target.classList.remove("selected");
        selectedSizes.delete(e.target.value);
      } else {
        e.target.classList.add("selected");
        selectedSizes.add(e.target.value);
      }
      filterAll({
        sizes: Array.from(selectedSizes),
        colors: Array.from(selectedColors),
        prices: Array.from(selectedPrices),
      });
    });
  });

  const prices = document.querySelectorAll(".shirt-price");

  prices.forEach((price) => {
    price.addEventListener("click", (e) => {
      if (selectedPrices.has(e.target.value)) {
        selectedPrices.delete(e.target.value);
        e.target.classList.remove("selected");
      } else {
        selectedPrices.add(e.target.value);
        e.target.classList.add("selected");
      }
      filterAll({
        sizes: Array.from(selectedSizes),
        colors: Array.from(selectedColors),
        prices: Array.from(selectedPrices),
      });
    });
  });

  const loadMoreButton = document.querySelector(".load-more");

  loadMoreButton.addEventListener("click", () => {
    loadMore();
  });
}

export function listenToProductsButton() {
  const buyButton = document.querySelectorAll(".product-button");
  const cartAmount = document.querySelector(".cart-amount");

  buyButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      addItemToCart(Number(e.target.id));

      cartAmount.classList.remove("hidden");
      cartAmount.textContent = calcTotalAmount();
    });
  });
}
