
const container = document.getElementById('se-div-produtos');


export default class Catalogo{
    #listaProdutos;
    #numeroNoCarrinho = 0;

    constructor(listaProdutos){
        this.#listaProdutos = listaProdutos;
    }

    async mostrarProdutos(quantidadeParaExibir = 6, lista = this.#listaProdutos, limparContainer = false){
        let qtdProdutosVisiveis;
        if (!limparContainer) {
            qtdProdutosVisiveis = document.getElementsByClassName('div-produto').length;
        } else {
            console.log('entrei');
            qtdProdutosVisiveis = 0;
            container.innerHTML = "";
        }
        
        await this.#adicionarProdutoHTML(qtdProdutosVisiveis, lista, quantidadeParaExibir);
        const botoesComprar = document.getElementsByClassName('bt-comprar');

        this.#escutarCompras(botoesComprar);

    }

    #adicionarProdutoHTML(qtdProdutosVisiveis, lista, quantidadeParaExibir){
        return new Promise((resolve)=>{
            for (let produto = qtdProdutosVisiveis; produto < lista.length; produto++) {
                if (produto < quantidadeParaExibir) {
                    let id = lista[produto].id;
                    let nome = lista[produto].nome;
                    let preco = lista[produto].preco;
                    let parcelamento = lista[produto].parcelamento;
                    let imagem = lista[produto].imagem;
                    
                    console.log('id',id)
                    console.log('nome',nome)
                    console.log('preco',preco)
                    console.log('parc',parcelamento)
                    console.log('img',imagem)

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
            resolve();   
        });
        
    }

    #escutarCompras(btsComprar) {
    for (let botao = 0; botao < btsComprar.length; botao++) {
        btsComprar[botao].addEventListener('click', ()=>{
            this.#numeroNoCarrinho = this.#addCarrinho(this.#numeroNoCarrinho);
        })
    }
}

    carregarMais(listaFiltrada = null){
        let qtdProdutosVisiveis = document.getElementsByClassName('div-produto').length;
        let botaoCarregarMais = document.getElementById('id-carregar-mais');
        let qtdParaCarregar = 3;

        if (qtdProdutosVisiveis < this.#listaProdutos.length && listaFiltrada == null) {
            let totalCarregar = qtdProdutosVisiveis + qtdParaCarregar;
            this.mostrarProdutos(totalCarregar);
        }
        else if(qtdProdutosVisiveis < this.#listaProdutos.length && listaFiltrada != null){
            let totalCarregar = qtdProdutosVisiveis + qtdParaCarregar;
            this.mostrarProdutos(totalCarregar, listaFiltrada);
        }
        else{
            botaoCarregarMais.style.opacity = '0.5';
        }
    }

    #addCarrinho(numeroNoCarrinho){
        let spanCarrinho = document.getElementById('id-bag-quatidade');
        numeroNoCarrinho++;
        spanCarrinho.innerText = numeroNoCarrinho;
        spanCarrinho.style.display = "inline";
        return numeroNoCarrinho;
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
            resolve(listaAuxiliar);
        })
    }



    filtrarTamanhos(tamanhosSelecionados){
        return new Promise((resolve)=>{
             let listaAuxiliar = [];

            for (let i = 0; i < tamanhosSelecionados.length; i++) {
                for (let j = 0; j < this.#listaProdutos.length; j++) {
                    for (let k = 0; k < this.#listaProdutos[j].tamanhos.length; k++) {
                        if (tamanhosSelecionados[i] == this.#listaProdutos[j].tamanhos[k]) {
                            if (listaAuxiliar.indexOf(this.#listaProdutos[j]) == -1) {
                                listaAuxiliar.push(this.#listaProdutos[j]);
                                break;
                            }
                        } 
                    }
                }
            }
            resolve(listaAuxiliar);
        })
    }

    filtrarPrecos(precosSelecionados){
        return new Promise((resolve)=>{
            let listaAuxiliar = [];
            for (let i = 0; i < precosSelecionados.length; i++) {
                switch (precosSelecionados[i]) {
                    case "0>50":
                        for (let j = 0; j < this.#listaProdutos.length; j++) {
                            if (this.#listaProdutos[j].preco >=0 && this.#listaProdutos[j].preco <=50) {
                                if (listaAuxiliar.indexOf(this.#listaProdutos[j]) == -1) {
                                    listaAuxiliar.push(this.#listaProdutos[j]);
                                }
                            }
                        }
                        break;
                    case "51>150":
                        for (let j = 0; j < this.#listaProdutos.length; j++) {
                            if (this.#listaProdutos[j].preco >=51 && this.#listaProdutos[j].preco <=150) {
                                if (listaAuxiliar.indexOf(this.#listaProdutos[j]) == -1) {
                                    listaAuxiliar.push(this.#listaProdutos[j]);
                                }
                            }
                        }
                        break;
                    case "151>300":
                        for (let j = 0; j < this.#listaProdutos.length; j++) {
                            if (this.#listaProdutos[j].preco >=151 && this.#listaProdutos[j].preco <=300) {
                                if (listaAuxiliar.indexOf(this.#listaProdutos[j]) == -1) {
                                    listaAuxiliar.push(this.#listaProdutos[j]);
                                }
                            }
                        }
                        break;
                    case "301>500":
                        for (let j = 0; j < this.#listaProdutos.length; j++) {
                            if (this.#listaProdutos[j].preco >=301 && this.#listaProdutos[j].preco <=500) {
                                if (listaAuxiliar.indexOf(this.#listaProdutos[j]) == -1) {
                                    listaAuxiliar.push(this.#listaProdutos[j]);
                                }
                            }
                        }
                        break;
                    case ">=01":
                        for (let j = 0; j < this.#listaProdutos.length; j++) {
                            if (this.#listaProdutos[j].preco >=0) {
                                if (listaAuxiliar.indexOf(this.#listaProdutos[j]) == -1) {
                                    listaAuxiliar.push(this.#listaProdutos[j]);
                                }
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
            console.log(listaAuxiliar);
            resolve(listaAuxiliar);
        })
    }

    ordenarData(){

    }

    ordenarPreco(maior){

    }
}

