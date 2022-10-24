import generateMenuHeader from '../menuHeader';
import { hideMainContent } from '../toogleBtn';

function addByOrder() {
  const orderBtns = document.querySelector('.order_nav_mobiles_filter_mobile');
  orderBtns.parentNode.insertBefore(generateMenuHeader('Ordenar'), orderBtns);

  toggleOrderMenu();
  hideMainContent();
}


function btnOrder() {
  const orderButton = document.getElementById('order_nav_mobile');
  const orderDesktopBtn = document.querySelector('.order-desktop');
  orderButton.addEventListener('click', addByOrder);
  orderDesktopBtn.addEventListener('click', () => toggleOrderMenu());
}


export function toggleOrderMenu(force) {
  const menu = document.querySelector('.menu-container');
  menu.classList.toggle('hidden-desktop', force);
  menu.classList.toggle('hidden', force);
}

export default btnOrder;
