import generateMenuHeader from '../menuHeader';
import orderOptions from './orderOptions';

function generateOrderMenu() {
  const orderMenuSection = document.createElement('section');
  orderMenuSection.className = 'menu-container';
  orderMenuSection.appendChild(generateMenuHeader('Ordenar'));
  orderMenuSection.appendChild(orderOptions());
  
  const mainElement = document.getElementById('main');
  mainElement.appendChild(orderMenuSection);
}

function handleOrderButton() {
  const orderButton = document.getElementById('order-button');
  orderButton.addEventListener('click', generateOrderMenu);
}

export default handleOrderButton;
