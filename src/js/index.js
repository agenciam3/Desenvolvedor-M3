import Api from "./services/api.js";
import ProductHandler from "./handlers/ProductHandler.js";

const api = new Api("http://localhost:5000/products");

const products = api.getAll().then((products) => {
  console.log(products);
  ProductHandler.showProducts(products);
});
