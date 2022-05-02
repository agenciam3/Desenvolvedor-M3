export function closeMenu() {
  const menuContainer = document.querySelector('.menu-container');
  menuContainer.parentNode.removeChild(menuContainer);
}

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

export default generateMenuHeader;
