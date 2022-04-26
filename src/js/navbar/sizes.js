export {list_sizes, add_size_buttons}
import { onlyUnique, createElementWithClass, appendById } from "../module_helpers"

function list_sizes(products) {
  let sizes = []
  products.forEach(product =>{
    product.size.forEach(s => {
      sizes.push(s)
    })
  })
  return sizes.filter(onlyUnique).sort().reverse();
}

function add_size_buttons(sizes) {
  sizes.forEach(size =>{
    let div = createElementWithClass('div', 'size-desktop');
    div.innerText = size
    appendById(div, 'sizes')
  })
}
