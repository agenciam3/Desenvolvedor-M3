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
}

main();

console.log(main);
 */
