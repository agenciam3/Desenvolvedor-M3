const produtos = 'http://localhost:3001/produtos'


function cardComponent(produto) {
    const imgProduto = document.createElement('img')
    imgProduto.setAttribute('src', produto.url)
    imgProduto.setAttribute('alt', 'camiseta mescla')
    imgProduto.setAttribute('style', 'width: 100%')

    const nomeProduto = document.createElement('h1')
    nomeProduto.setAttribute('class', 'nomeProduto')
    nomeProduto.innerHTML = produto.nome

    const precoProduto = document.createElement('p')
    precoProduto.innerHTML = produto.preco
    precoProduto.setAttribute('class', 'preco')

    const opcaoParcelamento = document.createElement('p')
    opcaoParcelamento.setAttribute('class', 'opcaoParcela')
    opcaoParcelamento.innerHTML = produto.parcelamento

    const botaoComprar = document.createElement('button')
    botaoComprar.innerHTML = 'Comprar'
    const comprar = document.createElement('p')
    comprar.appendChild(botaoComprar)

    const cardProduto = document.createElement('div')
    cardProduto.setAttribute('class', 'card')
    cardProduto.setAttribute('id', produto.id)

    cardProduto.appendChild(imgProduto)
    cardProduto.appendChild(nomeProduto)
    cardProduto.appendChild(precoProduto)
    cardProduto.appendChild(opcaoParcelamento)
    cardProduto.appendChild(botaoComprar)

    return cardProduto
}

function carregarMaisProdutos() {

    const items  = document.querySelectorAll('#main-content > .card')
    const carregarMais =  document.querySelector('#carregarMais')
    const maxItems = 6
    const hiddenClass = "visually-hidden"

    items.forEach.call(items, (item, index) => {
        if (index > maxItems - 1) {
            item.setAttribute('class', hiddenClass)
        }
    })

    carregarMais.addEventListener('click', () => {

        items.forEach.call(document.querySelectorAll('.' + hiddenClass), (item, idx) => {
            if (idx < maxItems - 1) {
                item.removeAttribute('class')
                item.setAttribute('class', 'card')
            }

            if ( document.querySelectorAll('.' + hiddenClass).length === 0) {
                carregarMais.style.display = 'none';
            }

        })

    })
}


fetch(produtos)
    .then(resp => resp.json())
    .then(produtos => produtos.map(produto=> cardComponent(produto)))
    .then(produtos => {
        const mainContent = document.getElementById('main-content')
        produtos.map(produto => mainContent.appendChild(produto))
    })
    .then(() => carregarMaisProdutos())

function filtrarTamanho(e) {
    const checked = e.target.checked
    const itens  = document.querySelectorAll('#main-content > .card')
    arrayItens = Array.prototype.slice.call(itens)
    arrayItens.map(item => item.style.display = 'none')

    if(checked) {
        fetch(produtos)
            .then(resp => resp.json())
            .then(produtos => produtos.filter(produto => e.target.value == produto.tamanho))
            .then(produtos => produtos.map(produto => {
                const item = document.getElementById(`${produto.id}`)
                item.style.display = ''
            }))
    } else arrayItens.map(item => item.style.display = '')
}

function filtrarCor(e) {
    const checked = e.target.checked
    const itens  = document.querySelectorAll('#main-content > .card')
    arrayItens = Array.prototype.slice.call(itens)
    arrayItens.map(item => item.style.display = 'none')

    if(checked) {
        fetch(produtos)
            .then(resp => resp.json())
            .then(produtos => produtos.filter(produto => e.target.value == produto.cor))
            .then(produtos => produtos.map(produto => {
                const item = document.getElementById(`${produto.id}`)
                item.style.display = ''
            }))
    } else arrayItens.map(item => item.style.display = '')
}

function filtrarPreco(e) {
    const checked = e.target.checked
    const itens  = document.querySelectorAll('#main-content > .card')
    arrayItens = Array.prototype.slice.call(itens)
    arrayItens.map(item => item.style.display = 'none')

    if(checked) {
        fetch(produtos)
            .then(resp => resp.json())  
            .then(produtos => produtos.filter(produto => {
                const valorPreco = Number(produto.preco.slice(2).replace(',', '.'))
                const valorFiltro = Number(e.target.value)
                console.log(valorFiltro)
                if( valorFiltro >= valorPreco ) {
                    return produto
                }
            }))
            .then(produtos => produtos.map(produto => {
                const item = document.getElementById(`${produto.id}`)
                item.style.display = ''
            }))
    } else if(!checked) {
        arrayItens.map(item => item.style.display = '')
    }
}