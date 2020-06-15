

var itens = [{
  "id":1,
  "nome":"camiseta mescla",
  "tamanho":"38",
  "cor":"cinza",
  "preco":28.00,
  "parcela":3,
  "img":"img_2.png"

},
{
  "id":2,
  "nome":"saia de couro",
  "tamanho":"p",
  "cor":"preto",
  "preco":398.00,
  "parcela":5,
  "img":"img_3.png"

},
{
  "id":3,
  "nome":"cardigan tigre",
  "tamanho":"g",
  "cor":"laranja",
  "preco":398.00,
  "parcela":5,
  "img":"img_4.png"

},
{
  "id":4,
  "nome":"cardigan off white",
  "tamanho":"gg",
  "cor":"branco",
  "preco":99.00,
  "parcela":3,
  "img":"img_5.png"

},
{
  "id":5,
  "nome":"body leopardo",
  "tamanho":"u",
  "cor":"amarelo",
  "preco":129.00,
  "parcela":3,
  "img":"img_6.png"
},
{
  "id":6,
  "nome":"casco pelos",
  "tamanho":"44",
  "cor":"rosa",
  "preco":398.00,
  "parcela":5,
  "img":"img_7.png"

},
{
  "id":7,
  "nome":"croppes stripes",
  "tamanho":"40",
  "cor":"amarelo",
  "preco":120.00,
  "parcela":5,
  "img":"img_8.png"

},
{
  "id":8,
  "nome":"camisa transparente",
  "tamanho":"m",
  "cor":"preto",
  "preco":398.00,
  "parcela":5,
  "img":"img_9.png"

},
{
  "id":9,
  "nome":"pochete cluntch",
  "tamanho":"pp",
  "cor":"preto",
  "preco":28.01,
  "parcela":3,
  "img":"img_2.png"

},
{
  "id":10,
  "nome":"saia couro",
  "tamanho":"42",
  "cor":"cinza",
  "preco":28.01,
  "parcela":3,
  "img":"img_4.png"

}]
// VER TODAS AS CORES---
document.getElementById("role-color").addEventListener("click", maisCores,{
once: true,
passive: true,
capture: true
});
function maisCores(){
  $("#colors").append("<label class=type-color>Verde" +
  "<input class=checkbox-color type=checkbox  id=verde value=verde><br>" +
  "<span class=checkmark></span></label>" + "<label class=type-color>Preto" +
  "<input class=checkbox-color type=checkbox  id=preto value=preto><br>" +
  "<span class=checkmark></span></label>" + "<label class=type-color>Rosa" +
  "<input class=checkbox-color type=checkbox  id=rosa value=rosa><br>" +
  "<span class=checkmark></span></label>" + "<label class=type-color>Marrom" +
  "<input class=checkbox-color type=checkbox  id=marrom value=marrom><br>" +
  "<span class=checkmark></span></label>");
}
// botao carregar mais---
document.getElementById("more").addEventListener("click", Mais,{
  once: true,
  passive: true,
  capture: true
  });
function Mais(){

  for(i=9;i<= itens.length;i++) {
    var img = itens[i].img
    var nome = itens[i].nome
    var tamanho = itens[i].tamanho
    var cor = itens[i].cor
    var preco = itens[i].preco
    var parcela = itens[i].parcela
    var vparcela = itens[i].preco / itens[i].parcela;
    var divi = parseFloat(vparcela.toFixed(2));

    $("#iten").append("<div class=product>" +
    "<img id=pimg src=layout/imagens/" + img + ' ' + "alt=" + nome +"></img>" + 
    "<strong id=pstrong class=name-product>" + nome + "</strong>" +
    "<span id=pspan class=price-product>R$" + preco + "</span>" + 
    "<h4 id=ph4>até " + parcela + "x de R$" + divi +"</h4>" +
    "<button id=pbutton type=button>" + 'COMPRAR' +"</button>" + 
    "</div>");  
  }
}




var contador = 8;
var i;
  for(i=0;i<= contador;i++) {
    var img = itens[i].img
    var nome = itens[i].nome
    var tamanho = itens[i].tamanho
    var cor = itens[i].cor
    var preco = itens[i].preco
    var parcela = itens[i].parcela
    var vparcela = itens[i].preco / itens[i].parcela;
    var divi = parseFloat(vparcela.toFixed(2));

    $("#iten").append("<div class=product>" +
    "<img id=pimg src=layout/imagens/" + img + ' ' + "alt=" + nome +"></img>" + 
    "<strong id=pstrong class=name-product>" + nome + "</strong>" +
    "<span id=pspan class=price-product>R$" + preco + "</span>" + 
    "<h4 id=ph4>até " + parcela + "x de R$" + divi +"</h4>" +
    "<button id=pbutton type=button>" + 'COMPRAR' +"</button>" + 
    "</div>");  
  }
