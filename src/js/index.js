import fetchData from "./api";
import ProductCard from "./ProductCard";
import ProductsContainer from "./ProductsContainer";
import ColorFilter from "./filters/colorFilter/ColorFilter";
import ColorOption from "./filters/colorFilter/ColorOption";
import SizeFilter from "./filters/sizeFilter/SizeFilter";
import SizeOption from "./filters/sizeFilter/SizeOption";
import PriceFilter from "./filters/priceFilter/PriceFilter";
import PriceOption from "./filters/priceFilter/PriceOption";

customElements.define('product-card', ProductCard);
customElements.define('products-container', ProductsContainer);
customElements.define('color-filter', ColorFilter);
customElements.define('color-option', ColorOption);
customElements.define('size-filter', SizeFilter);
customElements.define('size-option', SizeOption);
customElements.define('price-filter', PriceFilter);
customElements.define('price-option', PriceOption);


fetchData().then(res => {
  const data = res;

  const productsContainer = document.createElement("products-container");
  productsContainer.data = data;

  const filtersForm = document.createElement("form");

  const colorFilter = document.createElement("color-filter");
  colorFilter.data = data;

  const sizeFilter = document.createElement("size-filter");
  sizeFilter.data = data;

  const priceFilter = document.createElement("price-filter");
  priceFilter.data = data;

  filtersForm.appendChild(colorFilter);
  filtersForm.appendChild(sizeFilter);
  filtersForm.appendChild(priceFilter);

  document.getElementById("container").appendChild(productsContainer);
  document.getElementById("container").appendChild(filtersForm);
});
