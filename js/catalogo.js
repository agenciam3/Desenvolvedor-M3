
const container = document.getElementById('se-div-produtos');

console.log("1111111111111111111111");
console.log(container);
export default class Catalogo{
    #listaProdutos;

    constructor(listaProdutos){
        this.#listaProdutos = listaProdutos;
    }

    mostrarProdutos(quantidadeParaExibir = 6){
        let lista = this.#listaProdutos;
        let listaProdutosVisiveis = document.getElementsByClassName('div-produto');
        
        console.log(listaProdutosVisiveis.length)
        for (let produto = listaProdutosVisiveis.length; produto < lista.length; produto++) {
            console.log("entrou");
            if (produto < quantidadeParaExibir) {
                let id = lista[produto].id;
                let nome = lista[produto].nome;
                let preco = lista[produto].preco;
                let parcelamento = lista[produto].parcelamento;
                let imagem = lista[produto].imagem;
                
                let valorParcelamento = lista[produto].preco / lista[produto].parcelamento;

                container.innerHTML += `<div class="div-produto" data-index="${id}">
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

