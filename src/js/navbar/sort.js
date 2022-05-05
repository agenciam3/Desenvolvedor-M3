import { appendById, getPrice } from "../module_helpers";
import { addFiller } from "../module_products";
export { select }

function sortByPrice(option) {
  let products = Array.from(document.querySelectorAll('.product'))
  products = products.sort((a,b) => {
    return getPrice(a) - getPrice(b)
  })
  let productsList = document.getElementById('products')
  productsList.innerHTML = ""

  if (option.dataset.orderBy == 'descPrice') { products.reverse(); }

  products.forEach(product => { appendById(product, 'products')})
  addFiller();

}

function select(option) {
  document.querySelector('.selected-option').innerText = option.innerText
  sortByPrice(option);
  console.log(option.dataset.orderBy)
}
