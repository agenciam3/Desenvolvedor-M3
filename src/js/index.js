const ul = document.querySelector("#products");
const li = document.querySelector(".card");

const getProducts = async () => {
  const response = await fetch('http://localhost:5000/products')
  return response.json()
}

const renderProducts = async () => {
  const products = await getProducts()
  const productsTemplate = products.map(item =>  
    `
    <li class="card">
    <img src="./${item.image}" alt="">
    <p class="title">${item.name} </p>
    <p class="price">R$ ${item.price}</p>
    <p class="parcela">até ${item.parcelamento[0]}x de R$${item.parcelamento[1]}</p>
    <button>COMPRAR</button>
  </li> 
    `
  ).join('')
  ul.innerHTML += productsTemplate
}
renderProducts()