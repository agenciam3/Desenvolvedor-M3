import { formatPrice } from "../utils/formatPrice.js";

class ProductHandler {
  static showProducts(products) {
    const showcase = document.querySelector(".showcase");
    showcase.innerHTML = "";

    console.log(products);

    products.forEach((product) => {
      const htmlProduct = ProductHandler.buildProduct(product);

      showcase.append(htmlProduct);
    });
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
}

export default ProductHandler;
