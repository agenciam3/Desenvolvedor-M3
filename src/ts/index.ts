import { Product } from "./Product";

let productsSection = document.getElementById("products");
const products = document.querySelectorAll(".product");
const loadMoreButton = document.getElementById("load-more");
const sizes = document.querySelectorAll(".size");
let page = 1;
let limit = 9;

function main() {
  getDataFromApi();
}

main();

function createProduct(data: Product) {
  const productContainer = document.createElement("article");
  const productImage = document.createElement("img");
  const productDescription = document.createElement("h3");
  const productPrice = document.createElement("p");
  const productInstallment = document.createElement("p");
  const productButton = document.createElement("button");

  data.size.forEach((sizeClass) => {
    productContainer.classList.add(`size-${sizeClass}`);
  });

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
  fetch(`http://localhost:5000/products`)
    .then((data) => data.json())
    .then(function (data) {
      data.map((product: Product) => {
        const productId = Number(product.id);
        const productContainer = createProduct(product);

        productsSection.appendChild(productContainer);

        if (productId > 9) {
          productContainer.style.display = "none";
        }
      });
    })
    .catch((error) => console.error(error));
}

loadMoreButton.addEventListener("click", loadMoreProducts);

function loadMoreProducts() {
  const products = document.querySelectorAll(".product");

  products.forEach((product: HTMLElement) => {
    if (product.style.display == "none") {
      product.style.display = "flex";
    }
  });

  loadMoreButton.style.display = "none";
}

function addClassFilterSize() {
  let countClick = 0;
  sizes.forEach((size: HTMLElement) => {
    size.addEventListener("click", function () {
      if (countClick == 0) {
        size.classList.toggle("active");
        sizes.forEach((sizeDisable: HTMLElement) => {
          if (!sizeDisable.classList.contains("active")) {
            sizeDisable.classList.add("off");
          }
        });
        countClick++;
        console.log("entrou no caso 0", countClick);
      } else {
        size.classList.toggle("active");
        sizes.forEach((sizeDisable: HTMLElement) => {
          if (sizeDisable.classList.contains("off")) {
            sizeDisable.classList.remove("off");
          }
        });
        console.log("entrou no caso 1", countClick);
        countClick = 0;
      }
    });
  });
}

function filterSize() {
  addClassFilterSize();

  sizes.forEach((size) => {
    size.addEventListener("click", function () {
      const productsElement = document.getElementsByClassName("product");
      const sizeValueSelected = `size-${size.innerHTML}`;
      const productsFilter = [];

      loadMoreButton.style.display = "none";

      for (let i = 0; i < productsElement.length; i++) {
        const product: any = productsElement[i];
        const classContain = product.classList.contains(sizeValueSelected);

        // acrescentando o produto no array de produtos filtrados
        if (classContain) {
          productsFilter.push(product);
        }

        // condição para mostrar ou não os elementos do filtro
        if (
          productsFilter.includes(product) &&
          size.classList.contains("active")
        ) {
          product.style.display = "flex";
        } else product.style.display = "none";

        // caso nenhum filtro esteja ativo
        if (!size.classList.contains("active")) {
          loadMoreButton.style.display = "block";
          productsSection.innerHTML = "";
          return getDataFromApi();
        }
      }

      // caso não haja nenhum produto com aquele tamanho
      if (productsFilter.length == 0) {
        console.log("não tem produto");
        const withoutProduct = document.createElement("p");
        withoutProduct.innerText = "Nenhum produto encontrado";

        productsSection.appendChild(withoutProduct);
      }
    });
  });
}

filterSize();

// função de seleção do "Ordenar por:"
let selectValue = document.getElementById("select-value"),
  optionsViewButton = document.getElementById("options-view-button"),
  inputsOptions = document.querySelectorAll(".option input");

inputsOptions.forEach((input: HTMLElement) => {
  input.addEventListener("click", (event: any) => {
    selectValue.textContent = input.dataset.label;

    const isMouseOrTouch =
      event.pointerType === "mouse" || event.pointerType === "touch";

    isMouseOrTouch && optionsViewButton.click();
  });
});
