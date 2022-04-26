import { createElementWithClass, appendById } from "./module_helpers";
export { add_card_products }

function add_card_products(products){
  products.forEach(product => {
    let div = createElementWithClass('div', 'product');
    div.innerHTML =`<img class="product-img" src="${product.image}" alt="">
                    <p class="product-name">${product.name}</p>
                    <p class="price">R$${parseFloat(product.price).toFixed(2)}</p>
                    <p class="parcelamento">Até ${product.parcelamento[0]}x de R$${parseFloat(product.parcelamento[1]).toFixed(2)}</p>
                    <div class="comprar">
                      COMPRAR
                    </div>
                    <div class="color hidden-info">${product.color}</div>
                    <div class="product-id hidden-info">${product.id}</div>`;
    product.size.forEach(s => {
      div.innerHTML += `<div class="size hidden-info">${s}</div>`
    })
    appendById(div, 'products')
  })
}
