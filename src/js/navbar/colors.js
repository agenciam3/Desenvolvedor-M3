export { add_colors_filter, list_colors }
import { createElementWithClass, appendById, onlyUnique } from "../module_helpers"

function add_colors_filter(colors) {
  colors.forEach(color => {
    let div = createElementWithClass('div', 'listed-color');

    div.innerHTML = `<div class="custom-checkbox">
                    </div>
                    <input type="checkbox" name="colors" id="${color}">
                    <label for="${color}">
                      ${color}
                    </label>`;
    appendById(div, 'colors');
  })
}

function list_colors(products) {
  let colors = []
  products.forEach(product =>{
    colors.push(product.color)
  })
  return colors.filter(onlyUnique).sort();
}
