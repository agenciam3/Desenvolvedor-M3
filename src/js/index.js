import { getProducts } from "./api";

let offset = 9;
let products = [];
let colorsFilters = new Set([]);
let sizersProducts = new Set([]);

document.addEventListener("DOMContentLoaded", () => {
  onLoad();

  const loadMore = document.getElementById("loadMore");
  loadMore.onclick = () => {
    offset *= 2;
    loadProducts(offset, 0);
  };
});

function onLoad() {
  loadProducts(offset, 0);
}

function loadProducts(limit, offset) {
  const productsContainer = document.getElementById("container-products");

  productsContainer.innerHTML = "";

  getProducts(limit, offset).then((apiProducts) => {
    products = apiProducts;

    products = products.filter((product) =>{
      if(!colorsFilters.size) return true
      return colorsFilters.has(product.color)
    })
    products.forEach((product) => {
      const productElement = createProductElement(product);
      productsContainer.appendChild(productElement);
    });

    products = products.filter((product) =>{
      if(!sizersProducts.size) return true
      return sizersProducts.has(product.size)
    })
    products.forEach((product) => {
      const productElement = createProductElement(product);
      productsContainer.appendChild(productElement);
    })
  });
}

function createProductElement(product) {
  const productElement = document.createElement("div");
  productElement.classList.add("product");

  const productImage = document.createElement("img");
  productImage.src = product.image;
  productImage.classList.add("product-image");

  const productTitle = document.createElement("div");
  productTitle.classList.add("product-title");
  productTitle.innerText = product.name;

  const productPrice = document.createElement("div");
  productPrice.classList.add("product-price");
  productPrice.innerText = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  const button = document.createElement("button");
  button.classList.add("product-button");
  button.innerText = "Comprar";

  const productinstallments = document.createElement("div");
  productinstallments.classList.add("product-installments");
  productinstallments.innerText = `até ${
    product.parcelamento[0]
  } de ${Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.parcelamento[1])}`;

  productElement.appendChild(productImage);
  productElement.appendChild(productTitle);
  productElement.appendChild(productPrice);
  productElement.appendChild(productinstallments);
  productElement.appendChild(button);

  return productElement;
}

// --Filters colors


let inputsColors = document.querySelectorAll('#cores-fields input[type="checkbox"]');
inputsColors.forEach((e)=> {
  e.addEventListener('change', () => {
    if (e.checked) {
      console.log('Marcado')
      // colorsFilters.add(e.id.replace('c', ''))
      
    }else {
      console.log('Desmarcado')
      // colorsFilters.delete(e.id.replace('c', ''))
    }
    onLoad();
  })
})

// let inputSizers = document.querySelectorAll('#sizes-fields div[type="checkbox"]');
// inputSizers.forEach((e) => {
//   if (e.checked) {
//     sizersProducts.add(e.id.replace('tam', ''))

//   }else {
//     sizersProducts.delete(e.id.replace('tam', ''))
//   }
//   onLoad()
// })

