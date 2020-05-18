let cardBox = document.getElementById('container-cards')

let boxInputCores = document.getElementsByClassName('box-input-cores');
let boxButtonTamanhos = document.getElementsByClassName('box-button-tamanhos');
let boxInputPrecos = document.getElementsByClassName('box-input-precos');

let boxCarrinhoDisplay=document.getElementById("box-carrinho-display")
let btnCard=document.getElementById('btn-card');
let collDivImg=document.getElementsByClassName("collapsible-div")
let coll = document.getElementsByClassName("collapsible");

let modalBoxFiltrar = document.getElementById("modalFiltrar");
let modalBoxOrdenar = document.getElementById("modalOrdenar");

let carrinho = [];
let paginacao=6
let arrayProdutos;

