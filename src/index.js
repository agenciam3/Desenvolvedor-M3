/*
import { ProductsService } from "./products.service"

const productsService = new ProductsService()
*/

const filter = {
    colors: [],
    sizes: [],
    prices: [],
    order: ''
}

function onChangeColor() {
    const colorCheckBoxes = Array.from(document.getElementsByName('color-chbox'))

    const arrayCheckedColors = []
    colorCheckBoxes.forEach(elm => {
        if (elm.checked)
            arrayCheckedColors.push(elm.value)
    })
    filter.colors = arrayCheckedColors

    renderProds()
}

function onChangeSize() {
    const sizeCheckboxes = Array.from(document.getElementsByName('size-chbox'))
    console.log('onChangeSize', sizeCheckboxes)

    const arrayCheckedSizes = []
    sizeCheckboxes.forEach(elm => {
        if (elm.checked)
            arrayCheckedSizes.push(elm.value)
    })
    filter.sizes = arrayCheckedSizes
    renderProds()
    // console.log('SizeButton', SizeButton)
    // console.log('SizeButton.checked', SizeButton.map(item => item.click))
    console.log(filter)
}

function onChangePrice() {
    const priceCheckBoxes = Array.from(document.getElementsByName('price-chbox'))

    const arrayCheckedPrices = []
    priceCheckBoxes.forEach(elm => {
        if (!elm.checked) return
        const [ min, max ] = elm.value.split('~').map(Number)
        arrayCheckedPrices.push({ min, max })
    })
    filter.prices = arrayCheckedPrices
    renderProds()
}

const products = [ ]

const colors = [{color:"amarelo"},{color:"azul"},{color:"branco"},{color:"cinza"}, {color:"laranja"}, {color:"verde"}, {color:"vermelho"}, {color:"preto"}, {color:"rosa"}, {color:"vinho"}]
const sizes = [{size:"p"},{size: "m"},{size: "g"},{size: "gg"}, {size:"u"},{size:"36"}, {size:"38"}, {size:"40"}, {size:"42"}, {size:"44"}, {size:"46"}]
const prices = [{min:0, max:50},{min:51, max:150},{min:151, max:300},{min:301, max:500},{min:1}]

const renderColor = () => {

    const displayColor = document.getElementById('colors');
    displayColor.innerHTML =
        colors.map((val) => `
            <div class="eachColor">
                <label class="eachLabelColor"> ${val.color}
                <input name="color-chbox" type="checkbox" value="${val.color}" onchange="window.onChangeColor()">
                <span class="check"></span>
            </div>`
        ).join('')
}

const renderSize = () => {

    const displaySize = document.getElementById('sizes');
    displaySize.innerHTML =
        sizes.map((val, index) => `
            <div class="eachSize">
                <input name="size-chbox" id="${ index }" type="checkbox" value="${val.size}" onchange="window.onChangeSize()">
                <label class="eachLabelSize" for="${ index }"> ${val.size} </label>
            </div>`
        ).join('')
}

const formatPriceLabel = ({ min, max }) =>
    `
        ${ !max ? 'a partir' : '' } de R$ ${ min } ${ max ? `até R$ ${ max }` : '' }
    `

const renderPrices = () => {

    const displayPrices = document.getElementById('prices');
    displayPrices.innerHTML =
        prices.map((val) => `
            <div class="eachPrice">
                <label class="eachLabelPrice">${ formatPriceLabel(val) }
                <input name="price-chbox" type="checkbox" value="${ val.min }~${ val.max || '' }" onchange="window.onChangePrice()">
                <span class="check"></span>
                </label>
            </div>`
        ).join('')
}

const renderProds = () => {

    /**
     * Filters by color.
     * @returns {boolean}
     * @param {*} prod
     */
    const filterColor = (prod) =>
        !filter.colors.length
            ? true
            : filter.colors.some(color => color === prod.color)

    /**
     * Filters by size.
     * @returns {boolean}
     * @param {*} prod
     */
     const filterSize = (prod) =>
        !filter.sizes.length
            ? true
            : filter.sizes.some(size =>
                prod.sizes.some(prodSize => prodSize === size)
             )

    /**
     * Filters by price.
     * @returns {boolean}
     * @param {*} prod
     */
     const filterPrice = (prod) =>
        !filter.prices.length
            ? true
            : filter.prices.some(minMaxPrice =>
                prod.price >= minMaxPrice.min && prod.price <= (minMaxPrice.max || Infinity)
            )

    const sortByOrder = (prodA, prodB) => {
        if (filter.order === 'recent')
            return prodB.id - prodA.id
        else if (filter.order === 'price_asc')
            return prodA.price - prodB.price
        else if (filter.order === 'price_desc')
            return prodB.price - prodA.price
        else
            return 0
    }

    const filteredProducts =
        products
            .filter(product => filterColor(product) && filterSize(product) && filterPrice(product) )
            .sort((productA, productB) => sortByOrder(productA, productB))


    const displayProds = document.getElementById('products')

    const formatPrice = (price) => `R$ ${ price.toString().replace('.', ',') }`

    displayProds.innerHTML =
        filteredProducts.map((val) => `
            <div class="eachProd">
                <img src=" ${val.img} "/>
                <p> ${val.name} </p>
                <p> ${formatPrice(val.price)} </p>
                <a key="${val.id}" href"" onclick="window.addToCart(${ val.id })">COMPRAR</a>
            </div>
        `

        ).join('')
}

const cart = {
    products: []
}

const renderCart = () => {
    const cartContainer = document.getElementById('cart')
    cartContainer.innerHTML =
        cart.products.map(product =>
            `<p>${ product.qty } x ${ product.name }`
        ).join('')
}

allProducts = []

/**
 * Add product by id to cart.
 *
 * @param {number} id
 */
window.addToCart = (id) => {
    const productOriginal = products.find(prod => prod.id === id)
    if (!productOriginal) return

    const productOnCardIndex = cart.products.findIndex(prod => prod.id === id)
    const alreadyHasProduct = productOnCardIndex !== -1
    if (alreadyHasProduct)
        cart.products[productOnCardIndex].qty++
    else
        cart.products.push({ ...productOriginal, qty: 1 })

    renderCart()
}

/**
 * Fetch products from json server database
 * @returns {Promise<void>}
 */
 
const fetchProducts = async () => {
    const response = await fetch('http://localhost:3000/products')
    if (!response.ok) return

    allProducts.push(...(await response.json()))
    loadProducts()
    
}

window.onChangeOrdering = () => {
  const selectedOrder = document.getElementById('order').value
  filter.order = selectedOrder
  renderProds()
}

window.loadProducts = () => {
  products.push(...allProducts.splice(0, 3))
  renderProds()
  if (!allProducts.length)
      document.querySelector('.btn-load-more').style.display = 'none'
}


const renderApp = () =>
  document.getElementById('app').innerHTML = `
    <div class="sideFilter">
      <h1>Blusas</h1>
      <h2>CORES</h2>
      <div id="colors"></div>

      <h2>TAMANHOS</h2>

      <div id="sizes"></div>

      <h2>FAIXA DE PREÇO</h2>

      <div id="prices"></div>

      <h2>Carrinho</h2>

      <div id="cart"></div>

    </div>

    <select name="order" id="order" onchange="window.onChangeOrdering()">
      <option value="" disabled selected>Ordenar por...</option>
      <option value="recent">Mais recentes</option>
      <option value="price_asc">Menor preço</option>
      <option value="price_desc">Maior preço</option>
    </select>

    <div id="products">

    </div>

    <button type="button" class="btn-load-more" onclick="window.loadProducts()">CARREGAR MAIS...</button>
  `
window.addEventListener('load', async () => {
    renderApp()
    renderPrices();
    renderColor();
    renderSize();
    await fetchProducts()
})
