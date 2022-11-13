const serverurl = process.env.SERVER_API;

let product = document.querySelector(".product-list-content");

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

function main() {
  fetch("http://localhost:5000/products")
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

main();
