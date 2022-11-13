import {
  getFilteredProducts,
  products,
  renderProducts,
  setFilterdProducts,
} from "..";

export function sortProducts(ordering = "most-recent") {
  switch (ordering) {
    case "most-recent":
      setFilterdProducts(
        getFilteredProducts().sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        })
      );
      renderProducts();
      break;
    case "lowest-price":
      setFilterdProducts(
        getFilteredProducts().sort((a, b) => {
          return a.price - b.price;
        })
      );
      renderProducts();
      break;
    case "highest-price":
      setFilterdProducts(
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

export function sortByColor(colors) {
  const filtered = products.filter((product) => {
    if (colors.length > 0) {
      return colors.includes(product.color);
    } else return true;
  });
  setFilterdProducts(filtered);
  renderProducts();
}
