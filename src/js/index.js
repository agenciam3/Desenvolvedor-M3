const productsRequest = require("./productsRequest");
const sorts = require("./sorts");
const filters = require("./filters");

let sort = "";
let colors = [];
let sizes = [];
let prices = [];

let products = [];
let bag = [];

$(document).ready(function () {
  filters(sort, colors, sizes, prices, products, productsRequest);
  sorts(sort);

  if ($(window).width() <= 768) {
    $(".sizes").hide();
  }

  // filter depending on window width
  $(window).on("resize", function () {
    filters(
      sort,
      colors,
      sizes,
      prices,
      products,
      productsRequest
    );
    sorts(sort);
    if ($(window).width() <= 768) {
      $(".sizes").hide();
    } else {
      $(".tamanhos").show();
    }
  });

  // Load more products
  $("#load-more").click(function () {
    productsRequest(sort, colors, sizes, prices, products, false);
  });

  // Show dropdown
  $("li").click(function (e) {
    e.preventDefault();
    $(this).closest("li").find(".dropdown-items").toggle();
  });

  // Hide dropdown 
  $(document).on("click", function (e) {
    if (
      !($(e.target).closest("li").find(".dropdown-items").length > 0) &&
      $(window).width() > 768
    ) {
      $(".dropdown-items").hide();
    }
  });

  // sort by
  $(document).on("click", ".dropdown-item", function (e) {
    e.preventDefault();
    $("#dropdown-sort-by-active-item")[0].innerHTML = `${
      e.target.innerText !== "Limpar" ? e.target.innerText : "Ordenar por:"
    } <span class="right-align"><img src="./img/arrow.png" /></span>`;
    sort = e.target.attributes.key.value;

    $(".dropdown-item").show();
    $(this).toggle();

    if ($(window).width() <= 768) {
      $("#mobile-sort").hide().removeClass("show-modal");
    }
    productsRequest(sort, colors, sizes, prices, products);
  });

  // Color filter
  $(document).on("change", ".color-checkbox", function (e) {
    if (e.target.checked) colors.push(e.target.defaultValue);
    else colors = colors.filter((color) => color !== e.target.defaultValue);

    if ($(window).width() > 768) {
      productsRequest(sort, colors, sizes, prices, products);
    }
  });

  // Size filter
  $(document).on("change", ".size-checkbox", function (e) {
    if (e.target.checked) sizes.push(e.target.defaultValue);
    else sizes = sizes.filter((size) => size !== e.target.defaultValue);

    if ($(window).width() > 768) {
      productsRequest(sort, colors, sizes, prices, products);
    }
  });

  // Price filter
  $(document).on("change", ".price-checkbox", function (e) {
    if (e.target.checked) prices.push(e.target.defaultValue);
    else prices = prices.filter((price) => price !== e.target.defaultValue);

    if ($(window).width() > 768) {
      productsRequest(sort, colors, sizes, prices, products);
    }
  });

  // MModal sort open
  $("#mobile-sort-toggle").click(function () {
    $("#mobile-sort").toggle().addClass("show-modal");
  });

  // Modal sort close
  $("#close-modal-mobile-sort").click(function () {
    $("#mobile-sort").hide().removeClass("show-modal");
  });

  // Modal filter open
  $("#mobile-filter-toggle").click(function () {
    $("#mobile-filter").toggle().addClass("show-modal");
  });

  // Modal close
  $("#close-modal-mobile-filter").click(function () {
    $("#mobile-filter").hide().removeClass("show-modal");
  });

  // Add product
  $(document).on("click", ".btn-buy", function (e) {
    bag.push(
      products.find((product) => product.id === e.target.attributes.key.value)
    );
    $(".cart-count")[0].innerHTML = bag.length;
  });

  // Toggle mobile filter section
  $(document).on("click", ".filter-title", function () {
    if ($(window).width() <= 768) {
      $($(this)[0].nextElementSibling).toggle();
    }
  });

  // Mobile filter
  $("#apply-filter").click(function () {
    productsRequest(sort, colors, sizes, prices, products);
    $("#mobile-filter").toggle().addClass("show-modal");
  });

  // Clean mobile filter
  $("#clean-filter").click(function () {
    $(document).find(".color-checkbox").prop("checked", false);
    colors = [];

    $(document).find(".size-checkbox").prop("checked", false);
    sizes = [];

    $(document).find(".price-checkbox").prop("checked", false);
    prices = [];
  });
});