import { formatPrice } from "./priceFormatter";

export function generateCards(products) {
  const productsContainer = document.querySelector(".products-container");

  products.forEach((product) => {
    const { image, name, price, parcelamento, id } = product;
    const [times, installmentValue] = parcelamento;

    productsContainer.innerHTML += `
        <div class="product">
          <div class="product-image">
            <img src="${image}" alt="${name}" />
          </div>
          <h1 class="product-name">${name}</h1>
          <strong class="product-price">${formatPrice(price)}</strong>
          <p class="product-installment">até ${times}x de ${installmentValue}</p>
          <button type="button" class="product-button" id=${id}>Comprar</button>
        </div>
      `;
  });
}
