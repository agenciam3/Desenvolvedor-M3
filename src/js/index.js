import fetchData from "./api";
import ProductCard from "./ProductCard";
import ProductsContainer from "./ProductsContainer";
import ColorFilter from "./filters/colorFilter/ColorFilter";
import ColorOption from "./filters/colorFilter/ColorOption";
import SizeFilter from "./filters/sizeFilter/SizeFilter";
import SizeOption from "./filters/sizeFilter/SizeOption";
import PriceFilter from "./filters/priceFilter/PriceFilter";
import PriceOption from "./filters/priceFilter/PriceOption";
import Navbar from "./Navbar";
import App from "./App";

customElements.define('product-card', ProductCard);
customElements.define('products-container', ProductsContainer);
customElements.define('color-filter', ColorFilter);
customElements.define('color-option', ColorOption);
customElements.define('size-filter', SizeFilter);
customElements.define('size-option', SizeOption);
customElements.define('price-filter', PriceFilter);
customElements.define('price-option', PriceOption);
customElements.define('my-app', App);
customElements.define('my-navbar', Navbar);

fetchData().then(res => {
  const data = res;

  const app = document.createElement("my-app");
  app.state = {
    data: data
  };

  document.getElementById("container").appendChild(app);
});
