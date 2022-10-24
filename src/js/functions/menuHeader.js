import { showMainContent } from './toogleBtn';
import { toggleOrderMenu } from './getButtons/orderButton';




function generateMenuHeader(title) {
  const headerTitle = document.createElement('h1');
  headerTitle.textContent = title;

  const closeButton = document.createElement('button');
  closeButton.id = 'close-menu-button';
  closeButton.addEventListener('click', closeMenu);

  const menuHeader = document.createElement('div');
  menuHeader.className = 'menu-header'
  menuHeader.appendChild(headerTitle);
  menuHeader.appendChild(closeButton);

  return menuHeader;
}


export function closeMenu() {
  const menuHeader = document.querySelector('.menu-header');

  if (!!menuHeader) {
    menuHeader.parentNode.removeChild(menuHeader);
  }

  const filters = document.getElementById('input_filters');
  const options = document.querySelectorAll('.check_filter_options');

  filters.className = 'hidden';
  options.forEach((option) => {
    if (!option.classList.contains('hidden')) {
      option.classList.add('hidden');
    }
  });

  toggleOrderMenu(true);

  document.getElementById('apply-btn').className = 'hidden';
  document.getElementById('clear-btn').className = 'hidden';

  showMainContent();
}
export default generateMenuHeader;
