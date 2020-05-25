import { fetchProduto } from './Produto.js'
var togSrc = ["plus.svg", "close.svg"];
/*---------Estruturando para só um checkbox poder ser escolhido----------*/
export const checkBoxPickOne = (checkbox) => {
  var checkboxes = document.getElementsByName('check')
  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false
  })
}

export const cardEffects = () => {
  let cards = document.getElementsByClassName('card');
  let delay = 0.2;
  Object.values(cards).forEach(card => {
    card.style.animationDelay = delay + "s"
    delay += 0.1;
  })
}

export const carregarMais = () => {
  paginacao += 3;
  fetchProduto(arrayProdutos)
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export const changeImg = (element) => {
  let img = element.getElementsByTagName("div")[0].getElementsByTagName("img")[0];
  img.src = "./imagens/" + togSrc.reverse()[0]
}

/*----------------Funções de Filtrar Mobile--------------------*/
export const startCollapse = () => {
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}

/*-----------------Tamanho da Tela--------------------*/
export const checkTelaSize = (box, html) => {
  var isMobile = /iPhone|Android/i.test(navigator.userAgent);
  if (isMobile) {
    box[0].innerHTML = html;
  } else {
    box[1].innerHTML = html;
  }
}
