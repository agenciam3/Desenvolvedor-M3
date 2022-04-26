// Create a request variable and assign a new XMLHttpRequest object to it.
let request = new XMLHttpRequest()
let url = 'http://localhost:5000/products';
let products_list = document.getElementById('products');

request.open('GET', 'http://localhost:5000/products', true)

request.onload = function () {
  // Begin accessing JSON data here

  let response = JSON.parse(this.response)
  add_card_products(response)
  add_size_buttons(list_sizes(response))
  add_colors_filter(list_colors(response))

}

function add_card_products(products){
  products.forEach(product => {
    let div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML =`<img class="product-img" src="${product.image}" alt="">
                    <p class="product-name">${product.name}</p>
                    <p class="price">R$${parseFloat(product.price).toFixed(2)}</p>
                    <p class="parcelamento">Até ${product.parcelamento[0]}x de R$${parseFloat(product.parcelamento[1]).toFixed(2)}</p>
                    <div class="comprar">
                      COMPRAR
                    </div>
                    <div class="color hidden-info">${product.color}</div>`;
    product.size.forEach(s => {
      div.innerHTML += `<div class="color hidden-info">${s}</div>`
    })
    products_list.appendChild(div)
  })
}

function list_sizes(products) {
  let sizes = []
  products.forEach(product =>{
    product.size.forEach(s => {
      sizes.push(s)
    })
  })
  return sizes.filter(onlyUnique).sort().reverse();
}

function add_colors_filter(colors) {
  // let color_list = document.getElementById('colors');
  colors.forEach(color => {
    let div = createElementWithClass('div', 'listed-color');

    div.innerHTML = `<div class="custom-checkbox">
                    </div>
                    <input type="checkbox" name="colors" id="${color}">
                    <label for="${color}">
                      ${color}
                    </label>`;
    appendById(div, 'colors');
  })
}

function list_colors(products) {
  let colors = []
  products.forEach(product =>{
    colors.push(product.color)
  })
  return colors.filter(onlyUnique).sort();
}

function add_size_buttons(sizes) {
  sizes.forEach(size =>{
    let div = createElementWithClass('div', 'size-desktop');
    div.innerText = size
    appendById(div, 'sizes')
  })
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function appendById(appendable, id) {
  let parent = document.getElementById(id);
  parent.appendChild(appendable)
}

function createElementWithClass(element, cssClass){
  let el = document.createElement(element);
  el.classList.add(cssClass);

  return el;
}

// Send request
request.send()
