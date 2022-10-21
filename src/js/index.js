import { api } from "./services/api.js";
import ProductHandler from "./handlers/ProductHandler.js";
import FilterHandler from "./handlers/FilterHandler.js";
import OrderHandler from "./handlers/OrderHandler.js";
import CartHandler from "./handlers/CartHandler.js";

const loadMoreButton = document.querySelector(".loadMore__area__button");
const applyFilterButton = document.querySelector(".action__button--blue");
const orderButtons = document.querySelectorAll(".order__body__option");
const orderOpen = document.querySelector(".order__title .open");
const filterMobileButton = document.querySelector(
  ".firstArea__actions button:nth-child(1)"
);
const filterCloserMobileButton = document.querySelector(
  ".filter__title .close"
);
const orderMobileButton = document.querySelector(
  ".firstArea__actions button:nth-child(2)"
);
const orderCloserMobileButton = document.querySelector(".order__title .close");
const openSectionBodyColorButton = document.querySelector(".open--color");
const openSectionBodySizeButton = document.querySelector(".open--size");
const openSectionBodyPriceButton = document.querySelector(".open--price");
const cleanFilters = document.querySelector(
  ".filter__body__actions button:last-child"
);
const closeCartButton = document.querySelector(".cart__close");
const openCartIcon = document.querySelector(".cart-icon");
const showMoreColors = document.querySelector(".showMoreColors");

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
    FilterHandler.closeFilterInMobile();
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

filterMobileButton.addEventListener("click", () => {
  FilterHandler.openFilterInMobile();
});

filterCloserMobileButton.addEventListener("click", () => {
  FilterHandler.closeFilterInMobile();
});

orderMobileButton.addEventListener("click", () => {
  OrderHandler.openOrderInMobile();
});

orderCloserMobileButton.addEventListener("click", () => {
  OrderHandler.closeOrderInMobile();
});

openSectionBodyColorButton.addEventListener("click", () => {
  FilterHandler.toggleSectionBodyColor();
});

openSectionBodySizeButton.addEventListener("click", () => {
  FilterHandler.toggleSectionBodySize();
});

openSectionBodyPriceButton.addEventListener("click", () => {
  FilterHandler.toggleSectionBodyPrice();
});

cleanFilters.addEventListener("click", () => {
  FilterHandler.cleanFilters();
});

closeCartButton.addEventListener("click", () => {
  CartHandler.closeCart();
});

openCartIcon.addEventListener("click", () => {
  CartHandler.openCart();
});

showMoreColors.addEventListener("click", (e) => {
  e.preventDefault();
  e.currentTarget.style.display = "none";
  const colorsNotInScreen = document.querySelectorAll(".notInScreen");

  colorsNotInScreen.forEach((color) => color.classList.remove("notInScreen"));
});
