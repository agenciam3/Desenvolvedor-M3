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
    
    LoadQtdProduto();
    ContentModal();
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

    $("FilterOrderBtn button").on('click', function(){
      filtrarPrecoMob(this.value, produtos);
    });

    let Products = document.querySelectorAll('.add-product');
    
    for (let i=0; i < Products.length; i++) {
  
      Products[i].addEventListener('click', () => {
        QtdProduto(produtos[i]);
        TotalProduto(produtos[i]);
      })
    }

  var allCheckboxes = document.querySelectorAll("input[type=checkbox]");
  var allClothes = Array.from(document.querySelectorAll(".box"));
  var checked = {};

  getChecked("cores");
  getChecked("tamanho");
  getChecked("faixa");

  Array.prototype.forEach.call(allCheckboxes, function (el) {
    el.addEventListener("change", toggleCheckbox);
  });

  function toggleCheckbox(e) {
    getChecked(e.target.name);
    setVisibility();
  }

  function getChecked(name) {
    checked[name] = Array.from(
      document.querySelectorAll("input[name=" + name + "]:checked")
    ).map(function (el) {
      return el.value;
    });
  }

  function setVisibility() {
    var array1 = [];
    for (var i = 0; i < checked.faixa.length; i++) {
      var menor = Number(checked.faixa[i].split("/")[0]);
      var maior = Number(checked.faixa[i].split("/")[1]);
      array1.push(menor);
      array1.push(maior);
    }

    allClothes.map(function (el) {
      var cores = checked.cores.length
        ? intersectArray(Array.from(el.classList), checked.cores).length
        : true;
      var tamanho = checked.tamanho.length
        ? intersectArray(Array.from(el.classList), checked.tamanho).length
        : true;
      var faixa = checked.faixa.length ? true : false;

      var limite = true;
      if (faixa == true) {
        var limite =
          (el.classList[3] >= array1[0] && el.classList[3]) <= array1[array1.length - 1]
            ? true
            : false;
      }

      if (cores && tamanho && limite) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    });

    function intersectArray(arr1, arr2) {
      const set = new Set(arr2);
      const intersection = new Set(arr1.filter((elem) => set.has(elem)));
      return Array.from(intersection);
    }
  }
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
      elementProduto += `<button class="add-product"><span>Comprar</span></button>`;
      elementProduto += `</div>`;
      $("#grid_produtos").append(elementProduto);
    }
  }
  
  function filtrarPreco(value, produtos) {
   
    if (value == "menor") {
      console.log("ALo")
      produtos.sort(function (a, b) {
        return a.valor - b.valor;
      });
      gridProdutos(produtos);
    } else if (value == "maior") {
      produtos.sort(function (a, b) {
        return b.valor - a.valor;
      });
      gridProdutos(produtos);
    }
  }

  function filtrarPrecoMob(value, produtos) {
   
    if (value == "menorMob") {
      console.log("ALo")
      produtos.sort(function (a, b) {
        return a.valor - b.valor;
      });
      gridProdutos(produtos);
    } else if (value == "maiorMob") {
      produtos.sort(function (a, b) {
        return b.valor - a.valor;
      });
      gridProdutos(produtos);
    }
  }

  
  function LoadQtdProduto(){

    let productItem = localStorage.getItem('QtdProduto');

    if(productItem){
      document.querySelector('.backSpan span').textContent = productItem;
    }
  }

  function QtdProduto(produtos){

    let productItem = localStorage.getItem('QtdProduto');
    productItem = parseInt(productItem);

    if(productItem){
      localStorage.setItem('QtdProduto', productItem + 1);
      document.querySelector('.backSpan span').textContent = productItem + 1;
    } 
    else {
      localStorage.setItem('QtdProduto', 1);
      document.querySelector('.backSpan span').textContent = 1;
    }

    addProduto(produtos);
  }

  function addProduto(produtos){

    let BoxItens = localStorage.getItem("ProdutosModal");

    BoxItens = JSON.parse(BoxItens);

    if(BoxItens != null){

      if(BoxItens[produtos.tag] == undefined){

        BoxItens = {
          ...BoxItens,
          [produtos.tag] : produtos
        }
      }
      BoxItens[produtos.tag].modal += 1;
    } 
    else{ 
      produtos.modal = 1
      BoxItens = {
        [produtos.tag] : produtos
      }
    }
   
    localStorage.setItem("ProdutosModal", JSON.stringify(BoxItens));
  }
  
  function TotalProduto(produtos){

    console.log(produtos.valor)


    let BoxPrice = localStorage.getItem('total');

    if(BoxPrice != null){
      BoxPrice = parseInt(BoxPrice);
      localStorage.setItem("total", BoxPrice + produtos.valor);
    }
    else{
      localStorage.setItem("total", produtos.valor);
    }

  }

  function ContentModal() {
    
    BoxItens = localStorage.getItem("ProdutosModal");

    BoxItens = JSON.parse(BoxItens);
    
    let intemModal = document.querySelector(".modalProduct");

    console.log(BoxItens)

    if(BoxItens && intemModal){

      Object.values(BoxItens).map( item =>{
        intemModal.innerHTML += ` <div class="alinharModal" >
          <div class="alinharItem">
            <img class="imgModal" src=${item.image} >
            <h5>${item.produto}</h5>
          </div>
          <h5>R$${item.valor}</h5>
          <h5>${item.modal}</h5>
         <h5> R$ ${item.modal * item.valor},00 </h5>
          </div>
        `
      });

    }

  }

  function openModal(){
   document.getElementById("OpenModal").style.display = "block";
  }
  
  function closeModal(){
    document.getElementById("OpenModal").style.display = "none";
  }

  function OpenFilters(){
    $(".FilterAccordion").show( 1500 );
    $(".Content-filter").hide( 1500 );
  }
  
  function OpenOrder(){
    $(".FilterOrder").show( 1500 );
    $(".Content-filter").hide( 1500 );
  }

  