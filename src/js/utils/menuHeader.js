export function closeMenu() {
  const menuContainer = document.querySelector('.menu-container');
  menuContainer.parentNode.removeChild(menuContainer);

  const filters = document.getElementById('filters-container');
  const options = document.querySelectorAll('.filter-options');

  filters.className = 'hidden';
  options.forEach((option) => {
    if (!option.classList.contains('hidden')) {
      option.classList.add('hidden');
    }
  });
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
