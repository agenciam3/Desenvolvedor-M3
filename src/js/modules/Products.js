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
    }

    displayProducts(products) {
        let priceDivided;
        let html = "";
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
        productsSection.classList.remove('no-opacity');
    }

}