function listagemProdutos(){
    var conteudo = document.getElementById('conteudo');
    for (var i = 0; i<produtos.length;i++) {
        var divProduto = document.createElement('div');
        divProduto.setAttribute('class', 'produto');

        var divImagem = document.createElement('div');
        divImagem.setAttribute('class','img-produto');

        var imgProduto = document.createElement('img');
        imgProduto.setAttribute('src', 'layout/imagens/' + produtos[i].imagem);
        imgProduto.setAttribute('alt', 'Camise Mescla');
        imgProduto.setAttribute('title', 'Camisa Mescla');

        var tituloProduto = document.createElement('div');
        tituloProduto.setAttribute('class', 'titulo-produto');
        tituloProduto.innerHTML = produtos[i].produto;

        var precoProduto = document.createElement('div');
        precoProduto.setAttribute('class', 'preco-produto');
        precoProduto.innerHTML = produtos[i].preco;

        var parcelamento = document.createElement('div');
        parcelamento.setAttribute('class', 'parcelamento');
        parcelamento.innerHTML = 'até 3x de R$ 9,33';

        var botaoComprar = document.createElement('button');
        botaoComprar.innerHTML = 'Comprar';

        divImagem.appendChild(imgProduto);

        divProduto.appendChild(divImagem);
        divProduto.appendChild(tituloProduto);
        divProduto.appendChild(precoProduto);
        divProduto.appendChild(parcelamento);
        divProduto.appendChild(botaoComprar);
        
        conteudo.appendChild(divProduto);
    }
}

listagemProdutos();