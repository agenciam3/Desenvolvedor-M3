export { addColorsFilter, listColors, checkUncheck }
import { createElementWithClass, appendById, onlyUnique } from "../module_helpers"
import { check, uncheck } from "./helpers";

function addColorsFilter(colors) {
  colors.forEach(color => {
    let div = createElementWithClass('div', 'listed-color');

    div.innerHTML = `<div class="custom-checkbox">
                    </div>
                    <input type="checkbox" class="color-checkbox" onClick name="colors" id="${color}">
                    <label for="${color}">
                      ${color}
                    </label>`;
    appendById(div, 'colors');
  })
}

function listColors(products) {
  let colors = []
  products.forEach(product =>{
    colors.push(product.color)
  })
  return colors.filter(onlyUnique).sort();
}



function checkUncheck(checkable){
  if (checkable.checked) {
    check(checkable)
  }
  else {
    uncheck(checkable)
  }
}
