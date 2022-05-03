export function hideMainContent() {
  const cards = document.getElementById('cards-container');
  cards.classList.add('hidden');
  const loaderButton = document.getElementById('loader-button');
  loaderButton.classList.add('hidden');
  const footer = document.querySelector('footer');
  footer.classList.add('hidden');
}

export function showMainContent() {
  const cards = document.getElementById('cards-container');
  cards.classList.remove('hidden');
  const loaderButton = document.getElementById('loader-button');
  loaderButton.classList.remove('hidden');
  const footer = document.querySelector('footer');
  footer.classList.remove('hidden');
}
