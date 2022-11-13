import { products, selectedProducts } from "..";

export function addItemToCart(id) {
  const itemInCartIndex = selectedProducts.findIndex(
    (product) => Number(product.id) === id
  );

  if (itemInCartIndex === -1) {
    const product = products.find((product) => Number(product.id) === id);
    selectedProducts.push({ ...product, amount: 1 });

    return;
  }

  selectedProducts[itemInCartIndex].amount += 1;
}
