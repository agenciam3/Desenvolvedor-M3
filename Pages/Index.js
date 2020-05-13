let cardBox=document.getElementById('container-cards')

const fetchUser=()=>{
    let cardHtml=''
    produtos.forEach(produto => {
        cardHtml+='<div class="card">'
        cardHtml+='<div class="card-content">'
        cardHtml+= `<img src="./imagens/${produto.imagem}.png">`
        cardHtml+= `<p class="nome">${produto.nome}</p>`
        cardHtml+=`<p class="preco">R$ ${produto.preco}</p>`
        cardHtml+=`<p class="parcelas">até ${produto.parcelas}x de R$ ${(produto.preco/produto.parcelas).toFixed(2)}</p>`
        cardHtml+='<button class="btn-comprar">COMPRAR</button>'
        cardHtml+='</div></div>'
    });
    cardBox.innerHTML=cardHtml
}   

window.onload=()=>{
    fetchUser();
}