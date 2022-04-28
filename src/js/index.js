// Para cada usuario
// criar uma linha
// adicionar na tabela

/* function fazGet(url) {
  let request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

function criarLinha(pecas) {
  linha = document.createElement("tr");
  tdId = document.createElement("td");
  tdName = document.createElement("td");
  tdPrice = document.createElement("td");
  tdId.innerHTML = pecas.id;
  tdName.innerHTML = pecas.name;
  tdPrice.innerHTML = pecas.price;

  linha.appendChild(tdId);
  linha.appendChild(tdName);
  linha.appendChild(tdPrice);

  return linha;
}

function main() {
  let data = fazGet("http://localhost:5000/products");
  let pecas = JSON.parse(data);
  let tabela = document.getElementById("tabela");

  pecas.forEach((element) => {
    let linha = criarLinha(element);
    tabela.appendChild(linha);
  });
} */

//Função da galeria

function getProducts() {
  window
    .fetch("http://localhost:5000/products")
    .then((res) => {
      res.json().then((r) => buildProducts(r));
    })
    .catch((err) => {
      console.log(err);
    });
}

function buildProducts(products) {
  console.log(products);
  let lists = document.getElementById("container");

  products.forEach((product) => {
    lists.append(
      document.createElement("img").setAttribute("src", product.image)
    );
    lists.append((document.createElement("p").innerHTML = product.name));
    lists.append((document.createElement("p").innerHTML = product.price));
    lists.append(
      (document.createElement("p").innerHTML = product.parcelamento)
    );
    lists.append(
      document.createElement("button").setAttribute("type", "button")
    );
  });
}
/* 
getProducts(); */

// Função do Dropdown

function OpenDropDown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
