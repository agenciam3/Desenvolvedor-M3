const path = 'http://localhost:3000/products';
const productsContainer = document.querySelector("#products");

const cart = []

function addCart(prod) {
    if(!cart.find(p => p == prod))
        cart.push(prod);

    document.querySelector("#bag-counter").innerHTML = cart.length;
}

function addProductCard(product) {

    productsContainer.innerHTML += `
        <div class="product">
            <img src="${product['image-source']}" alt="imagem da roupa">
            <h3>${product['title']}</h3>
            <strong>R$ ${product['price']}</strong>
            <p>até ${product['installments'].times}x de R$ ${product['installments'].price}</p>
            <button onclick="addCart(${product.id})">
                comprar
            </button>
        </div>
    `;
}

