export default class ProductCard extends HTMLElement {
  constructor() {
    super();

    this._data = {};

    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        @import "main.css"
      </style>
    `;

    const card = document.createElement("div");
    card.setAttribute("id", "card");
    shadow.append(card);
  }

  set data(value) {
    this._data = value;
  }

  get data() {
    return this._data;
  }

  connectedCallback() {
    this.updateComponent(this);
  }

  updateComponent(el) {
    const shadow = el.shadowRoot;
    const card = shadow.getElementById("card");

    const productImage = document.createElement("img");
    const productName = document.createElement("h5");
    const productPrice = document.createElement("p");
    const productInstallmentPayment = document.createElement("label");
    const buyProduct = document.createElement("button");

    const priceFormatted = this.data.price.toFixed(2).toString().replace(".", ",");
    const installmentPaymentPriceFormatted = this.data.parcelamento[1].toFixed(2).toString().replace(".", ",");

    productImage.setAttribute("src", this.data.image);
    productName.innerHTML = this.data.name;
    productPrice.innerHTML = `R$ ${priceFormatted}`;
    productInstallmentPayment.innerHTML = `até ${this.data.parcelamento[0]}x de R$${installmentPaymentPriceFormatted}`;
    buyProduct.textContent = "COMPRAR";
    
    card.appendChild(productImage);
    card.appendChild(productName);
    card.appendChild(productPrice);
    card.appendChild(productInstallmentPayment);
    card.appendChild(buyProduct);
  }
}