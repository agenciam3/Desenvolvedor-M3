// Aqui começa o consumo e mostragem da API de Produtos
const urlBase = 'http://localhost:5000/products';

function fazGet(url) {
  let request = new XMLHttpRequest();
  request.open('GET', url, false)
  request.send()
  return request.responseText
}

function criaProduto(produto) {
  box = document.createElement('div');
  box.classList.add('maxProductContent');
  boxContent = document.createElement('div');
  boxContent.classList.add('product-box');

  boxContent.innerHTML = `
  <img src="${produto.image}" class="product-box__image"/>
  <h2 class="product-box__name">${produto.name}</h2>
  <h3 class="product-box__price">R$ ${produto.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h3>
  <p class="product-box__installments"> Até ${produto.parcelamento[0]}x de R$ ${produto.parcelamento[1]} </p>
  <button class="buy-button">COMPRAR</button>
  `;
  box.appendChild(boxContent);

  return box;
}

function main() {
  let data = fazGet(urlBase);
  let produtos = JSON.parse(data);
  let boxes = document.getElementById('productBox');
  
//para cada produto criar um box de produto e adicionar nesse box
  produtos.forEach(element => {
    console.log(element)
    let produto = criaProduto(element);
    boxes.appendChild(box)
  });
}

main()
/* 
  ***************************************
  ***** AQUI ACABA O CONSUMO DA API *****
  *************************************** 
*/

// AQUI COMEÇA A PARTE DE ABERTURA DE MODAIS, SCROLL "INFINITO" e DEMAIS funções do projeto
$ = jQuery;

$(function () {
  if($(window).width() < 768) {
    console.log('mobile esta a partir daqui')
    $(".maxProductContent").slice(0, 4).show();
  } else {
    $(".maxProductContent").slice(0, 9).show();
  }
  $("body").on('click touchstart', '.load-more', function (e) {
    e.preventDefault();

    if($(window).width() < 768) {
      $(".maxProductContent:hidden").slice(0, 4).slideDown();
    } else {
      $(".maxProductContent:hidden").slice(0, 3).slideDown();
    }
    if ($(".maxProductContent:hidden").length == 0) {
      $(".load-more").css('visibility', 'hidden');
    }
    $('html,body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
});


const abrirFiltro = document.getElementById('filtrar-mobile');
const fecharFiltro = document.getElementById('fecharFiltro');

const abrirOrdenar = document.getElementById('ordenar-mobile');
const fecharOrdenar = document.getElementById('fecharOrdenar');

abrirFiltro.addEventListener('click', () => {
  document.querySelector('.aside:not(.ordenar)').style.display = 'flex'
})
fecharFiltro.addEventListener('click', () => {
  document.querySelector('.aside:not(.ordenar)').style.display = 'none'
})


abrirOrdenar.addEventListener('click', () => {
  document.querySelector('.aside.ordenar').style.display = 'block'
})
fecharOrdenar.addEventListener('click', () => {
  document.querySelector('.aside.ordenar').style.display = 'none'
})

const abrirCores = document.querySelector('.aside__filters--colors');
const abrirTamanhos = document.querySelector('.aside__filters--sizes');
const abrirPrecos = document.querySelector('.aside__filters--prices');

abrirCores.addEventListener('click', () => {
  document.querySelector('form#colors').classList.toggle('active')
})
abrirTamanhos.addEventListener('click', () => {
  document.querySelector('form#sizes').classList.toggle('active')
})
abrirPrecos.addEventListener('click', () => {
  document.querySelector('form#prices').classList.toggle('active')
})

/* 
  ***************************************
  ***** AQUI ACABA as FUNÇÕES *****
  *************************************** 
*/