function fetchData() {
  fetch("http://localhost:5000/products")
    .then((response) => response.json())
    .then((data) => {
      const products = [];
      console.log(data);
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
          price: i.price.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          }),
          size: i.size,
        });
      });
      return products;
    })
    .then((products) => {
      const articleProduct = document.getElementById("article-product");
      const productPagination1 = [];
      const productPagination2 = [];

      for (let i = 0; i < products.length; i++) {
        if (i < 6) {
          productPagination1.push(products[i]);
        } else {
          productPagination2.push(products[i]);
        }
      }

      function renderProducts(produtos) {
        produtos.forEach((product, index) => {
          return (articleProduct.innerHTML += `
          <div class="cheguei-aqui product">
            <img src="${product.image}" alt="${product.name}" />
            <div class="caption">
                <h2>${product.name}</h2>
                <p class="price">${product.price}</p>
                <p class="installment">
                    até ${product.parcelamento[0]} x de ${product.parcelamento[1]}
                </p>
            </div>
            <div onClick= "addCart(${index})"  class="button-buy">
              comprar
            </div>
          </div>`);
        });
      }

      renderProducts(productPagination1);

      const load_more = document.querySelector(".loadMore");

      load_more.addEventListener("click", () => {
        renderProducts(productPagination2);
      });
    });
}

fetchData();

const ordination = document.getElementById("ordination");
const moreCor = document.getElementById("more-cor");
const filterMobile = document.getElementById("filter-mobile");
const ordinationMobile = document.getElementById("ordination-mobile");
const cont = document.getElementById("cont");
const cores2 = document.getElementById("cores2");
const btnFilter = document.getElementById("btn-filter");
const btnOrdination = document.getElementById("btn-ordination");
const btnClose1 = document.getElementById("btn-close-1");
const btnClose2 = document.getElementById("btn-close-2");
const load_more = document.querySelector(".loadMore");
const cores = document.querySelector(".cores div");

//button ordination
ordination.addEventListener("click", function () {
  cont.classList.toggle("hide");
});
//button more-cor
moreCor.addEventListener("click", function () {
  cores2.classList.toggle("hide");
  moreCor.classList.toggle("hide");
});
//filter
btnFilter.addEventListener("click", function () {
  filterMobile.classList.toggle("hide");
});

btnOrdination.addEventListener("click", function () {
  ordinationMobile.classList.toggle("hide");
});

btnClose1.addEventListener("click", function () {
  filterMobile.classList.toggle("hide");
});
btnClose2.addEventListener("click", function () {
  ordinationMobile.classList.toggle("hide");
});

// const cart = document.querySelector(".cart");
// const div_sizes = document.querySelector(".sizes");
// const sizes = div_sizes.querySelectorAll("p");
//
// const order = document.querySelector("#order");
// const options = document.querySelectorAll("option");
// const prices = document.querySelector(".prices ul");
// const button_more = document.querySelector(".see_more");
// const see_more = document.querySelector(".colors_more");
// const colors_ul = document.querySelector(".cores ul");

let colors = [];
let sizesFilter = [];
let cartItems = [];
let pricess = [];
let included = [];
let loadMore = [];

/*
function filterProducts() {
  if (colors.length <= 0) {
    const filter = products.filter(
      (product) => console.log(product)
      //sizesFilter.includes(product.size)
    );
    renderProducts(filter);
    return;
  }
  if (sizesFilter.length <= 0) {
    const filter = products.filter((product) => colors.includes(product.color));
    renderProducts(filter);
    return;
  }
} */

/* cores.addEventListener("click", (event) => {
  if (event.target.tagName === "INPUT") {
    const value = event.target.name;

    if (colors.includes(value)) {
      colors = colors.filter((color) => color !== value);

      if (
        colors.length <= 0 &&
        sizesFilter.length <= 0 &&
        pricess.length <= 0
      ) {
        renderProducts(products);
      } else {
        filterProducts();
      }
    } else {
      colors.push(value);
      filterProducts();
    }
  }
}); */
// load_more.addEventListener("click", () => {
//   for (let product of products) {
//     loadMore.push(product);
//   }
//   renderProducts(loadMore);
//   console.log(loadMore);
// });
