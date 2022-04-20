import renderGrid from "./renderGrid";
import fetchProductJSON from "./fetchProductJSON";
import { closeFilterOderBy } from ".";

export function orderByPriceAsc(value) {
  value.sort(function (x, y) {
    let a = x.price;
    let b = y.price;
    return a - b;
  });
  return value;
}

export function orderByPriceDesc(value) {
  value.sort(function (x, y) {
    let a = x.price;
    let b = y.price;
    return b - a;
  });
  return value;
}
export function orderByRecents(value) {
  value.sort(function (x, y) {
    let a = x.id;
    let b = y.id;
    return b - a;
  });
  return value;
}

const OrderByPriceASC = document.getElementById("O");

OrderByPriceASC.addEventListener("change", clickOrderBy);

const idRecent = document.getElementById("id-recent");
const sizeAsc = document.getElementById("price-size-asc");
const sizeDesc = document.getElementById("price-size-desc");

idRecent.addEventListener("click", clickOrderBy);
sizeAsc.addEventListener("click", clickOrderBy);
sizeDesc.addEventListener("click", clickOrderBy);

function clickOrderBy(e) {
  switch (e.target.value) {
    case "OrderByPriceASC":
      fetchProductJSON(localStorage.getItem("lastURL")).then((response) => {
        orderByPriceAsc(response);
        renderGrid(response);
      });

      closeFilterOderBy();

      break;

    case "OrderByPriceDESC":
      fetchProductJSON(localStorage.getItem("lastURL")).then((response) => {
        orderByPriceDesc(response);
        renderGrid(response);
      });
      closeFilterOderBy();
      break;

    case "OrderByTopSaleDESC":
      orderByRecents(localStorage.getItem("lastURL")).then((response) => {
        orderByPriceAsc(response);
        renderGrid(response);
      });
      closeFilterOderBy();
      break;

    default:
      fetchProductJSON(localStorage.getItem("lastURL")).then((response) => {
        renderGrid(response);
      });
      closeFilterOderBy();

      break;
  }
}
