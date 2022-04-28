import { listSizes, addSizeButtons, pickUnpick } from "./navbar/sizes";
import { addColorsFilter, listColors, checkUncheck } from "./navbar/colors";
import { radioCheckUncheck } from "./navbar/prices";
import { addCardProducts, filterProducts } from "./module_products";

let url = 'http://localhost:5000/products';

fetch(url)
  .then(response => response.json())
  .then((data) => {
    let filters = [0, 99999, "", []]

    addCardProducts(data)
    addColorsFilter(listColors(data))
    addSizeButtons(listSizes(data))

    let colorCheckBoxes = document.querySelectorAll('.color-checkbox');
    colorCheckBoxes.forEach(checkBox => {
      checkBox.addEventListener("change", function(){ checkUncheck(checkBox, filters); filterProducts(filters)})
    });

    let listedSizes = document.querySelectorAll('.size');
    listedSizes.forEach(size => {
      size.addEventListener("click", function(){ pickUnpick(size, filters); filterProducts(filters)})
    });

    let priceRadios = document.querySelectorAll('.price-radio');
    priceRadios.forEach(radio => {
      radio.addEventListener("click", function(){ radioCheckUncheck(radio, filters); filterProducts(filters)})
    });

  })
