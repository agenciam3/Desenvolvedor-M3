import { listSizes, addSizeButtons, pickUnpick } from "./navbar/sizes";
import { addColorsFilter, listColors, checkUncheck } from "./navbar/colors";
import { radioCheckUncheck } from "./navbar/prices";
import { redirectClick } from "./navbar/helpers";
import { addCardProducts, filterProducts, addFiller } from "./module_products";
import { displayCart, addToCart, listCartItems } from "./module_cart";
import { closeModal, showModal, closeTab, openCloseTab, openTab } from "./navbar/responsivity";

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
    buyButtons.forEach(buyButton => {
      buyButton.addEventListener("click", function(){ addToCart(buyButton, cart); })
    });

    let filterBtns = document.querySelectorAll('.filter-btn')
    filterBtns[0].addEventListener('click', function() { showModal('#filters') })

    let closeModalBtns = document.querySelectorAll('.close-modal')
    closeModalBtns.forEach(button => {
      button.addEventListener("click", function() { closeModal(button) })
    });

    window.addEventListener('resize', function () { closeModalBtns.forEach(btn => {closeModal(btn)});
                                                    if (window.innerWidth > 768) {
                                                      showModal('#filters')
                                                    } });

    let filterTitles = document.querySelectorAll('.filter-title')
    filterTitles.forEach(filterTitle => {
      filterTitle.addEventListener('click', function() { openCloseTab(filterTitle) })
    });

    filterTitles.forEach(filterTitle => {
      if (window.innerWidth > 768) {
        openTab(filterTitle)
      }
      else {
        closeTab(filterTitle)
      }
    })

    window.addEventListener('resize', function() { filterTitles.forEach(filterTitle => {
      if(window.innerWidth < 768){
      closeTab(filterTitle) }
      else { openTab(filterTitle) }

    })});
  })
