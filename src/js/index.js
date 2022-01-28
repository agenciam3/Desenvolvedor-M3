//button ordination
var ordination = document.getElementById("ordination");
ordination.addEventListener("click", function () {
  var cont = document.getElementById("cont");
  cont.classList.toggle("hide");
});
//button more-cor
var moreCor = document.getElementById("more-cor");

moreCor.addEventListener("click", function () {
  var cores2 = document.getElementById("cores2");

  cores2.classList.toggle("hide");

  moreCor.classList.toggle("hide");
});
//filter
const filterMobile = document.getElementById("filter-mobile");
const ordinationMobile = document.getElementById("ordination-mobile");

const btnFilter = document.getElementById("btn-filter");
btnFilter.addEventListener("click", function () {
  filterMobile.classList.toggle("hide");
});
const btnOrdination = document.getElementById("btn-ordination");
btnOrdination.addEventListener("click", function () {
  ordinationMobile.classList.toggle("hide");
});
const btnClose1 = document.getElementById("btn-close-1");
btnClose1.addEventListener("click", function () {
  filterMobile.classList.toggle("hide");
});
const btnClose2 = document.getElementById("btn-close-2");
btnClose2.addEventListener("click", function () {
  ordinationMobile.classList.toggle("hide");
});

var articleProduct = document.getElementById("article-product");

fetch("http://localhost:5000/products")
  .then((response) => response.json())
  .then((data) => {
    data.map((val) => {
      articleProduct.innerHTML +=
        `
           <div class="product">
              <img src="` +
        val.image +
        `" alt="` +
        val.name +
        `">
              <div class="caption">
                <h2>` +
        val.name +
        `</h2>
                <p class="price">` +
        val.price.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }) +
        `</p>
                <p class="installment">
                  até ` +
        val.parcelamento[0] +
        `x de ` +
        val.parcelamento[1].toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }) +
        `
                </p>
              </div>
              <div class="button-buy">
                comprar
              </div>`;
    });
  });
