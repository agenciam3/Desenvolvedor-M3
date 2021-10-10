import Catalogo from "./catalogo.js";


var dadosProdutos;
var listaFiltradaAtual = [];

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
const asideFiltros = document.getElementById('filtros');

catalogo.mostrarProdutos();



asideFiltros.addEventListener('click', async (e)=>{
    let listaFiltrada = [];

    let elementoClicado =  e.target;
    if (elementoClicado.classList.contains('box-tam') || elementoClicado.classList.contains('span-tam')){
        await alterarDataset(elementoClicado);
    }

    let listaDeCores = await getCoresSelecionadas();
    let listaDePrecos = await getPrecosSelecionados(); 
    let listaDeTamanhos = await getTamanhosSelecionados();
   
    console.log('cores',listaDeCores);
    console.log('precos',listaDePrecos);
    console.log('tamanhos',listaDeTamanhos);

    let filtroCores = await catalogo.filtrarCores(listaDeCores); 
    let filtroPrecos = await catalogo.filtrarPrecos(listaDePrecos);
    let filtroTamanhos = await catalogo.filtrarTamanhos(listaDeTamanhos)

    console.log('filtroCores',filtroCores);
    console.log('filtroPrecos', filtroPrecos);
    console.log('filtroTamanhos', filtroTamanhos);

    listaFiltrada = listaFiltrada.concat(filtroCores,filtroPrecos,filtroTamanhos);
    listaFiltrada = removerDuplicidade(listaFiltrada);

    console.log('----------------');
    console.log('lista filtrada', listaFiltrada);
    if (listaFiltrada.length == 0) {
        listaFiltrada = undefined;        
    }

    catalogo.mostrarProdutos(undefined, listaFiltrada, true)
    listaFiltradaAtual = listaFiltrada;
});

btCarregarMais.addEventListener('click', ()=>{
    console.log('LISTA ATUAL', listaFiltradaAtual)
    if (listaFiltradaAtual == undefined || listaFiltradaAtual.length == 0) {
        catalogo.carregarMais(); 
    }
    else{
        catalogo.carregarMais(listaFiltradaAtual);
    }
});

function removerDuplicidade(lista) {
    return lista.filter((este, i) => lista.indexOf(este) === i)
}

function getCoresSelecionadas() {
    return new Promise((resolve)=>{
        let coresSelecionadas = [];

        const checkAmarelo = document.getElementById('id-amarelo');
        const checkAzul = document.getElementById('id-azul');
        const checkBranco = document.getElementById('id-branco');
        const checkCinza = document.getElementById('id-cinza');
        const checkLaranja = document.getElementById('id-laranja');

        if (checkAmarelo.checked && coresSelecionadas.indexOf("AMARELO") == -1) {
            coresSelecionadas.push('AMARELO')
        }
        if (checkAzul.checked && coresSelecionadas.indexOf("AZUL") == -1) {
            coresSelecionadas.push('AZUL')
        }
        if (checkBranco.checked && coresSelecionadas.indexOf("BRANCO") == -1) {
            coresSelecionadas.push('BRANCO')
        }
        if (checkCinza.checked && coresSelecionadas.indexOf("CINZA") == -1) {
            coresSelecionadas.push('CINZA')
        }
        if (checkLaranja.checked && coresSelecionadas.indexOf("LARANJA") == -1) {
            coresSelecionadas.push('LARANJA')
        } 

        resolve(coresSelecionadas);
    });
    
}

function getPrecosSelecionados() {
    return new Promise((resolve)=>{
        let precosSelecionados = [];

        const check0_50 = document.getElementById('id-preco-0-50');
        const check51_150 = document.getElementById('id-preco-51-150');
        const check151_300 = document.getElementById('id-preco-151-300');
        const check301_500 = document.getElementById('id-preco-301-500');
        const checkAcima01 = document.getElementById('id-preco-acima-01');

        if (check0_50.checked && precosSelecionados.indexOf("AMARELO") == -1) {
            precosSelecionados.push('0>50')
        }
        if (check51_150.checked && precosSelecionados.indexOf("AZUL") == -1) {
            precosSelecionados.push('51>150')
        }
        if (check151_300.checked && precosSelecionados.indexOf("BRANCO") == -1) {
            precosSelecionados.push('151>300')
        }
        if (check301_500.checked && precosSelecionados.indexOf("CINZA") == -1) {
            precosSelecionados.push('301>500')
        }
        if (checkAcima01.checked && precosSelecionados.indexOf("LARANJA") == -1) {
            precosSelecionados.push('>=01')
        } 

        resolve(precosSelecionados);
    });
}

function getTamanhosSelecionados() {
    return new Promise((resolve)=>{
        let listaTamanhosSelecionados = [];
        let listaBoxTamanho = document.getElementsByClassName('box-tam');

        for (let box = 0; box < listaBoxTamanho.length; box++) {
            if (listaBoxTamanho[box].dataset.selected == 1) {
                listaTamanhosSelecionados.push(listaBoxTamanho[box].dataset.tamanho);
            }
            else{
                /* excluirIndexDaLista(listaTamanhosSelecionados, listaBoxTamanho[box].dataset.tamanho);
                console.log("excluido", listaBoxTamanho[box].dataset.tamanho) */
            }
        }
        resolve(listaTamanhosSelecionados);
    });
}

function alterarDataset(elemClicado){
    return new Promise((resolve)=>{
        if (elemClicado.classList.contains('span-tam')){
                elemClicado = elemClicado.parentNode;
            }

        elemClicado.classList.toggle('box-tam-selected');
        if (elemClicado.dataset.selected == 0) {
            elemClicado.dataset.selected = 1;
        }
        else{
            elemClicado.dataset.selected = 0;
        }
        
        resolve();
    })
}