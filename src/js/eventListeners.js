import { loadMore, renderProducts } from ".";
import { addItemToCart, calcTotalAmount } from "./utils/cartActions";
import clearAllSelected, { uncheckAll } from "./utils/clearSelect";
import { filterAll, sortProducts } from "./utils/filters";

const selectedColors = new Set();
const selectedSizes = new Set();
const selectedPrices = new Set();

function clearAll() {
  selectedColors.clear();
  selectedSizes.clear();
  selectedPrices.clear();

  uncheckAll();
  filterAll({
    sizes: selectedSizes,
    colors: selectedColors,
    prices: selectedPrices,
  });
}

export default function addEventListeners() {
  const selectTitle = document.querySelector(".select-title");
  const selectItemsContainer = document.querySelector(".select-items");
  const selectButtons = document.querySelectorAll(".select-button");

  selectTitle.addEventListener("click", (e) => {
    selectItemsContainer.classList.toggle("hidden");
  });

  selectButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // select title is the title of the select menu, so, don't toggle the hidden
      // class on it.
      if (e.target.classList.contains("select-title")) return;
      clearAllSelected();
      selectItemsContainer.classList.toggle("hidden");
      selectTitle.textContent = e.target.textContent;
      e.target.classList.add("selected");
      // target id has only one of the three values: "most-recent", "lowest-price"
      // or "highest-price"
      sortProducts(e.target.id);
    });
  });

  const seeMoreColorsButton = document.querySelector("#see-more-colors");

  seeMoreColorsButton.addEventListener("click", (e) => {
    // hide the see more text
    e.target.classList.add("hidden");
    // show the rest of the colors
    const hiddenColors = document.querySelectorAll(".initially-hidden-color");
    hiddenColors.forEach((color) => {
      color.classList.remove("initially-hidden-color");
    });
  });

  const colors = document.querySelectorAll(".color");

  colors.forEach((color) => {
    color.addEventListener("click", (e) => {
      if (e.target.classList.contains("checked")) {
        // I'm using a Set to store the selected colors, so, if the color is
        // already selected, I remove it from the set. Otherwise, I add it to the
        // Set.
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
        // Same thing as with the colors, but with the sizes.
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
        // Same thing as with the colors, but with the prices.
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

  filterModalListeners(seeMoreColorsButton);
}

export function updateProductsButtonListener() {
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

function filterModalListeners(seeMoreColorsButton) {
  // Logic for opening and closing the "select" like options
  // with "CORES", "TAMANHOS","FAIXA DE PREÇO"
  const colorsTitle = document.querySelector(".colors-title");
  const hiddenMobileColors = document.querySelectorAll(
    ".mobile-initially-hidden-color"
  );

  colorsTitle.addEventListener("click", () => {
    hiddenMobileColors.forEach((color) => {
      color.classList.toggle("mobile-initially-hidden-color");
      color.classList.remove("initially-hidden-color");
      seeMoreColorsButton.classList.add("hidden");
    });
  });

  const sizesTitle = document.querySelector(".sizes-title");
  const hiddenMobileSizes = document.querySelectorAll(
    ".mobile-initially-hidden-size"
  );

  sizesTitle.addEventListener("click", () => {
    hiddenMobileSizes.forEach((size) => {
      size.classList.toggle("mobile-initially-hidden-size");
    });
  });

  const pricesTitle = document.querySelector(".prices-title");
  const hiddenMobilePrices = document.querySelectorAll(
    ".mobile-initially-hidden-price"
  );

  pricesTitle.addEventListener("click", () => {
    hiddenMobilePrices.forEach((price) => {
      price.classList.toggle("mobile-initially-hidden-price");
    });
  });

  const openFilterMenuButton = document.querySelector(".filter-button");
  const closeFilterMenuButton = document.querySelector(
    ".close-mobile-filter-header"
  );
  const filterModal = document.querySelector("aside");

  function closeFilterModal() {
    filterModal.classList.add("mobile-hidden");
  }

  openFilterMenuButton.addEventListener("click", () => {
    filterModal.classList.remove("mobile-hidden");
  });

  closeFilterMenuButton.addEventListener("click", () => {
    closeFilterModal();
  });

  const applyFiltersButton = document.querySelector(".button-apply");
  const clearFiltersButton = document.querySelector(".button-clear");

  applyFiltersButton.addEventListener("click", () => {
    closeFilterModal();
  });

  clearFiltersButton.addEventListener("click", () => {
    clearAll();
  });
}
