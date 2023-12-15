import { Product } from "./Product";

const serverUrl = "http://localhost:5000";

function main() {
  console.log(serverUrl);
}

document.addEventListener("DOMContentLoaded", main);


//bodyHeader dropdown script
const bodyHeaderOptionsSelect = document.querySelector<HTMLElement>('.body-header-options-select');
const bodyHeaderOptionsSelectDropdown = document.querySelector<HTMLElement>('.body-header-options-select-dropdown');
const bodyHeaderOptionsSelectDropdownOptions = document.querySelectorAll<HTMLElement>('.body-header-options-select-dropdown-option');
const arrowIconActiveOrder = document.querySelector<HTMLElement>('#arrow-icon-order');

let isSelectOpen: boolean = false;

bodyHeaderOptionsSelect.addEventListener("click", () => {
  if(isSelectOpen) {
    bodyHeaderOptionsSelectDropdown.style.display = "none"; 
    arrowIconActiveOrder.style.transform = "rotate(0deg)";
  } else {
    bodyHeaderOptionsSelectDropdown.style.display = "flex";
    arrowIconActiveOrder.style.transform = "rotate(180deg)";
  }
  isSelectOpen = !isSelectOpen;
})

bodyHeaderOptionsSelectDropdownOptions.forEach(option => {
  option.addEventListener("click", () => {
    bodyHeaderOptionsSelectDropdown.style.display = "none"; 
    isSelectOpen = false;
  })
})

//

//sidebar show-all-colors script
const bodySidebarShowAllColors = document.querySelector<HTMLElement>('.body-sidebar-show-all-colors');
const inputCheckboxFilterHidden = document.querySelectorAll<HTMLElement>('.input-checkbox-filter-hidden');
const spanShowColors = document.querySelector<HTMLElement>('#span-show-colors');
const arrowIconActiveColors = document.querySelector<HTMLElement>('#arrow-icon-colors');

let isInputHidden: boolean = true;

bodySidebarShowAllColors.addEventListener("click", () => {
  if (isInputHidden) {
    inputCheckboxFilterHidden.forEach(input => {
      input.style.display = "flex";
      spanShowColors.innerHTML = "Mostrar menos cores";
      arrowIconActiveColors.style.transform = "rotate(180deg)";
    })
    isInputHidden = !isInputHidden;
  } else {
    inputCheckboxFilterHidden.forEach(input => {
      input.style.display = "none";
      spanShowColors.innerHTML = "Ver todas as cores";
      arrowIconActiveColors.style.transform = "rotate(0deg)";
    })
    isInputHidden = !isInputHidden;
  }
})
  
