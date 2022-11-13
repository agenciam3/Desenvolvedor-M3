const serverurl = process.env.SERVER_API;

let product = document.querySelector(".product-list-content");
let page = 1;

function createProduct(data) {
  console.log(data.name);
  productDiv = document.createElement("div");
  productImage = document.createElement("img");
  productName = document.createElement("h3");
  productPrice = document.createElement("p");
  buyButton = document.createElement("button");
  productImage.src = data.image;

  productName.innerHTML = data.name;
  productPrice.innerHTML = data.price.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  buyButton.innerHTML = "Comprar";

  productDiv.appendChild(productImage);
  productDiv.appendChild(productName);
  productDiv.appendChild(productPrice);
  productDiv.appendChild(buyButton);

  return productDiv;
}

function getDataFromApi() {
  fetch(`http://localhost:5000/products?_page=${page}&_limit=9`)
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

const showButton = document.querySelector("#showMore");
showButton.addEventListener("click", carregarMais);

function carregarMais() {
  page++;
  getDataFromApi();
}

main();
