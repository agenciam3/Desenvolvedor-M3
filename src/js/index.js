import { listSizes, addSizeButtons } from "./navbar/sizes";
import { addColorsFilter, listColors, checkUncheck } from "./navbar/colors";
import { radioCheckUncheck } from "./navbar/prices";
import { addCardProducts } from "./module_products";


// Create a request variable and assign a new XMLHttpRequest object to it.
// let request = new XMLHttpRequest()
let url = 'http://localhost:5000/products';

// request.open('GET', 'http://localhost:5000/products', true)

// request.onload = function () {
//   // Begin accessing JSON data here

//   let response = JSON.parse(this.response)
//   add_card_products(response)
//   add_colors_filter(list_colors(response))
//   add_size_buttons(list_sizes(response))
//   let colorCheckBoxes = document.querySelectorAll('.color-checkbox')
//   colorCheckBoxes.forEach(checkBox => {
//     checkBox.addEventListener("click", check(checkBox))
//   });
//   function sayHello(checkbox) {
//     if (checkbox.checked) {
//       console.log("hello")
//     }
//   }
// }


// // Send request
// request.send()




fetch(url)
  .then(response => response.json())
  .then((data) => {
    addCardProducts(data)
    addColorsFilter(listColors(data))
    addSizeButtons(listSizes(data))

    let colorCheckBoxes = document.querySelectorAll('.color-checkbox')
    colorCheckBoxes.forEach(checkBox => {
      checkBox.addEventListener("change", function () { checkUncheck(checkBox)})
    });

    let priceRadios = document.querySelectorAll('.price-radio')
    priceRadios.forEach(radio => {
      radio.addEventListener("click", function () { radioCheckUncheck(radio)})
    });
  })
