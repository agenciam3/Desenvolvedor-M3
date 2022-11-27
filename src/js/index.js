import fetchData from "./api";
import ProductCard from "./ProductCard";
import ProductsContainer from "./ProductsContainer";

customElements.define('product-card', ProductCard);
customElements.define('products-container', ProductsContainer);

fetchData().then(res => {
  const data = res;

  const productsContainer = document.createElement("products-container");
  productsContainer.data = data;

  document.getElementById("container").appendChild(productsContainer);
});
