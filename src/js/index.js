import { filter, loadAllProducts } from "./services/filter.js"
import { filterToggle, orderByToggle } from "./services/menuToggle.js"
import orderProducts from "./services/order.js"
import moreColors from "./views/moreColorsView.js"

loadAllProducts()

const inputs = document.querySelectorAll('input')
inputs.forEach(input => {
    input.addEventListener('change', (e)=> {
        const value = e.target.value
        filter(value)
    })
});

const loadAll = document.querySelector('#loadMore')
loadAll.addEventListener('click', () => loadAllProducts())

const orderBy = document.querySelector('#orderBy')
orderBy.addEventListener('change', (e) => orderProducts(e.target.value))

const orderByButton1 = document.querySelector('#orderByButton1')
orderByButton1.addEventListener('click', () => {
    orderProducts("1")
    orderByToggle(false)
})

const orderByButton2 = document.querySelector('#orderByButton2')
orderByButton2.addEventListener('click', () => {
    orderProducts("2")
    orderByToggle(false)
})

const orderByButton3 = document.querySelector('#orderByButton3')
orderByButton3.addEventListener('click', () => {
    orderProducts("3")
    orderByToggle(false)
})

const filterOpenButton = document.querySelector('#filterOpen')
filterOpenButton.addEventListener('click', () => filterToggle(true))

const filterCloseButton = document.querySelector('#filterClose')
filterCloseButton.addEventListener('click', () => filterToggle(false))

const orderByOpenButton = document.querySelector('#orderByOpenButton')
orderByOpenButton.addEventListener('click', () => orderByToggle(true))

const orderByCloseButton = document.querySelector('#orderByCloseButton')
orderByCloseButton.addEventListener('click', () => orderByToggle(false))

const moreColorsAnchor = document.querySelector('#moreColors')
moreColorsAnchor.addEventListener('click', () => {
    moreColors()
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        input.addEventListener('change', (e)=> {
            const value = e.target.value
            filter(value)
        })
    });
});

