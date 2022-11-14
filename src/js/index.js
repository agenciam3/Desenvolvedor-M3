const serverurl = process.env.SERVER_API;

let product = document.querySelector(".product-list-content");
let page = 1;

// Váriaveis para adiconar filtro
let query = "id";
let sort = "asc";
let extraQuery = "";

// Variável do botão de carregar mais produtos
const showButton = document.querySelector("#showMore");

// Variáveis para toggle da ordenação dos produtos
let titleOrder = document.querySelector(".product-order");
let optionsOrder = document.querySelector(".orderBy");

// Váriavel do botão de mais recente
let mostRecent = document.querySelector(".most-recent");

// Váriavel do botão de menor preço
let lowestPrice = document.querySelector(".lowest-price");

// Variável do botão de maior preço
let biggestPrice = document.querySelector(".biggest-price");

// Varíavel do checkbox até R$50
let until50 = document.querySelector("#until-50");

// Variável do checkbox até 150
let until150 = document.querySelector("#until-150");

// Variável do checkbox até 350
let until300 = document.querySelector("#until-300");

// Variável do checkbox até 500
let until500 = document.querySelector("#until-500");

// Variável do checkbox a partir de 500
let greaterThan500 = document.querySelector("#greater-than-500");

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
    `http://localhost:5000/products?_page=${page}&_limit=9&_sort=${query}&_order=${sort}${extraQuery}`
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

mostRecent.addEventListener("click", showMostRecentProduct);

function showMostRecentProduct() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  query = "date";
  sort = "asc";

  getDataFromApi();
}

until50.addEventListener("click", showPriceUntil50);

function showPriceUntil50() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  query = "price";
  extraQuery = "&price_lte=50";
  getDataFromApi();
}

until150.addEventListener("click", showPriceUntil150);

function showPriceUntil150() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  sort = "asc";
  query = "price";
  extraQuery = "&price_lte=150&price_gte=51";
  getDataFromApi();
}

until300.addEventListener("click", showPriceUntil300);

function showPriceUntil300() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  sort = "asc";
  query = "price";
  extraQuery = "&price_lte=300&price_gte=151";
  getDataFromApi();
}

until500.addEventListener("click", showPriceUntil500);

function showPriceUntil500() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  sort = "asc";
  query = "price";
  extraQuery = "&price_lte=500&price_gte=301";
  getDataFromApi();
}

greaterThan500.addEventListener("click", showPricegreaterthan500);

function showPricegreaterthan500() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  sort = "asc";
  query = "price";
  extraQuery = "&price_gte=500";
  getDataFromApi();
}

main();
