/* Aqui estao todas as funcoes resposaveis por gerar os controles e manter o front-end*/

/*Variaveis Globais */
// filtrar os produtos e editar queryString 
var coresCounter = 0, qntProdutos;
var tamanhos = [];
var cores = [];
var precos = [];
var produtosDepoisDoFiltroTamanho = [], produtosDepoisDoFiltroCor = [], produtosCarrinho = [], produtosDepoisDeTodosOsFiltros = [];
const queryString = location.search;
var url;
var objGlobal;

// controlar elementos
var divCoresColapsada = false;
var carrinhoAberto = false;

// ordernar os produtos
var selectOption = 0;

// expandir cores()
var alturaMax = 0;
var contadorElementosCores = 0;



// Insere ou apaga certos itens na query string. 
// "valor" é o valor  da propriedade e "inputType" indica 
// se o usuario esta clickando em um item das cores, tamanho
// ou faixa de preço.
function editQueryString(valor, inputType = "checkbox") {
    var aux = [];
    url = new URL(location.href);
    var input = document.getElementById(valor);
    // estes if´s que determinam o comportamento de cada input.
    // Os codigos tem algumas semelhanças. Primeiro, ele determina 
    // se tem alguma propriedade se repetindo e salva seus valores. 
    // Depois, apaga-se toda query string e insere apenas os itens
    // que não se repetem.
    if (inputType == "checkbox") {
        if (input.checked == false) {
            url.searchParams.forEach(function (value, key, parent) {
                //console.log(valor + "| " + value);
                if (value != valor & key == "cor") {
                    aux.push(value);
                }
            });
            url.searchParams.delete("cor");
            aux.forEach(function (x) {
                url.searchParams.append("cor", x);
            });
        } else {
            url.searchParams.append("cor", valor);
        }
    } if (inputType == "preco") {
        if (input.checked == false) {
            url.searchParams.forEach(function (value, key, parent) {
                if (value != valor & key == "preco") {
                    aux.push(value);
                }
            });
            url.searchParams.delete("preco");
            aux.forEach(function (x) {
                url.searchParams.append("preco", x);
            });
        } else {
            url.searchParams.append("preco", valor);
        }
    }
    if (inputType == "produto") {
        url.searchParams.forEach(function (value, key, parent) {
            console.log(valor + "| " + value);
            if (value == valor & key == "produto") {
                aux.push(value);
            }
        });
    }

    if (inputType == "tamanho") {
        if (input.className == "false") {
            input.className = "true";
            input.style.borderColor = "#00c0ee";
            url.searchParams.append("tamanho", valor);

        } else {
            input.className = "false";
            input.style.borderColor = "#c7c7c7";
            aux = [];
            url.searchParams.forEach(function (value, key, parent) {
                console.log(value + " | " + key);
                if (value != valor & key == "tamanho") {
                    aux.push(value);
                }
            });
            url.searchParams.delete("tamanho");
            aux.forEach(function (x) {
                url.searchParams.append("tamanho", x);
            });
        }

    } if (inputType == "btn") {
        url.searchParams.append("produto", valor);

    }
    window.open(url, "_self"); // Por fim, recarrega-se a pagina
}



// Pega a query string, filtra os paramentros, filta os produtos que 
// satisfazem a eles e imprime na tela.
function FiltrarElementos(qntProdutos, obj) {
    objGlobal = obj;
    const parametros = new URLSearchParams(queryString);
    if (queryString != "") {
        for (const [key, value] of parametros) {
            if (key == "tamanho") {

                tamanhos.push(value);
                document.getElementById(value).className = "true";
                document.getElementById(value).style.borderColor = "#00c0ee";
            }
            if (key == "cor") {
                cores.push(value);
            }
            if (key == "preco") {
                precos.push(value);
                document.getElementById(value).checked = true;
            }
            if (key == "produto") {
                produtosCarrinho.push(value);
            }
        }
        console.log(tamanhos);
        console.log(cores);
        console.log(precos);
        if (cores.length == 0) {
            var item = document.getElementsByClassName("box-cores")[0].childNodes;

            for (var x = 0; x < item.length; x++) {
                if (item[x].id) {
                    cores.push(item[x].id);
                }


            }

        }
        //Filtrando produtos que respeitem ao primeiro filtro, das cores   
        while (coresCounter < cores.length) {
            for (var x = 0; x < qntProdutos; x++) {
                var produto = obj.produtos[x];
                if (produto.cor == cores[coresCounter]) {
                    produtosDepoisDoFiltroCor.push(produto.id);
                }
            }
            try {
                document.getElementById(cores[coresCounter]).checked = true;
            } catch {

            }
            coresCounter++;
        }
        console.log(produtosDepoisDoFiltroCor);

        //Agora filtrando os produtos pelo tamanho
        if (tamanhos.length > 0) {
            produtosDepoisDoFiltroCor.forEach(function (x) {
                tamanhos.forEach(function (y) {
                    //   console.log("com: " + obj.produtos[x - 1].tamanho +" com "+ y);
                    if (obj.produtos[x - 1].tamanho == y) {
                        produtosDepoisDoFiltroTamanho.push(obj.produtos[x - 1].id);
                    }
                });
            });
        }
        else {
            produtosDepoisDoFiltroTamanho = produtosDepoisDoFiltroCor;
        }
        console.log(produtosDepoisDoFiltroTamanho);
        console.log(precos.length);

        //filtrando por preco
        if (precos.length > 0) {

            produtosDepoisDoFiltroTamanho.forEach(function (x) {
                precos.forEach(function (y) {
                    var produto = obj.produtos[x - 1];
                    if (produto.valor >= y && produto.valor <= (parseInt(y) + 100)) {
                        var z = parseInt(y) + 100;
                          addProduto(produto.nome, produto.valor, produto.img, produto.id);
                    }
                });
            });
        } else {
               produtosDepoisDoFiltroTamanho.forEach(function (x) {
             var produto = obj.produtos[x - 1];
                addProduto(produto.nome, produto.valor, produto.img, produto.id);

               });
            produtosDepoisDeTodosOsFiltros = produtosDepoisDoFiltroTamanho;
        }
        //ordenando
   
        switch (selectOption) {
            case 1:  // mais recentes
                produtosDepoisDeTodosOsFiltros.forEach(function (e) {
                    addProduto(e.nome, e.valor, e.img);
                });
                break;

            case 2: // menor preços
                    break;
            case 3: // maior preco
                break;


        }

    } else {
        for (var x = 0; x < qntProdutos; x++) {
            var produto = obj.produtos[x];
            addProduto(produto.nome, produto.valor, produto.img);
        }
    }
    if (document.getElementsByClassName("produtos")[0].childNodes.length < 2) {
        document.getElementsByClassName("produtos")[0].innerHTML += "<h2>Nenhum produto encontrado :(</h2></br>";
    }
}

// estas funcoes adicionam os controles na div da esqueda (.seletores)
function addCategoriaCor(cor, numElementosNaBox = 5) {
    numElementosNaBox--;
    if (document.getElementById(cor) == null) { //checando se já tem algum elemento com o mesmo id
        var divPai = document.getElementsByClassName("box-cores")[0];

        //adicionando input e label
        divPai.innerHTML += '<input type="checkbox" id="' + cor + '" onClick="editQueryString(\'' + cor + '\')"/>';
        divPai.innerHTML += "<label for='" + cor + "'> " + cor + "</label></br>";
        if (contadorElementosCores == numElementosNaBox) {
            alturaMax = document.getElementsByClassName("box-cores")[0].clientHeight;

        }

        contadorElementosCores++;

    }
}
function addCategoriasTamanho(tam) {
    if (document.getElementById(tam) == null) {
        var divPai = document.getElementsByClassName("box-tamanho")[0];
        divPai.innerHTML += '<div class="false" id="' + tam + '" onClick="editQueryString(\'' + tam + '\',\'tamanho\')">' + tam + '</div>';
    }
}
var PrecoMax = 0;
function addCategoriasFaixaDePreco(preco = 0, loopAcabado = false) {
    if (preco > PrecoMax) {
        PrecoMax = preco;
    }
    if (loopAcabado == true) {
        for (var x = 0; x < PrecoMax; x += 100) { // é adicionado um valor de $100 para cada categoria

            var divPai = document.getElementsByClassName("box-valor")[0];
            var input = document.createElement("input");
            /*  input.type = "checkbox";
              input.id = x;
              divPai.appendChild(input);*/
            divPai.innerHTML += '<input type="checkbox" id="' + x + '" onClick="editQueryString(\'' + x + '\',\'preco\')"/>';

            divPai.innerHTML += "<label for='" + x + "'> de R$" + x + " até R$" + (x + 100) + "</label></br>";

        }
    }
}
function addProduto(nome, preco, img, id) {
    var divPai = document.getElementsByClassName("produtos")[0];
    var div = document.createElement("div");
    div.id = id;
    var imagem = document.createElement("img");
    imagem.src = "imagens/" + img;
    var span = document.createElement("span");
    span.innerText = nome;
    var h3 = document.createElement("h3");
    h3.innerText = "R$" + preco;

    div.appendChild(imagem);
    div.innerHTML += "</br>"
    div.appendChild(span);
    //div.innerHTML += "</br>"
    div.appendChild(h3);
    //div.innerHTML += "</br>"
    if (preco < 130) {
        div.innerHTML += "<span style='margin-top:0px'> até 3x de R$" + (preco / 3).toFixed(2) + "</span>";
    } else {
        div.innerHTML += "<span style='margin-top:0px'> até 5x de R$" + (preco / 5).toFixed(2) + "</span>"
    }
    div.innerHTML += '<button onclick="editQueryString(\'' + nome + '\',\'btn\')"><h3>Comprar</h3></button>';
    divPai.appendChild(div);
}
var preco = 0;
var precoTotal = 0;

// adiciona um item no carrinho e atualiza o subtotal
function addItensCarrinho() {
    produtosCarrinho.forEach(function (c) {
        objGlobal.produtos.forEach(function (e) {
            if (e.nome == c) {
                preco = e.valor;
            }
        });
        var divpai = document.getElementsByClassName("carrinho")[0];

        divpai.innerHTML += '<div id=\'' + c + '\' onclick=""><div><h3>' + c + '</h3><span>R$' + preco + '</span></div></div>';
        precoTotal += preco;
        document.getElementById("total").innerText = "Total: R$" + precoTotal;

    });

}
function removerItemCarrinho(item) {
    
}
// mostra mais opções de cores no 'box-cores'
function expandirCores() {
    divCoresColapsada = !divCoresColapsada;
    if (divCoresColapsada) {
        document.getElementsByClassName("box-cores")[0].style.height = alturaMax + "px";
        document.getElementById("mostrar-opcoes").innerText = "Ver todas cores ▼";
    } else {
        document.getElementsByClassName("box-cores")[0].style.height = "auto";
        document.getElementById("mostrar-opcoes").innerText = "esconder opções ▲";

    }
}
// Abre e fecha a div do carrinho
function toogleCarrinho() {
    if (carrinhoAberto) {
        document.getElementsByClassName("carrinho")[0].style.display = "block"
    } else {
        document.getElementsByClassName("carrinho")[0].style.display = "none";
    }
    carrinhoAberto = !carrinhoAberto;
}
function selectionMudada(valor) {
}