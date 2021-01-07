/* Aqui é carregado o arquivo json e chamado as funcoes */

fetch("./produtos.json")
    .then(function (resp) {
        return resp.json()
    })
    .then(function (obj) {


        // Descubrindo numero de produtos no arquivo e adicionado categorias
        var qntProdutos = 0;
        try {
            while (qntProdutos < 100000) {
                addCategoriaCor(obj.produtos[qntProdutos].cor);
                addCategoriasTamanho(obj.produtos[qntProdutos].tamanho);
                addCategoriasFaixaDePreco(obj.produtos[qntProdutos].valor);
                qntProdutos++;
            }


        }
        catch {
            console.log("numero de produtos encontrados: " + qntProdutos);
        }
        addCategoriasFaixaDePreco(0, true);
        FiltrarElementos(qntProdutos, obj);
        console.log(alturaMax);
        expandirCores();
        addItensCarrinho();
        toogleCarrinho();
    });
