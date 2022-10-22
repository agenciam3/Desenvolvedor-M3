import "regenerator-runtime/runtime";


// LISTAR PRODUTOS
const url = "http://localhost:5000/products";
const productGrid = document.querySelector("#productListContent");
async function getAllProducts() {
  const response = await fetch(url);
  const data = await response.json();
  const initialProducts = data.slice(0, 9)
  const renderProducts = initialProducts.map((product) => {
    productGrid.innerHTML+= 
    `<article class="product" id=${product.id}>
    <img src=${product.image} class="product__image" alt=${product.name} title=${product.name}/>
    <h2 class="product__name">${product.name}</h2>
     <div class="product__details">
      <span class="product__price">R$ ${product.price}</span>
      <span class="product__parcelamento">até ${product.parcelamento[0]}x de R$${product.parcelamento[1]}</span>
      </div>
      <button class="button" type="button">Comprar</button>
    </article>
   `
});

}



window.addEventListener('DOMContentLoaded', async function () {
       getAllProducts();
});




