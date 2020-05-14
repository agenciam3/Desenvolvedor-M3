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
    if(window.innerWidth<500){
        boxInputCores[0].innerHTML = htmlCor;
    }else{
        boxInputCores[1].innerHTML = htmlCor;
    }
}
