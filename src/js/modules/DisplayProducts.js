import {
    data
} from '../data.js';

export default class DisplayProducts {
    constructor() {
        this.getData();
        this.selectors();
        this.displayProducts();
    }
    selectors() {
        this.productsSection = document.getElementById('products');
    }
    getData() {
        this.products = [];
        this.products.push(...data);
    }

    displayProducts() {
        let priceDivided;
        let html = "";
        for (let product of this.products) {
            priceDivided = Math.floor(product.price / product.divided_up_to, -1);

            html += `
            <article class="products-item">
            <figure>
              <img src="./${product.img}" alt="products image">
            </figure>
            <h3 class="products-item__title">${product.name}</h3>
            <p class="products-item__price">R$ ${product.price}</p>
            <small class = "products-item__divided-by" > até ${product.divided_up_to}
            x de R$ ${priceDivided} </small>
            <a href="#" class="products-item__btn">Comprar</a>
          </article>`
        }

        html += `
        <div class = "products__btn" >
            <button class = "products__btn--accent" > Carregar mais </button> 
        </div>
            `

        this.productsSection.innerHTML = html;
        this.productsSection.classList.remove('no-opacity');
    }

}