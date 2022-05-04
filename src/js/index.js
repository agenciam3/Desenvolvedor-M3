import axios from 'axios';
import handleOrderButton from './utils/order-button/orderButton';
import createCards from './utils/productCards';
import { closeMenu } from './utils/menuHeader';
import handleFilterButton from './utils/form/filterButton';
import addListeners from './utils/addListeners';
import { isAnyColorAvailable, isAnySizeAvailable, isInAnyRange } from './utils/form/applyFilters';

let products = [];
let filteredProducts = products;

axios.get('http://localhost:5000/products')
  .then(({ data }) => {
    products = data;
    filteredProducts = data;
    createCards(data);
    handleOrderButton();
    addListeners();
    handleFilterButton();
  });

function handleProductsRendering(productsList) {
  createCards(productsList);
  closeMenu();
}

export function orderByMoreRecent() {
  const sortedProducts = filteredProducts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  handleProductsRendering(sortedProducts);
}

export function orderBySmallerPrice() {
  const sortedProducts = filteredProducts.sort((a, b) => a.price - b.price);
  handleProductsRendering(sortedProducts);
}

export function orderByBiggerPrice() {
  const sortedProducts = filteredProducts.sort((a, b) => b.price - a.price);
  handleProductsRendering(sortedProducts);
}

export function filterProducts({ colors, sizes, ranges }) {
  filteredProducts = products.filter((product) => {
    return isAnyColorAvailable(colors, product.color)
    && isAnySizeAvailable(sizes, product.size)
    && isInAnyRange(ranges, product.price);
  });

  handleProductsRendering(filteredProducts);
}
