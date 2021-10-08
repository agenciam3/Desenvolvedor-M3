import Catalogo from "./catalogo.js";


var dadosProdutos;
var listaFiltrada; 

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
    if (!listaFiltrada) {
       catalogo.carregarMais(); 
    }
    else{
        console.log("filtrado")
        console.log(listaFiltrada)
        catalogo.carregarMais(listaFiltrada);
    }
    
});

checkAmarelo.addEventListener('click', async ()=>{
    let coresSelecionadas = ["LARANJA"];
    listaFiltrada = await catalogo.filtrarCores(coresSelecionadas);
    console.log('asaas', listaFiltrada.length)
    catalogo.mostrarProdutos(6, listaFiltrada, true);
})