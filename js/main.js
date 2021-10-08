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

catalogo.mostrarProdutos();
tratarCheckBoxes(areaCores, "COR");

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
            
            break;

        default:
            break;
    }    
}

function getCoresSelecionadas() {
/*     let todasAsCores = ["AMARELO", "AZUL", "BRANCO", "CINZA", "LARANJA"]; */
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