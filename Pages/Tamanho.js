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

const fetchTamanhos = () => {
    let htmlTam = '';
    tamanhos.forEach(tam => {
        htmlTam += `<button onclick=filterByTamanho('${tam.tamanho}')>${tam.tamanho}</button>`
    })
    if(window.innerWidth<500){
        boxButtonTamanhos[0].innerHTML = htmlTam;
    }else{
        boxButtonTamanhos[1].innerHTML = htmlTam;
    }
}
