import Catalogo from "./catalogo.js";


var dadosProdutos;
var listaFiltradaAtual = [];
var carrinho = [];

//pegar json
await fetch("../produtos.json")
    .then((resp) =>{
        return resp.json();
    })
    .then((data) => {
        dadosProdutos = data;
    });

const catalogo = new Catalogo(dadosProdutos);

const bagCarrinho = document.getElementById('id-he-bag');
const containerCarrinho = document.getElementById('id-container-carrinho');
const iconFecharCarrinho = document.getElementById('id-fechar-carrinho');
const maisQtdCarrinho = document.getElementById('id-add-qtd-car');
const menoQtdCarrinho = document.getElementById('id-rem-qtd-car');
const excluirItemCarrinho = document.getElementById('id-excluir-carrinho');
const quantidadeCarrinho = document.getElementById('id-quantidade');
const botaoFinalizarCompra = document.getElementById('id-bt-finalizar');


const btCarregarMais = document.getElementById('id-carregar-mais'); 
const asideFiltros = document.getElementById('filtros');
const divOrdenar = document.getElementById('ordenar');

const btAbrirFiltro = document.getElementById('id-abrir-filtro'); 

const listaCores = document.getElementById('id-lista-cores');
const headCores = document.getElementById('head-cores');
const coresMais = document.getElementById('id-cores-mais');
const coresMenos = document.getElementById('id-cores-menos');
const hiddenCores = document.getElementById('id-hidden-cores')
const verMaisCores = document.getElementById('id-ver-mais');
const verMenosCores = document.getElementById('id-ver-menos');

const gridTamanhos = document.getElementById('id-grid-tamanho');
const headTamanhos = document.getElementById('head-tamanhos');
const tamanhosMais = document.getElementById('id-tamanhos-mais');
const tamanhosMenos = document.getElementById('id-tamanhos-menos');

const listaPrecos = document.getElementById('id-lista-precos');
const headPrecos = document.getElementById('head-precos');
const precosMais = document.getElementById('id-precos-mais');
const precosMenos = document.getElementById('id-precos-menos');

const botaoFiltroAplicar = document.getElementById('id-bt-aplicar');
const botaoFiltroLimpar = document.getElementById('id-bt-limpar');
const iconeFecharFiltro = document.getElementById('id-fechar-filtro');

const btAbrirOrdenar = document.getElementById('id-abrir-ordenar');

const divMaisRecentes = document.getElementById('id-mais-recentes');
const divMaiorPreco = document.getElementById('id-maior-preco');
const divMenorPreco = document.getElementById('id-menor-preco');
const iconeFecharOrdenacao = document.getElementById('id-fechar-ordenacao');


catalogo.mostrarProdutos();

bagCarrinho.addEventListener('click', ()=>{
    fecharAbrirCardCarrinho();
});

iconFecharCarrinho.addEventListener('click', ()=>{
    fecharAbrirCardCarrinho();
});

botaoFinalizarCompra.addEventListener('click', ()=>{
    fecharAbrirCardCarrinho();
});

btAbrirFiltro.addEventListener('click', ()=>{
    abrirFiltroOrdenacao(asideFiltros);
});

headCores.addEventListener('click', ()=>{
    if (window.screen.width < 750) {
       if (headCores.dataset.aberto == '0') {
            listaCores.classList.toggle('ativo');
            coresMenos.style.setProperty('display', 'inline-block', 'important');
            coresMais.style.setProperty('display', 'none', 'important');
            headCores.dataset.aberto = '1';
        }
        else{
            listaCores.classList.toggle('ativo');
            coresMais.style.setProperty('display', 'inline-block', 'important');
            coresMenos.style.setProperty('display', 'none', 'important');
            headCores.dataset.aberto = '0';
        } 
    }  
});

headTamanhos.addEventListener('click', ()=>{
    if (headTamanhos.dataset.aberto == '0') {
        gridTamanhos.classList.toggle('ativo');
        tamanhosMenos.style.setProperty('display', 'inline-block', 'important');
        tamanhosMais.style.setProperty('display', 'none', 'important');
        headTamanhos.dataset.aberto = '1';
    }
    else{
        gridTamanhos.classList.toggle('ativo');
        tamanhosMais.style.setProperty('display', 'inline-block', 'important');
        tamanhosMenos.style.setProperty('display', 'none', 'important');;
        headTamanhos.dataset.aberto = '0';
    }
    
});

headPrecos.addEventListener('click', ()=>{
    if (headPrecos.dataset.aberto == '0') {
        listaPrecos.classList.toggle('ativo');
        precosMenos.style.setProperty('display', 'inline-block', 'important');
        precosMais.style.setProperty('display', 'none', 'important');
        headPrecos.dataset.aberto = '1';
    }
    else{
        listaPrecos.classList.toggle('ativo');
        precosMais.style.setProperty('display', 'inline-block', 'important');
        precosMenos.style.setProperty('display', 'none', 'important');
        headPrecos.dataset.aberto = '0';
    }
});

asideFiltros.addEventListener('click', async ()=>{
    const windowSize = window.screen.width;

    if (windowSize > 750) {
        await lerFiltros();
    }

});

verMaisCores.addEventListener('click', ()=>{
    hiddenCores.classList.toggle('mostrar');
    verMaisCores.style.display = 'none';
    verMenosCores.style.display = 'block';
});

verMenosCores.addEventListener('click', ()=>{
    hiddenCores.classList.toggle('mostrar');
    verMenosCores.style.display = 'none';
    verMaisCores.style.display = 'block';
});

gridTamanhos.addEventListener('click', async (e)=>{
    let elementoClicado =  e.target;
    if (elementoClicado.classList.contains('box-tam') || elementoClicado.classList.contains('span-tam')){
        await alterarDataset(elementoClicado);
    }
});

botaoFiltroAplicar.addEventListener('click', async(e)=>{
    await lerFiltros();
    fecharFiltroOrdenacao(asideFiltros);
});

botaoFiltroLimpar.addEventListener('click', ()=>{
    limparCheckBoxes();
    limparDivTamanhos();
});

iconeFecharFiltro.addEventListener('click', async ()=>{
    await lerFiltros();
    fecharFiltroOrdenacao(asideFiltros);
});

btAbrirOrdenar.addEventListener('click', ()=>{
    abrirFiltroOrdenacao(divOrdenar);
});

iconeFecharOrdenacao.addEventListener('click', ()=>{
    fecharFiltroOrdenacao(divOrdenar);
})

btCarregarMais.addEventListener('click', ()=>{
    console.log('LISTA ATUAL', listaFiltradaAtual)
    if (listaFiltradaAtual == undefined || listaFiltradaAtual.length == 0) {
        catalogo.carregarMais(); 
    }
    else{
        catalogo.carregarMais(listaFiltradaAtual);
    }
});

function fecharAbrirCardCarrinho(){
    containerCarrinho.classList.toggle('show');
}

function lerFiltros() {
    return new Promise(async (resolve) =>{
        let listaFiltrada = [];

        let listaDeCores = await getCoresSelecionadas();
        let listaDeTamanhos = await getTamanhosSelecionados();
        let listaDePrecos = await getPrecosSelecionados(); 
    
        console.log('cores',listaDeCores);        
        console.log('tamanhos',listaDeTamanhos);
        console.log('precos',listaDePrecos);

        if (listaDeCores.length == 0 && listaDeTamanhos.length == 0 && listaDePrecos.length == 0) {
            console.log("Mostrando todos os produtos");
            catalogo.mostrarProdutos(undefined,undefined,true);
            listaFiltradaAtual = [];
            resolve();
        }
        else{
            let filtroCores = await catalogo.filtrarCores(listaDeCores); 
            let filtroTamanhosMaisCores = await catalogo.filtrarTamanhos(listaDeTamanhos, filtroCores);
            let filtroTotal = await catalogo.filtrarPrecos(listaDePrecos, filtroTamanhosMaisCores); 

            listaFiltrada = filtroTotal;
            listaFiltrada = removerDuplicidade(listaFiltrada);

            console.log('----------------');
            console.log('lista filtrada', listaFiltrada);

            catalogo.mostrarProdutos(undefined, listaFiltrada, true)
            listaFiltradaAtual = listaFiltrada;
            resolve();
        }
    })
}

async function abrirFiltroOrdenacao(elem) {
    elem.style.transform = 'translateX(0%)';
}

function limparCheckBoxes() {
    let checkBoxes = document.getElementsByClassName('checkbox');
    for (let i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].checked = false;        
    }
}

function limparDivTamanhos() {
    console.log('entrou')
    let tamanhoBoxes = document.getElementsByClassName('box-tam');
    console.log(tamanhoBoxes);
    for (let i = 0; i < tamanhoBoxes.length; i++) {
        if (tamanhoBoxes[i].dataset.selected == 1) {
            tamanhoBoxes[i].classList.toggle('box-tam-selected');
            tamanhoBoxes[i].dataset.selected = 0;
        }
    }
}

function fecharFiltroOrdenacao(elem) {
    elem.style.transform = 'translateX(-100%)';
}

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
        const checkVerde = document.getElementById('id-verde');
        const checkVermelho = document.getElementById('id-vermelho');
        const checkPreto = document.getElementById('id-preto');
        const checkRosa = document.getElementById('id-rosa');
        const checkVinho = document.getElementById('id-vinho');

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
        if (checkVerde.checked && coresSelecionadas.indexOf("VERDE") == -1) {
            coresSelecionadas.push('VERDE')
        }
        if (checkVermelho.checked && coresSelecionadas.indexOf("VERMELHO") == -1) {
            coresSelecionadas.push('VERMELHO')
        }
        if (checkPreto.checked && coresSelecionadas.indexOf("PRETO") == -1) {
            coresSelecionadas.push('PRETO')
        }
        if (checkRosa.checked && coresSelecionadas.indexOf("ROSA") == -1) {
            coresSelecionadas.push('ROSA')
        }
        if (checkVinho.checked && coresSelecionadas.indexOf("VINHO") == -1) {
            coresSelecionadas.push('VINHO')
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