import createLoaderButton from './loaderButton';

function addToCart() {
  let counter = document.getElementById('cart-counter');
  
  if (!counter) {
    counter = document.createElement('span');
    counter.id = 'cart-counter';
    counter.innerHTML = 1;

    const header = document.querySelector('.cart-container');
    header.appendChild(counter);
  } else {
    counter.innerHTML = parseInt(counter.innerHTML, 10) + 1;
  }

}

function createCard(item, index) {
  const innerHTML = `
    <img src=${item.image} alt=${item.name} />
    <h2>${item.name}</h2>
    <span>R$ ${item.price.toFixed(2)}</span>
    <p>até ${item.parcelamento[0]}x de R$${item.parcelamento[1].toFixed(2)}</p>
    `;

  const cardWrapper = document.createElement('div');
  cardWrapper.className = 'card-wrapper';
  
  if (index > 5) {
    cardWrapper.classList.add('hidden-mobile');
  }
  
  cardWrapper.innerHTML = innerHTML;

  const button = document.createElement('button');
  button.textContent = 'COMPRAR';
  button.addEventListener('click', addToCart);
  cardWrapper.appendChild(button);

  const cardsContainer = document.getElementById('cards-container');

  cardsContainer.appendChild(cardWrapper);
}

function createCards(items) {
  const productsContainer = document.getElementById('cards-container');
  productsContainer.innerHTML = '';

  items.forEach((item, index) => {
    createCard(item, index);
  });

  createLoaderButton(items.length);
}

export default createCards;
