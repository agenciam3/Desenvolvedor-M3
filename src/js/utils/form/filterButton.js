import generateMenuHeader from '../menuHeader';
import { hideMainContent } from '../toggleMainContent';
import applyFilters, { getInputsValues } from './applyFilters';

function showFilterBtns() {
  const options = document.querySelectorAll('.filter-options');
  let shouldBeHidden = true;

  for (const i of options) {
    if (!i.classList.contains('hidden')) {
      shouldBeHidden = false;
    }
  }
  if (!shouldBeHidden) {
    document.getElementById('apply-btn').classList.remove('hidden');
    document.getElementById('clear-btn').classList.remove('hidden');
  } else {
    document.getElementById('apply-btn').className = 'hidden';
    document.getElementById('clear-btn').className = 'hidden';
  }
}

function toggleOptions(className) {
  const options = document.querySelector(`.${className}`);
  options.classList.toggle('hidden');

  showFilterBtns();
}

function generateFilterMenu() {
  const filterMenuSection = document.createElement('section');
  filterMenuSection.className = 'menu-container';
  filterMenuSection.appendChild(generateMenuHeader('Filtrar'));
  
  const mainElement = document.getElementById('main');
  mainElement.appendChild(filterMenuSection);

  const filters = document.getElementById('filters-container');
  filters.classList.remove('hidden');

  hideMainContent();
}

function showAllColors({ target }) {
  const colors = document.querySelectorAll('.hidden-desktop');
  colors.forEach((color) => {
    color.classList.remove('hidden-desktop');
  });

  target.classList.add('hidden-desktop');
}

export function addListeners() {
  const displayOptionsBtns = document.querySelectorAll('.title-container');
  displayOptionsBtns[0].addEventListener('click', () => toggleOptions('color-options'));
  displayOptionsBtns[1].addEventListener('click', () => toggleOptions('size-options'));
  displayOptionsBtns[2].addEventListener('click', () => toggleOptions('range-options'));

  const showAllColorsBtn = document.querySelector('.show-all-colors-btn');
  showAllColorsBtn.addEventListener('click', showAllColors);

  const applyBtn = document.getElementById('apply-btn');
  applyBtn.addEventListener('click', (event) => applyFilters(event));
}

function handleFilterButton() {
  const filterButton = document.getElementById('filter-button');
  filterButton.addEventListener('click', generateFilterMenu);
}

export default handleFilterButton;
