import ProductHandler from "./ProductHandler.js";

class OrderHandler {
  static orderProducts(currentOrder, products) {
    if (currentOrder === "recent") {
      products = OrderHandler.mostRecentProducts(products, currentOrder);
    } else if (currentOrder === "lowest") {
      products = OrderHandler.lowestPriceProducts(products, currentOrder);
    } else if (currentOrder === "biggest") {
      products = OrderHandler.biggestPriceProducts(products, currentOrder);
    }

    ProductHandler.clearShowCase();
    ProductHandler.showProducts(products);

    return products;
  }

  static mostRecentProducts(products, currentOrder) {
    products = products.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA > dateB) {
        return -1;
      } else if (dateB > dateA) {
        return 1;
      } else {
        return 0;
      }
    });

    OrderHandler.markCurrentOrder(currentOrder);

    return products;
  }

  static lowestPriceProducts(products, currentOrder) {
    products = products.sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      } else if (b.price < a.price) {
        return 1;
      } else {
        return 0;
      }
    });

    OrderHandler.markCurrentOrder(currentOrder);

    return products;
  }

  static biggestPriceProducts(products, currentOrder) {
    products = products.sort((a, b) => {
      if (a.price > b.price) {
        return -1;
      } else if (b.price > a.price) {
        return 1;
      } else {
        return 0;
      }
    });

    OrderHandler.markCurrentOrder(currentOrder);

    return products;
  }

  static markCurrentOrder(currentOrder) {
    document.querySelectorAll(".order__body__option").forEach((element) => {
      element.classList.remove("orderSelected");
    });

    document
      .querySelector(`[data-order="${currentOrder}"]`)
      .classList.add("orderSelected");
  }
}

export default OrderHandler;
