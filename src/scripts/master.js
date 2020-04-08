
import Products from './renderProduct.js';
import Filters from './FiltersButtons.js';





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
 
}



ready(main);