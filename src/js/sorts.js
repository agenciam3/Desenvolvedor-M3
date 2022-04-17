const sortTemplate = require("./sortTemplate");

const maintainActiveSortHidden = (sort) => {
  $(document).find(".dropdown-item").show();
  $(document)
    .find(`[key=${sort ? sort : "id-asc"}]`)
    .hide();
};

const moveSort = (sort) => {
  const screenWidth = $(window).width();
  if (screenWidth <= 768 && $("#sort-by-mobile")[0].children.length < 1) {
    $("#dropdown-sort-by-items").remove();
    $("#sort-by-mobile").append(sortTemplate);

    maintainActiveSortHidden(sort);
  } else if (
    screenWidth > 768 &&
    $("#sort-by-desktop")[0].children.length < 2
  ) {
    $("#dropdown-sort-by-items").remove();
    $("#sort-by-desktop").append(sortTemplate);

    maintainActiveSortHidden(sort);
  }
};

module.exports = moveSort;