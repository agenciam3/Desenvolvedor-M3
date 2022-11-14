import {
  getFilteredProducts,
  products,
  renderProducts,
  setFilteredProducts,
} from "..";
import { updateProductsButtonListener } from "../eventListeners";

export function sortProducts(ordering = "most-recent") {
  switch (ordering) {
    case "most-recent":
      setFilteredProducts(
        getFilteredProducts().sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        })
      );
      renderProducts();
      break;
    case "lowest-price":
      setFilteredProducts(
        getFilteredProducts().sort((a, b) => {
          return a.price - b.price;
        })
      );
      renderProducts();
      break;
    case "highest-price":
      setFilteredProducts(
        getFilteredProducts().sort((a, b) => {
          return b.price - a.price;
        })
      );
      renderProducts();
      break;
    default:
      break;
  }
}

export function sortByColor(productsParam, colors) {
  return productsParam.filter((product) => {
    if (colors.length > 0) {
      return colors.includes(product.color);
    } else return true;
  });
}

export function sortBySize(productsParam, sizes) {
  return productsParam.filter((product) => {
    if (sizes.length > 0) {
      return sizes.some((size) => product.size.includes(size));
    }
    return true;
  });
}

export function sortByPrice(productsParam, prices) {
  // sorting by price to keep strings organized as
  // ["$0 - $50", "$50 - $100", "$100 - $150", "$150 - $200", "$200+"]
  if (!prices || prices.length === 0) return productsParam;

  const pricesAsInt = [...prices].sort((a, b) => {
    const [lowestA] = a.split("-");
    const [lowestB] = b.split("-");
    return lowestA - lowestB;
  });

  const lowest = pricesAsInt[0]?.split("-")[0];
  // highest price or undefined if price is like: "500-"
  let highest = pricesAsInt[pricesAsInt.length - 1]?.split("-")[1];

  return productsParam.filter((product) => {
    if (lowest && !highest) {
      return product.price >= lowest;
    }

    if (prices.length > 0) {
      return product.price >= lowest && product.price <= highest;
    }

    return true;
  });
}

export function filterAll({ sizes, colors, prices }) {
  const sizeFilter = sortBySize(products, sizes);
  const colorsFilter = sortByColor(sizeFilter, colors);
  const priceFilter = sortByPrice(colorsFilter, prices);

  setFilteredProducts(priceFilter);
  renderProducts();
  updateProductsButtonListener();
}
