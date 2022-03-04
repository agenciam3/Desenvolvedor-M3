import { showProductDesktop, showProductMobile } from "./products";

const colorSelected = [];
const sizeSelected = [];
const priceSelected = [];

export function filterProduct(productList) {
  console.log("filterProduct");
  console.log("productList");
  console.log(productList);

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

        console.log("sizeProduct");
        console.log(sizeProduct);

        for (let i = 0; i < sizeSelected.length; i++) {
          const sizeProductFilter = sizeSelected[i];

          console.log("sizeProductFilter");
          console.log(sizeProductFilter);

          if (sizeProduct === sizeProductFilter) {
            return true;
          }
        }
      }
    });

    console.log("list_filter Tamanho");
    console.log(list_filter);
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

    console.log("list_filter Preco");
    console.log(list_filter);

    if (screen.width >= 768) {
      showProductDesktop(list_filter);
    } else {
      showProductMobile(list_filter);
    }
  }
}

export function setFilters(productList) {
  console.log("setFilters");
  console.log("productList");
  console.log(productList);

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
            priceSelected.splice(index, 1);
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
        var action = document.querySelector(
          ".category--filter-content--actions-mobile"
        );
        if (
          priceSelected.length > 0 ||
          sizeSelected.length > 0 ||
          colorSelected.length > 0
        ) {
          //funçao de filter
          action.classList.add("seeAction");
          var applyFilterMobile = document.querySelector(
            ".category--filter-content--actions-mobile--apply"
          );

          applyFilterMobile.addEventListener("click", () => {
            filterProduct(productList);
          });
        } else {
          action.classList.remove("seeAction");
        }
      }
    });
  }
}
