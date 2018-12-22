import {
    initialData
} from '../store/data';
import {
    events
} from '../events';

export default class Products {
    constructor() {
        this.displayProducts(initialData);
        events.on('renderProducts', this.displayProducts);
        this.selectors();
        this.eventListeners();
    }
    selectors() {
        this.buyButton = document.querySelectorAll('.products-item__btn');
        this.shippingCartCounter = document.querySelector('.nav__bag-counter span');
        this.counter = 0;
    }
    eventListeners() {
        for (let button of this.buyButton) {
            button.addEventListener('click', this.addItemToCart.bind(this));
        }
    }
    addItemToCart(e) {
        e.preventDefault();
        this.counter += 1;
        this.shippingCartCounter.innerHTML = this.counter;
    }

    displayProducts(products) {
        let priceDivided;
        let html = "";
        if (products.length === 0) {
            html += `
            <div class="no-item-found">
                <p>Nenhum item foi encontrado</p>
            </div>
            `;
            let productsSection = document.getElementById('products');
            productsSection.innerHTML = html;
        }
        for (let product of products) {
            priceDivided = (Math.floor((product.price / product.divided_up_to) * 100) / 100);
            html += `
            <article class="products-item">
            <figure>
              <img src="./${product.img}" alt="products image">
            </figure>
            <h3 class="products-item__title">${product.name}</h3>
            <p class="products-item__price">R$ ${product.price.toFixed(2)}</p>
            <small class = "products-item__divided-by" > até ${product.divided_up_to}
            x de R$ ${priceDivided.toFixed(2)} </small>
            <a href="#" class="products-item__btn">Comprar</a>
          </article>`
        }

        html += `
        <div class = "products__btn" >
            <button class = "products__btn--accent" > Carregar mais </button> 
        </div>
            `
        let productsSection = document.getElementById('products');
        productsSection.innerHTML = html;
    }

}