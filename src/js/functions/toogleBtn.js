

export function showMainContent() {
  const cards = document.getElementById('cards-container');
  cards.classList.remove('hidden');
  const loaderButton = document.getElementById('loader-button');
  if (!!loaderButton) {
    loaderButton.classList.remove('hidden');
  }
  const footer = document.querySelector('footer');
  footer.classList.remove('hidden');
}


export function hideMainContent() {
  const cards = document.getElementById('cards-container');
  cards.classList.add('hidden');
  const loaderButton = document.getElementById('loader-button');

  if (!!loaderButton) {
    loaderButton.classList.add('hidden');
  }
  const footer = document.querySelector('footer');
  footer.className = 'hidden';
}