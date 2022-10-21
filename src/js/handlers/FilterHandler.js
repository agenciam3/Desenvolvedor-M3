import OrderHandler from "./OrderHandler.js";
import ProductHandler from "./ProductHandler.js";

class FilterHandler {
  static markOrMarkOffCheckbox() {
    const checkboxes = document.querySelectorAll(".marked, .size__item");

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", (e) => {
        if (window.screen.width >= 1100) {
          setTimeout(() => {
            FilterHandler.filterProducts();
          }, 50);
        }
        if (checkbox.classList.contains("marked")) {
          const input = e.currentTarget.nextElementSibling;

          if (input.checked) {
            checkbox.style.background = "transparent";
          } else {
            checkbox.style.backgroundColor = "#00c0ee";
          }
        } else {
          const input = checkbox.nextElementSibling;
          if (input.checked) {
            checkbox.style.border = "1px solid rgba(0, 0, 0, 0.5)";
            checkbox.style.color = "rgba(0, 0, 0, 0.5)";
          } else {
            checkbox.style.border = "1px solid #00c0ee";
            checkbox.style.color = "#000";
          }
        }
      });
    });
  }

  static filterProducts() {
    const colorForm = Object.fromEntries(
      new FormData(document.querySelector(".section__body--color")).entries()
    );

    const sizeForm = Object.fromEntries(
      new FormData(document.querySelector(".section__body--size")).entries()
    );

    const priceForm = Object.fromEntries(
      new FormData(document.querySelector(".section__body--price")).entries()
    );

    const products = JSON.parse(localStorage.getItem("@m3commerce:products"));

    let filteredProducts = products.filter((product) => {
      return (
        FilterHandler.verifyColor(colorForm, product.color) &&
        FilterHandler.verifySize(sizeForm, product.size) &&
        FilterHandler.verifyPrice(priceForm, product.price)
      );
    });

    const currentOrder = document.querySelector(".orderSelected");

    if (currentOrder) {
      filteredProducts = OrderHandler.orderProducts(
        currentOrder.getAttribute("data-order"),
        filteredProducts
      );
    }

    FilterHandler.addFilteredProductsToLocalStorage(filteredProducts);

    ProductHandler.clearShowCase();
    ProductHandler.showProducts(filteredProducts);
  }

  static verifyColor(colors, productColor) {
    colors = Object.keys(colors);

    if (colors.length === 0) {
      return true;
    }

    return colors.includes(productColor.toLowerCase());
  }

  static verifySize(sizes, productSizes) {
    sizes = Object.keys(sizes);

    if (sizes.length === 0) {
      return true;
    }

    return productSizes.some((productSize) => {
      return sizes.includes(productSize.toUpperCase());
    });
  }

  static verifyPrice(prices, productPrice) {
    prices = Object.keys(prices);

    if (prices.length === 0) {
      return true;
    }

    for (let value of prices) {
      if (value.includes("-")) {
        if (
          productPrice >= Number(value.split("-")[0]) &&
          productPrice <= Number(value.split("-")[1])
        ) {
          return true;
        }
      } else {
        if (productPrice > Number(value)) {
          return true;
        }
      }
    }
  }

  static addFilteredProductsToLocalStorage(products) {
    localStorage.setItem(
      "@m3commerce:filteredProducts",
      JSON.stringify(products)
    );
  }
}

export default FilterHandler;
