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
  li.className = "lists";
  li.id = "lists-" + index;

  let div = document.createElement("div");
  div.className = "produto";
  div.id = "card-" + index + 1;

  let img = document.createElement("img");
  img.src = product.image;
  img.className = "modelo-1";

  let name = document.createElement("p");
  name.innerHTML = product.name;
  name.className = "nome-do-produto";

  let price = document.createElement("p");
  price.innerHTML = "R$ ".concat(product.price);
  price.className = "preco";

  let parcels = document.createElement("p");
  parcels.innerHTML =
    "até " + product.parcelamento[0] + "x de R$" + product.parcelamento[1];
  parcels.className = "parcelamento";

  let button = document.createElement("button");
  button.className = "button-list";
  button.innerHTML = "COMPRAR";

  li.append(div);

  div.append(img);
  div.append(name);
  div.append(price);
  div.append(parcels);
  div.append(button);

  return li;
}

getProducts();
