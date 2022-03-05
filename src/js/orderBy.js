import { showProductDesktop, showProductMobile } from "./products";

var orderByOption = "recent";

function orderBy(list_filter) {
  var orderedList = [];
  switch (orderByOption) {
    case "lowest-price":
      orderedList = lowestPrice(list_filter);
      break;

    case "biggest-price":
      orderedList = biggestPrice(list_filter);
      break;

    default:
      orderedList = recent(list_filter);
      break;
  }

  if (screen.width >= 768) {
    showProductDesktop(orderedList);
  } else {
    showProductMobile(orderedList);
  }
}

//-----------MAIS RESCENTE --------//
function recent(products) {
  const orderedList = products.sort(function (a, b) {
    return a.date.localeCompare(b.date, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });
  7;

  return orderedList;
}
//-----------MAIOR PREÇO --------//

function biggestPrice(products) {
  const orderedList = products.sort(function (a, b) {
    return b.price - a.price;
  });

  return orderedList;
}

//-----------MENOR PREÇO --------//
function lowestPrice(products) {
  const orderedList = products.sort(function (a, b) {
    return a.price - b.price;
  });

  return orderedList;
}

export function setOrderBy(list_filter) {
  orderBy(list_filter);
  const allOrderbyOptionsDesktop = document.querySelectorAll(".orderby-option");

  for (let i = 0; i < allOrderbyOptionsDesktop.length; i++) {
    const element = allOrderbyOptionsDesktop[i];
    element.addEventListener("click", (e) => {
      orderByOption = e.target.getAttribute("data-orderBy");
      orderBy(list_filter);
    });
  }

  const OrderbyOptionsMobile = document.querySelectorAll(
    ".orderby-option-mobile"
  );

  for (let i = 0; i < OrderbyOptionsMobile.length; i++) {
    const element = OrderbyOptionsMobile[i];
    element.addEventListener("click", (e) => {
      orderByOption = e.target.getAttribute("data-orderBy");
      orderBy(list_filter);

      var orderMobileContainer = document.querySelector(
        ".category--orderby-mobile--container"
      );
      orderMobileContainer.classList.remove(`on`);
    });
  }
}
