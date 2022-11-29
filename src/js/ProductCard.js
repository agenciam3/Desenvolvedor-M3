export default class ProductCard extends HTMLElement {
  constructor() {
    super();

    this._data = {};
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

  updateComponent(node) {
    const productImage = document.createElement("img");
    const productName = document.createElement("h5");
    productName.classList.add("product__name");
    const productPrice = document.createElement("p");
    productPrice.classList.add("product__price");
    const productInstallmentPayment = document.createElement("label");
    productInstallmentPayment.classList.add("product__payment-option")
    const buyProduct = document.createElement("button");
    buyProduct.classList.add("product__button--buy");

    const priceFormatted = this.data.price.toFixed(2).toString().replace(".", ",");
    const installmentPaymentPriceFormatted = this.data.parcelamento[1].toFixed(2).toString().replace(".", ",");

    productImage.setAttribute("src", this.data.image);
    productName.innerHTML = this.data.name;
    productPrice.innerHTML = `R$ ${priceFormatted}`;
    productInstallmentPayment.innerHTML = `até ${this.data.parcelamento[0]}x de R$${installmentPaymentPriceFormatted}`;
    buyProduct.textContent = "COMPRAR";
    
    node.appendChild(productImage);
    node.appendChild(productName);
    node.appendChild(productPrice);
    node.appendChild(productInstallmentPayment);
    node.appendChild(buyProduct);
  }
}