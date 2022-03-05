import { setOrderBy } from "./orderBy";

const colorSelected = [];
const sizeSelected = [];
const priceSelected = [];

export function filterProduct(productList) {
  if (productList) {
    const cleanList = [];
    var list_filter = [];

    // REMOVENDO ITENS DUPLICADOS

    productList.forEach((item) => {
      var duplicated =
        cleanList.findIndex((reducedItem) => {
          return item.id == reducedItem.id;
        }) === -1;

      if (duplicated) {
        cleanList.push(item);
      }
    });

    // FILTRANDO CORES

    list_filter = cleanList.filter((item) => {
      if (colorSelected.length > 0) {
        for (let i = 0; i < colorSelected.length; i++) {
          const cor = colorSelected[i];
          if (item.color === cor) {
            return true;
          }
        }
      } else {
        return true;
      }
    });

    // FILTRANDO TAMANHO

    list_filter = list_filter.filter((item) => {
      if (sizeSelected.length === 0) {
        return true;
      }
      for (let i = 0; i < item.size.length; i++) {
        const sizeProduct = item.size[i];

        for (let i = 0; i < sizeSelected.length; i++) {
          const sizeProductFilter = sizeSelected[i];

          if (sizeProduct === sizeProductFilter) {
            return true;
          }
        }
      }
    });

    // FILTRANDO PRECO

    list_filter = list_filter.filter((item) => {
      if (priceSelected.length === 0) {
        return true;
      }

      for (let i = 0; i < priceSelected.length; i++) {
        var price = priceSelected[i];
        price = price.split("-");
        var min = Number(price[0]);
        var max = Number(price[1]);

        if (item.price > min && item.price < max) {
          return true;
        }
      }
    });

    setOrderBy(list_filter);
  }
}

export function setFilters(productList) {
  var input = document.querySelectorAll("input[type='checkbox']");

  for (let i = 0; i < input.length; i++) {
    var element = input[i];

    element.addEventListener("change", (e) => {
      switch (e.target.name) {
        case "color": {
          var index = colorSelected.findIndex((i) => i === e.target.value);
          if (index === -1) {
            colorSelected.push(e.target.value);
          } else {
            colorSelected.splice(index, 1);
          }
          break;
        }

        case "size": {
          var index = sizeSelected.findIndex((i) => i === e.target.value);

          if (index === -1) {
            sizeSelected.push(e.target.value);
          } else {
            sizeSelected.splice(index, 1);
          }

          break;
        }
        case "price": {
          var index = priceSelected.findIndex((i) => i === e.target.value);

          if (index === -1) {
            priceSelected.push(e.target.value);
          } else {
            priceSelected.splice(index, 1);
          }
          break;
        }
      }

      if (screen.width >= 768) {
        filterProduct(productList);
      } else {
        actionsFilter(productList);
      }
    });
  }
}

function actionsFilter(productList) {
  const filterContent = document.querySelector(".category--filter-content");
  var action = document.querySelector(
    ".category--filter-content--actions-mobile"
  );

  // CLEAN
  const cleanFilterBtn = document.querySelector(
    ".category--filter-content--actions-mobile--clean"
  );
  cleanFilterBtn.addEventListener("click", () => {
    const filterSelected = document.querySelectorAll(
      "input[type=checkbox]:checked"
    );

    for (let i = 0; i < filterSelected.length; i++) {
      const element = filterSelected[i];

      element.checked = false;
    }

    colorSelected.splice(0, colorSelected.length);
    sizeSelected.splice(0, sizeSelected.length);
    priceSelected.splice(0, priceSelected.length);

    filterProduct(productList);

    action.classList.remove("seeAction");
    filterContent.classList.remove("filterSee");
  });

  // APPLY
  const applyFilterMobile = document.querySelector(
    ".category--filter-content--actions-mobile--apply"
  );

  applyFilterMobile.addEventListener("click", () => {
    filterProduct(productList);
    filterContent.classList.remove("filterSee");
  });

  // ACTION
  if (
    priceSelected.length > 0 ||
    sizeSelected.length > 0 ||
    colorSelected.length > 0
  ) {
    action.classList.add("seeAction");
  } else {
    action.classList.remove("seeAction");
  }
}
