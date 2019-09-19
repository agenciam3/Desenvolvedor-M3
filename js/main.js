(function(){
    // Função que inica todos os listener e chama a primeira renderização dos produtos
    function init(){
        getProdutos();

        // listener para click no botao filtro mobile
        document.getElementById("btn-filtrar").addEventListener("click",abrirMenuFiltro,false);
        document.getElementById("fechar-filtrar").addEventListener("click",fecharMenuFiltro,false);

        // listener para maximizar ou minimizar cores
        document.getElementById("maximizar-cores").addEventListener("click",maximizarCores,false);
        document.getElementById("minimizar-cores").addEventListener("click",minimizarCores,false);

        // listener para maximizar ou minimizar tamanhos
        document.getElementById("maximizar-tamanhos").addEventListener("click",maximizarTamanhos,false);
        document.getElementById("minimizar-tamanhos").addEventListener("click",minimizarTamanhos,false);

        // listener para maximizar ou minimizar precos
        document.getElementById("maximizar-precos").addEventListener("click",maximizarPrecos,false);
        document.getElementById("minimizar-precos").addEventListener("click",minimizarPrecos,false);

        // listener para quando cliente selecionar checkbox
        var checkboxArray = [...document.getElementsByClassName("checkbox")];
        checkboxArray.forEach(checkboxCor => checkboxCor.addEventListener("click",selecionarCheckbox,false));

        // listener para quando cliente selecionar tamanho
        var tamanhoOptionArray = [...document.getElementsByClassName("tamanho-option")];
        tamanhoOptionArray.forEach(tamanhoOption => tamanhoOption.addEventListener("click",selecionarTamanho,false));

        // listener para aplicar ou limpar filtro
        document.getElementById("btn-aplicar-filtro").addEventListener("click",aplicarFiltro,false);
        document.getElementById("btn-limpar-filtro").addEventListener("click",limparFiltro,false);

        // listener para abrir ou fechar menu Ordenar
        document.getElementById("btn-ordenar").addEventListener("click",abrirMenuOrdenar,false);
        document.getElementById("fechar-ordenar").addEventListener("click",fecharMenuOrdenar,false);
    }

    // Função para requisitar e abrir produtos.json
    function getProdutos(){
        var requestURL = "./api/produtos.json";
    
        fetch(requestURL).then(
            function(response){
            response.json()
                .then( renderizarProdutos )
                .catch(
                function(err){
                    console.error(err);
                }
            )
        }
        ).catch(
            function(err){
            console.error(err);
            }
        )
    }

    // Função que renderiza produtos na tela
    function renderizarProdutos(produtos){
    
        limparProdutos();

        var produtosFiltrados = filtrarProdutos(produtos);
        // var produtosOrdenados = ordenarProdutos(produtosFiltrados);
    
        var qtdParcelas = "";
        var valorParcela = "";
    
        for (var i = 0; i < produtosFiltrados.length; i++) {
    
          var sectionProduto = document.createElement('section');
            var imgProdutoElemento = document.createElement('img');
            var nomeProdutoElemento = document.createElement('h2');
            var precoProdutoElemento = document.createElement('p');
            var qtdParcelasElemento = document.createElement('span');
            var comprarBotaoElemento = document.createElement('button');

            var precoProduto = produtosFiltrados[i].preco.toFixed(2);
      
          imgProdutoElemento.src = produtosFiltrados[i].img;
          nomeProdutoElemento.textContent = produtosFiltrados[i].nome;
          precoProdutoElemento.textContent = 'R$: ' + precoProduto;
    
          if(produtosFiltrados[i].preco<350) qtdParcelas = 3;
          else  qtdParcelas = 5;

          valorParcela = produtosFiltrados[i].preco/qtdParcelas;

          var parcelaArredondada = parseFloat(valorParcela.toFixed(2));
          qtdParcelasElemento.textContent = 'até ' + qtdParcelas + 'x de R$' + parcelaArredondada;comprarBotaoElemento.textContent = "Comprar";
    
          sectionProduto.setAttribute("id","produto"+produtosFiltrados[i].id);
          sectionProduto.classList.add("produto-container");
    
          if(i>=6){
            sectionProduto.classList.add("esconder-elemento");
          }
    
          comprarBotaoElemento.classList.add("btn","btn-comprar");
          comprarBotaoElemento.setAttribute("id", "btn-comprar");
    
          sectionProduto.appendChild(imgProdutoElemento);
          sectionProduto.appendChild(nomeProdutoElemento);
          sectionProduto.appendChild(precoProdutoElemento);
          sectionProduto.appendChild(qtdParcelasElemento);
          sectionProduto.appendChild(comprarBotaoElemento);
    
          document.getElementById("produtos-secao").appendChild(sectionProduto);
        }
    }

    // Função que limpa produtos da tela
    function limparProdutos(){
        var produtos = document.querySelector("#produtos-secao"); 
        
        var child = produtos.lastElementChild;  
        while (child) { 
            produtos.removeChild(child); 
            child = produtos.lastElementChild; 
        } 
    }
    
    // Função que filtra produtos de acordo com filtro aplicado  
    function filtrarProdutos(produtos){
    
        var filtro = getFilter();
    
        var filtroCores = filtro.slice(0,1);
        var filtroTamanhos = filtro.slice(1,2);
        var filtroPrecos = filtro.slice(2,3);
        
        // console.log("filtro cores:" + filtroCores);
        // console.log(filtroTamanhos);
        // console.log(filtroProdutos);
    
        // var produtosFiltrados = produtos.filter(produto => produto.cor.includes(filtroCores.filter(cores => cores.filter(function(cor){return cor;}))));
    
        // console.log(produtosFiltrados);
    
        // var produtosFiltrados = filtroCores.filter(cores => cores.filter( cor => produtos.filter(produto => produto.cor.includes(cor))));
    
        // var produtosFiltrados = produtos.filter(produto => produto.cor.filter( coresProduto => filtroCores.filter(cores => cores.filter(cor => console.log(cor)))));
        
        var produtosFiltroCor = []
    
        produtos.forEach(produto => {
            produto.cor.forEach(corProduto => {
                filtroCores.forEach(coresFiltro => {
                    coresFiltro.forEach(cor => {
                        if(cor == corProduto) {
                            produtosFiltroCor.push(produto)
                        }
                    })
                })
            })
        });
    
        var produtosFiltroTamanho = [];
    
        produtos.forEach(produto => {
            produto.tamanho.forEach(tamanhoProduto => {
                filtroTamanhos.forEach(tamanhoFiltro => {
                    tamanhoFiltro.forEach(tamanho => {
                        if(tamanho == tamanhoProduto) { 
                            produtosFiltroTamanho.push(produto)
                        }
                    })
                })
            })
        });

        // var produtosFiltroPreco = [];
    
        // produtos.forEach(produto => {
        //     produto.preco.forEach(preco => {
        //         filtroPrecos.forEach(precoFiltro => {
        //             if(preco == precoFiltro) { 
        //                 produtosFiltroPreco.push(produto)
        //             }
        //         })
        //     })
        // });
    
        var produtosFiltrados = [];
        
        if(produtosFiltroCor.length > 0 && produtosFiltroTamanho.length > 0) {
            produtosFiltroCor.forEach(pCor => {
                produtosFiltroTamanho.forEach(pTam => {
                    if(pCor.id == pTam.id) { produtosFiltrados.push(pCor)};
                })
            })
        } else if(produtosFiltroCor.length > 0 ){
            produtosFiltrados = produtosFiltroCor;
        } else if(produtosFiltroTamanho.length > 0){
            produtosFiltrados = produtosFiltroTamanho;
        } else {
            produtosFiltrados = produtos;
        }
    
        // console.log(produtosFiltroCor);
        // console.log(produtosFiltrotamanho);
        console.log(produtosFiltrados);
        
        return produtosFiltrados;
    }
    
    // Função que captura as informações do filtro
    function getFilter(){
    
        var filtro = [];
    
        var coresSelecionadasArray = [...document.getElementsByClassName('cor-selecionada mostrar-elemento')];
        var tamanhosSelecionadosArray = [ ...document.getElementsByClassName('tamanho-selecionado')];
        var precosSelecionadosArray = [ ...document.getElementsByClassName('preco-selecionado mostrar-elemento')];
        
        var coresSelecionadas = coresSelecionadasArray.map( function(cores){
            return cores.getAttribute("id");
        })
    
        var tamanhosSelecionados = tamanhosSelecionadosArray.map( function(tamanhos){
            return tamanhos.getAttribute("id");
        })
    
        var precosSelecionados = precosSelecionadosArray.map( function(precos){
            return precos.getAttribute("id");
        })
    
        filtro.push(coresSelecionadas);
        filtro.push(tamanhosSelecionados);
        filtro.push(precosSelecionados);
    
        return filtro;
    }
    
    // Função que ordena os produtos
    function ordenarProdutos(produtos){
    //     var ordem = getOrder();
    
    //     return produtosOrdenados;
    }
    
    // Função que pega o valor da ordem escolhida pelo usuário
    function getOrder(ev){
    
        // console.log(ev);
        
        // var ordem = 1;
    
        // var botaoMaisRecente = document.getElementById('mais-recente');
        // var botaoMenorPreco = document.getElementById('menor-preco');
        // var botaoMaiorPreco = document.getElementById('maior-preco');
    
        // console.log(botaoMaiorPreco);
        // botaoMaisRecente.onclick = function(){
        //     ordem = 1;
        // }
    
        // botaoMenorPreco.onclick = function(){
        //     ordem = 2;
        //     console.log('oi');
        // }
        // botaoMaiorPreco.onclick = function(){
        //     ordem = 3;
        // }
        
        // console.log(ordem);
    
    
    
        // return ordem;
    }
    
    // Função para abrir o Menu de Filtro
    function abrirMenuFiltro(){
        limparFiltro();
        document.getElementById("filtrar-menu").classList.add("mostrar-elemento");
        document.getElementById("ordenar-menu").classList.add("esconder-elemento");
        document.getElementById("conteudo-principal").classList.add("esconder-elemento");
        document.getElementById("btn-carregar-produtos").classList.add("esconder-elemento");
        document.getElementById("produtos-secao").classList.add("esconder-elemento");
    }

    // Função para fechar o Menu de Filtro
    function fecharMenuFiltro(){
        document.getElementById("filtrar-menu").classList.remove("mostrar-elemento");
        document.getElementById("ordenar-menu").classList.remove("esconder-elemento");
        document.getElementById("conteudo-principal").classList.remove("esconder-elemento");
        document.getElementById("btn-carregar-produtos").classList.remove("esconder-elemento");
        document.getElementById("produtos-secao").classList.remove("esconder-elemento");
    }

    // Função para Maximizar Cores
    function maximizarCores(){
        document.getElementById("cores-container").classList.remove("esconder-elemento");
        document.getElementById("minimizar-cores").classList.remove("esconder-elemento");
        document.getElementById("maximizar-cores").classList.add("esconder-elemento");
    }

    // Função para Minimizar Cores
    function minimizarCores(){
        document.getElementById("cores-container").classList.add("esconder-elemento");
        document.getElementById("minimizar-cores").classList.add("esconder-elemento");
        document.getElementById("maximizar-cores").classList.remove("esconder-elemento");
    }

    // Função para maximizar tamanhos
    function maximizarTamanhos(){
        document.getElementById("tamanhos-container").classList.remove("esconder-elemento");
        document.getElementById("minimizar-tamanhos").classList.remove("esconder-elemento");
        document.getElementById("maximizar-tamanhos").classList.add("esconder-elemento");
    }
    
    // Função para minimizar tamanhos
    function minimizarTamanhos(){
        document.getElementById("tamanhos-container").classList.add("esconder-elemento");
        document.getElementById("minimizar-tamanhos").classList.add("esconder-elemento");
        document.getElementById("maximizar-tamanhos").classList.remove("esconder-elemento");
    }

    // Função para maximizar os preços
    function maximizarPrecos(){
        document.getElementById("precos-container").classList.remove("esconder-elemento");
        document.getElementById("minimizar-precos").classList.remove("esconder-elemento");
        document.getElementById("maximizar-precos").classList.add("esconder-elemento");
    }

    // Função para maximizar os preços
    function minimizarPrecos(){
        document.getElementById("precos-container").classList.add("esconder-elemento");
        document.getElementById("minimizar-precos").classList.add("esconder-elemento");
        document.getElementById("maximizar-precos").classList.remove("esconder-elemento");
    }

    // Função que seleciona e tira da seleção cores e preços
    function selecionarCheckbox(event){
        if(event.target.classList == "checkbox"){
            if(event.target.childNodes[1].classList.length <= 1){
                event.target.childNodes[1].classList.add("mostrar-elemento");
            }else{
                event.target.childNodes[1].classList.remove("mostrar-elemento");
            }
        }else{
            if(event.target.classList.length <= 1){
                event.target.classList.add("mostrar-elemento");
            }else{
                event.target.classList.remove("mostrar-elemento");
            }
        }
    }

    // Função que seleciona e tira seleção de tamanho
    function selecionarTamanho(event){
        if(event.target.classList.length <= 1){
            event.target.classList.add("tamanho-selecionado");
        }else{
            event.target.classList.remove("tamanho-selecionado");
        }
    }

    // Função para aplicar filtro selecionado
    function aplicarFiltro(){
        getProdutos();
        fecharMenuFiltro();
    }

    // Função para limpar filtro selecionado
    function limparFiltro(){
        var checkboxArray = [...document.getElementsByClassName("checkbox")];
        checkboxArray.forEach(element => element.childNodes[1].classList.remove("mostrar-elemento"));

        var tamanhoOptionArray = [...document.getElementsByClassName("tamanho-option")];
        tamanhoOptionArray.forEach(element => element.classList.remove("tamanho-selecionado"));

        getProdutos();
    }

    // Função para fechar Menu Ordenar
    function fecharMenuOrdenar(){
        document.getElementById("filtrar-menu").classList.remove("esconder-elemento");
        document.getElementById("ordenar-menu").classList.remove("mostrar-elemento");
        document.getElementById("conteudo-principal").classList.remove("esconder-elemento");
        document.getElementById("btn-carregar-produtos").classList.remove("esconder-elemento");
        document.getElementById("produtos-secao").classList.remove("esconder-elemento");
    }

    // Função para abrir Menu Ordenar
    function abrirMenuOrdenar(){
        document.getElementById("filtrar-menu").classList.add("esconder-elemento");
        document.getElementById("ordenar-menu").classList.add("mostrar-elemento");
        document.getElementById("conteudo-principal").classList.add("esconder-elemento");
        document.getElementById("btn-carregar-produtos").classList.add("esconder-elemento");
        document.getElementById("produtos-secao").classList.add("esconder-elemento");
    }

    init();
        
    // var bagQtd = 0;

    // // Atualiza quantidade de itens na sacola
    // function atualizaQtdBag(){
    //     document.getElementById('bag-qtd').textContent = bagQtd;
    // }

    // bagQtd++;

    // atualizaQtdBag();
})();


