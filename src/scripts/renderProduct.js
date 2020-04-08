import { initialData } from './store.js';
import { events } from './events.js';
import { iventory } from './manageStore.js';



export default class Products {
  constructor() {
    this.showProducts(initialData);
    events.on('displayProducts', this.showProducts);
    events.on('displayProducts', this.selectors.bind(this));
    events.on('displayProducts', this.eventListeners.bind(this));
    this.selectors();
    this.eventListeners();
  }
  selectors() {
    this.buyButton = document.querySelectorAll('.products-item__btn');
    this.loadMore = document.querySelector('.products__btn--accent');
    this.cartCounter = document.querySelector('.spanCounter');
    this.counter = 0;
  }

  eventListeners() {
    for (let button of this.buyButton) {
      button.addEventListener('click', this.itemToCart.bind(this));
    }
    this.loadMore.addEventListener('click', this.addProducts)
  }
  itemToCart(e) {
    e.preventDefault();
    this.counter += 1;
    this.cartCounter.innerHTML = this.counter;
  }

  addProducts() {
    iventory.addData();
  }

  showProducts(products) {
    let priceDivided;
    let product_html = "";
    if (products.length === 0) {

      product_html += `

  <div class="no-item-found">

      <p>Nenhum item foi encontrado</p>

  </div>

  `;

      let productList = document.querySelector('.productList');

      productList.innerHTML = product_html;

    }
    for (let product of products) {


      priceDivided = (Math.floor((product.price / product.divided_up_to) * 100) / 100);

      product_html += `

    <article class="products-item">

    <figure>

      <img src="${product.img}" alt="products image">

    </figure>

    <h2 class="products-item__title">${product.name}</h2>

    <p class="products-item__price">R$ ${product.price.toFixed(2)}</p>

    <small class = "products-item__divided-by" > até ${product.divided_up_to}

    x de R$ ${priceDivided.toFixed(2)} </small>

    <a href="#" class="products-item__btn">Comprar</a>

  </article>`

    }
    product_html += `

<div class = "products__btn" >

    <button class = "products__btn--accent" > Carregar mais </button> 

</div>`

    let productList = document.querySelector('.productList');



    productList.innerHTML = product_html;
    
  }
} 


