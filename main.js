function listagemProdutos(insumos){
    var conteudo = document.getElementById('conteudo');
    conteudo.innerHTML = '';
    for (var i = 0; i<insumos.length;i++) {
        var divProduto = document.createElement('div');
        divProduto.setAttribute('class', 'produto');

        var divImagem = document.createElement('div');
        divImagem.setAttribute('class','img-produto');

        var imgProduto = document.createElement('img');
        imgProduto.setAttribute('src', 'layout/imagens/' + insumos[i].imagem);
        imgProduto.setAttribute('alt', 'Camise Mescla');
        imgProduto.setAttribute('title', insumos[i].produto);

        var tituloProduto = document.createElement('div');
        tituloProduto.setAttribute('class', 'titulo-produto');
        tituloProduto.innerHTML = insumos[i].produto;

        var precoProduto = document.createElement('div');
        precoProduto.setAttribute('class', 'preco-produto');
        precoProduto.innerHTML = 'R$ ' + insumos[i].preco;

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

listagemProdutos(produtos);

function filtroCores() {
    var filtros = document.getElementById('filtroCores');
    for (var i = 0; i<coresProdutos.length;i++) {

        var checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.setAttribute('name', coresProdutos[i]);
        checkBox.setAttribute('value', coresProdutos[i]);
        checkBox.setAttribute('id', coresProdutos[i]);
        checkBox.setAttribute('onChange', 'filtragemCores("'+coresProdutos[i]+'")');

        var cores = document.createElement('label');
        cores.setAttribute('for', coresProdutos[i]);
        cores.innerText = coresProdutos[i];

        var quebraLinha = document.createElement('br')

        filtros.appendChild(checkBox);
        filtros.appendChild(cores);
        filtros.appendChild(quebraLinha);
    }
}

filtroCores();

function filtragemCores(cor) {
    
    if($("#"+cor)[0].checked) {
        var produtosFiltrados = produtos.filter(produto => produto.cor == cor);
        listagemProdutos(produtosFiltrados);
    }
    else{
        listagemProdutos(produtos);
    }
    
}
