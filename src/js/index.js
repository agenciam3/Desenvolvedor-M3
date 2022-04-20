import fetchProductJSON from "./fetchProductJSON";
import renderGrid from "./renderGrid";
import filter from "./filter";
import { orderByPriceDesc, orderByPriceAsc, orderByRecents } from "./orderBy";
const btnAccordion = document.querySelectorAll(".js-accordion");
const btnfilterMobile = document.getElementById("filter-mobile");
const btnCloseFilterMobile = document.getElementById("filter-mobile-open");
const btnFilterOderBy = document.getElementById("orderby-mobile");
const btnCloseFilterOderBy = document.getElementById("close-orderby-mobile");
const urlBase = "http://localhost:5000/products/?_page=1&_limit=9";
localStorage.setItem("urlBase", urlBase);
let productInitial = fetchProductJSON(urlBase);

productInitial.then((response) => {
  orderByPriceDesc(response);
  //const result = response.filter(filterPrice);
  renderGrid(response);
});

btnAccordion.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    accordion.parentElement.classList.toggle("active");
  });
});

export const closeFilter = () => {
  document.documentElement.classList.remove("menu-opened");
};

const openFilterOderBy = () => {
  document.documentElement.classList.add("menu-orderby-opened");
};

const openFilterMobile = () => {
  document.documentElement.classList.add("menu-opened");
};

export const closeFilterOderBy = () => {
  document.documentElement.classList.remove("menu-orderby-opened");
};

btnfilterMobile.addEventListener("click", openFilterMobile);
btnFilterOderBy.addEventListener("click", openFilterOderBy);

btnCloseFilterMobile.addEventListener("click", closeFilter);
btnCloseFilterOderBy.addEventListener("click", closeFilterOderBy);
