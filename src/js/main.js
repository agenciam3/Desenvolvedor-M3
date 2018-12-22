import Products from './modules/Products';
import Filters from './modules/Filters';
import Dropdown from './modules/Dropdown';

function ready(fn) {
  if (
    document.attachEvent ?
    document.readyState === "complete" :
    document.readyState !== "loading"
  ) {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function main() {
  new Products();
  new Filters();
  new Dropdown();
}

ready(main);