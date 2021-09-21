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
  
    $('.checkbox-custom').on("click", function () {
      var filtros = [];
      var removeOn = [];
      var checkbox = document.getElementsByClassName("checkbox-custom");
      
      for (var item = 0; item < checkbox.length; item++) {
        if (checkbox[item].checked) {
          filtros.push(checkbox[item].value);
        } else {
          continue;
        }
      }
      for (var x = 0; x < filtros.length; x++) {
        if (filtros[x] == "on") {
          continue;
        } else {
          removeOn.push(filtros[x]);
        }
      }
      filtros = removeOn;
  
      if (filtros.length == 0) {
        gridProdutos(produtos);
      } else {
        filtrarCor(filtros, produtos);
      }
    });
  
  }
  
  function preenchendoCores(cores) { 
  
    //  name: nome do array do json --- value/id: cada item de informação do json
    for (var c = 0; c < cores.length; c++) { 
      var elementColor = `<div>`;  
      elementColor +=`<input type="checkbox" class="checkbox-custom" name="cores" value= ${cores[c].OptionColor} id=${cores[c].OptionColor}>`;
      elementColor +=`<label for=${cores[c].OptionColor} class="checkbox-custom-label"> ${cores[c].OptionColor} </label>`;
      elementColor += `</div>`;
  
      //Mobile
      if($(window).width() < 576){ 
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
        var elementTamanhos = `<button class="button-custom ${tamanhos[t].descricao}"><span>${tamanhos[t].descricao}</span></button>`
      
      $("#PanelTam").append(elementTamanhos);
      $("#Tamanhos").append(elementTamanhos);
    }
  }

  function preenchendoFaixaPreco(faixa){

    for (var f = 0; f < faixa.length; f++) { 
      var elementPrice = `<div>`;  
      elementPrice +=`<input type="checkbox" class="checkbox-custom" name="faixa" value= ${faixa[f].preco} id=${faixa[f].preco}>`;
      elementPrice +=`<label for=${faixa[f].preco} class="checkbox-custom-label"> ${faixa[f].legenda} </label>`;
      elementPrice += `</div>`;
  
      //Mobile
      if($(window).width() < 576){ 
        $("#PanelPreco").append(elementPrice);
      }  
      //Desktop
      else{ 
        $("#Faixa_Preco").append(elementPrice);
      }  
    }
  }
  
  function gridProdutos(produtos) {
  
    $("#grid_produtos").html('');
  
    for (var x = 0; x < produtos.length; x++) {
      var elementProduto = `<div class="box">`;
      elementProduto += `<img class="" src=${produtos[x].image} >`;
      elementProduto += `<p>${produtos[x].produto}</p>`;
        elementProduto += `<p>R$ ${produtos[x].valor}</p>`;
      elementProduto += `<p>${produtos[x].parcela}</p>`;
      elementProduto += `<button><span>Comprar</span></button>`;
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
  
  function filtrarCor(filtros, produtos) {
    var produtosFiltrados = [];
    for (item = 0; item < filtros.length; item++) {
      var filtro = filtros[item];
      for (var x = 0; x < produtos.length; x++) {
        if (produtos[x].cor == filtro) {
          produtosFiltrados.push(produtos[x]);
        }
      }
    }
    gridProdutos(produtosFiltrados);
  }
  
  function OpenFilters(){
    $(".FilterAccordion").show( 1500 );
    $(".Content-filter").hide( 1500 );
  }
  
  function OpenOrder(){
    $(".FilterOrder").show( 1500 );
    $(".Content-filter").hide( 1500 );
  }
  