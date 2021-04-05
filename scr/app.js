// Mostrar Mais
function mais() {
    var pai2 = document.getElementById("main-container");
    for (var i = 0; i < pai2.children.length; i++) {
        if (i > 8) {
            pai2.children[i].style.display = "flex";
            document.getElementById("mais").style.display = 'none';
        }
    }
}

// contador carrinho
function _contad() {
    document.querySelector('.contador').style.display = "flex";
    var contador = document.querySelector('.contador').textContent++
};

//Mostrar todas cores
function cor() {
    var pai2 = document.getElementById("cor-conteiner");
    for (var i = 0; i < pai2.children.length; i++) {
        if (i > 4) {
            pai2.children[i].style.display = "block";
            document.getElementById("ver-cores").style.display = 'none';

        }
    }
}
// funções do filtro
function fil() {
    document.querySelector(".menu-filter").style.display = 'block';
    document.querySelector(".cor-conteiner").style.display = 'none';
    document.querySelector(".tamanho-conteiner").style.display = 'none';
    document.querySelector(".preco-conteiner").style.display = 'none';
    document.querySelector(".btn-opt-filtro").style.display = 'none';
    document.querySelector("body").style.height = '200vh';
    document.querySelector("body").style.overflow = 'hidden';
}

function escondeFiltrar() {
    document.querySelector(".menu-filter").style.display = 'none';
    document.querySelector("body").style.height = '100%';
    document.querySelector("body").style.overflow = 'visible';
}

function apareceCor() {
    document.querySelector(".cor-conteiner").style.display = 'block';
    document.querySelector(".btn-opt-filtro").style.display = 'flex';
    document.querySelector("#cor-escode").style.display = 'none';
    document.querySelector("#cor-escode2").style.display = 'block';
    cor()
}

function apareceTamanho() {
    document.querySelector(".tamanho-conteiner").style.display = 'block';
    document.querySelector(".btn-opt-filtro").style.display = 'flex';
    document.querySelector("#tamanho-escode").style.display = 'none';
    document.querySelector("#tamanho-escode2").style.display = 'block';
}

function aparecePreco() {
    document.querySelector(".preco-conteiner").style.display = 'block';
    document.querySelector(".btn-opt-filtro").style.display = 'flex';
    document.querySelector("#preco-escode").style.display = 'none';
    document.querySelector("#preco-escode2").style.display = 'block';
}

function escondeCor() {
    document.querySelector(".cor-conteiner").style.display = 'none';
    document.querySelector("#cor-escode").style.display = 'block';
    document.querySelector("#cor-escode2").style.display = 'none';
}

function escondeTamanho() {
    document.querySelector(".tamanho-conteiner").style.display = 'none';
    document.querySelector("#tamanho-escode").style.display = 'block';
    document.querySelector("#tamanho-escode2").style.display = 'none';
}

function escondePreco() {
    document.querySelector(".preco-conteiner").style.display = 'none';
    document.querySelector("#preco-escode").style.display = 'block';
    document.querySelector("#preco-escode2").style.display = 'none';
}

function limpar() {
    var l = document.getElementsByClassName("check");
    for (i = 0; i < l.length; i++)
        if (l[i].type == "checkbox")
            l[i].checked = 0
}

// Ordernar
function ord() {
    document.querySelector(".ord").style.display = 'block';
    document.querySelector("body").style.height = '200vh';
    document.querySelector("body").style.overflow = 'hidden';
}

function escondeOrd() {
    document.querySelector(".ord").style.display = 'none';
    document.querySelector("body").style.height = '100%';
    document.querySelector("body").style.overflow = 'visible';
}