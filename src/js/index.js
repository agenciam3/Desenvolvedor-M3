const products = [];
const productPagination1 = [];
const productPagination2 = [];
const colors = [];
const sizesFilter = [];
const cartItems = [];
const pricess = [];
const included = [];
const loadMore = [];
let filter = [];

const articleProduct = document.getElementById("article-product");
const textIndisponivel = document.getElementById("textInd");

function fetchData() {
  fetch("http://localhost:5000/products")
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
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
      

      function renderProducts(produtos) {
        produtos.forEach((product, index) => {
          return (articleProduct.innerHTML += `
          <div class="product">
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

      for (let i = 0; i < products.length; i++) {
        if (i < 6) {
          productPagination1.push(products[i]);
        } else {
          productPagination2.push(products[i]);
        }
      }
      const allFilter = document.querySelectorAll("input[type='checkbox']");
       allFilter.forEach((checkbox) => {
         checkbox.addEventListener("change", (el) => {
           let targetColor = el.target.name;
           //console.log(targetColor)
           

           const hasColors = filter.find((color) => {
             return color == targetColor;
           });
           //console.log(hasColors)

           if (hasColors) {
             const filterColorIndex = filter.findIndex(
               (filterColor) => targetColor == filterColor
             );
             filter.splice(filterColorIndex, 1);
           } else {
             filter.push(targetColor);
           }
           //console.log(filter)
           var selectedCor = products.filter(
             (p) => filter.includes(p.color.toLowerCase()) // torar toloswer case
           );


           if (filter.length > 0 && selectedCor.length == 0) {
           
            articleProduct.innerHTML = "";
            textIndisponivel.classList.remove("hide")
            load_more.classList.add("hide");

           } else if (filter.length > 0) {
             articleProduct.innerHTML = "";
             textIndisponivel.classList.add("hide");
             renderProducts(selectedCor);
             load_more.classList.add("hide");
           }else if(filter.length == 0){
             textIndisponivel.classList.add("hide");
              articleProduct.innerHTML = "";
              renderProducts(productPagination1);
              load_more.classList.remove("hide");
            }

         });
       });

       renderProducts(productPagination1)
   
       const load_more = document.querySelector(".loadMore");

      load_more.addEventListener("click", () => {
        renderProducts(productPagination2);
        load_more.classList.toggle("hide")
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