import getProduct from "./products";

category();

function orderByDesktop() {
  const orderBy = document.querySelector(".category--orderby");

  orderBy.addEventListener("click", () => {
    var orderOptions = document.querySelector(".category--orderby-content");
    orderOptions.classList.toggle("active");
  });

  // const recent = document.querySelector("#recent");
  // const smaller = document.querySelector("#smaller");
  // const larger = document.querySelector("#larger");
}

function orderByMobile() {
  const orderMobile = document.querySelector(".category--orderby--open-btn");

  orderMobile.addEventListener("click", (e) => {
    var orderMobileOption = document.querySelector(
      ".category--orderby-mobile--container"
    );

    orderMobileOption.classList.add(`on`);
  });

  const close = document.querySelector(".close-orderby");
  console.log(close);
  close.addEventListener("click", () => {
    orderMobileOption.classList.remove(`on`);
  });
}

// function clean() {
//   const close = document.querySelector(".close");
//   console.log(close);

//   close.addEventListener("click", (e) => {
//     console.log("fui clicado");
//   });
// }

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

function category() {
  orderByDesktop();
  orderByMobile();
  seeMoreFilterDesktop();
  getProduct();
}
