const productsRequest = require("./productsRequest");
const moveAndMaintainSort = require("./moveAndMaintainSort");
const moveAndMaintainFilter = require("./moveAndMaintainFilter");

let sort = "";
let colors = [];
let sizes = [];
let prices = [];

let products = [];
let bag = [];

$(document).ready(function () {
  moveAndMaintainFilter(sort, colors, sizes, prices, products, productsRequest);
  moveAndMaintainSort(sort);

  // hided this way to maintain display flex
  if ($(window).width() <= 768) {
    $(".tamanhos").hide();
  }

  // Change filter location base on window width
  $(window).on("resize", function () {
    moveAndMaintainFilter(
      sort,
      colors,
      sizes,
      prices,
      products,
      productsRequest
    );
    moveAndMaintainSort(sort);
    if ($(window).width() <= 768) {
      $(".tamanhos").hide();
    } else {
      $(".tamanhos").show();
    }
  });

  // Load more products
  $("#load-more").click(function () {
    productsRequest(sort, colors, sizes, prices, products, false);
  });

  // Show dropdown on click
  $("li").click(function (e) {
    e.preventDefault();
    $(this).closest("li").find(".dropdown-items").toggle();
  });

  // Hide dropdown on outside click
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
      e.target.innerText !== "Padrão" ? e.target.innerText : "Ordenar por:"
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

  // Mobile sort modal open
  $("#mobile-sort-toggle").click(function () {
    $("#mobile-sort").toggle().addClass("show-modal");
  });

  // Mobile sort modal close
  $("#close-modal-mobile-sort").click(function () {
    $("#mobile-sort").hide().removeClass("show-modal");
  });

  // Mobile filter modal open
  $("#mobile-filter-toggle").click(function () {
    $("#mobile-filter").toggle().addClass("show-modal");
  });

  // Mobile filter modal close
  $("#close-modal-mobile-filter").click(function () {
    $("#mobile-filter").hide().removeClass("show-modal");
  });

  // Add product to cart
  $(document).on("click", ".btn-buy", function (e) {
    bag.push(
      products.find((product) => product.id === e.target.attributes.key.value)
    );
    $(".items-count")[0].innerHTML = bag.length;
  });

  // Toggle mobile filter section
  $(document).on("click", ".filter-title", function () {
    if ($(window).width() <= 768) {
      $($(this)[0].nextElementSibling).toggle();
    }
  });

  // Apply mobile filter
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
