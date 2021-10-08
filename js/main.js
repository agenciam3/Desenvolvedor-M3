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
const areaCores = document.getElementById('id-div-cores');
const areaPrecos = document.getElementById('id-div-precos')

catalogo.mostrarProdutos();
tratarCheckBoxes(areaCores, "COR");
tratarCheckBoxes(areaPrecos, "PRECO");

btCarregarMais.addEventListener('click', ()=>{
    console.log(listaFiltrada)
    if (listaFiltrada.length == 0) {
        console.log("não filtrado")
        catalogo.carregarMais(); 
    }
    else{
        console.log("filtrado")  
        catalogo.carregarMais(listaFiltrada);
    }
    
});

function tratarCheckBoxes(div, area) {
    switch (area) {
        case "COR":
            div.addEventListener('click', async ()=>{
                let coresSelecionadas = await getCoresSelecionadas();
                console.log(coresSelecionadas)
                listaFiltrada = await catalogo.filtrarCores(coresSelecionadas);
                console.log('asaas', listaFiltrada.length)
                if (listaFiltrada.length > 0) {
                   catalogo.mostrarProdutos(6, listaFiltrada, true); 
                }
                else{
                    console.log("lista vazia")
                    catalogo.mostrarProdutos();
                }    
            })
            break;
        case "TAMANHO":
            
            break;
        case "PRECO":
            div.addEventListener('click', async ()=>{
                let precosSelecionados = await getPrecosSelecionados();
                console.log(precosSelecionados)
                listaFiltrada = await catalogo.filtrarPrecos(precosSelecionados);
                console.log('asaas', listaFiltrada.length)
                if (listaFiltrada.length > 0) {
                   catalogo.mostrarProdutos(6, listaFiltrada, true); 
                }
                else{
                    console.log("lista vazia")
                    catalogo.mostrarProdutos();
                }    
            })
            break;

        default:
            break;
    }    
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