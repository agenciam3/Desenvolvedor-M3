import { Product } from "./Product";

const serverUrl = "http://localhost:5000/products";

const productsSection = document.getElementById("products");

function createProduct(data: Product) {
  const productContainer = document.createElement("article");
  const productImage = document.createElement("img");
  const productDescription = document.createElement("h3");
  const productPrice = document.createElement("p");
  const productInstallment = document.createElement("p");
  const productButton = document.createElement("button");

  productContainer.classList.add("product");
  productImage.classList.add("product-image");
  productDescription.classList.add("product-description");
  productPrice.classList.add("product-price");
  productInstallment.classList.add("product-installment");
  productButton.classList.add("product-button");

  productImage.src = data.image;
  productDescription.innerHTML = data.name;
  productPrice.innerHTML = data.price.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  productInstallment.innerHTML = `até ${
    data.parcelamento[0]
  }x de ${data.parcelamento[1].toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  })}`;
  productButton.innerHTML = "COMPRAR";

  productContainer.appendChild(productImage);
  productContainer.appendChild(productDescription);
  productContainer.appendChild(productPrice);
  productContainer.appendChild(productInstallment);
  productContainer.appendChild(productButton);

  return productContainer;
}

function getDataFromApi() {
  fetch("http://localhost:5000/products")
    .then((data) => data.json())
    .then((data) => {
      const productsData = data;

      productsData.map((product: Product) => {
        const productContainer = createProduct(product);
        productsSection.appendChild(productContainer);
      });
    })
    .catch((error) => console.error(error));
}

getDataFromApi();

// function productsList() {
//   console.log(serverUrl);
// }

// productsList();
// document.addEventListener("DOMContentLoaded", main);
