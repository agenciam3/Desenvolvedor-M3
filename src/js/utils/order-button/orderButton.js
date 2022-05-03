import generateMenuHeader from '../menuHeader';
import orderOptions from './orderOptions';
import { hideMainContent } from '../toggleMainContent';

function generateOrderMenu() {
  const orderMenuSection = document.createElement('section');
  orderMenuSection.className = 'menu-container';
  orderMenuSection.appendChild(generateMenuHeader('Ordenar'));
  orderMenuSection.appendChild(orderOptions());
  
  const mainElement = document.getElementById('main');
  mainElement.appendChild(orderMenuSection);

  hideMainContent();
}

function handleOrderButton() {
  const orderButton = document.getElementById('order-button');
  orderButton.addEventListener('click', generateOrderMenu);
}

export default handleOrderButton;
