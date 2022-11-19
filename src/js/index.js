import { getProducts } from "./api";

let offset = 9;
let products = [];

document.addEventListener("DOMContentLoaded", () => {
  onLoad();

  const loadMore = document.getElementById("loadMore");
  loadMore.onclick = () => {
    offset *= 2;
    loadProducts(offset, 0);
  };
});

function onLoad() {
  loadProducts(offset, 0);
}

function loadProducts(limit, offset) {
  const productsContainer = document.getElementById("container-products");

  productsContainer.innerHTML = "";

  getProducts(limit, offset).then((apiProducts) => {
    products = apiProducts;

    products.forEach((product) => {
      const productElement = createProductElement(product);
      productsContainer.appendChild(productElement);
    });
  });
}

function createProductElement(product) {
  const productElement = document.createElement("div");
  productElement.classList.add("product");

  const productImage = document.createElement("img");
  productImage.src = product.image;
  productImage.classList.add("product-image");

  const productTitle = document.createElement("div");
  productTitle.classList.add("product-title");
  productTitle.innerText = product.name;

  const productPrice = document.createElement("div");
  productPrice.classList.add("product-price");
  productPrice.innerText = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  const button = document.createElement("button");
  button.classList.add("product-button");
  button.innerText = "Comprar";

  const productinstallments = document.createElement("div");
  productinstallments.classList.add("product-installments");
  productinstallments.innerText = `até ${
    product.parcelamento[0]
  } de ${Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.parcelamento[1])}`;

  productElement.appendChild(productImage);
  productElement.appendChild(productTitle);
  productElement.appendChild(productPrice);
  productElement.appendChild(productinstallments);
  productElement.appendChild(button);

  return productElement;
}

// --
