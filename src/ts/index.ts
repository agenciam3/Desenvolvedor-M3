import { Product } from "./Product";

const productsSection = document.getElementById("products");

const loadMoreButton = document.getElementById("load-more");

// função de criação dos produtos
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

// função para renderizar produtos via API
let page = 1;
let limit = 9;

function getDataFromApi() {
  fetch(`http://localhost:5000/products?_page=${page}&_limit=${limit}`)
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

// função do "Ordenar por:"
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

// função para carregar mais produtos
loadMoreButton.addEventListener("click", loadMoreProducts);

function loadMoreProducts() {
  page++;
  loadMoreButton.style.display = "none";
  getDataFromApi();
}

// função para adicionar classe de estilização no filtro tamanho
function addClassFilterSize() {
  const sizes = document.querySelectorAll(".size");

  sizes.forEach((size) => {
    size.addEventListener("click", function () {
      const sizeClass = size.classList.toggle("active");
    });
  });
}

addClassFilterSize();
