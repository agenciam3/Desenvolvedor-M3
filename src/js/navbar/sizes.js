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
    let div = createElementWithClass('div', 'size');
    div.innerText = size
    appendById(div, 'sizes')
  })
}

function pick(size, filterList) {
  size.classList.add('chosen')
  filterList[2] = size.innerText
}

function unpick(size, filterList) {
  size.classList.remove('chosen')
  filterList[2] = ""
}

function pickUnpick(size, filterList) {
  let listedSizes = document.querySelectorAll('.size');
  if (size.classList.contains('chosen')) {
    unpick(size, filterList);
  }
  else {
    listedSizes.forEach(s => {
      unpick(s, filterList);
    });
    pick(size, filterList);
  }
}
