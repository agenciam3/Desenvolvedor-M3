import 'regenerator-runtime/runtime';

let productsPerPage = 4

//  function to get all products
const getAllProducts = async () => {
  const productsFetch = await fetch('http://localhost:5000/products');
  const productsJson = await productsFetch.json();
  return productsJson
};

// function to generate html for all products 
const generateHtmlProduct = products => {
  const productsMap = []

  // // push the array of products with the result of the products
  const productsReduce = products.map((product) => {
    productsMap.push(product)
  })
  
  return productsMap
}

// function to insert html in page for all products
const insertProductsIntoPage = htmlProduct => {
  const divProductsContainer = document.querySelector('.products--cardContainer')
  
  // generate html for inner 
  htmlProduct.map((product) => {
    divProductsContainer.innerHTML += `
      <div class="products--cardItem ${product.id}">
        <div class="products--imageCardItem">
          <img src=${product.image}></img>
        </div>
        <div class="products--textInformationCardItem">
          <h3>${product.name}</h3>
          <p class="bold">${product.price}</p>
          <p class="text-installments">até ${product.parcelamento[0]}x de R$${product.parcelamento[1]}</p>
        </div>
      </div>
    `
  })

  // checking the size of the user's screen and adjusting the amount of initial products
  if(window.innerWidth < 425) {
    for(let i = productsPerPage; i < divProductsContainer.children.length; i++) {
      divProductsContainer.children[i].style.display = 'none'
    }
  } else if(window.innerWidth > 520 && window.innerWidth < 1000) {
    productsPerPage = 6
    for(let i = productsPerPage; i < divProductsContainer.children.length; i++) {
      divProductsContainer.children[i].style.display = 'none'
    }
  } else if(window.innerWidth > 1000) {
    productsPerPage = 9
    for (let i = productsPerPage; i < divProductsContainer.children.length; i++) {
      divProductsContainer.children[i].style.display = 'none'
    }
  }
}

// function loadMorePostsButton
const buttonLoadMore = document.querySelector('#buttonLoadMore')

const loadMoreProducts = async () => {
  const divProductsContainer = document.querySelector('.products--cardContainer')
  const productsInPage = []
  const productsOutPage = []

  // loop to fill the arrays of products that are displayed and that are not displayed
  for(let product of divProductsContainer.children) {
    if(product.style.display != 'none') {
      productsInPage.push(product)
    } else {
      productsOutPage.push(product)
    }
  }

  // checking the user's screen size and adding products according to that size in the load products function
  if(window.innerWidth < 425) {
    productsInPage.slice(productsInPage, productsInPage + productsOutPage.map((product, index) => {
      if (index < 1) {
        product.style.display = 'flex'
      }
      
    }))
  } else if (window.innerWidth > 500 && window.innerWidth < 1000) {
    productsInPage.slice(productsInPage, productsInPage + productsOutPage.map((product, index) => {
      if (index < 2) {
        product.style.display = 'flex'
      }
    }))
  } else if (window.innerWidth > 1000) {
    productsInPage.slice(productsInPage, productsInPage + productsOutPage.map((product, index) => {
      if (index < 3) {
        product.style.display = 'flex'
      }
    }))
  }
}

// add function in button Load More
buttonLoadMore.addEventListener('click', loadMoreProducts) 

// function to resolve promise products 
const promisesResolve = async () => {
  const products = await getAllProducts()
  const htmlProduct = await generateHtmlProduct(products)
  insertProductsIntoPage(htmlProduct)
}

// call all promise resolves function
promisesResolve()
