function loadMoreContent() {
  let hiddenItems = document.querySelectorAll('.hidden-mobile');
  console.log('before', hiddenItems.length)

  hiddenItems.forEach((item, i) => {
    if (i < 6)
    item.classList.remove('hidden-mobile');
  });

  hiddenItems = document.querySelectorAll('.hidden-mobile');
  console.log('after', hiddenItems.length);
  if (hiddenItems.length === 0) {
    const loaderButton = document.getElementById('loader-button');
    loaderButton.className = 'hidden';
  }
}

function createLoaderButton(numberItems) {
  const oldLoader = document.getElementById('loader-button');
  if (!!oldLoader) {
    oldLoader.parentNode.removeChild(oldLoader);
  }

  if (numberItems <= 4) return;

  const loaderButton = document.createElement('button');

  loaderButton.innerText = 'Carregar mais';
  loaderButton.id = 'loader-button';

  loaderButton.addEventListener('click', loadMoreContent);

  const cardsContainer = document.getElementById('cards-container');

  cardsContainer.parentNode.insertBefore(loaderButton, cardsContainer.nextSibling);
}

export default createLoaderButton;
