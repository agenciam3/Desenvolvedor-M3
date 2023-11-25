import { Product } from "./Product";

let productsSection = document.getElementById("products");
const products = document.getElementsByClassName("product");
const loadMoreButton = document.getElementById("load-more");
const colors = document.querySelectorAll(".color");
const sizes = document.querySelectorAll(".size");
const prices = document.querySelectorAll(".price");
let quantityProducts = document.querySelector("#quantity-products");
let buyProductButton;
let query = "";
let sort = "";

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
  buyProductButton = document.createElement("button");

  data.size.forEach((sizeClass) => {
    productContainer.classList.add(`size-${sizeClass}`);
  });

  productContainer.classList.add("product");
  productContainer.classList.add(`color-${data.color.toLocaleLowerCase()}`);
  productImage.classList.add("product-image");
  productDescription.classList.add("product-description");
  productPrice.classList.add("product-price");
  productInstallment.classList.add("product-installment");
  buyProductButton.classList.add("product-button");

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
  buyProductButton.innerHTML = "COMPRAR";

  productContainer.appendChild(productImage);
  productContainer.appendChild(productDescription);
  productContainer.appendChild(productPrice);
  productContainer.appendChild(productInstallment);
  productContainer.appendChild(buyProductButton);

  return productContainer;
}

function getDataFromApi() {
  fetch(`http://localhost:5000/products?_sort=${query}&_order=${sort}`)
    .then((data) => data.json())
    .then(function (data) {
      data.map((product: Product) => {
        const productId = Number(product.id);
        const productContainer = createProduct(product);

        productsSection.appendChild(productContainer);

        if (productId > 9) {
          productContainer.style.display = "none";
        }

        buyProductButton = document.getElementsByClassName("product-button");
        for (var i = 0; i < buyProductButton.length; i++) {
          buyProductButton[i].addEventListener("click", addShoppingCart);
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

function filterColor() {
  let countClick = 0;

  colors.forEach((color) => {
    color.addEventListener("click", function () {
      // manipulação para ativar e desativar as outras opções
      if (countClick == 0) {
        color.classList.toggle("active");
        colors.forEach((colorDisable: HTMLElement) => {
          if (!colorDisable.classList.contains("active")) {
            colorDisable.classList.add("off");
          }
        });
        countClick++;
        console.log("entrou no caso 0", countClick);
      } else {
        color.classList.toggle("active");
        colors.forEach((colorDisable: HTMLElement) => {
          if (colorDisable.classList.contains("off")) {
            colorDisable.classList.remove("off");
          }
        });
        console.log("entrou no caso 1", countClick);
        countClick = 0;
      }

      // lógica para renderizar os produtos selecionados
      const colorValueSelected = `color-${color.textContent
        .trim()
        .toLocaleLowerCase()}`;
      const productsFilterColor = [];

      loadMoreButton.style.display = "none";

      for (let i = 0; i < products.length; i++) {
        const product: any = products[i];
        const classContain = product.classList.contains(colorValueSelected);

        // acrescentando o produto no array de produtos filtrados
        if (classContain) {
          productsFilterColor.push(product);
        }

        console.log(productsFilterColor);

        // condição para mostrar os produtos que contém a opção do filtro
        if (
          productsFilterColor.includes(product) &&
          color.classList.contains("active")
        ) {
          product.style.display = "flex";
        } else product.style.display = "none";

        // caso nenhum filtro esteja ativo
        if (!color.classList.contains("active")) {
          loadMoreButton.style.display = "block";
          productsSection.innerHTML = "";
          return getDataFromApi();
        }
      }

      // caso não haja nenhum produto com aquele tamanho
      if (productsFilterColor.length == 0) {
        console.log("não tem produto");
        const withoutProduct = document.createElement("p");
        withoutProduct.innerText = "Nenhum produto encontrado";

        productsSection.appendChild(withoutProduct);
      }
    });
  });
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
      const sizeValueSelected = `size-${size.innerHTML}`;
      const productsFilterSize = [];

      loadMoreButton.style.display = "none";

      for (let i = 0; i < products.length; i++) {
        const product: any = products[i];
        const classContain = product.classList.contains(sizeValueSelected);

        // acrescentando o produto no array de produtos filtrados
        if (classContain) {
          productsFilterSize.push(product);
        }

        // condição para mostrar os produtos que contém a opção do filtro
        if (
          productsFilterSize.includes(product) &&
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
      if (productsFilterSize.length == 0) {
        console.log("não tem produto");
        const withoutProduct = document.createElement("p");
        withoutProduct.innerText = "Nenhum produto encontrado";

        productsSection.appendChild(withoutProduct);
      }
    });
  });
}

function filterPrice() {
  let countClick = 0;
  let productsFilterPrice = [];

  prices.forEach((price) => {
    price.addEventListener("click", function () {
      // manipulação para ativar e desativar as outras opções
      // e detectar se é o primeiro ou segundo click naquele input
      if (countClick == 0) {
        price.classList.toggle("active");
        prices.forEach((priceDisable: HTMLElement) => {
          if (!priceDisable.classList.contains("active")) {
            priceDisable.classList.add("off");
          }
        });
        countClick++;
        console.log("entrou no caso 0", countClick);
      } else {
        price.classList.toggle("active");
        prices.forEach((priceDisable: HTMLElement) => {
          if (priceDisable.classList.contains("off")) {
            priceDisable.classList.remove("off");
          }
        });
        console.log("entrou no caso 1", countClick);
        countClick = 0;
        productsFilterPrice = [];
        loadMoreButton.style.display = "block";
        productsSection.innerHTML = "";
        return getDataFromApi();
      }

      const priceValueSelected = `color-${price.textContent
        .trim()
        .toLocaleLowerCase()}`;
      const priceValueSplit = priceValueSelected.split("r$");
      const priceOne = Number(priceValueSplit[1].split(" até")[0]);
      const priceTwo = Number(priceValueSplit[2]);

      loadMoreButton.style.display = "none";

      for (let i = 0; i < products.length; i++) {
        const product: any = products[i];

        const productPrice = product.childNodes.item(2).textContent;
        const productPriceNumber = Number(
          productPrice.split("R$")[1].trim().replace(",", ".")
        );

        // produtos com dois valores de faixa de preço
        if (productPriceNumber > priceOne && productPriceNumber <= priceTwo) {
          product.style.display = "flex";
          productsFilterPrice.push(product);
          console.log("encontrei");

          // produtos a partir de 500 reais
        } else if (productPriceNumber > priceOne && Number.isNaN(priceTwo)) {
          product.style.display = "flex";
          productsFilterPrice.push(product);
          console.log("enctrei de 500");

          // produtos que não estão naquela faixa de preço
        } else {
          product.style.display = "none";
          console.log("nenhum produto encontrado");
        }
      }

      // caso não haja nenhum produto com aquele tamanho
      if (productsFilterPrice.length == 0) {
        console.log("não tem produto");
        const withoutProduct = document.createElement("p");
        withoutProduct.innerText = "Nenhum produto encontrado";

        productsSection.appendChild(withoutProduct);
      }
    });
  });
}

filterColor();
filterSize();
filterPrice();

// função de selecionar uma opção do "Ordenar por:"
let selectValue = document.getElementById("select-value"),
  optionsViewButton = document.getElementById("options-view-button"),
  inputsOptions = document.querySelectorAll(".option input");

inputsOptions.forEach((input: HTMLElement) => {
  input.addEventListener("click", (event: any) => {
    selectValue.textContent = input.dataset.label;

    const isMouseOrTouch =
      event.pointerType === "mouse" || event.pointerType === "touch";

    isMouseOrTouch && optionsViewButton.click();

    if (selectValue.textContent == "Mais recentes") {
      filterOrderMoreRecent();
    } else if (selectValue.textContent == "Menor preço") {
      filterOrderLowestPrice();
    } else if (selectValue.textContent == "Maior preço") {
      filterOrderBiggestPrice();
    }
  });
});

function filterOrderMoreRecent() {
  productsSection.innerHTML = "";

  query = "date";
  sort = "asc";

  getDataFromApi();

  loadMoreButton.style.display = "block";
}

function filterOrderLowestPrice() {
  productsSection.innerHTML = "";

  query = "price";
  sort = "asc";

  getDataFromApi();

  loadMoreButton.style.display = "block";
}

function filterOrderBiggestPrice() {
  productsSection.innerHTML = "";

  query = "price";
  sort = "desc";

  getDataFromApi();

  loadMoreButton.style.display = "block";
}

const colorsOptions = document.querySelectorAll(".colors-options label");
const allColorsButton = document.getElementById("all-colors");

allColorsButton.addEventListener("click", seeAllColors);

function seeAllColors() {
  colorsOptions.forEach((option: HTMLElement) => {
    option.style.display = "flex";
  });

  allColorsButton.style.display = "none";
}

function addShoppingCart() {
  const addProduct = String(Number(quantityProducts.innerHTML) + 1);

  quantityProducts.innerHTML = addProduct;
}
