
let counter = 1

function productRender(products) {
    if (!products) throw Error('Não há produtos')
    
    const list = document.querySelector('.c-product__list')
    list.innerHTML = ''

    for(let product of products) {
        const {id, name, price, parcelamento, image} = product
        let priceFormated = priceFormater(price)
        let parcelamentoFormated = priceFormater(parcelamento[1])
        const card = document.createElement('div')
        card.classList.add("c-product__card")

        card.innerHTML = `
            <img src="${image}" alt="product-${id}">
            <h3 class="c-card__title">${name}</h3>
            <div class="c-card__values">
            <p><strong>R$${priceFormated}</strong></p>
            <p><span class="c-card__portion">até ${parcelamento[0]}x de R$${parcelamentoFormated}</strong></p>
            </div>
            <button class="c-button --sec js-buy">
                comprar
            </button>
        `
        list.appendChild(card)
    }

    const counterProducts = document.querySelector('#counter')
    counterProducts.innerHTML = counter

    const shopButtons = document.querySelectorAll('.js-buy')
    shopButtons.forEach((button) => {
        button.addEventListener('click', () => {
        counter += 1
        counterProducts.innerHTML = counter
    })
    })
}

function priceFormater(price) {
    if(!price) return

    return price
        .toFixed(2)
        .toString()
        .replace('.', ',')
}

// export default productRender
export default productRender
