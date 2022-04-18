import Product from "./Products";

const btnAccordion = document.querySelectorAll(".js-accordion");
const btnfilterMobile = document.getElementById("filter-mobile");
const btnCloseFilterMobile = document.getElementById("filter-mobile-open");
const btnFilterOderBy = document.getElementById("orderby-mobile");
const btnCloseFilterOderBy = document.getElementById("close-orderby-mobile");

btnAccordion.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    accordion.parentElement.classList.toggle("active");
  });
});

const closeFilter = () => {
  document.documentElement.classList.remove("menu-opened");
};

const openFilterOderBy = () => {
  document.documentElement.classList.add("menu-orderby-opened");
};

const openFilterMobile = () => {
  document.documentElement.classList.add("menu-opened");
};

const closeFilterOderBy = () => {
  document.documentElement.classList.remove("menu-orderby-opened");
};

btnfilterMobile.addEventListener("click", openFilterMobile);
btnFilterOderBy.addEventListener("click", openFilterOderBy);

btnCloseFilterMobile.addEventListener("click", closeFilter);
btnCloseFilterOderBy.addEventListener("click", closeFilterOderBy);

//carregamento inicial
Product("http://localhost:5000/products/?_page=1&_limit=9");

const OrderByPriceASC = document.getElementById("O");
console.log(OrderByPriceASC);
OrderByPriceASC.addEventListener("change", clickOrderBy, false);

function clickOrderBy(e) {
  switch (e.target.value) {
    case "OrderByPriceASC":
      Product(
        "http://localhost:5000/products/?color=Preto&color=Rosa&price_gte=100&price_lte=400"
      );
      break;

    case "OrderByPriceDESC":
      Product(
        "http://localhost:5000/products/?color=Preto&color=Rosa&price_gte=10&price_lte=100"
      );
      break;

    case "OrderByTopSaleDESC":
      Product(`${localStorage.getItem("url")}&price_gte=10&price_lte=200`);
      break;

    default:
      Product("http://localhost:5000/products/?_page=1&_limit=9");

      break;
  }
  // if(e.target.value="OrderByPriceASC"){
  //   Product(
  //     "http://localhost:5000/products/?color=Preto&color=Rosa&price_gte=10&price_lte=100"
  //   );
  // }
  // Product(
  //   "http://localhost:5000/products/?color=Preto&color=Rosa&price_gte=10&price_lte=100"
  // );
  // console.log(`e.target.value = ${e.target.value}`);
  // console.log(
  //   `OrderByPriceASC.options[OrderByPriceASC.selectedIndex].value = ${
  //     OrderByPriceASC.options[OrderByPriceASC.selectedIndex].value
  //   }`
  // );
}

console.log(Product("http://localhost:5000/products/?_page=1&_limit=9"));
