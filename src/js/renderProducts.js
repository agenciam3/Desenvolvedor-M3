const productsUrl = `http://localhost:5000/products`
const seleciona = (elemento) => document.querySelector(elemento)
const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

async function renderProducts() {
    fetch(productsUrl)
        .then((resp) => resp.json())
        .then((data) => renderProduct(data))
}


function renderProduct(item) {
    const showProduct = item.map((product) => `
        <div class="card" data-key="${product.id}">
            <div class="card-img">
                <img src="${product.image}" alt="">
            </div>
            <div class="card-info">
                <h4>${product.name}</h4>
                <h3>${formatoReal(product.price)}</h3>
                <p>até ${product.parcelamento}</p>
            </div>
            <div class="card-btn">
                <button type="button">COMPRAR</button>
            </div>
        </div>
           
        `);
    document.getElementById('cards').innerHTML = showProduct

}

renderProducts()