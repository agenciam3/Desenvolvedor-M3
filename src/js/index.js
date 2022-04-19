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

// *********************************************
//   Function to show and close filter options
// *********************************************

const closeFilterOptionsMobile = document.querySelector('.closeFilterOptionsMobile')
const openFilterOptionsMobile = document.querySelector('.sectionMobileOrdination--filterButton')
const sectionFilterOptionsMobile = document.querySelector('.sectionFilter--container')
const body = document.querySelector('body')
const headerContainer = document.querySelector('header')
const sectionMobileOrdination = document.querySelector('.sectionMobileOrdination--container')

// function open filter and fixed body 
const openFilter = () => {
  sectionFilterOptionsMobile.style.display = 'flex'
  headerContainer.classList.add('hide')
  sectionMobileOrdination.classList.add('hide')
  body.style.position = 'fixed'
}

// function close filter and initial body
const closeFilter = () => {
  sectionFilterOptionsMobile.style.display = 'none'
  headerContainer.classList.remove('hide')
  sectionMobileOrdination.classList.remove('hide')
  body.style.position = 'initial'
}

// ***********************************
//  functions with the filters part
// ***********************************

// buttons for actions menu
const buttonColorsOptionsMobile = document.querySelector('.buttonColorsOptionsMobile')
const buttonSizesOptionsMobile = document.querySelector('.buttonSizesOptionsMobile')
const buttonRangePriceOptionsMobile = document.querySelector('.buttonRangePriceOptionsMobile')
const buttonActionsContainer = document.querySelector('.sectionFilter--buttonsFilterActionContainer')
const buttonsSizes = document.querySelectorAll('.buttonSize')

// containers for contents sections
const optionsColorsContainer = document.querySelector('.sectionFilter--optionsColorsContainer')
const optionsSizesContainer = document.querySelector('.sectionFilter--optionsSizesContainer')
const optionsPriceContainer = document.querySelector('.sectionFilter--optionsPriceContainer')

// "For Of" to add visual function to size buttons
for(let button of buttonsSizes) {
  button.addEventListener('click', () => {
    if(button.classList.contains('buttonSize--active')) {
      button.classList.remove('buttonSize--active')
    } else {
      button.classList.add('buttonSize--active')
    }
  })
}

// function to open filter options and monitor filter button
const handleOptionsFilter = (optionsContainer) => {
  if(optionsContainer.classList.contains('hide')) {
    optionsContainer.classList.add('show')
    buttonActionsContainer.classList.add('show')
    optionsContainer.classList.remove('hide')
    buttonActionsContainer.classList.remove('hide')
  } else {
    optionsContainer.classList.remove('show')
    optionsContainer.classList.add('hide')

    if(optionsColorsContainer.classList.contains('show') || optionsSizesContainer.classList.contains('show') || optionsPriceContainer.classList.contains('show')) {
      ''
    } else {
      buttonActionsContainer.classList.add('hide')
      buttonActionsContainer.classList.remove('show')
    }
  }
}

// functions for filter products 

// selected checkbox for colors checking
const checkboxColors = document.querySelectorAll('.checkbox--colorsInput')
const buttonsSize = document.querySelectorAll('.buttonSize')
const applyFilterButton = document.querySelector('.sectionFilter--applyFilterButton')

const gettingCheckboxChecked = (checkboxesColors) => {
  const checkboxIsChecked = []
  for(let checkbox of checkboxesColors) {
    checkbox.checked ? checkboxIsChecked.push(checkbox) : ''
  }
  return checkboxIsChecked
}

const gettingSizeSelected = (buttonsSize) => {
  const sizeButtonSelected = []
  for(let size of buttonsSize) {
    size.classList.contains('buttonSize--active') ? sizeButtonSelected.push(size) : ''
  }

  return sizeButtonSelected
}

const filterProducts = async () => {
  const checkedColors = gettingCheckboxChecked(checkboxColors)
  const buttonSizeSelected = gettingSizeSelected(buttonsSize)
  const products = await getAllProducts()
  const productColors = []
  const productsSizes = []
  const divProductsContainer = document.querySelector('.products--cardContainer')

  const filteredProductsColors = (() => {
    products.filter((product) => {
      const productWithColor = checkedColors.map((checkbox) => {
        return checkbox.classList.contains(`${product.color}`) ? productColors.push(product) : ''
      })
      return productWithColor
    })
  })()

  const generateHtmlFilteredColor = () => {
    divProductsContainer.innerText = ''
    if(productColors.length > 0) {
      productColors.map((product) => {
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
    } else {
      divProductsContainer.innerHTML = `<p class="products--productFilterEmpty">Não há produtos catalogados com os filtros requeridos!</p>`
    }
  }

  generateHtmlFilteredColor()

  // checking the size of the user's screen and adjusting the amount of initial products
  if(productColors !== []) {
    if(window.innerWidth < 425) {
      let productsPerPageFilter = 4
      for(let i = productsPerPageFilter; i < divProductsContainer.children.length; i++) {
        divProductsContainer.children[i].style.display = 'none'
      }
    } else if(window.innerWidth > 520 && window.innerWidth < 1000) {
      productsPerPageFilter = 6
      for(let i = productsPerPageFilter; i < divProductsContainer.children.length; i++) {
        divProductsContainer.children[i].style.display = 'none'
      }
    } else if(window.innerWidth > 1000) {
      productsPerPageFilter = 9
      for (let i = productsPerPageFilter; i < divProductsContainer.children.length; i++) {
        divProductsContainer.children[i].style.display = 'none'
      }
    }
  } 

  closeFilter()
}

// adding the function to the respective buttons
openFilterOptionsMobile.addEventListener('click', openFilter)
closeFilterOptionsMobile.addEventListener('click', closeFilter)
buttonColorsOptionsMobile.addEventListener('click', () => handleOptionsFilter(optionsColorsContainer))
buttonSizesOptionsMobile.addEventListener('click', () => handleOptionsFilter(optionsSizesContainer))
buttonRangePriceOptionsMobile.addEventListener('click', () => handleOptionsFilter(optionsPriceContainer))
applyFilterButton.addEventListener('click', filterProducts)

// ***********************************************
// function show and close ordination section
// ***********************************************

// container and buttons for show ordination
const openOrderOptionsMobile = document.querySelector('.sectionMobileOrdination--OrderButton')
const closeOrderOptionsMobile = document.querySelector('.closeOrderOptionsMobile')
const sectionOrderOptionsMobile = document.querySelector('.sectionOrdination--container')

// function for open ordination mobile section
const openOrder = () => {
  sectionOrderOptionsMobile.style.display = 'flex'
  headerContainer.classList.add('hide')
  sectionMobileOrdination.classList.add('hide')
  body.style.position = 'fixed'
}

// function for close ordination mobile section
const closeOrder = () => {
  sectionOrderOptionsMobile.style.display = 'none'
  headerContainer.classList.remove('hide')
  sectionMobileOrdination.classList.remove('hide')
  body.style.position = 'initial'
}

// add events for buttons
openOrderOptionsMobile.addEventListener('click', openOrder)
closeOrderOptionsMobile.addEventListener('click', closeOrder)

// function to resolve promise products 
const promisesResolve = async () => {
  const products = await getAllProducts()
  const htmlProduct = await generateHtmlProduct(products)
  insertProductsIntoPage(htmlProduct)
}

// call all promise resolves function
promisesResolve()
