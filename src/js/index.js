import getProduct from "./products";

function category() {
  getProduct();

  seeMoreFilterDesktop();
  orderByDesktop();
  orderByMobile();
  filterMobile();
}

function orderByDesktop() {
  const orderBy = document.querySelector(".category--orderby");

  orderBy.addEventListener("click", () => {
    var orderOptions = document.querySelector(".category--orderby-content");
    orderOptions.classList.toggle("active");
  });
}

function orderByMobile() {
  const orderMobile = document.querySelector(".category--orderby--open-btn");

  orderMobile.addEventListener("click", (e) => {
    var orderMobileContainer = document.querySelector(
      ".category--orderby-mobile--container"
    );

    orderMobileContainer.classList.add(`on`);

    const close = document.querySelector(".close-orderby");
    close.addEventListener("click", () => {
      orderMobileContainer.classList.remove(`on`);
    });
  });
}

function filterMobile() {
  const filter = document.querySelector(".category--filter--open-btn");

  filter.addEventListener("click", (e) => {
    const filterContent = document.querySelector(".category--filter-content");

    filterContent.classList.add("filterSee");

    const closeFilter = document.querySelector(".close-filter");
    closeFilter.addEventListener("click", () => {
      filterContent.classList.remove("filterSee");
    });
  });

  const color = document.querySelector(".category--filter-content-title-color");
  color.addEventListener("click", () => {
    const colorOption = document.querySelector(
      ".category--filter-content--color-options"
    );

    colorOption.classList.toggle(`colorSee`);
  });

  const size = document.querySelector(".category--filter-content-title-size");
  size.addEventListener("click", () => {
    const sizeOption = document.querySelector(
      ".category--filter-content--size-options"
    );

    sizeOption.classList.toggle(`sizeSee`);
  });

  const price = document.querySelector(".category--filter-content-title-price");

  price.addEventListener("click", () => {
    const priceOption = document.querySelector(
      ".category--filter-content--price-options"
    );
    priceOption.classList.toggle(`priceSee`);
  });
}

function seeMoreFilterDesktop() {
  const optionColor = document.querySelector(
    ".category--filter-content--color-options-seeMore"
  );

  optionColor.addEventListener("click", (e) => {
    {
      const anotherColors = document.querySelector(
        ".category--filter-content--color-options-another-colors"
      );

      anotherColors.classList.add(`active`);

      optionColor.remove();
    }
  });
}

category();
