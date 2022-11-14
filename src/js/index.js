const serverurl = process.env.SERVER_API;

//console.log("Dev m3", serverurl);

let sacolaBtn = document.getElementById("sacola");
let filtrarBtn = document.getElementById("btn-filtrar");
let ordenardBtn = document.getElementById("btn-ordenar");
let closeBtn = document.querySelector(".closebtn");

let sidebarAberto = "";
let botoesComprar = [];
let botoesRemoverItem = [];
let listaProdutosAPI = [];
let itensNoCarrinho = document.querySelectorAll(".carrinho-item");
let limitadorDeItems = 9;
let paginaAtual = 1;

const btnCarregarMais = document.getElementById("carregar-mais");
const divItems = document.querySelector(".cards-wrap");
const divCarrinhoItems = document.querySelector(".conteudo-carrinho");
const carrinhoVazio = document.getElementById("carrinho-vazio");
const botoesCarrinho = document.querySelector(".botoes-carrinho");
const btnVerMaisMenos = document.querySelector(".ver-mais-opcoes");
const containerFiltroCores = document.querySelector("#filtrar-sidebar .cores");
const selectOrdenacao = document.querySelector("select.ordenacao");
const contadorCarrinho = document.getElementById("contador");

window.onload = () => {
  getproducts();
};

//Abre o sidebar de carrinho
sacolaBtn.addEventListener("click", function () {
  openSideNav("carrinho");
});

//Abre o sidebar do filtrar
filtrarBtn.addEventListener("click", function () {
  openSideNav("filtrar");
});

//Abre o sidebar do ordenar
ordenardBtn.addEventListener("click", function () {
  openSideNav("ordenar");
});

//Fecha qualquer sidebar no click do document
document.addEventListener("click", function (e) {
  let click = e.target.id;
  if (
    e.target.className !== "sidenav" &&
    click !== "sacola" &&
    click !== "btn-filtrar" &&
    click !== "btn-ordenar"
  ) {
    closeSideNav();
  }
});

//Abre o sidebar de acordo com o parametro passado para a função
function openSideNav(tipoSideBar) {
  if (tipoSideBar === "carrinho") {
    document.getElementById("carrinho-sidebar").classList.add("open");
    sidebarAberto = document.getElementById("carrinho-sidebar");
    sidebarAberto.addEventListener("click", function (e) {
      escutaSideBar(e);
    });
  } else if (tipoSideBar === "filtrar") {
    document.getElementById("filtrar-sidebar").classList.add("open");
    sidebarAberto = document.getElementById("filtrar-sidebar");
    sidebarAberto.addEventListener("click", function (e) {
      escutaSideBar(e);
    });
  } else {
    document.getElementById("ordenar-sidebar").classList.add("open");
    sidebarAberto = document.getElementById("ordenar-sidebar");
    sidebarAberto.addEventListener("click", function (e) {
      escutaSideBar(e);
    });
  }

  document.body.style.backgroundColor = "rgba(0,0,0,0.2)";
}

//Função para fechar o sidebar
function closeSideNav() {
  let sidebarList = document.querySelectorAll(".sidenav");
  sidebarList.forEach((item) => item.classList.remove("open"));
  document.body.style.backgroundColor = "white";
}

//Função para tratar os filtros/carrinho
function escutaSideBar(e) {
  e.stopPropagation();

  if (e.target.classList[0] !== "remover-item") {
    if (e.target.parentElement.className.includes("filtro-aberto")) {
      e.target.parentElement.classList.remove("filtro-aberto");
    } else {
      e.target.parentElement.classList.add("filtro-aberto");
    }
  }

  //Fecha o modal se clicar no X
  if (e.target.classList[0] === "closebtn") {
    closeSideNav();
  }

  sidebarAberto.removeEventListener("click", escutaSideBar);
}

//Monta lista de produtos inicial
function getproducts() {
  const url = `http://localhost:5000/products`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      listaProdutosAPI = data;

      listItems(listaProdutosAPI, 1, 9);
    });
}

//Escuta o botão de carregar mais
btnCarregarMais.addEventListener("click", function () {
  let page = paginaAtual + 1;
  listItems(listaProdutosAPI, page, limitadorDeItems);
});

document.addEventListener("change", function (e) {
  console.log(e);
});

//Btn ver mais filtrar
let verMaisAtivo = false;

btnVerMaisMenos.addEventListener("click", function () {
  verMaisAtivo = !verMaisAtivo;
  if (verMaisAtivo) {
    containerFiltroCores.style.height = "100%";
    btnVerMaisMenos.innerHTML = `Ver menos<img
                  src="./img/arrow-down.png"
                  alt="ícone de uma seta, apontando para baixo"
              />`;
    document.querySelector(".ver-mais-opcoes img").style.transform =
      "rotate(180deg)";
  } else {
    containerFiltroCores.removeAttribute("style");
    btnVerMaisMenos.innerHTML = `Ver todas as cores<img
    src="./img/arrow-down.png"
    alt="ícone de uma seta, apontando para baixo"
/>`;
    document.querySelector(".ver-mais-opcoes img").removeAttribute("style");
  }
});

//Altera a ordem de exibição
//Desktop
selectOrdenacao.addEventListener("change", function (e) {
  let ordem = e.target.value;
  ordenarResultados(ordem);
});

//Mobile
document
  .querySelector("#ordenar-lista")
  .addEventListener("click", function (e) {
    ordenarResultados(e.target.innerText);
    closeSideNav();
  });

function ordenarResultados(ordemEvent) {
  let temp = listaProdutosAPI;
  if (ordemEvent === "menor-preco" || ordemEvent === "Menor preço") {
    temp.sort(function (a, b) {
      if (a.price < b.price) {
        return -1;
      } else {
        return true;
      }
    });
  } else if (ordemEvent === "maior-preco" || ordemEvent === "Maior preço") {
    temp.sort(function (a, b) {
      if (a.price > b.price) {
        return -1;
      } else {
        return true;
      }
    });
  } else {
    temp.sort(function (a, b) {
      let dataA = new Date(a.date);
      let dataB = new Date(b.date);

      return dataB.getTime() - dataA.getTime();
    });
  }

  //limpa lista antiga de itens, para mostrar os itens novos
  divItems.innerHTML = "";

  // reset das variavies
  paginaAtual = 1;
  btnCarregarMais.removeAttribute("style");
  listItems(temp, paginaAtual, limitadorDeItems);
}

//Paginação
function listItems(items, pageActual, limitItems) {
  let result = [];
  let totalPage = Math.ceil(items.length / limitItems);
  let count = pageActual * limitItems - limitItems;
  let delimiter = count + limitItems;

  if (pageActual <= totalPage) {
    for (let i = count; i < delimiter; i++) {
      result.push(items[i]);
      count++;
    }
  }

  result.map((item) => {
    if (item) {
      // valida se o nome do produto é maior que 18, se for adicionar '...' no final do nome
      const nomeProduto =
        item.name.length > 18 ? item.name.slice(0, 18) + "..." : item.name;

      let cardItem = `<div class="card-item">
                        <img
                        src=".${item.image}"
                        alt="${item.name} na cor ${item.color}"
                        />
                        <label class="nome-produto">${nomeProduto}</label>
                        <label class="preco-produto">R$ ${item.price}</label>
                        <label class="parcela-produto">até ${item.parcelamento[0]}x de R$${item.parcelamento[1]}</label>
                        <button value="${item.id}" class="adicionar-carrinho">Comprar</button>
                      </div>`;

      divItems.innerHTML += cardItem;

      botoesComprar = document.querySelectorAll(".adicionar-carrinho");
      escutarComprar();
    }

    // Se existir algum item undefined (Fim da paginação) ele remove o botão de mostrar mais
    if (pageActual === totalPage) {
      btnCarregarMais.style.display = "none";
    }
  });
}

// adicionar o produto no carrinho
function escutarComprar() {
  botoesComprar.forEach((item, index) => {
    item.addEventListener("click", function (e) {
      const idClicado = e.target.value;
      let produtoClicado = listaProdutosAPI.filter(
        (produto) => produto.id === idClicado
      );

      const nomeProduto =
        produtoClicado[0].name.length > 18
          ? produtoClicado[0].name.slice(0, 18) + "..."
          : produtoClicado[0].name;

      let cardItem = `<div data-value="${produtoClicado[0].id}" class="carrinho-item">
                    <img class="imagem-carrinho" src=".${produtoClicado[0].image}"
                    alt="${produtoClicado[0].name} na cor ${produtoClicado[0].color}" />
                    <div class="detalhes-produto">
                      <label class="nome-produtoClicado">${nomeProduto}</label>
                      <label class="valor-produto"><span>R$ </span>${produtoClicado[0].price}</label>
                    </div>
                    <img data-value="${produtoClicado[0].id}" class="remover-item" src="./img/ícone-lixeira.png" />
                  </div>`;

      divCarrinhoItems.innerHTML += cardItem;

      divCarrinhoItems.style.display = "block";
      botoesCarrinho.style.display = "flex";
      carrinhoVazio.style.display = "none";

      contadorCarrinho.innerText =
        document.querySelectorAll(".carrinho-item").length;

      contadorCarrinho.removeAttribute("style");

      botoesRemoverItem = document.querySelectorAll(".remover-item");
      escutarRemoverItem();
    });
  });
}

// Remove o produto no carrinho
function escutarRemoverItem() {
  botoesRemoverItem.forEach((item) => {
    item.addEventListener("click", function () {
      this.parentElement.remove();

      contadorCarrinho.innerText =
        document.querySelectorAll(".carrinho-item").length;
      exibeMensagemVazio();

      //document.querySelector(`.carrinho-item[data-id="${idClicado}"]`).remove();
    });
  });
}

divCarrinhoItems.style.display = "none";
botoesCarrinho.style.display = "none";
contadorCarrinho.style.display = "none";
//
function exibeMensagemVazio() {
  if (document.querySelectorAll(".carrinho-item").length === 0) {
    divCarrinhoItems.style.display = "none";
    botoesCarrinho.style.display = "none";
    carrinhoVazio.style.display = "block";
    contadorCarrinho.style.display = "none";
  }
}
document.querySelector(".limpar").addEventListener("click", function () {
  document.querySelectorAll(".carrinho-item").forEach((item) => {
    item.remove();
  });
  exibeMensagemVazio();
});
document.querySelector(".comprar").addEventListener("click", function () {
  document.querySelectorAll(".carrinho-item").forEach((item) => {
    item.remove();
  });
  setTimeout(() => {
    alert("Compra finalizada com sucesso!!");
  }, 250);
  closeSideNav();
  exibeMensagemVazio();
});
