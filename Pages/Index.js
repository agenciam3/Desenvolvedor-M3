let cardBox = document.getElementById('container-cards')
let boxInputCores = document.getElementById('box-input-cores');
let boxButtonTamanhos = document.getElementById('box-button-tamanhos');
let boxInputPrecos = document.getElementById('box-input-precos');

let carrinho = [];

const checkBoxPickOne = (checkbox) => {
    /*---------Estruturando para só um checkbox poder ser escolhido----------*/
    var checkboxes = document.getElementsByName('check')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}

const cardEffects = () => {
    let cards = document.getElementsByClassName('card');
    let delay = 0.2;
    Object.values(cards).forEach(card => {
        card.style.animationDelay = delay + "s"
        delay += 0.2;
    })
}


const filterByCor = (checkbox, cor) => {
    checkBoxPickOne(checkbox);

    if (cor) {
        let produtoCopy = produtos.filter(produto => produto.cor == cor);
        if (produtoCopy.length != 0) {
            fetchProduto(produtoCopy);
        } else {
            fetchProduto(produtos);
        }
    }
}

const filterByTamanho = (tamanho) => {

    if (tamanho) {
        let produtoCopy = produtos.filter(produto => produto.tamanho == tamanho);
        if (produtoCopy.length != 0) {
            fetchProduto(produtoCopy);
        } else {
            fetchProduto(produtos);
        }
    }
}

const filterByPreco = (checkbox, value) => {
    checkBoxPickOne(checkbox);

    if (value) {
        let produtoCopy = produtos.filter(produto => produto.value == value);
        if (produtoCopy.length != 0) {
            fetchProduto(produtoCopy);
        } else {
            fetchProduto(produtos);
        }
    }
}

const fetchCores = () => {
    let htmlCor = '';
    cores.forEach(cor => {
        htmlCor += `<div><input type="checkbox" name="check" onclick="filterByCor(this,'${cor.cor}')" value="${cor.corCor}" /><label>${cor.cor}</label></div>`
    })
    boxInputCores.innerHTML = htmlCor
}


const fetchPrecos = () => {
    let htmlPreco = '';
    precos.forEach(preco => {
        htmlPreco += `<div><input type="checkbox" onclick="filterByPreco(this,'${preco.value}')" value="${preco.value}"><label>de ${preco.preco}</label></div>`
    })
    boxInputPrecos.innerHTML = htmlPreco;
}

const fetchTamanhos = () => {
    let htmlTam = '';
    tamanhos.forEach(tam => {
        htmlTam += `<button onclick=filterByTamanho('${tam.tamanho}')>${tam.tamanho}</button>`
    })
    boxButtonTamanhos.innerHTML = htmlTam
}

const addProdutoCarrinho = produto => {
    carrinho.push(produtos.filter(prod=>prod.codProduto==produto));
}

const fetchProduto = (arrayProduto) => {
    let cardHtml = ''
    arrayProduto.forEach(produto => {
        cardHtml += '<div class="card">'
        cardHtml += '<div class="card-content">'
        cardHtml += `<img src="./imagens/${produto.imagem}.png">`
        cardHtml += `<p class="nome">${produto.nome}</p>`
        cardHtml += `<p class="preco">R$ ${produto.preco}</p>`
        cardHtml += `<p class="parcelas">até ${produto.parcelas}x de R$ ${(produto.preco / produto.parcelas).toFixed(2)}</p>`
        cardHtml += `<button class="btn-comprar" onclick="addProdutoCarrinho('${produto.codProduto}')">COMPRAR</button>`
        cardHtml += '</div></div>'
    });
    cardBox.innerHTML = cardHtml;
    cardEffects()
}

window.onload = () => {
    fetchProduto(produtos);
    fetchCores();
    fetchTamanhos();
    fetchPrecos();
}