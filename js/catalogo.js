
const container = document.getElementById('se-div-produtos');

export default class Catalogo{
    #listaProdutos;

    constructor(listaProdutos){
        this.#listaProdutos = listaProdutos;
    }

    mostrarProdutos(quantidadeParaExibir = 6, lista = this.#listaProdutos, limparContainer = false){
        let qtdProdutosVisiveis;
        console.log(lista);
        if (!limparContainer) {
            qtdProdutosVisiveis = document.getElementsByClassName('div-produto').length;
        } else {
            qtdProdutosVisiveis = 0;
            container.innerHTML = "";
        }
        
        for (let produto = qtdProdutosVisiveis; produto < lista.length; produto++) {
            console.log("entrei")
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

    carregarMais(listaFiltrada = null){
        let qtdProdutosVisiveis = document.getElementsByClassName('div-produto').length;
        let botaoCarregarMais = document.getElementById('id-carregar-mais');
        let qtdParaCarregar = 3;

        if (qtdProdutosVisiveis < this.#listaProdutos.length && listaFiltrada == null) {
            console.log('sou a flor silvestre')
            let totalCarregar = qtdProdutosVisiveis + qtdParaCarregar;
            this.mostrarProdutos(totalCarregar);
        }
        else if(qtdProdutosVisiveis < this.#listaProdutos.length && listaFiltrada != null){
            console.log("que perfuma os campos")
            console.log(listaFiltrada)
            console.log('qtdpdvs', qtdProdutosVisiveis)
            let totalCarregar = qtdProdutosVisiveis + qtdParaCarregar;
            this.mostrarProdutos(totalCarregar, listaFiltrada);
        }
        else{
            botaoCarregarMais.style.opacity = '0.5';
        }
    }

    addCarrinho(idProduto){
        let spanCarrinho = document.getElementById('id-bag-quatidade');
        spanCarrinho.style.display = "inline";
        numeroNoCarrinho = parseInt(spanCarrinho.innerText, 10);
        numeroNoCarrinho++;
        spanCarrinho.innerText = numeroNoCarrinho;
    }

    filtrarCores(coresSelecionadas){
        return new Promise((resolve)=>{
             let listaAuxiliar = [];

            for (let i = 0; i < coresSelecionadas.length; i++) {
                for (let j = 0; j < this.#listaProdutos.length; j++) {
                    for (let k = 0; k < this.#listaProdutos[j].cores.length; k++) {
                        if (coresSelecionadas[i] == this.#listaProdutos[j].cores[k]) {
                            if (listaAuxiliar.indexOf(this.#listaProdutos[j]) == -1) {
                                listaAuxiliar.push(this.#listaProdutos[j]);
                                break;
                            }
                        } 
                    }
                }
            }
            console.log(listaAuxiliar);
            resolve(listaAuxiliar);
        })
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

