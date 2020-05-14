
const addProdutoCarrinho = produto => {
    carrinho.push(...produtos.filter(prod=>prod.codProduto==produto));
    fetchCarrinho()
}

const fetchCarrinho=()=>{
    let innerCarrinho="";
    sum=0
    if(carrinho.length==0){
        innerCarrinho="<p class='carrinho-p-empty'>O carrinho está vazio</p>"
    }else{
        carrinho.forEach(produto => {
            innerCarrinho += `<p class="carrinho-p">Preço: ${produto.preco} reais - ${produto.nome}</p>`
            sum+=produto.preco
        })
        innerCarrinho+=`<p class="sum-p">Total: ${sum} reais</p>`
    }
    boxCarrinhoDisplay.innerHTML=innerCarrinho;
}

const fetchProduto = (arrayProduto) => {
    let cardHtml = ''
    /*arrayProduto.forEach(produto => {
        cardHtml += '<div class="card">'
        cardHtml += '<div class="card-content">'
        cardHtml += `<img src="./imagens/${produto.imagem}.png">`
        cardHtml += `<p class="nome">${produto.nome}</p>`
        cardHtml += `<p class="preco">R$ ${produto.preco}</p>`
        cardHtml += `<p class="parcelas">até ${produto.parcelas}x de R$ ${(produto.preco / produto.parcelas).toFixed(2)}</p>`
        cardHtml += `<button class="btn-comprar" onclick="addProdutoCarrinho('${produto.codProduto}')">COMPRAR</button>`
        cardHtml += '</div></div>'
    });*/
    for(let i=0;i<qtdProd;i++){
        if(arrayProduto[i]){
            cardHtml += '<div class="card">'
            cardHtml += '<div class="card-content">'
            cardHtml += `<img src="./imagens/${arrayProduto[i]['imagem']}.png">`
            cardHtml += `<p class="nome">${arrayProduto[i]['nome']}</p>`
            cardHtml += `<p class="preco">R$ ${arrayProduto[i]['preco']}</p>`
            cardHtml += `<p class="parcelas">até ${arrayProduto[i]['parcelas']}x de R$ ${(arrayProduto[i]['preco'] / arrayProduto[i]['parcelas']).toFixed(2)}</p>`
            cardHtml += `<button class="btn-comprar" onclick="addProdutoCarrinho('${arrayProduto[i]['codProduto']}')">COMPRAR</button>`
            cardHtml += '</div></div>'
        }
    }
    cardBox.innerHTML = cardHtml;
    cardEffects()
}

window.onload = () => {
    startCollapse();
    fetchProduto(produtos);
    fetchCores();
    fetchTamanhos();
    fetchPrecos();
    fetchCarrinho()
}