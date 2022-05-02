import axios from 'axios';
import createLoaderButton from './utils/loaderButton';
import handleOrderButton from './utils/order-button/orderButton';
import createCards from './utils/productCards';
import { closeMenu } from './utils/menuHeader';

let products = [];

axios.get('http://localhost:5000/products')
  .then(({ data }) => {
    products = data;
    createCards(data);
    createLoaderButton();
    handleOrderButton();
  });

export function orderByMoreRecent() {
  const sortedProducts = products.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  createCards(sortedProducts);
  closeMenu();
}

export function orderBySmallerPrice() {
  const sortedProducts = products.sort((a, b) => a.price - b.price);
  createCards(sortedProducts);
  closeMenu();
}

export function orderByBiggerPrice() {
  const sortedProducts = products.sort((a, b) => b.price - a.price);
  createCards(sortedProducts);
  closeMenu();
}
