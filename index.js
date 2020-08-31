// Adicionar evento de carregamento da página
document.addEventListener("DOMContentLoaded", populate(), false); // populate é a função q vai ser chamada qnd a página carregar

// Pegando o modal
var modal = document.getElementById('modalOpen');
var cartCount = document.getElementById('cart-count');

// Pegando o pseudo-elemento para abrir o modal
var btnFilter = document.getElementById("btn-filter");
var btnOrder= document.getElementById("btn-order");

// Pegando o elemento <span> para fechar o modal
var spanClose = document.getElementsByClassName("close")[0];

// Pegando título do filtro
var modalTitle = document.getElementById("modal-title");

// Pegando o html do filtro
var filterElement = document.getElementById('filter').innerHTML;

// Pegando o elemento e o html do conteúdo do modal
var modalContent = document.getElementById('modal-body');
var modalContentHtml = document.getElementById('modal-body').innerHTML;

// Pegando a <div> q exibe os produtos
var produtos = document.getElementById('produtos');

// Pegar pelo seletor select
var selectOrder = document.querySelector('select');

// Botoes da modal
var botaoAplicar = document.getElementById('botao-aplicar');
var botaoLimpar = document.getElementById('botao-limpar');

// Botao carregar mais
var botaoCarregar = document.getElementById('btnCarregarMais');

// Variaveis
var isProductsChunked = true
var chunkedProducts = [];

var cart = [];
var currentProducts = [];

var colorFilter = null;
var sizeFilter = null;
var priceFilter = null;

////////////
//  FUNÇÕES 
//  MODAL

// Clicando em um btn (filter ou order), abre a modal
btnFilter.onclick = function() {
    modalTitle.innerHTML = "<h4 id='modal-title'>filtrar</h4>";
    modalContent.innerHTML = filterElement;
    botaoAplicar.style.display = 'block';
    botaoLimpar.style.display = 'block';
    modal.style.display = "block";

    // fechar modal no clique do aplicar pois o filtro filtra automaticamente
    botaoAplicar.onclick = function() {
        modal.style.display = "none";
    }
    
    // resetar html do filtro para desmarcar opções de filtro
    botaoLimpar.onclick = function() {
        modalContent.innerHTML = filterElement;
        populate()
    }
}

btnOrder.onclick = function() {
    modal.style.display = "block";
}

// Clicando no span close, colocar o conteudo padrao da modal e a fechar
spanClose.onclick = function() {
    modalTitle.innerHTML = "<h4 id='modal-title'>ordenar</h4>";
    modalContent.innerHTML = modalContentHtml;
    botaoAplicar.style.display = 'none';
    botaoLimpar.style.display = 'none';
    modal.style.display = "none";
}

// Clicando no botao de carregar mais, popular a ultima metade dos produtos na tela
botaoCarregar.onclick = function() {
    let produtos

    if (chunkedProducts['isChunked'])
        produtos = chunkedProducts[0].concat(chunkedProducts[1])
    else
        produtos = chunkedProducts

    isProductsChunked = false
    populate(produtos)

    botaoCarregar.style.display = 'none'
}

////////////
//  FUNÇÕES 
//  GERAIS

// Pegar JSON principal
function getJSON (callback) {
    try {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let json = JSON.parse(this.responseText);
                callback(json);
            }
        };
        xmlhttp.open("GET", "main.json", true);
        xmlhttp.send();
    } catch (error) {
        console.error(error)
        throw error;
    }
};

// Popular o site com produtos
// função para popular os produtos recebendo (ou não) dados prévios
async function populate (data = null) {
    if (!data) {
        await getJSON((json) => {
            data = json.produtos
            if (isProductsChunked) {
                currentProducts = data
                chunkedProducts = chunkArray(data, Math.round(data.length/2))
                chunkedProducts['isChunked'] = true
                data = chunkedProducts[0]
            } else {
                chunkedProducts = data
                currentProducts = data
            }
            append_json(data)
        });
    } else {
        produtos.innerHTML = ''
        if (isProductsChunked && data.length > 1) {
            currentProducts = data
            chunkedProducts = chunkArray(data, Math.round(data.length/2))
            chunkedProducts['isChunked'] = true
            data = chunkedProducts[0]
        } else {
            chunkedProducts = data
            currentProducts = data
        }
        append_json(data)
        
        if (!currentProducts.length) {
            produtos.innerHTML = '<h2>Sem produtos disponíveis para os critérios do filtro!</h2>'
            botaoCarregar.style.display = 'none'
        } else if (currentProducts.length > 1 && isProductsChunked) {
            botaoCarregar.style.display = 'block'
        } else if (currentProducts.length === 1) {
            botaoCarregar.style.display = 'none'
        }
    }
}

function append_json(data){
    data.forEach((object) => {
        let product = document.createElement('product');
        product.innerHTML =
            "<div class='produto'>" +
            "<img src='" + object.img + "' alt='" + object.produto + "'>" +
            "<h4>" + object.produto + "</h4>" +
            "<p class='preco-a-vista'>R$" + object.preco_vista.toFixed(2).toString().replace('.', ',') + "</p>" +
            "<p class='preco-parcelado'>até " + object.num_parcelas + "x de R$"+ object.preco_parcelado.toFixed(2).toString().replace('.', ',') + "</p>" +
            "<button onclick='addToCart("+ object.id + ")'>COMPRAR</button></div>";
        produtos.appendChild(product);
    });
}

function chunkArray(array, size) {
    const firstChunk = array.slice(0, size); // criar a primeira parte do array fornecido
    if (!firstChunk.length) {
        return array;
    }
    return [firstChunk].concat(chunkArray(array.slice(size, array.length), size)); 
}

// Adicionar ao carrinho
async function addToCart (id) {
    await getJSON((json) => {
        json.produtos.map(produto => {
            if (produto.id === id) {
               cart.push(produto);
               cartCount.innerHTML = cart.length;
               console.log('Seu carrinho:', cart);
               alert('O produto ' + produto.produto + ' foi adicionado ao carrinho!');
            }
        });
    });
}

// Expandir lista de cores
let verTodas = document.querySelector('#ver-todas');
verTodas.addEventListener('click', () => {
    let listaCores = document.querySelector('.lista-cores');
    let verTodasCores = document.querySelector('.ver-todas-cores');

    verTodasCores.classList.add('lista-expandida')
    listaCores.classList.remove('lista-cores')
})

////////////
//  FUNÇÃO 
//  FILTRO

async function filter (filter, typeFilter) {
    await getJSON((json) => {
        switch (typeFilter) {
            case 'isColorFilter':
                colorFilter = filter
                break;
            case 'isSizeFilter':
                sizeFilter = filter
                break;
            case 'isPriceFilter':
                priceFilter = filter
                break;
        }

        filteredProducts = json.produtos.filter((produto) => {
            if (priceFilter) {
                switch (priceFilter) {
                    case 'A':
                        if (produto.preco_vista > 0 && produto.preco_vista <= 50) {
                            return validaFiltros(produto)
                        }
                        break;
                    case 'B':
                        if (produto.preco_vista >= 51 && produto.preco_vista <= 150) {
                            return validaFiltros(produto)
                        }
                        break;
                    case 'C':
                        if (produto.preco_vista >= 151 && produto.preco_vista <= 300) {
                            return validaFiltros(produto)
                        }
                        break;
                    case 'D':
                        if (produto.preco_vista >= 301 && produto.preco_vista <= 500) {
                            return validaFiltros(produto)
                        }
                        break;
                    default:
                        return validaFiltros(produto)
                }
            } else {
                return validaFiltros(produto)
            }
        })

        populate(filteredProducts)
    });
}

function validaFiltros (produto) {
    if (colorFilter && !sizeFilter) {
        if (produto.cor.includes(colorFilter)) return produto
    } else if (!colorFilter && sizeFilter) {
        if (produto.tamanho.includes(sizeFilter)) return produto
    } else if (colorFilter && sizeFilter) {
        if (produto.tamanho.includes(sizeFilter) && produto.cor.includes(colorFilter)) return produto
    } else if (!colorFilter && !sizeFilter) {
        return produto
    }
}

////////////
//  FUNÇÕES 
//  ORDENAÇÃO

// evento de on change pro select
selectOrder.addEventListener('change', async function () {
    let selecionada = this.options[this.selectedIndex];
    let funcao = selecionada.getAttribute('ordenar');
    if (funcao === 'recente') {
        orderByDesc()  
    } else if (funcao === 'barato') {
        orderByPrice()
    } else if (funcao === 'caro') {
        orderByPriceDesc()
    }
});

// Mais recentes
async function orderByDesc () {
    let ordered = currentProducts.sort((a,b) => {
        return Date.parse(b.createdAt) - Date.parse(a.createdAt)
    })
    populate(ordered)
    modal.style.display = "none";
}

// Maior preço
async function orderByPriceDesc () {
    let ordered = currentProducts.sort((a,b) => {
        return b.preco_vista - a.preco_vista
    })
    populate(ordered)
    modal.style.display = "none";
}

// Menor preço
async function orderByPrice () {
    let ordered = currentProducts.sort((a,b) => {
        return a.preco_vista - b.preco_vista
    })
    populate(ordered)
    modal.style.display = "none";
}