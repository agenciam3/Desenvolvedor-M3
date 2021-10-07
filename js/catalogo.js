
const container = document.getElementById('se-div-produtos');
class Catalogo{
    #listaProdutos;

    constructor(listaProdutos){
        this.#listaProdutos = listaProdutos;
    }

    mostrarProdutos(quantidadeParaExibir = 6){
        for (const produto in lista) {
            let contador = document.getElementsByClassName('div-produto').length;
            if (contador < quantidadeParaExibir) {
                let id = lista[produto].id;
                let nome = lista[produto].nome;
                let parcelamento = lista[produto].parcelamento;
                let imagem = lista[produto].imagem;
                
                let valorParcelamento = lista[produto].preco / lista[produto].parcelamento;

                container.innerHTML += `<div class="div-produto">
                                            <img class="img-produto" src="${imagem}" alt="Demonstração ${nome}">
                                            <h3 class="tit-produto">${nome}</h3>
                                            <span class="preco-produto">R$${preco.toFixed(2)}</span>
                                            <span class="parcelamento">até ${parcelamento}x de R$${valorParcelamento.toFixed(2)}</span>
                                            <button id="id-comprar-${id}" class="bt-comprar">Comprar</button>
                                        </div>`
            }
            else{break}
        }
    }

    carregarMais(){
        let qtdProdutosVisiveis = document.getElementsByClassName('div-produto').length;
        let botaoCarregarMais = document.getElementById('id-carregar-mais');

        if (qtdProdutosVisiveis < this.#listaProdutos.length) {
            this.mostrarProdutos((qtdProdutosVisiveis + 3));
        }
        else{
            botaoCarregarMais.style.opacity = '0.5';
        }
    }

    addCarrinho(idProduto){
        console.log(idProduto);
        let spanCarrinho = document.getElementById('id-bag-quatidade');
        spanCarrinho.style.display = "inline";
        numeroNoCarrinho = parseInt(spanCarrinho.innerText, 10);
        numeroNoCarrinho++;
        spanCarrinho.innerText = numeroNoCarrinho;
    }

    filtrarCores(){
        
    }

    filtrarTamanhos(){

    }

    filtrarPrecos(){

    }

    ordenarData(){

    }

    ordenarPreco(maior){

    }
}

