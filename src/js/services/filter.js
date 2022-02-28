import productServices from "./productServices.js"
import productsRender from "../views/productView.js"

let allProducts = []
let products = []

let filterObj = {
    colors: [],
    sizes: [],
    prices: [],
}

async function loadAllProducts() {
    allProducts = []
    allProducts = await productServices
    productsRender(allProducts)
    return allProducts
}

// color: '', size: '', price: ''
function filter(value) {
    let productsFilteredColors = []
    let productsFilteredSizes = []
    let productsFilteredPrice = []

    if (value.startsWith('color')) {
        let [type, valueTreaty] = value.split('-')
        let filtered = []

        if(!productsFilteredColors.find(el => el == valueTreaty)) {
            productsFilteredColors.push(valueTreaty)
        } else {
            productsFilteredColors = productsFilteredColors.filter(el => el != valueTreaty)
        }

        // if (!productsFilteredColors.length) loadAllProducts()

        for(let filterColor of productsFilteredColors) {
            filtered = allProducts.filter(el => el.color == filterColor)
            filtered.forEach((obj) => {
                if (!filterObj.colors.find(el => el.id == obj.id)) {
                    filterObj.colors.push(obj)
                } else {
                    filterObj.colors = filterObj.colors.filter(el => el.id != obj.id)
                    if (!filterObj.colors.length) loadAllProducts()
                }
            })  
        }
    }

    if (value.startsWith('size')) {
        let [type, valueTreaty] = value.toUpperCase().split('-')
        let filtered = []

        if(!productsFilteredSizes.find(el => el == valueTreaty)) {
            productsFilteredSizes.push(valueTreaty)
        } else {
            productsFilteredSizes = productsFilteredSizes.filter(el => el != valueTreaty)
        }
        
        // if (!productsFilteredSizes.length) loadAllProducts()

        for(let filterSize of productsFilteredSizes) {
            filtered = allProducts.filter(el => el.size[0] == filterSize || el.size[1] == filterSize)
            filtered.forEach((obj) => {
                if (!filterObj.sizes.find(el => el.id == obj.id)) {
                    filterObj.sizes.push(obj)
                } else {
                    filterObj.sizes = filterObj.sizes.filter(el => el.id != obj.id)
                    if (!filterObj.sizes.length) loadAllProducts()
                }
            }) 
        }
    }

    if (value.startsWith('price')) {
        let [type, valueFrom, valueTo] = value.split('-')
        let filtered = []

        !productsFilteredPrice.find(el => el === valueFrom) ? 
        productsFilteredPrice.push(valueFrom) : productsFilteredPrice = productsFilteredPrice.filter(el => el != valueFrom)

        if (valueTo) {
            !productsFilteredPrice.find(el => el === valueTo) ? 
            productsFilteredPrice.push(valueTo) : productsFilteredPrice = productsFilteredPrice.filter(el => el != valueTo)
        }
        
        // if (!productsFilteredPrice.length) loadAllProducts()

        let max = Math.max(...productsFilteredPrice)
        let min = Math.min(...productsFilteredPrice)

        filtered = allProducts.filter(el => el.price >= min && el.price <= max)
        filtered.forEach((obj) => {
            if (!filterObj.prices.find(el => el.id == obj.id)) {
                filterObj.prices.push(obj)
            } else {
                filterObj.prices = filterObj.prices.filter(el => el.id != obj.id)
                if (!filterObj.prices.length) loadAllProducts()
            }
        })  
    }

    products = new Set([...filterObj.colors, ...filterObj.sizes, ...filterObj.prices])
    !products.length ? productsRender(products) : loadAllProducts()
}

export { filter, loadAllProducts, products }