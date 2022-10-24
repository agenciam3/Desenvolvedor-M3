import axios from 'axios';
import btnOrder from './functions/getButtons/orderButton';
import { closeMenu } from './functions/menuHeader';
import listCards from './functions/cardItens';
import getFilterButton from './functions/inputs/filterButton';
import statusInitial from './functions/statusInit';
import { colorRange, sizeRange, priceRange } from './functions/inputs/applyFilters';

let products = [];
let filteredProducts = products;


axios.get('http://localhost:5000/products')
  .then(({ data }) => {
    products = data;
    filteredProducts = data;
    listCards(data);
    btnOrder();
    statusInitial();
    getFilterButton();
  });

function renderproduct(productsList) {
  listCards(productsList);
  closeMenu();
}

export function filterRecents() {
  const filterProdutcts = filteredProducts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  renderproduct(filterProdutcts);
}

export function filterlessRangePrice() {
  const filterProdutcts = filteredProducts.sort((a, b) => a.price - b.price);
  renderproduct(filterProdutcts);

}

export function filterBiggerRangePrice() {
  const filterProdutcts = filteredProducts.sort((a, b) => b.price - a.price);
  renderproduct(filterProdutcts);
}

export function filterProducts({ colors, sizes, ranges }) {
  filteredProducts = products.filter((product) => {
        return colorRange(colors, product.color)
        && sizeRange(sizes, product.size)
        && priceRange(ranges, product.price);
      
       
  });
  
  if(filteredProducts.length == 0){
      renderproduct(filteredProducts);
      var teste = document.getElementById('cards-container')
      teste.innerHTML = '<h3> Não foram encontrados resultados </h3>'
  }else{
    renderproduct(filteredProducts);
  }
  
}
