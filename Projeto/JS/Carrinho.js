let cart = []
export let addProdutoCarrinho = (event,produto) => {
    event.preventDefault();
    event.stopPropagation();

    let hasValue = cart.some(item => item.id == produto);
    let prod = arrayProdutos.filter(prod => prod.codProduto == produto)[0];    
    if (hasValue) {
        cart.forEach(cartItem => {
            if (cartItem.id == produto) {
                cartItem.quantity+=1,
                cartItem.sum+=prod.preco;
                return
            }
        }) 
    } else {
        cart.push({
            id: prod.codProduto,
            quantity: 1,
            sum: prod.preco,
            nome: prod.nome
        });
    }
    fetchCarrinho();
}

export const fetchCarrinho = () => {
    let innerCarrinho = "";
    let sum = 0;
    if (cart.length == 0) {
        innerCarrinho = "<p class='carrinho-p-empty'>O carrinho está vazio</p>"
    } else {
        cart.forEach(cartItem => {
            innerCarrinho += `<p class="carrinho-p">Nome: ${cartItem.nome} - ${cartItem.quantity} -  R$ ${cartItem.sum}</p>`
            sum += cartItem.sum
        })
        innerCarrinho += `<p class="sum-p">Total: ${sum} reais</p>`
    }
    boxCarrinhoDisplay.innerHTML = innerCarrinho;
}
