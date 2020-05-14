let cardBox = document.getElementById('container-cards')
let boxInputCores = document.getElementsByClassName('box-input-cores');
let boxButtonTamanhos = document.getElementsByClassName('box-button-tamanhos');
let boxInputPrecos = document.getElementsByClassName('box-input-precos');
let boxCarrinhoDisplay=document.getElementById("box-carrinho-display")
let btnCard=document.getElementById('btn-card');

let carrinho = [];

let qtdProd=6

let collDivImg=document.getElementsByClassName("collapsible-div")
let coll = document.getElementsByClassName("collapsible");

const checkBoxPickOne = (checkbox) => {
  /*---------Estruturando para só um checkbox poder ser escolhido----------*/
  var checkboxes = document.getElementsByName('check')
  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false
  })
}

const cardEffects = () => {
  let cards = document.getElementsByClassName('card');
  let delay = 0.2;
  Object.values(cards).forEach(card => {
    card.style.animationDelay = delay + "s"
    delay += 0.1;
  })
  btnCard.style.animation.delay=delay+"s"
}

const carregarMais=()=>{
  qtdProd+=6;
  fetchProduto(produtos)
  window.scrollTo({
    top:0,
    behavior: 'smooth',
  })
  fetchCarrinho();
}

const changeImg=(element)=>{
  let img=element.getElementsByTagName("div")[0].getElementsByTagName("img")[0];
  
  let tmp=img.src.split('/')
  let image_name= tmp[tmp.length -1]

  if(image_name=="close.svg"){
    
    img.src="./imagens/plus.svg"
  }else{
    img.src="./imagens/close.svg"
  }

}

const startCollapse = () => {
  for (i = 0; i < coll.length; i++) {
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
