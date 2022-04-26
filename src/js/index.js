import { add_size_buttons, list_sizes} from "./navbar/sizes";
import { add_colors_filter, list_colors } from "./navbar/colors";
import { add_card_products } from "./module_products";
import { onlyUnique, createElementWithClass, appendById } from "./module_helpers";


// Create a request variable and assign a new XMLHttpRequest object to it.
let request = new XMLHttpRequest()
let url = 'http://localhost:5000/products';

request.open('GET', 'http://localhost:5000/products', true)

request.onload = function () {
  // Begin accessing JSON data here

  let response = JSON.parse(this.response)
  add_card_products(response)
  add_colors_filter(list_colors(response))
  add_size_buttons(list_sizes(response))
}


// Send request
request.send()
