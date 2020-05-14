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
const fetchCores = () => {
    let htmlCor = '';
    cores.forEach(cor => {
        htmlCor += `<div><input type="checkbox" name="check" onclick="filterByCor(this,'${cor.cor}')" value="${cor.corCor}" /><label>${cor.cor}</label></div>`
    })
    boxInputCores.innerHTML = htmlCor
}
