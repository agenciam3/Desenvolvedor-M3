import generateMenuHeader from '../menuHeader';

function generateFilterMenu() {
  const orderMenuSection = document.createElement('section');
  orderMenuSection.className = 'menu-container';
  orderMenuSection.appendChild(generateMenuHeader('Filtrar'));
  
  const mainElement = document.getElementById('main');
  mainElement.appendChild(orderMenuSection);

  const filters = document.getElementById('filters-container');
  filters.style.display = 'inline-block';
}

function handleFilterButton() {
  const filterButton = document.getElementById('filter-button');
  filterButton.addEventListener('click', generateFilterMenu);
}

export default handleFilterButton;
