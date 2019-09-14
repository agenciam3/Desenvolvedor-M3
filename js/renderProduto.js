var requestURL = "./api/produtos.json";

// Leitura do JSON

fetch(requestURL).then(
  function(response){
    response
      .json()
      .then( desenharProdutos )
      .catch(
        function(err){
          console.error(err);
        }
    )
  }
).catch(
  function(err){
    console.error(err);
  }
)

function desenharProdutos(obj) {

    var produtos = obj;

    var qtdParcelas = "";
    var valorParcela = "";


    for (var i = 0; i < produtos.length; i++) {

      var sectionProduto = document.createElement('section');
        var imgProdutoElemento = document.createElement('img');
        var nomeProdutoElemento = document.createElement('h2');
        var precoProdutoElemento = document.createElement('p');
        var qtdParcelasElemento = document.createElement('span');
        var comprarBotaoElemento = document.createElement('button');
  
      imgProdutoElemento.src = produtos[i].img;
      nomeProdutoElemento.textContent = produtos[i].nome;
      precoProdutoElemento.textContent = 'R$: ' + produtos[i].preco;

      if(produtos[i].preco<350) qtdParcelas = 3;
      else  qtdParcelas = 5;
      valorParcela = produtos[i].preco/qtdParcelas;
      var parcelaArredondada = parseFloat(valorParcela.toFixed(2));
      qtdParcelasElemento.textContent = 'até ' + qtdParcelas + 'x de R$' + parcelaArredondada;comprarBotaoElemento.textContent = "Comprar";

      sectionProduto.setAttribute("id","produto"+produtos[i].id)
      sectionProduto.classList.add("column");
      comprarBotaoElemento.classList.add("btn","btn-comprar");
      comprarBotaoElemento.setAttribute("id", "comprar");

      sectionProduto.appendChild(imgProdutoElemento);
      sectionProduto.appendChild(nomeProdutoElemento);
      sectionProduto.appendChild(precoProdutoElemento);
      sectionProduto.appendChild(qtdParcelasElemento);
      sectionProduto.appendChild(comprarBotaoElemento);

      document.getElementById("produtos").appendChild(sectionProduto);
    }
}


