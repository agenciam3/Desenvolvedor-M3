import WarningHandler from "../handlers/WarningHandler.js";
import ProductHandler from "../handlers/ProductHandler.js";
export class Api {
  constructor(base_url) {
    this._BASE_URL =
      base_url[base_url.length - 1] !== "/" ? base_url + "/" : base_url;
  }

  get BASE_URL() {
    return this._BASE_URL;
  }

  set BASE_URL(value) {
    if (value[value.length - 1] !== "/") {
      value = `${value}/`;
    }

    this._BASE_URL = value;
  }

  async getAll(page = 1, limit = 6) {
    try {
      const response = await fetch(
        `${this.BASE_URL}?_page=${page}&_limit=${limit}`
      );

      const json = await response.json();

      ProductHandler.changePage(page);

      return json;
    } catch (err) {
      WarningHandler.showWarning("Erro ao carregar produtos");
      WarningHandler.clearWarnings();
      console.log(err);
    }
  }
}

export const api = new Api("http://localhost:5000/products");
