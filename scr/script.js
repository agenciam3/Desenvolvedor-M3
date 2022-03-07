import data from './data.js';


function x() {
    //Orderar produtos
    var select = document.querySelector(".ordem");
    var val = select.options[select.selectedIndex].value;

    function ordenar(va) {
        var value = va;
        if (value == 'recentes') {
            var y = data.produtos.sort((a, b) => a._id - b._id)

            y.reverse()
        } else {
            if (value == 'maior') {
                var y = data.produtos.sort((a, b) => a.preco - b.preco)
                y.reverse()
            } else {
                if (value == 'menor') {
                    var y = data.produtos.sort((a, b) => a.preco - b.preco)
                }
            }
        }
        return y;
    }

    //Reder dos produtos
    let prod = ordenar(val);
    let produto = '';
    prod.forEach(element => {
        produto += `
        <div class="produtos" id="${element._id}">
                    <img src="${element.img}" alt="${element.nome}">
                    <strong class="nome">${element.nome}</strong>
                    <span class="preco">R$ ${element.preco}</span>
                    <h4>${element.parcela}</h4>
                    <button type="button" class="compra" onclick="_contad()">COMPRAR</button>
                </div>`
    });
    const main = document.getElementById("main-container");
    main.innerHTML = produto;
    let resetProduto = produto;

    //Filtro dos produtos
    function filtro() {
        var info = document.querySelectorAll('[name=filter]:checked')
        var filtrado = [];
        for (var i = 0; i < info.length; i++) {
            filtrado.push(info[i].value);
        }
        var filtrados = prod.filter(function(a) {
            return filtrado.some(function(t) {
                let valores = '';
                if (a.preco > 0 && a.preco <= 50) {
                    valores = '0-50'
                } else if (a.preco > 50 && a.preco <= 150) {
                    valores = '51-150'
                } else if (a.preco > 150 && a.preco <= 300) {
                    valores = '151-300'
                } else if (a.preco > 300 && a.preco <= 500) {
                    valores = '301-500'
                } else if (a.preco > 1 && a.preco <= 500) {
                    valores = '1-500'
                };
                return a.cor === t || a.tamanho === t || valores === t;
            });
        });
        let produto = '';
        filtrados.forEach(element => {
            produto += `
        <div class="produtos" id="${element._id}">
                    <img src="${element.img}" alt="${element.nome}">
                    <strong class="nome">${element.nome}</strong>
                    <span class="preco">R$ ${element.preco}</span>
                    <h4>${element.parcela}</h4>
                    <button type="button" class="compra" onclick="_contad()">COMPRAR</button>
                </div>`
        });
        const main = document.getElementById("main-container");
        if (filtrado == '') {
            main.innerHTML = resetProduto;
            var pai = document.getElementById("main-container");
            for (var i = 0; i < pai.children.length; i++) {
                if (i > 8) {
                    pai.children[i].style.display = "none";
                    document.getElementById("mais").style.display = 'flex';
                }
            }
        } else {
            main.innerHTML = produto;
        }
    };
    var checkboxes = document.querySelectorAll('[name=filter]');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('click', filtro, false);
    }

    //setar quantidade de produtos
    var pai = document.getElementById("main-container");
    for (var i = 0; i < pai.children.length; i++) {
        if (i > 8) {
            pai.children[i].style.display = "none";
        }
    }
}

function load() {
    var el = document.getElementById("ordem");
    el.addEventListener("click", x, false);
}
load()
x();