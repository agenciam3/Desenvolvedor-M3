import { WarningHandler } from "../handlers/WarningHandler.js";

class Api {
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

  async getAll(endpoint = "") {
    try {
      const response = await fetch(`${this.BASE_URL}${endpoint}`);
      const json = await response.json();

      return json;
    } catch (err) {
      WarningHandler.showWarning("Erro ao carregar produtos");
      WarningHandler.clearWarnings();
      console.log(err);
    }
  }
}

export default Api;
