import {checkBoxPickOne,checkTelaSize} from './Styles.js'
import  {fetchProduto} from './Produto.js'

export const filterByPreco = (checkbox, value) => {
    checkBoxPickOne(checkbox);
    if (value) {
        arrayProdutos = arrayProdutos.filter(produto => produto.value == value);
        fetchProduto(arrayProdutos.length!=0?arrayProdutos:null);
    }
}

const ordernarMaiorMenor=()=>{
   
    arrayProdutos=arrayProdutos.sort((a, b)=>{
        return b.preco - a.preco;
    });

    fetchProduto(arrayProdutos.length!=0?arrayProdutos:null);
}

const ordernarMenorMaior=()=>{
   
    arrayProdutos=arrayProdutos.sort((a, b)=>{
        return  a.preco-b.preco;
    });

    fetchProduto(arrayProdutos.length!=0?arrayProdutos:null);
}

export const selectActionPrice=(value)=>{
    switch(value){
        case 'decrescente':
            ordernarMaiorMenor();
            break;
        case 'crescente':
            ordernarMenorMaior();
            break;
    }
}

export const fetchPrecos = () => {
    let htmlPreco = '';
    precos.forEach(preco => {
        htmlPreco += `<div><input type="checkbox" name="check" onclick="filterByPreco(this,'${preco.value}')" value="${preco.value}"><label>de ${preco.preco}</label></div>`
    })
    checkTelaSize(boxInputPrecos,htmlPreco)
   
}

export const filterByCor = async(checkbox, cor) => {
    checkBoxPickOne(checkbox);

    if (cor) {
        arrayProdutos =arrayProdutos.filter(produto => produto.cor == cor);
        fetchProduto(arrayProdutos.length!=0?arrayProdutos:null);
    }
}
export const fetchCores = () => {
    let htmlCor = '';
    cores.forEach(cor => {
        htmlCor += `<div><input type="checkbox" name="check" onclick="filterByCor(this,'${cor.cor}')" value="${cor.corCor}" /><label>${cor.cor}</label></div>`
    })
    checkTelaSize(boxInputCores,htmlCor)
}

export const filterByTamanho = (tamanho) => {

    if (tamanho) {
        arrayProdutos= arrayProdutos.filter(produto => produto.tamanho == tamanho);
        fetchProduto(arrayProdutos.length!=0?arrayProdutos:null);
    }
}

export const fetchTamanhos = () => {
    let htmlTam = '';
    tamanhos.forEach(tam => {
        htmlTam += `<button onclick=filterByTamanho('${tam.tamanho}')>${tam.tamanho}</button>`
    })
    checkTelaSize(boxButtonTamanhos,htmlTam)
}
