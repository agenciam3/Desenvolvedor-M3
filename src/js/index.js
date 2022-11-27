import fetchData from "./api";
import ProductCard from "./ProductCard";
import ProductsContainer from "./ProductsContainer";
import ColorFilter from "./filters/colorFilter/ColorFilter";
import ColorOption from "./filters/colorFilter/ColorOption";

customElements.define('product-card', ProductCard);
customElements.define('products-container', ProductsContainer);
customElements.define('color-filter', ColorFilter);
customElements.define('color-option', ColorOption);


fetchData().then(res => {
  const data = res;

  const productsContainer = document.createElement("products-container");
  productsContainer.data = data;

  const colorFilter = document.createElement("color-filter");
  colorFilter.data = data;

  document.getElementById("container").appendChild(productsContainer);
  document.getElementById("container").appendChild(colorFilter);
});
