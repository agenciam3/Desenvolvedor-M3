export {listSizes, addSizeButtons, pickUnpick}
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

function pick(size) {
  size.classList.add('chosen')
}

function unpick(size) {
  size.classList.remove('chosen')
}

function pickUnpick(size) {
  let listedSizes = document.querySelectorAll('.size-desktop');
  if (size.classList.contains('chosen')) {
    unpick(size);
  }
  else {
    listedSizes.forEach(s => {
      unpick(s);
    });
    pick(size);
  }
}
