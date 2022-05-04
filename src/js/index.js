import { listSizes, addSizeButtons, pickUnpick } from "./navbar/sizes";
import { addColorsFilter, listColors, checkUncheck } from "./navbar/colors";
import { radioCheckUncheck } from "./navbar/prices";
import { redirectClick } from "./navbar/helpers";
import { addCardProducts, filterProducts, addFiller } from "./module_products";
import { displayCart, addToCart, listCartItems } from "./module_cart";

let url = 'http://localhost:5000/products';

fetch(url)
  .then(response => response.json())
  .then((data) => {
    let filters = [0, 99999, "", []]
    let cart = new Map();

    addCardProducts(data)
    addColorsFilter(listColors(data))
    addSizeButtons(listSizes(data))
    addFiller()


    console.log(data)

    let cartButton = document.getElementById('cart-link');
    cartButton.addEventListener("click", function(){ displayCart(), listCartItems(cart, data) });

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

    let customCheckboxes = document.querySelectorAll('.custom-checkbox');
    customCheckboxes.forEach(checkBox => {
      checkBox.addEventListener("click", function() { redirectClick(checkBox); })
    })

    let buyButtons = document.querySelectorAll('.comprar');
    console.log(buyButtons)
    buyButtons.forEach(buyButton => {
      buyButton.addEventListener("click", function(){ addToCart(buyButton, cart); })
    });
  })
