function loadMoreContent() {
  let hiddenItems = document.querySelectorAll('.hidden-mobile');

  hiddenItems.forEach((item, i) => {
    if (i < 4)
    item.classList.remove('hidden-mobile');
  });

  hiddenItems = document.querySelectorAll('.hidden-mobile');

  if (hiddenItems.length === 0) {
    const loaderButton = document.getElementById('loader-button');
    loaderButton.style.display = 'none';
  }
}

function createLoaderButton() {
  const loaderButton = document.createElement('button');

  loaderButton.innerText = 'Carregar mais';
  loaderButton.id = 'loader-button';

  loaderButton.addEventListener('click', loadMoreContent);

  const cardsContainer = document.getElementById('cards-container');

  cardsContainer.parentNode.insertBefore(loaderButton, cardsContainer.nextSibling);
}

export default createLoaderButton;
