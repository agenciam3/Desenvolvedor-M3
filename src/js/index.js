const products = [];
const productPagination1 = [];
const productPagination2 = [];
const colors = [];
const sizes = [];
let filterPrice = [];
var selectedCor = [];
let cartItems = [];

const cart = document.getElementById("cart");

const aside = document.getElementById("aside");

const articleProduct = document.getElementById("article-product");
const textUnavailable = document.getElementById("textInd");

const allFilterColors = document.querySelectorAll(".inputCores");
const allFilterSize = document.querySelectorAll(".tam");
const allFilterPrice = document.querySelectorAll(".filterPrice");

const color2 = document.getElementById("cores2");
const moreCor = document.getElementById("more-cor");

const ordination = document.getElementById("ordination");
const cont = document.getElementById("cont");

const buttonHigherPrice = document.getElementById("higherPrice");
const buttonLowerPrice = document.getElementById("lowerPrice");
const buttonRecent = document.getElementById("recent");

const buttonHigherPriceMobile = document.getElementById("higherPrice-mobile");
const buttonLowerPriceMobile = document.getElementById("lowerPrice-mobile");
const buttonRecentMobile = document.getElementById("recent-mobile");

const filterMobile = document.getElementById("filter-mobile");
const ordinationMobile = document.getElementById("ordination-mobile");

const btnFilters = document.getElementById("btn-filters");
const btnFilter = document.getElementById("btn-filter");
const btnOrdination = document.getElementById("btn-ordination");

const btnClose1 = document.getElementById("btn-close-1");
const btnClose2 = document.getElementById("btn-close-2");

const load_more = document.querySelector(".loadMore");
//const color = document.querySelector(".cores div");

function showProducts() {
  fetch("http://localhost:5000/products")
    .then((response) => response.json())
    .then((data) => {
      data.map((i) => {
        products.push({
          id: i.id,
          name: i.name,
          color: i.color,
          date: i.date,
          image: i.image,
          parcelamento: [
            i.parcelamento[0],
            i.parcelamento[1].toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            }),
          ],
          price: [
            i.price.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            }),
            i.price,
          ],
          size: i.size,
        });
      });
      return products;
    })
    .then((products) => {
      function renderProducts(productsEl) {
        productsEl.forEach((product) => {
          return (articleProduct.innerHTML += `
          <div class="product">
            <img src="${product.image}" alt="${product.name}" />
            <div class="caption">
                <h2>${product.name}</h2>
                <p class="price">${product.price[0]}</p>
                <p class="installment">
                    até ${product.parcelamento[0]} x de ${product.parcelamento[1]}
                </p>
            </div>
            <div accesskey="${product.id}" id="btn-buy" class="button-buy">
              comprar
            </div>
          </div>`);
        });
        const btnBuy = document.querySelectorAll(".button-buy");

        btnBuy.forEach((elBtnBuy) => {
          elBtnBuy.addEventListener("click", (el) => {
            let targetID = el.target.accessKey;
            cartItems.push(targetID)

            cart.classList.remove("hide");
            cart.innerHTML = cartItems.length;
          });
        });
      }

      for (let i = 0; i < products.length; i++) {
        if (i < 6) {
          productPagination1.push(products[i]);
        } else {
          productPagination2.push(products[i]);
        }
      }
      // button ordination desktop start
      buttonHigherPrice.addEventListener("click", () => {
        articleProduct.innerHTML = "";
        cont.classList.toggle("hide");
        let price = [];
        for (product of products) {
          price.push(product);
        }
        price.sort(function (a, b) {
          return parseInt(b.price[1]) - parseInt(a.price[1]);
        });

        renderProducts(price);
        load_more.classList.add("hide");
      });

      buttonLowerPrice.addEventListener("click", () => {
        articleProduct.innerHTML = "";
        cont.classList.toggle("hide");
        let price = [];
        for (product of products) {
          price.push(product);
        }
        price.sort(function (a, b) {
          return parseInt(a.price[1]) - parseInt(b.price[1]);
        });
        renderProducts(price);
        load_more.classList.add("hide");
      });
      buttonRecent.addEventListener("click", () => {
        articleProduct.innerHTML = "";
        cont.classList.toggle("hide");
        renderProducts(productPagination2);
        load_more.classList.add("hide");
      });
      /// button ordination desktop end

      // button ordination mobile start

      buttonHigherPriceMobile.addEventListener("click", () => {
        articleProduct.innerHTML = "";
        ordinationMobile.classList.add("hide");
        let price = [];
        for (product of products) {
          price.push(product);
        }
        price.sort(function (a, b) {
          return parseInt(b.price[1]) - parseInt(a.price[1]);
        });

        renderProducts(price);
        load_more.classList.add("hide");
      });

      buttonLowerPriceMobile.addEventListener("click", () => {
        articleProduct.innerHTML = "";
        ordinationMobile.classList.add("hide");
        let price = [];
        for (product of products) {
          price.push(product);
        }
        price.sort(function (a, b) {
          return parseInt(a.price[1]) - parseInt(b.price[1]);
        });
        renderProducts(price);
        load_more.classList.add("hide");
      });
      buttonRecentMobile.addEventListener("click", () => {
        articleProduct.innerHTML = "";
        ordinationMobile.classList.add("hide");
        renderProducts(productPagination2);
        load_more.classList.add("hide");
      });

      // button oridnation mobile end.

      allFilterColors.forEach((checkbox) => {
        checkbox.addEventListener("change", (el) => {
          filterMobile.classList.add("hide");
          aside.style.display = "none";

          let targetColor = el.target.name;
          const hasColors = colors.find((color) => {
            return color == targetColor;
          });
          if (hasColors) {
            const filterColorIndex = colors.findIndex(
              (filterColor) => targetColor == filterColor
            );
            colors.splice(filterColorIndex, 1);
          } else {
            colors.push(targetColor);
          }
          selectedCor = products.filter((p) =>
            colors.includes(p.color.toLowerCase())
          );

          if (colors.length > 0 && selectedCor.length == 0) {
            articleProduct.innerHTML = "";
            textUnavailable.classList.remove("hide");
            load_more.classList.add("hide");
          } else if (colors.length > 0) {
            articleProduct.innerHTML = "";
            textUnavailable.classList.add("hide");
            renderProducts(selectedCor);
            load_more.classList.add("hide");
          } else if (colors.length == 0) {
            textUnavailable.classList.add("hide");
            articleProduct.innerHTML = "";
            renderProducts(productPagination1);
            load_more.classList.remove("hide");
          }
        });
      });

      allFilterSize.forEach((tam) => {
        tam.addEventListener("click", (el) => {
          filterMobile.classList.add("hide");
          aside.style.display = "none";

          el.target.classList.toggle("active");
          let targetSize = el.target.accessKey.toUpperCase();

          const hasSize = sizes.find((size) => {
            return size == targetSize;
          });

          if (hasSize) {
            const filterSizeIndex = sizes.findIndex(
              (filterSize) => targetSize == filterSize
            );
            sizes.splice(filterSizeIndex, 1);
          } else {
            sizes.push(targetSize);
          }

          selectedSize = products.filter((p) => sizes.includes(p.size[0]));

          selectedSize1 = products.filter((p) => sizes.includes(p.size[1]));

          articleProduct.innerHTML = "";

          if (el.target.classList.contains("active")) {
            renderProducts(selectedSize);
            renderProducts(selectedSize1);
            load_more.classList.add("hide");
          } else {
            renderProducts(productPagination1);
            load_more.classList.remove("hide");
          }
        });
      });

      allFilterPrice.forEach((radio) => {
        radio.addEventListener("click", (el) => {
          filterMobile.classList.add("hide");
          aside.style.display = "none";

          let targetValue = el.target.value;
          let targetDataMin = el.target.dataset.min;

          let selectedPrice = products.filter((p) => {
            return p.price[1] > targetDataMin && p.price[1] <= targetValue;
          });

          if (selectedPrice.length == 0) {
            articleProduct.innerHTML = "";

            load_more.classList.add("hide");
          } else if (selectedPrice.length > 0) {
            articleProduct.innerHTML = "";
            renderProducts(selectedPrice);
          }
        });
      });

      renderProducts(productPagination1);

      const load_more = document.querySelector(".loadMore");

      load_more.addEventListener("click", () => {
        renderProducts(productPagination2);
        load_more.classList.toggle("hide");
      });
    });
}

showProducts();

//button ordination
ordination.addEventListener("click", function () {
  cont.classList.toggle("hide");
});
//button more-cor
moreCor.addEventListener("click", function () {
  color2.classList.toggle("hide");
  moreCor.classList.toggle("hide");
});
//filter
btnFilter.addEventListener("click", function () {
  filterMobile.classList.remove("hide");
  articleProduct.innerHTML = "";
  // load_more.classList.toggle("hide");
  aside.style.display = "block";
});

btnOrdination.addEventListener("click", function () {
  ordinationMobile.classList.remove("hide");
  articleProduct.innerHTML = "";
  load_more.classList.toggle("hide");
});

btnClose1.addEventListener("click", function () {
  filterMobile.classList.add("hide");
  aside.style.display = "none";
  window.location.reload();
});
btnClose2.addEventListener("click", function () {
  ordinationMobile.classList.add("hide");
  window.location.reload();
});

if (btnFilters.style.display == "none") {
  aside.style.display = "block";
}

