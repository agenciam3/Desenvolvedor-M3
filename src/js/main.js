import DisplayProducts from './modules/DisplayProducts';

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
  new DisplayProducts();
}

ready(main);