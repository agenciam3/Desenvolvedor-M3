function printProductsJSON(file, callback, order) {
  let rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType('application/json');
  rawFile.open('GET', file, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && rawFile.status == '200') {
      callback(rawFile.responseText, order);
    }
  }
  rawFile.send(null);
}

printProductsJSON('src/js/products.json', printProducts);

// orderContent mobile-btn-control.js
orderContent.onclick = function(e) {
  let id = e.target.id;

  if(id === 'order-biggest') {
    printProductsJSON('src/js/products.json', printProducts, 3);
  } else if(id === 'order-lowest') {
    printProductsJSON('src/js/products.json', printProducts, 2);
  } else {
    printProductsJSON('src/js/products.json', printProducts, 1);

  }
}

function productsSortBy(products, order) {
  products.sort(function(a, b) {
    if(order === 3) {
      if(a.price < b.price) return 1;
      if(a.price > b.price) return -1;
      return 0;
    } else if (order === 2) {
      if(a.price > b.price) return 1;
      if(a.price < b.price) return -1;
      return 0;
    } else {
      return 0;
    }
  });
}

function printProducts(text, order) {
  let products = JSON.parse(text);

  let productsChanged = [];

  if(ids.length !== 0) {
    let verifyFilters = 3;

    for(let i = 0; i < 3; i++) {
      if(ids[i] === undefined) {
        verifyFilters--;
      }
    }

    for(let i = 0; i < products.length; i++) {
      let verifyAll = [];

      if(ids[0] != undefined) {
        if(products[i].color === ids[0]) {
          verifyAll.push(true);
        }
      }

      if(ids[1] != undefined) {
        for(let j = 0; j < products[i].size.length; j++) {
          if(products[i].size[j] === ids[1]) {
            verifyAll.push(true);
          }
        }
      }

      if(ids[2] != undefined) {
        if(products[i].price >= ids[2][0] && products[i].price <= ids[2][1]) {
          verifyAll.push(true);
        }
      }

      if(verifyAll.length === verifyFilters) {
        productsChanged.push(products[i]);
      }
    }
  }
  
  let containerProducts = document.getElementById('container-products');
  containerProducts.innerHTML = '';

  if(productsChanged != '') {
    products = productsChanged;
  }
  productsSortBy(products, order);

  setTimeout(productsMargin, 500);

  for(let i in products) {
    let divided = products[i].price >= 200 ? 5 : 3;
    // let dividedPrice = (products[i].price / divided).toFixed(2);
    let dividedPrice = (products[i].price / divided).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    let formatedPrice = (products[i].price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    containerProducts.innerHTML += `
      <div class="product" id="product-${i}">
        <img class="product-img" src="src/img/${products[i].imgName}.png" alt="${products[i].title}">
        <p class="product-title">${products[i].title}</p>
        <p class="product-price">${formatedPrice}</p>
        <p class="product-price-divided">até ${divided}x de ${dividedPrice}</p>
        <button class="btn-buy" type="submit" onclick="addToCart()">Comprar</button>
      </div>
    `;
  }
}

let filterArrays = [colorsValue, sizesValue, priceStart];

containerFilters.onclick = function (e) {
  let id = e.target.id;
  let filterBtns = document.getElementById('filter-btns');

  for(let i = 0; i < filterArrays.length; i++) {
    for(let j = 0; j < filterArrays[i].length; j++) {
      if(id === filterArrays[i][j]) {
        filterBtns.classList.remove('none');
      }
    }
  }
}

let ids = [];

let applyBtn = document.getElementById('apply-btn');

applyBtn.onclick = function() {
  for(let i = 0; i < 3; i++) {
    ids[i] = undefined;
  }

  for(let i = 0; i < filterArrays[0].length; i++) {
    let item = document.getElementById(filterArrays[0][i]);

    if(item.checked) {
      ids[0] = filterArrays[0][i];
    } 
  }

  for(let i = 0; i < filterArrays[1].length; i++) {
    let item = document.getElementById(filterArrays[1][i]);

    if(item.classList.contains('size-btn-click')) {
      ids[1] = filterArrays[1][i];
    }
  }

  for(let i = 0; i < filterArrays[2].length; i++) {
    let item = document.getElementById(filterArrays[2][i]);

    if(item.checked) {
      ids[2] = item.value;
      ids[2] = ids[2].split(",");
    }
  }
  printProductsJSON('src/js/products.json', printProducts, 1, ids);
}

let cleanBtn = document.getElementById('clean-btn');

cleanBtn.onclick = function() {
  for(let i = 0; i < filterArrays[0].length; i++) {
    let item = document.getElementById(filterArrays[0][i]);

    item.checked = false;
  }

  for(let i = 0; i < filterArrays[1].length; i++) {
    let item = document.getElementById(filterArrays[1][i]);

    if(item.classList.contains('size-btn-click')) {
      item.classList.remove('size-btn-click');
    }
  }

  for(let i = 0; i < filterArrays[2].length; i++) {
    let item = document.getElementById(filterArrays[2][i]);

    item.checked = false;
  }
}

function productsMargin(test) {
  let screenWidth = window.innerWidth;

  let products = document.getElementsByClassName('product');
  if(test) {
    for(let i = 6; i < products.length; i++) {
      products[i].classList.remove('none');
    }
  } else {
    if(screenWidth < 1200) {
      for(let i = 6; i < products.length; i++) {
        products[i].classList.add('none');
      }
    }
  }

  if(screenWidth >= 1200) {
    for(let i = 6; i < products.length; i++) {
      products[i].classList.remove('none');
    }
  }

  if(screenWidth < 768) {
    for(let i = 0; i < products.length; i++) {
      if(i % 2 === 0) {
        products[i].classList.add('margin-left-zero');
      } else {
        products[i].classList.add('margin-left-one');
      }
    }
  }

  if(screenWidth >= 768) {
    for(let i = 0; i < products.length; i++) {
      if(i % 2 === 0) {
        products[i].classList.remove('margin-left-zero');
      } else {
        products[i].classList.remove('margin-left-one');
      }
    }
  }
}

setTimeout(productsMargin, 500);

let numberOfItems = 0;

function addToCart() {
  let cart = document.getElementById('cart');
  let cartNumber = document.getElementById('cart-number');
  
  numberOfItems++;

  cart.classList.add('cart-show');

  cartNumber.innerHTML = numberOfItems;
}