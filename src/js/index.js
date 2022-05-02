import axios from 'axios';
import createLoaderButton from './utils/loaderButton';
import createCards from './utils/productCards';

axios.get('http://localhost:5000/products')
  .then(({ data }) => {
    createCards(data);
    createLoaderButton();
  });
