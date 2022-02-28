import productRender from "../views/productView.js"
import { products, loadAllProducts } from "./filter.js"

async function orderProducts(e) {
    let productsOrdered = products.length ? new Array(products) : await loadAllProducts()
    console.log(productsOrdered)

    switch (e) {
        case "-1":
            loadAllProducts()
            break;
        case "1":
            productsOrdered.sort((prodOne, prodTwo) => {
                let prodOneDate = new Date(prodOne.date)
                let prodTwoDate = new Date(prodTwo.date)

                if (prodOneDate < prodTwoDate) return -1
                if (prodOneDate > prodTwoDate) return 1
                return 0
            })
            productRender(productsOrdered)
            break;
        case "2":
            productsOrdered.sort((prodOne, prodTwo) => {
                let prodOnePrice = prodOne.price
                let prodTwoPrice = prodTwo.price

                if (prodOnePrice < prodTwoPrice) return -1
                if (prodOnePrice > prodTwoPrice) return 1
                return 0
            })
            productRender(productsOrdered)
            break;
        case "3":
            productsOrdered.sort((prodOne, prodTwo) => {
                let prodOnePrice = prodOne.price
                let prodTwoPrice = prodTwo.price

                if (prodOnePrice > prodTwoPrice) return -1
                if (prodOnePrice < prodTwoPrice) return 1
                return 0
            })
            productRender(productsOrdered)
            break;
    }
}

export default orderProducts