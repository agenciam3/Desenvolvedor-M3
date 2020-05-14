
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