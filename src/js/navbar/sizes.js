export {listSizes, addSizeButtons}
import { onlyUnique, createElementWithClass, appendById } from "../module_helpers"

function listSizes(products) {
  let sizes = []
  products.forEach(product =>{
    product.size.forEach(s => {
      sizes.push(s)
    })
  })
  return sizes.filter(onlyUnique).sort().reverse();
}

function addSizeButtons(sizes) {
  sizes.forEach(size =>{
    let div = createElementWithClass('div', 'size-desktop');
    div.innerText = size
    appendById(div, 'sizes')
  })
}
