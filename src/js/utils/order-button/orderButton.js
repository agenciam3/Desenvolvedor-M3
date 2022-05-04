import generateMenuHeader from '../menuHeader';
import { hideMainContent } from '../toggleMainContent';

function generateOrderMenu() {
  const orderBtns = document.querySelector('.order-btns-container');
  orderBtns.parentNode.insertBefore(generateMenuHeader('Ordenar'), orderBtns);

  toggleOrderMenu();
  hideMainContent();
}

export function toggleOrderMenu(force) {
  const menu = document.querySelector('.menu-container');
  menu.classList.toggle('hidden-desktop', force);
  menu.classList.toggle('hidden', force);
}

function handleOrderButton() {
  const orderButton = document.getElementById('order-button');
  const orderDesktopBtn = document.querySelector('.order-desktop');
  orderButton.addEventListener('click', generateOrderMenu);
  orderDesktopBtn.addEventListener('click', () => toggleOrderMenu());
}

export default handleOrderButton;
