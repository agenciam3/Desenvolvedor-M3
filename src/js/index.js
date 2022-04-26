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
          <p class="bold"> R$ ${product.price.toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
          <p class="text-installments">até ${product.parcelamento[0]}x de R$${product.parcelamento[1].toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
          </div>
          <div class="products--buttonBuyCardItem"><button class="buttonBuyItem ${product.id}">Comprar</button></div>
      </div>
    `
  })

  const buttonsBuyItem = document.querySelectorAll('.buttonBuyItem')

  for(let button of buttonsBuyItem) {
    button.addEventListener('click', (element) => addItemInCart(element.target))
  }

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
const checkboxPrices = document.querySelectorAll('.checkbox--rangePrice')
const applyFilterButton = document.querySelector('.sectionFilter--applyFilterButton')
const clearFilterButton = document.querySelector('.sectionFilter--clearAllFiltersButton')

// function to get checkbox color is checked
const gettingCheckboxChecked = (checkboxesColors) => {
  const checkboxIsChecked = []
  for(let checkbox of checkboxesColors) {
    checkbox.checked ? checkboxIsChecked.push(checkbox) : ''
  }
  return checkboxIsChecked
}

// function to get button size is selected
const gettingSizeSelected = (buttonsSize) => {
  const sizeButtonSelected = []
  for(let size of buttonsSize) {
    size.classList.contains('buttonSize--active') ? sizeButtonSelected.push(size) : ''
  }

  return sizeButtonSelected
}

// function to get chekcbox price is checked
const gettingCheckboxPriceChecked = (checkboxesPrice) => {
  const checkboxPriceIsChecked = []
  for (let checkbox of checkboxesPrice) {
    checkbox.checked ? checkboxPriceIsChecked.push(checkbox) : ''
  }
  return checkboxPriceIsChecked
}

// function to filter product 
const filterProducts = async () => {
  const checkedColors = gettingCheckboxChecked(checkboxColors)
  const buttonSizeSelected = gettingSizeSelected(buttonsSize)
  const checkedPrice = gettingCheckboxPriceChecked(checkboxPrices)
  const products = await getAllProducts()
  const productColors = []
  const productsSizes = []
  const productsPrices = []
  const productsUnite = []
  const divProductsContainer = document.querySelector('.products--cardContainer')


  // Filtering the products according to the color informed
  const filteredProductsColors = (() => {
    products.filter((product) => {
      // checks if the marked color is present in the array of all products
      const productWithColor = checkedColors.map((checkbox) => {
        return checkbox.classList.contains(`${product.color}`) ? productColors.push(product) : ''
      })
      return productWithColor
    })
  })()

  //Filtering the products according to the size informed
  const filteredProductsSizes = (() => {
    products.filter((product) => {
      // does the transformation of the size property in the products
      const sizePerProduct = product.size
      const sizeUnique = sizePerProduct.map(sizeUnique => {return sizeUnique})
      // checks if the size array is in the products
      const productWithSize = buttonSizeSelected.map((button) => {
        return button.classList.contains(`${sizeUnique.length > 2 ? sizeUnique[0] || sizeUnique[1] : sizeUnique[0]}`) ? productsSizes.push(product) : ''
      })
      return productWithSize
    })
  })()

  //filtering the products according to the price range informed
  const filteredProductsPrice = (() => {
    const allPrices = []    
    // transforms the prices of products
    const checkedPrices = checkedPrice.map((checkbox) => {
      allPrices.push(checkbox.getAttribute('lowestPrice'))
      allPrices.push(checkbox.getAttribute('biggestPrice'))
    })
    //get the highest and lowest price in the given range
    const allPricesTransform = allPrices.map((price) => Number(price))
    const biggestPrice = Math.max.apply(null, allPricesTransform)
    const lowestPrice = Math.min.apply(null, allPricesTransform)

    // maps the products according to the price that was informed
    products.map((product) => {
      if(lowestPrice <= product.price && product.price < biggestPrice) {
        productsPrices.push(product)
      }
    })
  })()

  const generateArraysForProductsTwoMoreFilters = (array1, array2) => {
    let biggestArray
    let otherArray
    const unionArray = [array1, array2]

    for(let i = 0; i < unionArray.length; i++) {
      if(i === 0) {
          biggestArray = unionArray[i]
        } else {
          unionArray[i].length > biggestArray.length ? biggestArray = unionArray[i] : ''
        }
      }
      unionArray.map((array) => array !== biggestArray ? otherArray = array : '')

      biggestArray.map((product) => otherArray.includes(product) ? productsUnite.push(product) : '')
  }

  // uniting the products of all filters made
  const uniteFilterProducts = (() => {
    // checking if at least one filter was informed
    if (productsSizes.length > 0 || productColors.length > 0 || productsPrices.length > 0) {
      // filter if all three options exist
      if(productsSizes.length > 0 && productColors.length > 0 && productsPrices.length > 0) {
        const unionArrays = [productsSizes, productColors, productsPrices]
        let biggestArray
        let otherArrays = []
        // checks which is the largest array among the three
        for(let i = 0; i < unionArrays.length; i++) {
          if(i === 0) {
            biggestArray = unionArrays[i]
          } else {
            unionArrays[i].length > biggestArray.length ? biggestArray = unionArrays[i] : ''
          }
        }
        // maps the two other arrays that are not the largest
        unionArrays.map((array) => array !== biggestArray ? otherArrays.push(array) : '')
        
        const arrayComparingFirst = []
        // compare the largest array with the first
        const comparingLargestArrayWithFirst = biggestArray.map((product) => unionArrays[0].includes(product) ? arrayComparingFirst.push(product) : '')

        const arrayComparingSecond = []
        //compare the largest array with the second
        const comparingLargestArrayWithSecond = biggestArray.map((product) => unionArrays[1].includes(product) ? arrayComparingSecond.push(product) : '')
        
        //function to join the two filtered arrays
        const unionArrayFilter = (() => {
          const unionArray = [arrayComparingFirst, arrayComparingSecond]
          let biggestArrayFilter
          let otherArray 

          // check which array is bigger
          for(let i = 0; i < unionArray.length; i++) {
            if(i === 0) {
              biggestArrayFilter = unionArray[i]
            } else {
              unionArray[i].length > biggestArrayFilter.length ? biggestArrayFilter = unionArray[i] : ''
            }
          }

          //joining all filtered arrays to the product that will be displayed
          unionArray.map((array) => array !== biggestArrayFilter ? otherArray = array : '')
          biggestArray.map((product) => otherArray.includes(product) ? productsUnite.push(product) : '')
        })()
      }

      // filter if colors and sizes exists
      if(productColors.length > 0 && productsSizes.length > 0 && productsPrices.length === 0) {
        generateArraysForProductsTwoMoreFilters(productColors, productsSizes)
      }

      // filter if colors and prices exists
      if (productColors.length > 0 && productsPrices.length > 0 && productsSizes.length === 0) {
        generateArraysForProductsTwoMoreFilters(productColors, productsPrices)
      }

      // filter if sizes and prices exists
      if(productsSizes.length > 0 && productsPrices.length > 0 && productColors.length === 0) {
        generateArraysForProductsTwoMoreFilters(productsSizes, productsPrices)
      }

      // filter if only color exists
      if(productColors.length > 0 && productsPrices.length === 0 && productsSizes.length === 0) {
        productColors.map((product) => productsUnite.push(product))
      }

      // filter if only sizes exists
      if(productsSizes.length > 0 && productColors.length === 0 && productsPrices.length === 0) {
        productsSizes.map((product) => productsUnite.push(product))
      }

      // filter if only prices exists
      if(productsPrices.length > 0 && productColors.length === 0 && productsSizes.length === 0) {
        productsPrices.map((product) => productsUnite.push(product))
      }
    }

    // filter if all filters is empty
    if (productColors.length === 0 && productsSizes.length === 0 && productsPrices.length === 0) {
      products.map((product) => productsUnite.push(product))
    }
  })()

  // generate HTML with filters products info
  const generateHtmlFilteredColor = () => {
    divProductsContainer.innerText = ''

    if(productsUnite.length > 0) {
      productsUnite.map((product) => {
        divProductsContainer.innerHTML += `
          <div class="products--cardItem ${product.id}">
            <div class="products--imageCardItem">
              <img src=${product.image}></img>
            </div>
          <div class="products--textInformationCardItem">
            <h3>${product.name}</h3>
            <p class="bold"> R$ ${product.price.toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
            <p class="text-installments">até ${product.parcelamento[0]}x de R$${product.parcelamento[1].toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
          </div>
          <div class="products--buttonBuyCardItem"><button class="buttonBuyItem ${product.id}">Comprar</button></div>
        </div>
        ` 
      })
    } else {
      divProductsContainer.innerHTML = `<p class="products--productFilterEmpty">Não há produtos catalogados com os filtros requeridos!</p>`
    }

    const buttonsBuyItem = document.querySelectorAll('.buttonBuyItem')

    for(let button of buttonsBuyItem) {
      button.addEventListener('click', (element) => addItemInCart(element.target))
    }
  }

  generateHtmlFilteredColor()

  // checking the size of the user's screen and adjusting the amount of initial products
  if(productsUnite !== []) {
    if(window.innerWidth < 425) {
      let productsPerPageFilter = 4
      for(let i = productsPerPageFilter; i < divProductsContainer.children.length; i++) {
        divProductsContainer.children[i].style.display = 'none'
      }
    } else if(window.innerWidth > 520 && window.innerWidth < 1024) {
      let productsPerPageFilter = 6
      for(let i = productsPerPageFilter; i < divProductsContainer.children.length; i++) {
        divProductsContainer.children[i].style.display = 'none'
      }
    } else if(window.innerWidth > 1024) {
      let productsPerPageFilter = 9
      for (let i = productsPerPageFilter; i < divProductsContainer.children.length; i++) {
        divProductsContainer.children[i].style.display = 'none'
      }
    }
  } 

  closeFilter()
}

const clearFilters = () => {
  const checkedColors = gettingCheckboxChecked(checkboxColors)
  const buttonSizeSelected = gettingSizeSelected(buttonsSize)
  const checkedPrice = gettingCheckboxPriceChecked(checkboxPrices)

  const mapCheckedColors = () => {
    checkedColors.map((checkbox) => {
      return checkbox.checked ? checkbox.checked = false : ''
    })
  } 

  const mapButtonSelected = () => {
    buttonSizeSelected.map((button) => {
      button.classList.contains('buttonSize--active') ? button.classList.remove('buttonSize--active') : ''
    })
  }

  const mapCheckedPrice = () => {
    checkedPrice.map((checkbox) => {
      return checkbox.checked ? checkbox.checked = false : ''
    })
  }

  mapCheckedColors()
  mapButtonSelected()
  mapCheckedPrice()
}

// adding the function to the respective buttons
openFilterOptionsMobile.addEventListener('click', openFilter)
closeFilterOptionsMobile.addEventListener('click', closeFilter)
buttonColorsOptionsMobile.addEventListener('click', () => handleOptionsFilter(optionsColorsContainer))
buttonSizesOptionsMobile.addEventListener('click', () => handleOptionsFilter(optionsSizesContainer))
buttonRangePriceOptionsMobile.addEventListener('click', () => handleOptionsFilter(optionsPriceContainer))
applyFilterButton.addEventListener('click', filterProducts)
clearFilterButton.addEventListener('click', clearFilters)

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

// *****************************
//  function to add item in cart
// ******************************
const cartShopIcon = document.querySelector('.cartShopIcon')
const closeCartIcon = document.querySelector('.closeCartItem')
const sectionCart = document.querySelector('.sectionCart--container')
const containerProduct = document.querySelector('.sectionCart--containerProduct')

// function to add button in cart
const addItemInCart = async (element) => {
  const cartItem = document.querySelector('.header--cartNumber')
  const cartNumber = Number(cartItem.innerText)
  const cartNewNumber = cartNumber + 1
  const products = await getAllProducts()
  const removeItemDuplicate = []
  let lewestItem
  cartItem.innerText = cartNewNumber
  
  // filter for items repeat for add in cart
  products.filter((product, index) => {
    if (index === 0) {
      lewestItem = product
      removeItemDuplicate.push(lewestItem)
    } else {
      product.id !== products[index - 1].id ? removeItemDuplicate.push(product) : ''
    }
  })

  // getting the class for comparison
  const classIdButton = element.classList[1]
  const classString = String(classIdButton)

  // filtering only for the current element, avoiding multiple calls 0(n)²
  let productMatchID 
  removeItemDuplicate.map((product) => {
    product.id === classString ? productMatchID = product : ''
  })

  // add html product in cart
  containerProduct.innerHTML += `
    <div class="sectionCart--productSection ${productMatchID.id}">
      <div class="sectionCart--imageProduct">
        <img src=${productMatchID.image} alt="Imagem do produto" class="imageProductCart ${productMatchID.id}">
      </div>
      <div class="sectionCart--infosProducts">
        <h3>${productMatchID.name}</h3>
        <p>R$ ${productMatchID.price.toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
      </div>
      <div class="sectionCart--removeItem">
        <img src="./img/Group 1.png" alt="Botão para excluir produto do carrinho" class="buttonExcludeItemCart ${productMatchID.id}">
      </div>
    </div>
  `

  // adding function to delete buttons
  const buttonsExclude = document.querySelectorAll('.buttonExcludeItemCart')
  for(let button of buttonsExclude) {
    button.addEventListener('click', (e) => removeItemFromCart(e.target))
  }
}

// function to remove item to cart
const removeItemFromCart = (element) => {
  // get product by delete button
  const buttonExcludeCalled = element.classList[1]
  const imageProductCart = document.querySelectorAll('.imageProductCart')
  // filtering image for what was called
  let filterImage
  for (let image of imageProductCart) {
    image.classList[1] == buttonExcludeCalled ? filterImage = image : ''
  }
  const idImageProduct = filterImage.classList[1]
  // get product by section
  const productSection = document.querySelectorAll('.sectionCart--productSection')
  let filterProductSection 
  for (let section of productSection) {
    section.classList[1] == buttonExcludeCalled ? filterProductSection = section : ''
  }

  // get cart count 
  const cartItem = document.querySelector('.header--cartNumber')
  const cartNumber = Number(cartItem.innerText)
  const cartNewNumber = cartNumber - 1

  // updating html, deleting item and updating count
  if(buttonExcludeCalled == idImageProduct) {
    filterProductSection.innerText = ''
    cartItem.innerHTML = cartNewNumber
  }
}

// function open cart
const openCartItem = () => {
  const optionsOrder = document.querySelector('.sectionName--optionsOrder')

  optionsOrder.style.display = 'block' ? optionsOrder.style.display = 'none' : ''

  sectionCart.classList.add('show')
  headerContainer.classList.add('hide')
  body.style.position = 'fixed'
}

// function close cart
const closeCartItem = () => {
  sectionCart.classList.remove('show')
  headerContainer.classList.remove('hide')
  body.style.position = 'initial'
}

// add events in buttons
cartShopIcon.addEventListener('click', openCartItem)
closeCartIcon.addEventListener('click', closeCartItem)

// ************************************
//  Function to modal order for 1024px>
// ************************************

const orderSection = document.querySelector('.sectionName--atualOrderText')
const optionsOrder = document.querySelectorAll('.optionsOrder')

const handleOrderOption = (element) => {
  const contentElement = element.innerText
  orderSection.innerHTML = `<p>${contentElement}</p>: <img src="./img/Vector 1.png" alt="Selecione uma maneira para ordernar os produtos">`
  openOrderSection()
}

for(let option of optionsOrder) {
  option.addEventListener('click', (e) => handleOrderOption(e.target))
}


const openOrderSection = () => {
  const optionsOrder = document.querySelector('.sectionName--optionsOrder')
  
  if(optionsOrder.style.display === 'none') {
    optionsOrder.style.display = 'block'
  } else {
    optionsOrder.style.display = 'none'
  }
}

orderSection.addEventListener('click', openOrderSection)

// ******************************************* 
//        DESKTOP FUNCTIONS ADAPTED
// *******************************************
const colorsFilterDesktopInput = document.querySelectorAll('.desktopColorFilter')
const sizesFilterDesktopInput = document.querySelectorAll('.buttonSizeDesktop')
const pricesFilterDesktopInput = document.querySelectorAll('.sectionFilter--checkmarkInputDesktop')
let productsOnFilter = []
let productColorsOnFilter = []
let productSizeOnFilter = []
let priceSelectedPrevious = []
let productsPriceOnFilter = []
let newArrayPrices = []
const filtersBeenCalled = []
let filtersCalled = []

function gettingColorInput(element) {
  if(element.classList.contains('checkmarkFilterDesktop--active')) {
    element.classList.remove('checkmarkFilterDesktop--active') 
    removeFilterDesktop(element)
  } else {
    element.classList.add('checkmarkFilterDesktop--active')
    filterProductsDesktop(element, 'cor')
  }
}

function gettingSizeInput(element) {
  if(element.classList.contains('buttonSize--active')) {
    element.classList.remove('buttonSize--active')
    removeFilterDesktop(element)
  } else {
    element.classList.add('buttonSize--active')
    filterProductsDesktop(element, 'size')
  }
}

function gettingPriceInput(element) {
  if(element.classList.contains('checkmarkFilterDesktop--active')) {
    element.classList.remove('checkmarkFilterDesktop--active') 
    removeFilterDesktop(element)
  } else {
    element.classList.add('checkmarkFilterDesktop--active')
    filterProductsDesktop(element, 'price')
  }
}

const addListenerColors = () => {
  for(let inputColor of colorsFilterDesktopInput) {
    inputColor.addEventListener('click', (e) => gettingColorInput(e.target))
  }
}

const addListenerSizes = () => {
  for(let buttonSize of sizesFilterDesktopInput) {
    buttonSize.addEventListener('click', (e) => gettingSizeInput(e.target))
  }
}

const addListenerPrice = () => {
  for(let inputPrice of pricesFilterDesktopInput) {
    inputPrice.addEventListener('click', (e) => gettingPriceInput(e.target))
  }
}

addListenerColors()
addListenerSizes()
addListenerPrice()

const filterProductsDesktop = async (element, string) => {
  const elementSelectedActualColorOrSize = element.classList[1]
  const products = await getAllProducts()
  const divProductContainer = document.querySelector('.products--cardContainer')
  let newFilterUser = []
  filtersCalled.push(elementSelectedActualColorOrSize)
  filtersBeenCalled.push(string)
  let productMerge = []
  let productColor = []
  let productSize = []
  let priceMark = []
  let prices = []

  // checking which color is selected
  const verifyColorSelectedIsMatch = () => {
    products.filter((product) => {
      product.color.toLowerCase() === elementSelectedActualColorOrSize ? productColorsOnFilter.unshift(product) : ''
    })
  }

  // checking which size is selected
  const verifySizeSelectedIsMatch = () => {
    products.filter((product) => {
      const sizePerProduct = product.size
      const sizeUnique = sizePerProduct.map((size) => {return size})
      if(sizeUnique.length > 1) {
        elementSelectedActualColorOrSize === sizeUnique[0] ? productSizeOnFilter.unshift(product) : ''
        elementSelectedActualColorOrSize === sizeUnique[1] ? productSizeOnFilter.unshift(product) : ''
      } else {
        elementSelectedActualColorOrSize == sizeUnique ? productSizeOnFilter.unshift(product) : ''
      }
    })
  }

  // checking which price is selected
  const verifyPriceSelectedIsMatch = () => {
    const allPricesSelected = []
    const pricesOnSelected = [element.getAttribute('lowestPrice'), element.getAttribute('biggestPrice')]
    priceSelectedPrevious.length === 0 ? priceSelectedPrevious = [...pricesOnSelected] : ''
    newArrayPrices = []

    if(Number(pricesOnSelected[0]) < Number(priceSelectedPrevious[0])) {
      allPricesSelected[0] = pricesOnSelected[0]
    } else {
      allPricesSelected[0] = priceSelectedPrevious[0]
    }

    if(Number(pricesOnSelected[1]) > Number(priceSelectedPrevious[1])) {
      allPricesSelected[1] = pricesOnSelected[1]
    } else {
      allPricesSelected[1] = priceSelectedPrevious[1]
    }

    products.filter((product) => {
      if(allPricesSelected[0] <= product.price && product.price < allPricesSelected[1]) {
        newArrayPrices.unshift(product)
      }
    })

    productsPriceOnFilter = newArrayPrices
    priceSelectedPrevious[0] >= pricesOnSelected[0] ? '' : priceSelectedPrevious[0] = pricesOnSelected[0]
    priceSelectedPrevious[1] <= pricesOnSelected[1] ? priceSelectedPrevious[1] = pricesOnSelected[1] : '' 
  }

  // checking which call case
  if(string === 'cor') {
    verifyColorSelectedIsMatch()
  } else if(string === 'size') {  
    verifySizeSelectedIsMatch()
  } else {
    verifyPriceSelectedIsMatch()
  }

  // checking if the filter is price to assign to the filter
  const verifyFilterPrice = (currentValue) => {
    return currentValue === 'price'
  } 

  // checking if the filter is color to assign to the filter
  const verifyFilterColor = (currentValue) => {
    return currentValue === 'cor'
  }

  // checking if the filter is size to assign to the filter
  const verifyFilterSize = (currentValue) => {
    return currentValue === 'size'
  }

  // checking which price range is active
  const priceRangeActive = (() => {
    for(let checkmark of pricesFilterDesktopInput) {
      checkmark.classList.contains('checkmarkFilterDesktop--active') ? priceMark.push(checkmark) : ''
    }
  })()

  // generating the highest and lowest price
  let biggestPrice
  let lowestPrice
  const getLowestAndBiggest = (() => {
    priceMark.map((item) => {
      prices.push(item.getAttribute('lowestPrice'))
      prices.push(item.getAttribute('biggestPrice'))
    })
    prices = prices.map((price) => Number(price))

    biggestPrice = Math.max.apply(null, prices)
    lowestPrice = Math.min.apply(null, prices)
  })()

  // checking largest and smallest array
  let biggestArray
  let smallestArray
  const gettingBiggestArray = (array1, array2) => {
    const unionArray = [array1, array2]
    for(let i = 0; i < unionArray.length; i++) {
      if(i === 0) {
        biggestArray = unionArray[i]
      } else {
        unionArray[i].length > biggestArray.length ? biggestArray = unionArray[i] : ''
      }
    } 
    unionArray.map((array) => array !== biggestArray ? smallestArray = array : '')
  }

  const verifyArrayForOneFilter = () => {
    // checking first call filter
    if(productsOnFilter.length === 0) {
      productColorsOnFilter.length !== 0 ? productsOnFilter = productColorsOnFilter : ''
      productSizeOnFilter.length !== 0 ? productsOnFilter = productSizeOnFilter : ''
      productsPriceOnFilter.length !== 0 ? productsOnFilter = productsPriceOnFilter : ''
    } else if (filtersBeenCalled.every(verifyFilterPrice)) { 
      // checking if all filters are price
      productsOnFilter = productsPriceOnFilter
    } else if (filtersBeenCalled.every(verifyFilterColor)) {
      // checking if all filters are color
      productsOnFilter = productColorsOnFilter
    } else if (filtersBeenCalled.every(verifyFilterSize)) {
      // checking if all filters are size
      productsOnFilter = productSizeOnFilter
    } else {
      // if the types of filters are different
      filtersCalled.map((filter) => {
        if(filter === "amarelo" || "azul" || "branco" || "cinza" || "laranja" || "verde" || "vermelho" || "preto" || "rosa" || "vinho") {
          products.filter((product) => {
            product.color.toLowerCase() === filter ? productColor.push(product) : ''
          })
        }
        if(filter === "P" || "M" || "G" || "GG" || "U" || "36" || "38" || "40") {
          products.filter((product) => {
            const sizePerProduct = product.size
            const sizeUnique = sizePerProduct.map((size) => {return size})
            if(sizeUnique.length > 1) {
              filter === sizeUnique[0] ? productSize.push(product) : ''
              filter === sizeUnique[1] ? productSize.push(product) : ''
            } else {
              filter === sizeUnique[0] ? productSize.push(product) : ''
            }
          })
        }

        // if there is color and size filter
        if(productColor.length !== 0 && productSize.length !== 0) {
          gettingBiggestArray(productColor, productSize)
  
          biggestArray.filter((product) => smallestArray.includes(product) ? productMerge.push(product) : '')
          productMergeFilter()
        }
        
        // if there is only color filter
        if(productColor.length !== 0 && productSize.length === 0) {
          productsOnFilter = []
          if(lowestPrice && biggestPrice) {
            productColor.filter((product) => {
              if(lowestPrice <= product.price && product.price <= biggestPrice) {
                productsOnFilter.push(product)
              }
            })
          }
        }

        // if there is only size filter
        if(productSize.length !== 0 && productColor.length === 0) {
          productsOnFilter = []
          if(lowestPrice && biggestPrice) {
            productSize.filter((product) => {
              if(lowestPrice <= product.price && product.price <= biggestPrice) {
                productsOnFilter.push(product)
              }
            })
          }
        }
      })
    }
  }

  // merging products for two filters and price
  const productMergeFilter = () => {
    productsOnFilter = []
    if(lowestPrice && biggestPrice) {
      productMerge.filter((product) => {
        if(lowestPrice <= product.price && product.price <= biggestPrice) {
          productsOnFilter.push(product)
        }
      })
    }

    biggestArray.filter((product) => smallestArray.includes(product) ? productsOnFilter.push(product) : '')
  }

  const generateHTMLFilteredProduct = () => {
    divProductContainer.innerText = ''
    productsOnFilter.length !== 0 ? 
      productsOnFilter.map((product) => {
        divProductContainer.innerHTML += `
          <div class="products--cardItem ${product.id}">
            <div class="products--imageCardItem">
              <img src=${product.image}></img>
            </div>
            <div class="products--textInformationCardItem">
              <h3>${product.name}</h3>
              <p class="bold"> R$ ${product.price.toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
              <p class="text-installments">até ${product.parcelamento[0]}x de R$${product.parcelamento[1].toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
            </div>
            <div class="products--buttonBuyCardItem"><button class="buttonBuyItem${product.id}">Comprar</button></div>
          </div>
        `
      }) : divProductContainer.innerHTML = `<p class="products--productFilterEmpty">Não há produtos catalogados com os filtros requeridos!</p>`
  }

  const buttonsBuy = document.querySelectorAll('.buttonBuyItem')
  for(let buttonBuy of buttonsBuy) {
    buttonBuy.addEventListener('click', (element) => addItemInCart(element.target))
  }

  verifyArrayForOneFilter()
  generateHTMLFilteredProduct()

  if(productsOnFilter !== []) {
    if(window.innerWidth < 425) {
      let productsPerPageFilter = 3
      for(let i = productsPerPageFilter; i < divProductContainer.children.length; i++) {
        divProductContainer.children[i].style.display = 'none'
      }
    } else if(window.innerWidth > 520 && window.innerWidth < 1024) {
      let productsPerPageFilter = 4
      for(let i = productsPerPageFilter; i < divProductContainer.children.length; i++) {
        divProductContainer.children[i].style.display = 'none'
      }
    } else if(window.innerWidth > 1024) {
      let productsPerPageFilter = 9
      for (let i = productsPerPageFilter; i < divProductContainer.children.length; i++) {
        divProductContainer.children[i].style.display = 'none'
      }
    }
  } 
}

const removeFilterDesktop = async (element) => {
  const classElementDesmark = element.classList[1]
  const products = await getAllProducts()
  const divProductContainer = document.querySelector('.products--cardContainer')
  let filtersRemanaing = []
  let productColors = []
  let productSizes = []
  let productMerge = []
  let priceMark = []
  let prices = []
  let biggestPrice
  let lowestPrice

  const checkFilterDesmark = (() => {
    filtersCalled.map((filter, index) => {
      filter === classElementDesmark ? filtersCalled[index] = '' : ''
    })
    filtersCalled.forEach(filter => {
      filter === '' ? '' : filtersRemanaing.push(filter)
    });
  })()

  const priceRangeActive = (() => {
    for(let checkmark of pricesFilterDesktopInput) {
      checkmark.classList.contains('checkmarkFilterDesktop--active') ? priceMark.push(checkmark) : ''
    }
  })()

  const getLowestAndBiggest = (() => {
    if(priceMark.length !== 0) {
      priceMark.map((item) => {
        prices.push(item.getAttribute('lowestPrice'))
        prices.push(item.getAttribute('biggestPrice'))
      })
      prices = prices.map((price) => Number(price))
  
      biggestPrice = Math.max.apply(null, prices)
      lowestPrice = Math.min.apply(null, prices)
    }
  })()

  let biggestArray
  let smallestArray
  const gettingBiggestArray = (array1, array2) => {
    const unionArray = [array1, array2]
    for(let i = 0; i < unionArray.length; i++) {
      if(i === 0) {
        biggestArray = unionArray[i]
      } else {
        unionArray[i].length > biggestArray.length ? biggestArray = unionArray[i] : ''
      }
    } 
    unionArray.map((array) => array !== biggestArray ? smallestArray = array : '')
  }

  const filterProductRemanaing = () => {
    filtersRemanaing.length === 0 ? productsOnFilter = products : ''

    if(filtersRemanaing.length !== 0) {
      filtersRemanaing.map((filter) => {
        if(filter === "amarelo" || "azul" || "branco" || "cinza" || "laranja" || "verde" || "vermelho" || "preto" || "rosa" || "vinho") {
          products.filter((product) => {
            product.color.toLowerCase() === filter ? productColors.push(product) : ''
          })
        }
  
        if(filter === "P" || "M" || "G" || "GG" || "U" || "36" || "38" || "40") {
          products.filter((product) => {
            const sizePerProduct = product.size
            const sizeUnique = sizePerProduct.map((size) => {return size})
            if(sizeUnique.length > 1) {
              filter === sizeUnique[0] ? productSizes.push(product) : ''
              filter === sizeUnique[1] ? productSizes.push(product) : ''
            } else {
              filter === sizeUnique[0] ? productSizes.push(product) : ''
            }
          })
        }
  
        if(productColors.length !== 0 && productSizes.length !== 0) {
          gettingBiggestArray(productColors, productSizes)
  
          biggestArray.filter((product) => smallestArray.includes(product) ? productMerge.push(product) : '')
          productsInPage()
        }
  
        if(productColors.length !== 0 && productSizes.length === 0) {
          productsOnFilter = []
          if(lowestPrice && biggestPrice) {
            productColors.filter((product) => {
              if(lowestPrice <= product.price && product.price <= biggestPrice) {
                productsOnFilter.push(product)
              }
            })
          } else {
            productsOnFilter = productColors
          }
        }
  
        if(productSizes.length !== 0 && productColors.length === 0) {
          productsOnFilter = []
          if(lowestPrice && biggestPrice) {
            productSizes.filter((product) => {
              if(lowestPrice <= product.price && product.price <= biggestPrice) {
                productsOnFilter.push(product)
              }
            })
          } else {
            productsOnFilter = productSizes
          }
        }

        if(productColors.length === 0 && productSizes.length === 0) {
          productsOnFilter = []
          if(lowestPrice && biggestPrice) {
            products.filter((product) => {
              if(lowestPrice <= product.price && product.price <= biggestPrice) {
                productsOnFilter.push(product)
              }
            })
          } else {
            productsOnFilter = products
          }
        }
      })
    }
  }

  filterProductRemanaing()
  
  const productsInPage = () => {
    productsOnFilter = []
    if(biggestPrice && lowestPrice) {
      productMerge.filter((product) => {
        if(lowestPrice <= product.price && product.price <= biggestPrice) {
          productsOnFilter.push(product)
        }
      })
    }
    biggestArray.filter((product) => smallestArray.includes(product) ? productsOnFilter.push(product) : '')
  }


  const generateHTML = () => {
    divProductContainer.innerText = ''
    productsOnFilter.map((product) => {
      divProductContainer.innerHTML += `
        <div class="products--cardItem ${product.id}">
          <div class="products--imageCardItem">
            <img src=${product.image}></img>
          </div>
          <div class="products--textInformationCardItem">
            <h3>${product.name}</h3>
            <p class="bold"> R$ ${product.price.toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
            <p class="text-installments">até ${product.parcelamento[0]}x de R$${product.parcelamento[1].toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
          </div>
          <div class="products--buttonBuyCardItem"><button class="buttonBuyItem${product.id}">Comprar</button></div>
        </div>
      `
    })
  }

  const buttonsBuy = document.querySelectorAll('.buttonBuyItem')
  for(let buttonBuy of buttonsBuy) {
    buttonBuy.addEventListener('click', (element) => addItemInCart(element.target))
  }

  generateHTML()

  if(productsOnFilter !== []) {
    if(window.innerWidth < 425) {
      let productsPerPageFilter = 3
      for(let i = productsPerPageFilter; i < divProductContainer.children.length; i++) {
        divProductContainer.children[i].style.display = 'none'
      }
    } else if(window.innerWidth > 520 && window.innerWidth < 1024) {
      let productsPerPageFilter = 4
      for(let i = productsPerPageFilter; i < divProductContainer.children.length; i++) {
        divProductContainer.children[i].style.display = 'none'
      }
    } else if(window.innerWidth > 1024) {
      let productsPerPageFilter = 9
      for (let i = productsPerPageFilter; i < divProductContainer.children.length; i++) {
        divProductContainer.children[i].style.display = 'none'
      }
    }
  }
}

// function to resolve promise products 
const promisesResolve = async () => {
  const products = await getAllProducts()
  const htmlProduct = generateHtmlProduct(products)
  insertProductsIntoPage(htmlProduct)
}

// call all promise resolves function
promisesResolve()