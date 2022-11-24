const productsUrl = `http://localhost:5000/products`
let clicks = 0
let cart = []
const seleciona = (elemento) => document.querySelector(elemento)
const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

async function renderProducts() {
    await fetch(productsUrl)
        .then((resp) => resp.json())
        .then((data) => renderProduct(data))
}

function removeItem() {
    if (clicks != 0)
        clicks -= 1
    totalCart.innerHTML = clicks
    cart.pop()
    console.log('Removeu do carrinho', cart)
}

function renderProduct(item) {
    const showProduct = item.map((product) =>
        `
        <div class="card" 
            data-key="${product.id}" 
            color="${product.color}" 
            price="${product.price}" 
            size="${product.size}">

            <div class="card-img">
                <img src="${product.image}" 
                alt="">
            </div>

            <div class="card-info">
                <h4>${product.name}</h4>
                <h3>${formatoReal(product.price)}</h3>
                <p>até ${product.parcelamento[0]}
                x de ${formatoReal(product.parcelamento[1])}</p>
            </div>

            <div class="card-btn">
                <button key="${product.id}" type="button">COMPRAR</button>
            </div>
        </div>       
        `
    );

    document.getElementById('cards').innerHTML = showProduct

    Array.from(document.querySelectorAll('.card')).map((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault()
            key = e.target.closest('.card').getAttribute('data-key')
            total = cart.concat(key)
            clicks += 1
            totalCart.innerHTML = clicks
            cart.push(key)

            console.log('Adicionou no carrinho:', cart)


        })
    })

}
renderProducts()