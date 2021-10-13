
const container = document.getElementById('se-div-produtos');


export default class Catalogo{
    #listaProdutos;
    #numeroNoCarrinho = 0;

    constructor(listaProdutos){
        this.#listaProdutos = listaProdutos;
    }

    async mostrarProdutos(quantidadeParaExibir = 6, lista = this.#listaProdutos, limparContainer = false){
        if (lista.length != 0) {
            let qtdProdutosVisiveis;
            if (!limparContainer) {
                qtdProdutosVisiveis = document.getElementsByClassName('div-produto').length;
            } else {
                qtdProdutosVisiveis = 0;
                container.innerHTML = "";
            }
            
            console.log("lista para mostrar", lista)

            await this.#adicionarProdutoHTML(qtdProdutosVisiveis, lista, quantidadeParaExibir);
            const botoesComprar = document.getElementsByClassName('bt-comprar');

            this.#escutarCompras(botoesComprar);
        }
        else{
            container.innerHTML = "";
        }
        

    }

    #adicionarProdutoHTML(qtdProdutosVisiveis, lista, quantidadeParaExibir){
        console.log("lista para mostrar", lista)
        return new Promise((resolve)=>{
            for (let produto = qtdProdutosVisiveis; produto < lista.length; produto++) {
                if (produto < quantidadeParaExibir) {
                    let id = lista[produto].id;
                    let nome = lista[produto].nome;
                    let preco = lista[produto].preco;
                    let parcelamento = lista[produto].parcelamento;
                    let imagem = lista[produto].imagem;

                    let valorParcelamento = lista[produto].preco / lista[produto].parcelamento;

                    container.innerHTML += `<div class="div-produto" data-index="${id}">
                                                <div id="div-img" class="div-img">
                                                    <img class="img-produto" src="${imagem}" alt="Demonstração ${nome}">
                                                </div>
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

        if (window.screen.width < 750) {
            qtdParaCarregar = 4;
        }

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
            if (coresSelecionadas.length != 0) {
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
            }
            else{
                resolve(this.#listaProdutos);
            }
            
        })
    }

    filtrarTamanhos(tamanhosSelecionados, listaDeElem){
        return new Promise((resolve)=>{
            if (tamanhosSelecionados.length !=0) {
               if (listaDeElem.length == 0){
                    listaDeElem = this.#listaProdutos;
                }
                let listaAuxiliar = [];            

                console.log('parametros tamanho', tamanhosSelecionados);
                console.log('parametros lista elem', listaDeElem);

                for (let i = 0; i < tamanhosSelecionados.length; i++) {    
                    for (let j = 0; j < listaDeElem.length; j++) {
                        for (let k = 0; k < listaDeElem[i].tamanhos.length; k++) {
                        if (listaDeElem[j].tamanhos[k] == tamanhosSelecionados[i]) {
                                console.log(listaDeElem[j].tamanhos[k], '=', tamanhosSelecionados[i]);
                                listaAuxiliar.push(listaDeElem[j]);
                                break;
                            }   
                        }                                    
                    }
                }
                console.log('lista aux precos',listaAuxiliar);
                resolve(listaAuxiliar); 
            }
            else{
                resolve(listaDeElem);
            }
            
        })
    }

    filtrarPrecos(precosSelecionados, listaDeElem){
        return new Promise((resolve)=>{
            if (precosSelecionados.length != 0) {
                if (listaDeElem.length == 0){
                    listaDeElem = this.#listaProdutos;
                }
                let listaAuxiliar = [];
                for (let i = 0; i < precosSelecionados.length; i++) {
                    switch (precosSelecionados[i]) {
                        case "0>50":
                            for (let j = 0; j < listaDeElem.length; j++) {
                                if (listaDeElem[j].preco >=0 && listaDeElem[j].preco <=50) {
                                    if (listaAuxiliar.indexOf(listaDeElem[j]) == -1) {
                                        listaAuxiliar.push(listaDeElem[j]);
                                    }
                                }
                            }
                            break;
                        case "51>150":
                            for (let j = 0; j < listaDeElem.length; j++) {
                                if (listaDeElem[j].preco >=51 && listaDeElem[j].preco <=150) {
                                    if (listaAuxiliar.indexOf(listaDeElem[j]) == -1) {
                                        listaAuxiliar.push(listaDeElem[j]);
                                    }
                                }
                            }
                            break;
                        case "151>300":
                            for (let j = 0; j < listaDeElem.length; j++) {
                                if (listaDeElem[j].preco >=151 && listaDeElem[j].preco <=300) {
                                    if (listaAuxiliar.indexOf(listaDeElem[j]) == -1) {
                                        listaAuxiliar.push(listaDeElem[j]);
                                    }
                                }
                            }
                            break;
                        case "301>500":
                            for (let j = 0; j < listaDeElem.length; j++) {
                                if (listaDeElem[j].preco >=301 && listaDeElem[j].preco <=500) {
                                    if (listaAuxiliar.indexOf(listaDeElem[j]) == -1) {
                                        listaAuxiliar.push(listaDeElem[j]);
                                    }
                                }
                            }
                            break;
                        case ">=01":
                            for (let j = 0; j < listaDeElem.length; j++) {
                                if (listaDeElem[j].preco >=0) {
                                    if (listaAuxiliar.indexOf(listaDeElem[j]) == -1) {
                                        listaAuxiliar.push(listaDeElem[j]);
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
               /*  if (listaAuxiliar.length <= 0) {
                    listaAuxiliar = listaDeElem;
                } */
                
                console.log('lista aux precos',listaAuxiliar);
                resolve(listaAuxiliar); 
                
            }
            else{
                resolve(listaDeElem);
            }
            
        })
    }

    ordenarData(){

    }

    ordenarPreco(maior){

    }
}

