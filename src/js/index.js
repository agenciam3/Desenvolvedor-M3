const ul = document.querySelector("#products");
const li = document.querySelector(".card");
const carregar = document.querySelector("#carregar");
const menor = document.querySelector("#menor");


const getProducts = async () => {
  const response = await fetch("http://localhost:5000/products");
  return response.json();
};

const renderProducts = async () => {
  const products = await getProducts();
  const productsTemplate = products.map((item) =>
    `
    <li class="card">
    <img src="./${item.image}" alt="">
    <p class="title">${item.name} </p>
    <p class="price">R$ ${item.price.toFixed(2)}</p>
    <p class="parcela">até ${item.parcelamento[0]}x de R$ ${item.parcelamento[1].toFixed(2)}</p>
    <button>COMPRAR</button>
    </li> 
    `
    ).slice(0, 9).join("");

    ul.innerHTML += productsTemplate;
   
  };
  renderProducts();
  
  