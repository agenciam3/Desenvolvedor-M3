import { hideMainContent } from '../toogleBtn';
import generateMenuHeader from '../menuHeader';
import applyFilters from './applyFilters';


function btnOptions(className) {
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

  const filters = document.getElementById('input_filters');
  filters.classList.remove('hidden');

  hideMainContent();
}

function showAllColors({ target }) {
  const colors = document.querySelectorAll('.color-label.hidden-desktop');
  colors.forEach((color) => {
    color.classList.remove('hidden-desktop');
  });

  target.classList.add('hidden-desktop');
}

function showFilterBtns() {
  const options = document.querySelectorAll('.check_filter_options');
  let btnHidden = true;

  for (const i of options) {
    if (!i.classList.contains('hidden')) {
      btnHidden = false;
    }
  }
  if (!btnHidden) {
    document.getElementById('apply-btn').classList.remove('hidden');
    document.getElementById('clear-btn').classList.remove('hidden');
  } else {
    document.getElementById('apply-btn').className = 'hidden';
    document.getElementById('clear-btn').className = 'hidden';
  }
}


export function filterOptions() {
  const displayOptionsBtns = document.querySelectorAll('.titles_filters');
  displayOptionsBtns[0].addEventListener('click', () => btnOptions('checks_colors'));
  displayOptionsBtns[1].addEventListener('click', () => btnOptions('check_sizes'));
  displayOptionsBtns[2].addEventListener('click', () => btnOptions('check_ranges'));

  const showAllColorsBtn = document.querySelector('.show-all-colors-btn');
  showAllColorsBtn.addEventListener('click', showAllColors);

  const applyBtn = document.getElementById('apply-btn');
  applyBtn.addEventListener('click', applyFilters);

  const inputs = document.querySelectorAll('input');
  inputs.forEach((input) => {
    input.addEventListener('change', () => {
      if (window.innerWidth >= 870) {
        applyFilters();
      }
    });
  });
}

function getFilterButton() {
  const filterButton = document.getElementById('filter_nav_mobile');
  filterButton.addEventListener('click', generateFilterMenu);
}

export default  getFilterButton;
