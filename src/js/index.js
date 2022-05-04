import axios from 'axios';
import createLoaderButton from './utils/loaderButton';
import handleOrderButton from './utils/order-button/orderButton';
import createCards from './utils/productCards';
import { closeMenu } from './utils/menuHeader';
import handleFilterButton, { addListeners } from './utils/form/filterButton';
import { isAnyColorAvailable, isAnySizeAvailable, isInAnyRange } from './utils/form/applyFilters';

let products = [];

axios.get('http://localhost:5000/products')
  .then(({ data }) => {
    products = data;
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
  const sortedProducts = products.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  handleProductsRendering(sortedProducts);
}

export function orderBySmallerPrice() {
  const sortedProducts = products.sort((a, b) => a.price - b.price);
  handleProductsRendering(sortedProducts);
}

export function orderByBiggerPrice() {
  const sortedProducts = products.sort((a, b) => b.price - a.price);
  handleProductsRendering(sortedProducts);
}

export function filterProducts({ colors, sizes, ranges }) {
  const filteredProducts = products.filter((product) => {
    return isAnyColorAvailable(colors, product.color)
    && isAnySizeAvailable(sizes, product.size)
    && isInAnyRange(ranges, product.price);
  });

  console.log(filteredProducts);
  handleProductsRendering(filteredProducts);
}
