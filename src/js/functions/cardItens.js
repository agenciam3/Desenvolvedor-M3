import renderButton from './buttonsEvent';

function createCard(item, index) {
  let actualyPrice = item.price; 
  let valueParsing = actualyPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  let actualyInstallmente = item.price;
  let installmenteParsing = actualyInstallmente.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  const innerHTML = `
    <img src=${item.image} alt=${item.name} />
    <h2>${item.name}</h2>
    <span>${valueParsing}</span>
    <p>até ${item.parcelamento[0]}x de ${installmenteParsing}</p>
    `;

  const cardList = document.createElement('div');
  cardList.className = 'card-wrapper';
  
  if (index > 5) {
    cardList.classList.add('hidden-mobile');
  }
  
  cardList.innerHTML = innerHTML;

  const button = document.createElement('button');
  button.textContent = 'COMPRAR';
  button.addEventListener('click', addToCart);
  cardList.appendChild(button);

  const cardsContainer = document.getElementById('cards-container');

  cardsContainer.appendChild(cardList);
}

function createCards(items) {
  const productsContainer = document.getElementById('cards-container');
  productsContainer.innerHTML = '';

  items.forEach((item, index) => {
    createCard(item, index);
  });

  renderButton(items.length);
}

function addToCart() {
  let counter = document.getElementById('cart-counter');
  
  if (!counter) {
    counter = document.createElement('span');
    counter.id = 'cart-counter';
    counter.innerHTML = 1;
    alert('Produto Adicionado no Carrinho')
    const header = document.querySelector('.div-bag');
    header.appendChild(counter);
  } else {
    counter.innerHTML = parseInt(counter.innerHTML, 10) + 1;
    alert('Produto Adicionado no Carrinho')
  }

}

export default createCards;
