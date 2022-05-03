import generateMenuHeader from '../menuHeader';

function showFilterBtns() {
  const options = document.querySelectorAll('.filter-options');
  let shouldBeHidden = true;

  for (const i of options) {
    console.log(i);
    console.log(i.classList.contains('hidden'));
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

  const applyBtn = document.createElement('button');
  applyBtn.textContent = 'Aplicar';
  applyBtn.id = 'apply-btn';
  applyBtn.className = 'hidden';
  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'Limpar';
  clearBtn.id = 'clear-btn';
  clearBtn.className = 'hidden';
  filterMenuSection.appendChild(applyBtn);
  filterMenuSection.appendChild(clearBtn);
  
  const mainElement = document.getElementById('main');
  mainElement.appendChild(filterMenuSection);

  const filters = document.getElementById('filters-container');
  filters.classList.remove('hidden');

  const displayOptionsBtns = document.querySelectorAll('.title-container');
  displayOptionsBtns[0].addEventListener('click', () => toggleOptions('color-options'));
  displayOptionsBtns[1].addEventListener('click', () => toggleOptions('size-options'));
  displayOptionsBtns[2].addEventListener('click', () => toggleOptions('range-options'));
}

function handleFilterButton() {
  const filterButton = document.getElementById('filter-button');
  filterButton.addEventListener('click', generateFilterMenu);
}

export default handleFilterButton;
