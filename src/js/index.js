// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()
var products = document.getElementById('products');
console.log(products)
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://localhost:5000/products', true)

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  data.forEach(product => {
    console.log(product.parcelamento)
  // Log each movie's title
  const productCard =
  `<div class="product">
    <img class="product-img" src="${product.image}" alt="">
    <p class="product-name">${product.name}</p>
    <p class="price">R$${parseFloat(product.price).toFixed(2)}</p>
    <p class="parcelamento">Até ${product.parcelamento[0]}x de R$${parseFloat(product.parcelamento[1]).toFixed(2)}</p>
    <div class="comprar">
      COMPRAR
    </div>
  </div>`;
  products.insertAdjacentHTML("beforeend", productCard)
})
}

// Send request
request.send()


function insert_products(products) {

}
