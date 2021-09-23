  $(document).ready(function () {
    var requestURL = "/layout/Assets/Json/dados.json";
    var request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();
    request.onload = function () {
      var estoque = request.response;
      populateEstoque(estoque);
    };

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      });
    }

    $(".FilterTitle").on("click", function () {
      $(".FilterAccordion").hide( 1500 );
      $( ".FilterOrder").hide( 1500 );
      $(".Content-filter").show( 1500 );
    });    
    

    
  });
    
  //Funções chamadas
  
  let AddProduto = document.querySelectorAll('#addProduct');
    
    for(var i=0; i < AddProduto.length; i++){
      AddProduto[i].addEventListener('click', () => {
        // ProdutoNumber();
        // console.log("EU");
      })
    }

  // function ProdutoNumber(){
  //   console.log("Eu aqui")
  // }

  function populateEstoque(jsonObj) {
    var cores = jsonObj["Cores"];
    var tamanhos = jsonObj["Tamanhos"];
    var faixa = jsonObj["Faixa"];
    var produtos = jsonObj["Produtos"];
  
    preenchendoCores(cores);
    preenchendoTamanhos(tamanhos);
    preenchendoFaixaPreco(faixa);
    gridProdutos(produtos);
  
    $("select").change(function () {
      filtrarPreco(this.value, produtos);
    });

  }

  function preenchendoCores(cores) { 

    for (var c = 0; c < cores.length; c++) { 
      var elementColor = `<div>`;  
      elementColor +=`<input type="checkbox" class="checkbox-custom" name="cores" onchange="change()" rel=${cores[c].OptionColor} value= ${cores[c].OptionColor} id=${cores[c].OptionColor}>`;
      elementColor +=`<label for=${cores[c].OptionColor} class="checkbox-custom-label"> ${cores[c].OptionColor} </label>`;
      elementColor += `</div>`;
  
      //Mobile
      if($(window).width() <= 576){ 
        $("#PanelCores").append(elementColor);
      }  
      //Desktop
      else{ 
        $("#Colors").append(elementColor);
      }  
    }
     
  }
  
  function preenchendoTamanhos(tamanhos) {

    for (var t = 0; t < tamanhos.length; t++) {
      var elementTamanhos = `<div>`;  
      elementTamanhos +=`<input type="checkbox" class="checkbox-custom-tam" name="tamanho" onchange="change()" rel=${tamanhos[t].descricao} value= ${tamanhos[t].descricao} id=${tamanhos[t].descricao}>`;
      elementTamanhos +=`<label for=${tamanhos[t].descricao} class="checkbox-custom-tam-label"><span>${tamanhos[t].descricao}</span></label>`;
      elementTamanhos += `</div>`;

      //Mobile
      if($(window).width() <= 576){ 
        $("#PanelTam").append(elementTamanhos);
      }  
      //Desktop
      else{ 
        $("#Tamanhos").append(elementTamanhos);
      } 
    }
  }

  function preenchendoFaixaPreco(faixa){

    for (var f = 0; f < faixa.length; f++) { 
      var elementPrice = `<div>`;  
      elementPrice +=`<input type="checkbox" class="checkbox-custom" name="faixa" onchange="change()" rel=${faixa[f].preco} value= ${faixa[f].preco} id=${faixa[f].preco}>`;
      elementPrice +=`<label for=${faixa[f].preco} class="checkbox-custom-label"> ${faixa[f].legenda} </label>`;
      elementPrice += `</div>`;
  
      //Mobile
      if($(window).width() <= 576){ 
        $("#PanelPreco").append(elementPrice);
      }  
      //Desktop
      else{ 
        $("#Faixa_Preco").append(elementPrice);
      }  
    }
  }
  
  function gridProdutos(produtos) {
  
    for (var x = 0; x < produtos.length; x++) {
      var elementProduto = `<div class="box ${produtos[x].cor} ${produtos[x].tamanho} ${produtos[x].valor}">`;
      elementProduto += `<img class="" src=${produtos[x].image} >`;
      elementProduto += `<p>${produtos[x].produto}</p>`;
      elementProduto += `<p>R$ ${produtos[x].valor}</p>`;
      elementProduto += `<p>${produtos[x].parcela}</p>`;
      elementProduto += `<button id="addProduct"><span>Comprar</span></button>`;
      elementProduto += `</div>`;
      $("#grid_produtos").append(elementProduto);
    }
  }
  
  function filtrarPreco(value, produtos) {
    
    if (value == "menor") {
      produtos.sort(function (a, b) {
        return a.valor - b.valor;
      });
      gridProdutos(produtos);
    } else if (value == "maior") {
      produtos.sort(function (a, b) {
        return b.valor - a.valor;
      });
      gridProdutos(produtos);
    } else {
      console.log("Não foi possivel filtrar");
    }
  }
  
  function openModal(){
   document.getElementById("OpenModal").style.display = "block";
  }
  
  function closeModal(){
    document.getElementById("OpenModal").style.display = "none";
  }

  function OpenFilters(){
    $(".FilterAccordion").show( 500 );
    $(".Content-filter").hide( 500 );
  }
  
  function OpenOrder(){
    $(".FilterOrder").show( 500 );
    $(".Content-filter").hide( 500 );
  }


  