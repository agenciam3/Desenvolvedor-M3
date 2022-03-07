const filterOptions = require("./filterOptions");

const maintainChecked = (colors, sizes, prices) => {
  [].concat(colors, sizes, prices).forEach((item) => {
    $(`input[type=checkbox][value=${item}]`).prop("checked", true);
  });
};

const moveFilter = (sort, colors, sizes, prices, products, productsRequest) => {
  const screenWidth = $(window).width();
  if (screenWidth <= 768 && $("#filters-mobile")[0].children.length < 1) {
    $("#filters-desktop")[0].innerHTML = "";
    $("#filters-mobile").append(filterOptions);

    maintainChecked(colors, sizes, prices);
    productsRequest(sort, colors, sizes, prices, products);
  } else if (
    screenWidth > 768 &&
    $("#filters-desktop")[0].children.length < 1
  ) {
    $("#filters-mobile")[0].innerHTML = "";
    $("#filters-desktop").append(filterOptions);

    maintainChecked(colors, sizes, prices);
    productsRequest(sort, colors, sizes, prices, products);
  }
};

module.exports = moveFilter;
