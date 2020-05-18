import { cardEffects } from './Styles.js'

export const fetchProduto = (arrayProduto) => {
    let cardHtml = '';
    cardBox.removeAttribute('class');
    /*if(arrayProduto){
        cardBox.classList.add('container-cards-style');
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
    }else{
        cardBox.classList.add('no-product-style');
        cardHtml += '<div class="card-no-product">'
        cardHtml+="<div class='no-product'>Nenhum produto foi encontrado.</div>"
        cardHtml += '</div>'
    }*/
    if (arrayProduto) {
        cardBox.classList.add('container-cards-style');
        for(let i=0;i<paginacao;i++){
            if(arrayProduto[i]!=null||arrayProduto[i]!=undefined){
                cardHtml += '<div class="card">'
                cardHtml += '<div class="card-content">'
                cardHtml += `<img src="./imagens/${arrayProduto[i]['imagem']}.png">`
                cardHtml += `<p class="nome">${arrayProduto[i]['nome']}</p>`
                cardHtml += `<p class="preco">R$ ${arrayProduto[i]['preco']}</p>`
                cardHtml += `<p class="parcelas">até ${arrayProduto[i]['parcelas']}x de R$ ${(arrayProduto[i]['preco'] / arrayProduto[i]['parcelas']).toFixed(2)}</p>`
                cardHtml += `<button type="button" class="btn-comprar" onmouseup="addProdutoCarrinho(event,${arrayProduto[i]['codProduto']})">COMPRAR</button>`
                cardHtml += '</div></div>'
            }else{
                continue;
            }
        }
        cardBox.innerHTML = cardHtml;
        cardEffects()
    } else {
        cardBox.classList.add('no-product-style');
        cardHtml += '<div class="card-no-product">'
        cardHtml += "<div class='no-product'>Nenhum produto foi encontrado.</div>"
        cardHtml += '</div>'
        setTimeout(() => {
            loadProdutos();
            fetchProduto(arrayProdutos)
        }, 3000);
        cardBox.innerHTML = cardHtml;
    }
}
export const loadProdutos=()=>{
    arrayProdutos=produtos;
}