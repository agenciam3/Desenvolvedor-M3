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

const sidebar = document.querySelectorAll("#sidebar-filter input");
const sidebarArr = Array.prototype.slice.call(sidebar);

sidebarArr.forEach((sidebarArr) => {
  sidebarArr.addEventListener("click", clickFilter);
});
//sidebar.addEventListener("checked", clickFilter, false);

let urlFilter = localStorage.setItem("urlFilter", "");

const checkAzul = document.getElementById("checkAzul");

if (localStorage.getItem("&color=Azul")) {
  checkAzul.setAttribute("checked", "checked");
} else {
}

function clickFilter(e) {
  //e.target.getAttribute("checked").toggle("checked");
  e.target.setAttribute("checked", "checked");
  localStorage.setItem(
    e.target.getAttribute("rel"),
    e.target.getAttribute("checked")
  );
  //e.target.toggleAttribute("checked");
  //console.log(e.target.getAttribute("checked"));
  //let link = e.target.getAttribute("rel");

  // const urlFilter = localStorage.setItem(
  //   e.target.getAttribute("rel"),
  //   e.target.getAttribute("rel")
  // );
  console.log(Product(`${localStorage.getItem("urlBase").concat(link)}`));
  const linkB = "http://localhost:5000/products/";
  Product(`${localStorage.getItem("urlBase").concat(link)}`);

  // if (localStorage.getItem("&color=azul")) {
  //   document.querySelector("#checkAzul span").classList.add(":after");
  //   //span:after
  //   console.log("tem");
  // } else document.getElementById(checkAzul).checked = false;
  //let novaurl = +link;

  //localStorage.setItem("urlFilter", novaurl);
  //localStorage.setItem("urlFilter", urlFilter);

  // const mountFilterUrl(urlFilter)=>{
  //   urlFilter = localStorage.getItem("urlFilter") + localStorage.setItem("urlFilter", urlFilter)

  // }
  //localStorage.setItem("urlFilter", urlFilter);
  //console.log(e.target.getAttribute("rel"));
}

const OrderByPriceASC = document.getElementById("O");
console.log(OrderByPriceASC);
OrderByPriceASC.addEventListener("change", clickOrderBy, false);

function clickOrderBy(e) {
  switch (e.target.value) {
    case "OrderByPriceASC":
      Product(`${localStorage.getItem("urlBase")}&_sort=price&_order=asc`);
      // Product(
      //   "http://localhost:5000/products/?color=Preto&color=Rosa&price_gte=400&price_lte=0"
      // );
      break;

    case "OrderByPriceDESC":
      // Product(
      //   "http://localhost:5000/products/?color=Preto&color=Rosa&price_gte=0&price_lte=1000"
      // );
      Product(`${localStorage.getItem("urlBase")}&_sort=price&_order=desc`);
      break;

    case "OrderByTopSaleDESC":
      Product(`${localStorage.getItem("urlBase")}&_sort=id&_order=desc`);
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

//console.log(Product("http://localhost:5000/products/?_page=1&_limit=9"));
