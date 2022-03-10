const arrayProdutos = [];
const coresSelecionadas = [];
const tamanhosSelecionados = [];
const precoSelecionado = [];
const newArrayProdutos = [];
const cores = document.getElementsByName('cor');
const tamanhos = document.getElementsByName('tam');
const precos = document.getElementsByName('preco');
let carrinho = document.querySelector('#circulo>span');
let qtdCarrinho = 0;
let button2 = document.getElementById('button2');
let outrasCores = document.getElementById('mostra');
let seletor = 0;
let qtdTela = window.matchMedia('(min-width: 697px').matches?9:4
let buttonFiltro = document.getElementById("btnFiltro");
let buttonOrdena = document.getElementById("btnOrdena");
let divCor = document.getElementById("mostraCor");
let divTam = document.getElementById("mostraTam");
let divPreco = document.getElementById("mostraPreco");
let coresFiltrar = document.getElementById("coresFiltrar");
let tamFiltrar = document.getElementById("tamFiltrar");
let precoFiltrar = document.getElementById("precoFiltrar");
let condicaoCores = condicaoTam = condicaoPreco = false;
let fecharfiltro = document.getElementById("fecharFiltro");
let divSidebar = document.querySelector(".sidebar");
let buttonClicked = document.getElementsByName("ordenarMobile");
let divHeading = document.getElementById("heading");
let fecharOrdenar = document.getElementById("fecharOrdenar");
buttonFiltro.onclick = mostrarFiltroMobile;
buttonOrdena.onclick = mostrarOrdenaMobile;
coresFiltrar.onclick = mostraCoresMobile;
tamFiltrar.onclick = mostrarTamanhosMobile;
precoFiltrar.onclick = mostrarPrecoMobile;
fecharfiltro.onclick = fecharFiltroMobile;
fecharOrdenar.onclick = fecharOrdenaMobile;
window.onresize = mudarTela;
qtdMostra = qtdTela;

let button4 = document.getElementById('button4');
button2.onclick = mostrarCores;
button4.onclick = carregarMais;

cores.forEach((cor) => {
    cor.onclick = filtrar;
});
tamanhos.forEach((tamanho) => {
    tamanho.onclick = filtrar;
})
precos.forEach(preco => {
    preco.onclick = filtrar;
})

buttonClicked.forEach(botao => {
    botao.onclick = ordernarButtonMobile;
})

let select = document.getElementById('myselect');
select.onchange = ordernarButton;
let produtoDiv = document.getElementById('produtos');

fetch('http://localhost:5000/products')
.then((resp) => resp.json())
.then(function(data){
    let produtos = data;
    produtos.map(function(produto) {
        arrayProdutos.push(produto);
        newArrayProdutos.push(produto);
    });
    imprimir(arrayProdutos);
})
.catch(function(error){
    console.log(error)
})

function filtrar() {
    qtdMostra = qtdTela;
    let resp = arrayProdutos;
    produtoDiv.innerHTML = '';
    newArrayProdutos.length = 0;
    resp = filtrarTamanhos(resp);
    resp = filtrarPreco(resp);
    resp = filtrarCores(resp);
    ordernar(seletor, resp);
    resp.forEach(produto => {
        newArrayProdutos.push(produto);
    });

}

function filtrarPreco(array) {
    let myArray = [];
    precoSelecionado.length = 0;
    precos.forEach((preco) => {
        if(preco.checked) {
            precoSelecionado.push(preco);
        } 
    });
    if(precoSelecionado.length == 0) {
        return array;
    } else {  
        array.forEach(produto => {
            precoSelecionado.forEach(preco => {
                if(preco.max.length == 0) {
                    if(produto.price >= preco.min) {
                        if(myArray.includes(produto) == false) {
                            myArray.push(produto);
                        }
                    }
                } else {
                    if(produto.price <= preco.max && produto.price >= preco.min) {
                        if(myArray.includes(produto) == false) {
                            myArray.push(produto);
                        }
                    }
                }
            })
        });
        return myArray;
    }
}

function filtrarTamanhos(array) {
    let myArray = [];
    tamanhosSelecionados.length = 0;
    tamanhos.forEach((tamanho) => {
        if(tamanho.checked) {
            tamanhosSelecionados.push(tamanho.value);
        } 
    });
    if(tamanhosSelecionados.length == 0) {
        return array;
    } else {     
        array.forEach(produto => {
            tamanhosSelecionados.forEach(tamanho => {
                produto.size.forEach(tamanhoProduto => {
                    if(tamanhoProduto.toUpperCase() == tamanho) {
                        if(myArray.includes(produto) == false) {
                            myArray.push(produto);
                        }
                    } 
                })  
            });
        });
        return myArray;
    }
}

function filtrarCores(array) {
    let myArray = [];
    coresSelecionadas.length = 0;
    cores.forEach((cor) => {
        if(cor.checked) {
            coresSelecionadas.push(cor.value);
        } 
    });
    if(coresSelecionadas.length == 0) {
        return array;
    } else {
        array.forEach(produto => {
            coresSelecionadas.forEach(cor => {
                if(produto.color.toLowerCase() == cor) {
                    if(myArray.includes(produto) == false) {
                        myArray.push(produto);
                    }
                } 
            });
        });
        return myArray;
    }
}

function addElements(produto) {
    let divInfo = createNode('div');
    let img = createNode('img');
    let pBlusa = createNode('p');
    let pValor = createNode('p');
    let pParcelamento = createNode('p');
    let button = createNode('button');
    divInfo.setAttribute('class', 'info');
    img.setAttribute('src', `${produto.image}`);
    pBlusa.setAttribute('class', 'nomeblusa');
    pBlusa.innerHTML = produto.name;
    pValor.setAttribute('class', 'valor');
    pValor.innerHTML = `R$ ${produto.price}`;
    pParcelamento.setAttribute('class', 'parcelamento');
    pParcelamento.innerHTML = `até ${produto.parcelamento[0]}x de R$ ${produto.parcelamento[1]}`;
    button.setAttribute('class', 'button3');
    button.innerHTML = `COMPRAR`;
    append(divInfo, img);
    append(divInfo, pBlusa);
    append(divInfo, pValor);
    append(divInfo, pParcelamento);
    append(divInfo, button);
    append(produtoDiv, divInfo);
    buttons = document.querySelectorAll('.button3')
    buttons.forEach(button => {
        button.onclick = adicionarCarrinho;
    })
}

function imprimir(array) {
    array.forEach(produto => {
        if(array.indexOf(produto) < qtdMostra) {
            addElements(produto);
        }
    });
}

function ordernar(seletor, arrayOrdernar) {
    if(seletor == 'recent') {
        let produtos = arrayOrdernar.sort(function(a, b){
            return new Date(b.date) - new Date(a.date) ;
        })
        imprimir(produtos);
    } else if(seletor == 'lowestPrice') {
        let produtos = arrayOrdernar.sort(function(a, b){
            return a.price - b.price;
        })
        imprimir(produtos);
    } else {
        let produtos = arrayOrdernar.sort(function(a, b){
            return b.price - a.price;
        })
        imprimir(produtos);
    }
}

function ordernarButton(event) {
    seletor = event.path[0].options[select.selectedIndex].value;
    produtoDiv.innerHTML = '';
    ordernar(seletor, newArrayProdutos);
}

function ordernarButtonMobile(botaoClicado) {
    seletor = botaoClicado.path[0].value;
    produtoDiv.innerHTML = '';
    ordernar(seletor, newArrayProdutos);
}

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function mostrarTodosProdutos() {
    newArrayProdutos.length = 0;
    arrayProdutos.forEach(produto => {
        addElements(produto);
        newArrayProdutos.push(produto);
    });
}

function mostrarCores() {
    outrasCores.style.display = 'block';
    button2.style.display = 'none';
}

function adicionarCarrinho() {
    qtdCarrinho++;
    carrinho.innerHTML = qtdCarrinho;
}

function carregarMais() {
    qtdMostra += qtdTela;
    produtoDiv.innerHTML = '';
    imprimir(newArrayProdutos);
}

function mudarTela() {
    qtdTela = window.matchMedia('(min-width: 697px').matches?9:4;
    filtrar();
}

function mostraCoresMobile() {
    if(window.matchMedia('(max-width: 697px').matches) {
        if(condicaoCores) {
            divCor.style.display = "none";
            outrasCores.style.display = 'none';
            condicaoCores = false;
        } else {
            divCor.style.display = "block";
            mostrarCores();
            condicaoCores = true;
        }
    }     
}

function mostrarTamanhosMobile() {
    if(window.matchMedia('(max-width: 697px').matches) {
        if(condicaoTam) {
            divTam.style.display = "none";
            condicaoTam = false;
        } else {
            divTam.style.display = "block";
            condicaoTam = true;
        }
    }
}

function mostrarPrecoMobile() {
    if(window.matchMedia('(max-width: 697px').matches) {
        if(condicaoPreco) {
            divPreco.style.display = "none";
            condicaoPreco = false;
        } else {
            divPreco.style.display = "block";
            condicaoPreco = true;
        }
    }
}

function fecharFiltroMobile() {
    divSidebar.style.display = "none";
}

function mostrarFiltroMobile() {
    divSidebar.style.display = "block";
    document.body.style.overflow = 'hidden';
}

function fecharOrdenaMobile() {
    divHeading.style.display = "none";
}

function mostrarOrdenaMobile() {
    divHeading.style.display = "block";
    
}