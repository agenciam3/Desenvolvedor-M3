//Função da galeria

function getProducts() {
  window
    .fetch("http://localhost:5000/products")
    .then((response) => {
      response.json().then((r) => buildProducts(r));
    })
    .catch((err) => {
      console.log(err);
    });
}

function buildProducts(products) {
  console.log(products);
  let lists = document.getElementById("lists");
  lists.className = "lists";

  products.forEach((product, index) => {
    lists.append(createCard(product, index));
  });
}

function createCard(product, index) {
  let li = document.createElement("li");
  li.className = "produto";
  li.id = "lists-" + index;

  /*   let div = document.createElement("div");
   div.className = "product"; 
  div.id = "card-" + index + 1;  */

  let img = document.createElement("img");
  img.src = product.image;
  img.className = "model-1";

  let name = document.createElement("p");
  name.innerHTML = product.name;
  name.className = "product-name";

  let price = document.createElement("p");
  price.innerHTML = "R$ ".concat(product.price);
  price.className = "price";

  let parcels = document.createElement("p");
  parcels.innerHTML =
    "até " + product.parcelamento[0] + "x de R$" + product.parcelamento[1];
  parcels.className = "parcelamento";

  let button = document.createElement("button");
  button.className = "button";
  button.innerHTML = "COMPRAR";

  /* li.append(div); */

  li.append(img);
  li.append(name);
  li.append(price);
  li.append(parcels);
  li.append(button);

  return li;
}

getProducts();
