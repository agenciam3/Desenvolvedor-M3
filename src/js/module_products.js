import { createElementWithClass, appendById } from "./module_helpers";
export { addCardProducts, filterProducts }

function addCardProducts(products){
  products.forEach(product => {
    let div = createElementWithClass('div', 'product');
    div.innerHTML =`<img class="product-img" src="${product.image}" alt="">
                    <p class="product-name">${product.name}</p>
                    <p class="product-price">R$${parseFloat(product.price).toFixed(2)}</p>
                    <p class="parcelamento">Até ${product.parcelamento[0]}x de R$${parseFloat(product.parcelamento[1]).toFixed(2)}</p>
                    <div class="comprar">
                      COMPRAR
                    </div>
                    <div class="product-color hidden-info">${product.color}</div>
                    <div class="product-id hidden-info">${product.id}</div>`;
    product.size.forEach(s => {
      div.innerHTML += `<div class="product-size hidden-info">${s}</div>`
    })
    appendById(div, 'products')
  })
}

function name(params) {

}

function filterProducts(filterList) {
  let products = document.querySelectorAll('.product')
  console.log('reseting visible products')
  products.forEach(product =>{
    product.classList.remove('d-none')
  })
  products.forEach(product => {
    let specs = defineProductSpecs(product);

    if (specs[0] < filterList[0] || specs[0] > filterList[1]) {
      product.classList.add('d-none')
    }

    if (filterList[3].length !== 0 && filterList[3].includes(specs[1]) == false) {
      product.classList.add('d-none')
    }
  });
}


function defineProductSpecs(product) {
  let specifications = [0, "", []]
  specifications[0] = parseFloat(product.querySelector('.product-price').innerText.replace("R$", ""))
  specifications[1] = product.querySelector('.product-color').innerText
  product.querySelectorAll('.product-size').forEach( size => {
    specifications[2].push(size.innerText)
  })

  return specifications;
}
