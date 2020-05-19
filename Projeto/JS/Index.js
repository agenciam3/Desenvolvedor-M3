import {fetchCarrinho,addProdutoCarrinho} from './Carrinho.js';
import {startCollapse,changeImg,carregarMais} from './Styles.js'

import {toogleModal} from './Modal.js'

import {
    fetchCores,
    filterByCor,
    fetchTamanhos,
    filterByTamanho,
    fetchPrecos,
    filterByPreco,
    selectActionPrice
} from './Filtros.js'

import  {fetchProduto,loadProdutos} from './Produto.js'

window.addProdutoCarrinho=addProdutoCarrinho;
window.filterByCor = filterByCor;
window.filterByTamanho=filterByTamanho;
window.filterByPreco=filterByPreco;
window.toogleModal=toogleModal;
window.changeImg=changeImg;
window.selectActionPrice=selectActionPrice;
window.carregarMais=carregarMais;



window.onload = async() => {
    await loadProdutos();
    fetchCarrinho();
    fetchProduto(arrayProdutos);
    startCollapse();
    fetchPrecos();
    fetchCores();
    fetchTamanhos();
}
