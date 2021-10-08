import Catalogo from "./catalogo.js";


var dadosProdutos; 

//pegar json
await fetch("../produtos.json")
    .then((resp) =>{
        return resp.json();
    })
    .then((data) => {
        dadosProdutos = data;
    });

const catalogo = new Catalogo(dadosProdutos)
const btCarregarMais = document.getElementById('id-carregar-mais');
const checkAmarelo = document.getElementById('id-amarelo');

catalogo.mostrarProdutos();

btCarregarMais.addEventListener('click', ()=>{
    catalogo.carregarMais();
});

checkAmarelo.addEventListener('click', ()=>{
    let coresSelecionadas = ["CINZA"];

    catalogo.filtrarCores(coresSelecionadas);
})