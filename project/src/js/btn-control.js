
function showDropdownBtn() {
  let dropdownBtnOnclick = document.getElementById('dropdown-order-content');

  dropdownBtnOnclick.classList.toggle("show");
}

window.onclick = function(e) {
  if(!e.target.matches('.dropdown-order-btn')) {
    let dropdown = document.getElementById('dropdown-order-content');
    if(dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
  }
}

let seeAllBtn = document.getElementById('see-all-btn');
let seeAllColors = document.getElementById('see-all-colors');

seeAllBtn.addEventListener('click', function() {
  seeAllColors.classList.toggle('show-colors'); 

  if(seeAllColors.classList.contains('show-colors')) {
    seeAllBtn.innerHTML = 'Ver menos cores <i class="fas fa-chevron-up"></i>';
  } else {
    seeAllBtn.innerHTML = 'Ver todas as cores <i class="fas fa-chevron-down"></i>';
  }
});