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
  const productsContainer = document.getElementById('cards-container');
  productsContainer.innerHTML = '';

  items.forEach((item, index) => {
    createCard(item, index);
  });
}

export default createCards;
