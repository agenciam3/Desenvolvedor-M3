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
        console.log(arrayComparingFirst)

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
        generateArraysForProducts(productColors, productsSizes)
      }

      // filter if colors and prices exists
      if (productColors.length > 0 && productsPrices.length > 0 && productsSizes.length === 0) {
        generateArraysForProducts(productColors, productsPrices)
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
  if(productsUnite !== []) {
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

// function to resolve promise products 
const promisesResolve = async () => {
  const products = await getAllProducts()
  const htmlProduct = await generateHtmlProduct(products)
  insertProductsIntoPage(htmlProduct)
}

// call all promise resolves function
promisesResolve()
