//array para salvar as cores
var cores = ["AMARELO", "AZUL", "BRANCO", "CINZA", "LARANJA", "PRETO", "ROSA"];

//array para salvar os tamanhos
var tamanhos = ["P", "M", "G", "GG", "U", "36", "38", "40", "42", "44", "46"];

//array para salvar os preços
var precos = [0, 50, 51, 150, 151, 300, 301, 500];
//variavel auxiliar para receber o JSON da API
var listaProdutos;
//variavel auxiliar para renderizar ou não todas as opções de cores
var todasAsCores = false;
//variavel auxiliar para o botão de carregar mais produtos, deveria ser pegada direto do JSON mas para testes está sendo setada direto na mão.
var tamLista = 9;
//variavel auxiliar para definiar quantos produtos vão aparecer por vez na tela, se o número for menor do que a quantidade de produtos aparecerá o botão de carregar mais.
var qtdProdutos = 6;

//funcão para carregar as opções de cores na sidebar
function carregarCores() {
  var html = "";
  for (i = 0; i < (todasAsCores ? cores.length : 5); i++) {
    html += `<label class=filtro><input type=checkbox id="${cores[i]}" onClick=filtrarProdutosCor()><span></span>${cores[i]}</label><br>`;
  }
  if (todasAsCores) {
    html +=
      "<a class=botaoCores onClick=mostrarTodasCores(false)>Esconder cores</a>";
  } else {
    html +=
      "<a class=botaoCores onClick=mostrarTodasCores(true)>Ver todas as cores</a>";
  }
  document.getElementById("cores").innerHTML = html;
}

//função para carregar as opções de tamanhos na sidebar
function carregarTamanhos() {
  var html = "";
  for (i = 0; i < tamanhos.length; i++) {
    html += `<label class="filtroTamanho"><input type=checkbox id="${tamanhos[i]}" onClick=filtrarProdutosTamanho()><span>${tamanhos[i]}</span></label>`;
    if ((i + 1) % 4 === 0) {
      html += "<br>";
    }
  }
  document.getElementById("tamanhos").innerHTML = html;
}

//função para carregar as opções de preços na sidebar
function carregarPrecos() {
  var html = "";
  for (i = 0; i < precos.length; i += 2) {
    html += ` <label class="filtro"><input type=checkbox onClick=filtrarProdutosPreco() id="${
      precos[i]
    }"><span></span>de R$${precos[i]} até R$${precos[i + 1]}</label> <br>`;
  }
  document.getElementById("precos").innerHTML = html;
}

//função para aparecer mais produtos ao clicar no botão carregar mais
function carregarMais() {
  qtdProdutos += qtdProdutos;
  carregarProdutos();
  carregarBotao();
}

//função para atualizar o dropdown da sacola
function atualizarSacola() {
  var html = "";
  var listaSacola = JSON.parse(window.sessionStorage.produtos);
  listaSacola.map((produto) => {
    html += `<div class=produtoSacola>
    <a>Descrição: ${produto.nome}</a><br>
    <a>Preço: R$${produto.valor},00</a><br>
    <a>Tamanho: ${produto.tamanho}</a><br>
    </div>`;
  });
  document.getElementById("tamanhoSacola").innerHTML =
    listaSacola.length >= 10 ? "9+" : listaSacola.length.toString();
  document.getElementById("sacola").innerHTML = html;
}

//função para renderizar ou não o botão de carregar dependendo da quantidade de produtos na lista e na tela
function carregarBotao() {
  var html = "";
  if (qtdProdutos < tamLista) {
    html += `<a class="botaoCarregar" onClick="carregarMais()">Carregar Mais</a>`;
  } else {
    html = "";
  }
  document.getElementById("divCarregar").innerHTML = html;
}

//função para adicionar um produto na sacola de compras
function comprarProduto(indice) {
  window.sessionStorage.produtos = JSON.stringify([
    ...JSON.parse(window.sessionStorage.produtos),
    listaProdutos.produtos[indice],
  ]);
  atualizarSacola();
}

//função para inicializar alguns componentes para utilização
function init() {
  window.sessionStorage.produtos = JSON.stringify([]);
  receberProdutos();
  carregarBotao();
}

//função para mostrar mais ou menos cores na sidebar
function mostrarTodasCores(opt) {
  todasAsCores = opt;
  carregarCores();
}

//função para carregar o JSON da API
async function receberProdutos() {
  const res = await fetch(`http://localhost:3000/produtos`);
  listaProdutos = await res.json();
}

//função para montar o layout html de um dado produto
function htmlProduto(produto, index) {
  return `<div style="padding:10px">
  <img src=./imagens/${produto.imagem}/><br>
  <a>${produto.nome}</a><br>
  <a>R$ ${produto.valor},00</a><br>
  <a>até 3x de R$${(produto.valor / 3).toFixed(2)}</a>
  <br><a class=botaoCompra onClick=comprarProduto(${index})>COMPRAR</a>
</div>`;
}

//função para renderizar os protudos do JSON na tela
async function carregarProdutos() {
  var html = "";
  if (listaProdutos === undefined) {
    res = await fetch(`http://localhost:3000/produtos`);
    listaProdutos = await res.json();
  }
  if (qtdProdutos > tamLista) qtdProdutos = tamLista;
  listaProdutos.produtos.slice(0, qtdProdutos).forEach((produto, index) => {
    html += htmlProduto(produto, index);
  });
  document.getElementById("produtos").innerHTML = html;
}

//função para filtrar os produtos por preço
function filtrarProdutosPreco() {
  var html = "";
  var precosSelecionados = [];
  for (i = 0; i < precos.length; i += 2) {
    if (document.getElementById(precos[i].toString()).checked) {
      precosSelecionados = [...precosSelecionados, precos[i], precos[i + 1]];
    }
  }
  if (precosSelecionados.length === 0) {
    carregarProdutos();
    return;
  }
  listaProdutos.produtos.map((produto, index) => {
    if (
      produto.valor > Math.min(...precosSelecionados) &&
      produto.valor < Math.max(...precosSelecionados)
    ) {
      html += htmlProduto(produto, index);
    }
  });
  document.getElementById("produtos").innerHTML = html;
}

//função para filtrar os produtos por tamanho
function filtrarProdutosTamanho() {
  var html = "";
  var tamanhosSelecionados = [];
  for (i = 0; i < tamanhos.length; i++) {
    if (document.getElementById(tamanhos[i]).checked) {
      tamanhosSelecionados = [...tamanhosSelecionados, tamanhos[i]];
    }
  }
  if (tamanhosSelecionados.length === 0) {
    carregarProdutos();
    return;
  }
  listaProdutos.produtos.map((produto, index) => {
    if (tamanhosSelecionados.includes(produto.tamanho)) {
      html += htmlProduto(produto, index);
    }
  });
  document.getElementById("produtos").innerHTML = html;
}

//função para filtrar os produtos por cor
function filtrarProdutosCor() {
  var html = "";
  var coresSelecionadas = [];
  for (i = 0; i < (todasAsCores ? cores.length : 5); i++) {
    if (document.getElementById(cores[i]).checked) {
      coresSelecionadas = [...coresSelecionadas, cores[i]];
    }
  }
  if (coresSelecionadas.length === 0) {
    carregarProdutos();
    return;
  }
  listaProdutos.produtos.map((produto, index) => {
    if (coresSelecionadas.includes(produto.cor)) {
      html += htmlProduto(produto, index);
    }
  });
  document.getElementById("produtos").innerHTML = html;
}

//função para ordenar os produtos de acordo com o menu de ordenação
function ordenarProdutos(sort) {
  var html = "";
  if (sort === "1") {
    listaProdutos.produtos.sort((a, b) => {
      return a.adicionado - b.adicionado;
    });
  }
  if (sort === "2") {
    listaProdutos.produtos.sort((a, b) => {
      return a.valor - b.valor;
    });
  }
  if (sort === "3") {
    listaProdutos.produtos.sort((a, b) => {
      return b.valor - a.valor;
    });
  }
  listaProdutos.produtos.map((produto, index) => {
    html += htmlProduto(produto, index);
  });
  document.getElementById("produtos").innerHTML = html;
}
