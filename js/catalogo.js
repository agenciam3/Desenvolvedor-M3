
const container = document.getElementById('se-div-produtos');
class Catalogo{
    #listaProdutos;

    constructor(listaProdutos){
        this.#listaProdutos = listaProdutos;
    }

    mostrarProdutos(lista = this.#listaProdutos){
        for (const produto in lista) {
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
         
    }

    addCarrinho(idProduto){
        console.log(idProduto);
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

