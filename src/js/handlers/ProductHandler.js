import { formatPrice } from "../utils/formatPrice.js";
import { api } from "../services/api.js";
import { disableLoadButton, enableLoadButton } from "../utils/LoadButton.js";
import FilterHandler from "./FilterHandler.js";
class ProductHandler {
  static showProducts(products) {
    const showcase = document.querySelector(".showcase");

    products.forEach((product) => {
      const htmlProduct = ProductHandler.buildProduct(product);

      showcase.append(htmlProduct);
    });
  }

  static clearShowCase() {
    const showcase = document.querySelector(".showcase");
    showcase.innerText = "";
  }

  static buildProduct(product) {
    const card = document.createElement("article");
    const image = document.createElement("img");
    const title = document.createElement("h3");
    const price = document.createElement("span");
    const installment = document.createElement("p");
    const buyButton = document.createElement("button");

    card.classList.add("card");
    image.src = product.image;
    image.alt = product.name;
    title.innerText = product.name;
    price.innerText = formatPrice(product.price);
    installment.innerText = `até ${product.parcelamento[0]}x de ${formatPrice(
      product.parcelamento[1]
    )}`;
    buyButton.innerText = "Comprar";

    card.append(image, title, price, installment, buyButton);

    return card;
  }

  static changePage(page) {
    document
      .querySelector(".loadMore__area__button")
      .setAttribute("data-page", `${page}`);
  }

  static async loadMoreProducts() {
    disableLoadButton();
    const currentPage = document
      .querySelector(".loadMore__area__button")
      .getAttribute("data-page");

    const nextPage = +currentPage + 1;

    const products = await api.getAll(nextPage);

    if (products.length === 0) {
      return null;
    }

    ProductHandler.addProductsToLocalStorage(products);

    FilterHandler.filterProducts();
    enableLoadButton();
  }

  static addProductsToLocalStorage(products) {
    const previousProducts = JSON.parse(
      localStorage.getItem("@m3commerce:products")
    );

    const newProducts = previousProducts
      ? previousProducts.concat(products)
      : products;

    localStorage.setItem("@m3commerce:products", JSON.stringify(newProducts));
  }
}

export default ProductHandler;
