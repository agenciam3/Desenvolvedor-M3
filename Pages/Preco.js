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
const fetchPrecos = () => {
    let htmlPreco = '';
    precos.forEach(preco => {
        htmlPreco += `<div><input type="checkbox" onclick="filterByPreco(this,'${preco.value}')" value="${preco.value}"><label>de ${preco.preco}</label></div>`
    })
    if(window.innerWidth<500){
        boxInputPrecos[0].innerHTML = htmlPreco;
    }else{
        boxInputPrecos[1].innerHTML = htmlPreco;
    }
   
}
