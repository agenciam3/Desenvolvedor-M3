const serverurl = process.env.SERVER_API;

let product = document.querySelector(".product-list-content");
let page = 1;

// Váriaveis para adiconar filtro
let query = "";
let sort = "";

// Variável do botão de carregar mais produtos
const showButton = document.querySelector("#showMore");

// Variáveis para toggle da ordenação dos produtos
let titleOrder = document.querySelector(".product-order");
let optionsOrder = document.querySelector(".orderBy");

// Váriavel do botão de menor preço
let lowestPrice = document.querySelector(".lowest-price");

// Variável do botão de maior preço
let biggestPrice = document.querySelector(".biggest-price");

function createProduct(data) {
  console.log(data.name);
  productDiv = document.createElement("div");
  productDiv.classList.add("product");
  productImage = document.createElement("img");
  productName = document.createElement("h3");
  productPrice = document.createElement("p");
  productInstallment = document.createElement("p");
  productInstallment.classList.add("price-parcel");
  productPrice.classList.add("price");
  buyButton = document.createElement("button");
  productImage.src = data.image;

  productName.innerHTML = data.name;
  productPrice.innerHTML = data.price.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  productInstallment.innerHTML = `Até ${
    data.parcelamento[0]
  } de ${data.parcelamento[1].toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  })}`;
  buyButton.innerHTML = "Comprar";

  productDiv.appendChild(productImage);
  productDiv.appendChild(productName);
  productDiv.appendChild(productPrice);
  productDiv.appendChild(productInstallment);
  productDiv.appendChild(buyButton);

  return productDiv;
}

function getDataFromApi() {
  fetch(
    `http://localhost:5000/products?_page=${page}&_limit=9&_sort=${query}&_order=${sort}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      data.forEach((element) => {
        let productDiv = createProduct(element);
        product.appendChild(productDiv);
      });
    })
    .catch(function (e) {
      console.log(e);
    });
}

function main() {
  getDataFromApi();
}

showButton.addEventListener("click", carregarMais);

function carregarMais() {
  page++;
  getDataFromApi();
}

titleOrder.addEventListener("click", orderToggle);

function orderToggle() {
  if (optionsOrder.classList.contains("show")) {
    optionsOrder.classList.remove("show");
  } else {
    optionsOrder.classList.add("show");
  }
}

lowestPrice.addEventListener("click", showLowestPrice);

function showLowestPrice() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  query = "price";
  sort = "asc";

  getDataFromApi();
}

biggestPrice.addEventListener("click", showBiggestPrice);

function showBiggestPrice() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  query = "price";
  sort = "desc";

  getDataFromApi();
}

main();
