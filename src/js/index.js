<<<<<<< Updated upstream
const serverurl = process.env.SERVER_API;

console.log("Dev m3", serverurl);
=======
console.log("Dev m3");
import {products} from "/db.json";



let iniciarLoja = () => {

  var containerProdutos = document.getElementById('produtos');

  products.map((val) => {
    
    containerProdutos.innerHTML += `
    <div class="produto-1">
    <img src="`+val.image+`"/>
    <p>`+val.name+`</p>
    <p class='preco'> R$:`+val.price+`</p>
    <p class='preco'> Até:`+val.parcelamento+`</p> 
    <button class="btn btncomprar" type="button" key="`+val.id+`" href="">Comprar</button>

    </div>
    
    `;
  })
  // console.log(containerProdutos)
}
iniciarLoja();


// let cores = () => {
//   products.map((val) => {
    
//   })

// }





// const adicionarCarro = () => {
//   console.log(products);
// }

// var carro = document.getElementById('a');
 

// for (var i = 0; i < (carro === 1 ).length; i++) a[i].addEventlistener("click",function(){
//   let key = this.getAttribute(`key`);
//   products[key].quantidade++;
//   adicionarCarro();
//   console.log('a')
// });

>>>>>>> Stashed changes
