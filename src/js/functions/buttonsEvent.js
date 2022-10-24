

function showMoreItens() {
  let noneCards = document.querySelectorAll('.hidden-mobile');
  console.log('before', noneCards.length)

  noneCards.forEach((item, i) => {
    if (i < 6)
    item.classList.remove('hidden-mobile');
  });

  noneCards = document.querySelectorAll('.hidden-mobile');
  console.log('after', noneCards.length);
  if (noneCards.length === 0) {
    const loaderButton = document.getElementById('loader-button');
    loaderButton.className = 'hidden';
  }
}


function renderButton(cardItens) {
  const statePrevious = document.getElementById('loader-button');
  if (!!statePrevious) {
    statePrevious.parentNode.removeChild(statePrevious);
  }

  if (cardItens <= 4) return;

  const loaderButton = document.createElement('button');

  loaderButton.innerText = 'Carregar mais';
  loaderButton.id = 'loader-button';

  loaderButton.addEventListener('click', showMoreItens);

  const cardsContainer = document.getElementById('cards-container');

  cardsContainer.parentNode.insertBefore(loaderButton, cardsContainer.nextSibling);
}

export default renderButton;
