import axios from 'axios';

function createCard(item, index) {
  const innerHTML = `
    <img src=${item.image} alt=${item.name} />
    <h2>${item.name}</h2>
    <span>R$ ${item.price.toFixed(2)}</span>
    <p>até ${item.parcelamento[0]}x de R$${item.parcelamento[1].toFixed(2)}</p>
    <button>COMPRAR</button>
    `;

  const cardWrapper = document.createElement('div');
  cardWrapper.className = 'card-wrapper';

  if (window.innerWidth <= 700 && index > 3) {
    cardWrapper.classList.add('hidden-mobile');
  }

  cardWrapper.innerHTML = innerHTML;

  const cardsContainer = document.getElementById('cards-container');

  cardsContainer.appendChild(cardWrapper);
}

function createCards(items) {

  items.forEach((item, index) => {
    createCard(item, index);
  });
}

function createLoaderButton() {
  const loaderButton = document.createElement('button');

  loaderButton.innerText = 'Carregar mais';
  loaderButton.id = 'loader-button';

  const cardsContainer = document.getElementById('cards-container');

  cardsContainer.parentNode.insertBefore(loaderButton, cardsContainer.nextSibling);
}

axios.get('http://localhost:5000/products')
  .then(({ data }) => {
    createCards(data);
    createLoaderButton();
  });
