
const ul = document.querySelector("#products");
const li = document.querySelector(".card");
const carregar = document.querySelector("#carregar");
const menor = document.querySelector("#menor");

const getProducts = async () => {
  const response = await fetch("http://localhost:5000/products");
  const jsonResponse = await response.json();
  return jsonResponse;
};

const filterProductsByColor = async (colors = []) => {
  const products = await getProducts();
  const filteredShirts = [];
  products.forEach((product) => {
    colors.forEach((color) => {
      if (color === product.color) {
        filteredShirts.push(product);
      }
    });
  });
  return filteredShirts;
}

const getShirtsByColor = () => {
  let colors = document.getElementById('colors');
  let textinputs = document.querySelectorAll('input[type=checkbox]');

  colors.addEventListener('change', async () => {
    let shirtColors = [];
    Array.from(colors.elements).forEach((color) => {
      if (color.checked) shirtColors.push(color.name);
    });

    let filteredProducts = [];
    let allProducts = [];

    let allUnchecked = [...textinputs].every((el) => !el.checked)

    if (allUnchecked) {
      allProducts = await getProducts();
      renderProducts(allProducts);
    } else {
      filteredProducts = await filterProductsByColor(shirtColors);
      renderProducts(filteredProducts);
    }
  });
}

const renderProducts = (products) => {
  let productsTemplate = [];
  productsTemplate = products.map((item) =>
    `
    <li class="card">
    <img src="./${item.image}" alt="">
    <p class="title">${item.name} </p>
    <p class="price">R$ ${item.price.toFixed(2)}</p>
    <p class="parcela">até ${item.parcelamento[0]}x de R$ ${item.parcelamento[1].toFixed(2)}</p>
    <button>COMPRAR</button>
    </li> 
    `
  ).join("");

  ul.innerHTML = '';
  ul.innerHTML += productsTemplate;

};

getProducts().then((products) => renderProducts(products));
getShirtsByColor();