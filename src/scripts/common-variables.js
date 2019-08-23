// Variáveis e constantes utilizadas em várias partes dos códigos

// Utilizadas nos arquivos: filter-inputs / mobile-filter-menu
const mobileColors = document.querySelector('div.mobile-colors');
const mobileSizes = document.querySelector('div.mobile-sizes');
const mobilePriceRanges = document.querySelector('div.mobile-price-ranges');
const colors = document.querySelectorAll('div.color');
const sizes = document.querySelectorAll('div.size');
const priceRanges = document.querySelectorAll('div.price-range');

// Utilizada nos arquivos: filter-buttons / mobile-filter-menu
const closeMobileFilter = document.getElementById('close-mobile-filter');

// Utilizadas nos arquivos: filter-buttons / products
const main = document.querySelector('main');
var initialIndex;
var finalIndex;
const loadMoreProducts = document.createElement('button');
loadMoreProducts.setAttribute('id', 'load-more-products');
loadMoreProducts.textContent = 'CARREGAR MAIS';

// Utilizada no arquivo: products
const productsNotFound = document.createElement('p');
productsNotFound.setAttribute('id', 'products-not-found');
productsNotFound.textContent = 'Produtos não encontrados';
