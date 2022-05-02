import axios from 'axios';

function createCard(item) {
  const innerHTML = `
    <img src=${item.image} alt=${item.name} />
    <h2>${item.name}</h2>
    <span>R$ ${item.price.toFixed(2)}</span>
    <p>até ${item.parcelamento[0]}x de R$${item.parcelamento[1].toFixed(2)}</p>
    <button>COMPRAR</button>
    `;

  const cardWrapper = document.createElement('div');
  cardWrapper.className = 'card-wrapper';
  cardWrapper.innerHTML = innerHTML;

  const cardsContainer = document.getElementById('cards-container');

  cardsContainer.appendChild(cardWrapper);
}

function createCards(items) {

  items.forEach((item) => {
    createCard(item);
  });
}

axios.get('http://localhost:5000/products')
  .then(({ data }) => createCards(data));
