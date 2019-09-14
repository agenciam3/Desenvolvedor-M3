function desenharProdutos(produtos) {
    for (var i = 0; i < produtos.length; i++) {

      var article = document.createElement('article');
      var nomeProduto = document.createElement('h2');
      var precoProduto = document.createElement('p');
      var imgProduto = document.createElement('img');
      var comprarBotao = document.createElement('button');
  
      nomeProduto.textContent = produtos[i].nome;
      precoProduto.textContent = 'R$: ' + produtos[i].preco;
      imgProduto.src = produtos[i].img;
      comprarBotao.textContent = "Comprar";
  
      article.classList.add("column");
      comprarBotao.classList.add("btn","btn-comprar");
      comprarBotao.setAttribute("id", "comprar");

      article.appendChild(imgProduto);
      article.appendChild(nomeProduto);
      article.appendChild(precoProduto);
      article.appendChild(comprarBotao);

      document.getElementById("teste").appendChild(article);
    }
}

var requestURL = "./api/produtos.json";

fetch(requestURL).then(
  function(response){
    response
      .json()
      .then( filtrarProdutos )
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