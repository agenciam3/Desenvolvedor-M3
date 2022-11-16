const serverurl = process.env.SERVER_API;

let product = document.querySelector(".product-list-content");
let page = 1;
let limit = 9;

// Váriaveis para adiconar filtro
let query = "id";
let sort = "asc";
let extraQuery = "";

// Variável do botão de carregar mais produtos
const showButton = document.querySelector("#showMore");

// Variáveis para toggle da ordenação dos produtos
let titleOrder = document.querySelector(".product-order");
let optionsOrder = document.querySelector(".orderBy");
// Mobile
let titleOrderMobile = document.querySelector(".product-order-mobile");
let optionOrderByMobile = document.querySelector(".orderByMobile");

// Váriavel do botão de mais recente
let mostRecent = document.querySelector(".most-recent");

// Váriavel do botão de menor preço
let lowestPrice = document.querySelector(".lowest-price");

// Variável do botão de maior preço
let biggestPrice = document.querySelector(".biggest-price");

// Varíavel do checkbox até R$50
let until50 = document.querySelector("#until-50");

// Variável do checkbox até 150
let until150 = document.querySelector("#until-150");

// Variável do checkbox até 350
let until300 = document.querySelector("#until-300");

// Variável do checkbox até 500
let until500 = document.querySelector("#until-500");

// Variável do checkbox a partir de 500
let greaterThan500 = document.querySelector("#greater-than-500");

// Váriavel do tamanho P
let sizeP = document.querySelector(".size-p");

// Váriavel do tamanho M
let sizeM = document.querySelector(".size-m");

// Váriavel do tamanho G
let sizeG = document.querySelector(".size-g");

// Váriavel do tamanho GG
let sizeGg = document.querySelector(".size-gg");

// Váriavel do tamanho U
let sizeU = document.querySelector(".size-u");

// Váriavel do tamanho 36
let size36 = document.querySelector(".size-36");

// Váriavel do tamanho 38
let size38 = document.querySelector(".size-38");

// Váriavel do tamanho 38
let size40 = document.querySelector(".size-40");

// Váriavel da cor amarela
let yellow = document.querySelector("#yellow");

// Variavel da cor amarela mobile
let yellowMob = document.querySelector("#yellowMob");

// Váriavel da cor azul
let blue = document.querySelector("#blue");

// Váriavel da cor azul mobile
let blueMob = document.querySelector("#blueMob");

// Váriavel da cor branca
let white = document.querySelector("#white");

// Váriavel da cor branca mobile
let whiteMob = document.querySelector("#whiteMob");

// Váriavel da cor cinza
let gray = document.querySelector("#gray");

// Váriavel da cor cinza mobile
let grayMob = document.querySelector("#grayMob");

// Váriavel da cor laranja
let orange = document.querySelector("#orange");

// Váriavel da cor laranja mobile
let orangeMob = document.querySelector("#orangeMob");

// Variavel do count do carrinho
let countBag = document.querySelector(".count");

// Variavel do close na ordenação do mobile
let closeButton = document.querySelector(".close");

// Variavel do close do filtro do mobile
let closeFilter = document.querySelector(".close-filter");

// Variavel do menor preço na ordenação do mobile
let lowestPriceMob = document.querySelector(".lowest-price-mob");

// Variavel do maior preço na ordenação do mobile
let biggestPriceMob = document.querySelector(".biggest-price-mob");

// Variavel do mais recente na ordenação do mobile
let mostRecentMob = document.querySelector(".most-recent-mob");

// Variavel do botão comprar
let buyProductButton;

// Variável do botão de chamada do filtro do mobile
let productFilterMobile = document.querySelector(".product-filter-mobile");

// Variável do filtro do mobile
let filterByMobile = document.querySelector(".filterByMobile");

// Variável para abrir filtro de cores
let openFilterColors = document.querySelector(".open-filter-colors");

// Variável de cores do filtro mobile
let colors = document.querySelector(".colors-mob");

function createProduct(data) {
  productDiv = document.createElement("div");
  productDiv.classList.add("product");
  productImage = document.createElement("img");
  productName = document.createElement("h3");
  productPrice = document.createElement("p");
  productInstallment = document.createElement("p");
  productInstallment.classList.add("price-parcel");
  productPrice.classList.add("price");
  buyButton = document.createElement("button");
  buyButton.classList.add("buy-button");
  productImage.src = data.image;

  productName.innerHTML = data.name;
  productPrice.innerHTML = data.price.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  productInstallment.innerHTML = `Até ${
    data.parcelamento[0]
  } de ${data.parcelamento[1].toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  })}`;
  buyButton.innerHTML = "Comprar";

  productDiv.appendChild(productImage);
  productDiv.appendChild(productName);
  productDiv.appendChild(productPrice);
  productDiv.appendChild(productInstallment);
  productDiv.appendChild(buyButton);

  return productDiv;
}

function getDataFromApi() {
  fetch(
    `http://localhost:5000/products?_page=${page}&_limit=${limit}&_sort=${query}&_order=${sort}${extraQuery}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.forEach((element) => {
        let productDiv = createProduct(element);
        product.appendChild(productDiv);
      });

      buyProductButton = document.getElementsByClassName("buy-button");
      for (var i = 0; i < buyProductButton.length; i++) {
        buyProductButton[i].addEventListener("click", buyProduct);
      }
    })
    .catch(function (e) {
      console.log(e);
    });
}

function main() {
  getDataFromApi();
}

showButton.addEventListener("click", carregarMais);

function carregarMais() {
  page++;
  getDataFromApi();
}

titleOrder.addEventListener("click", orderToggle);

function orderToggle() {
  if (optionsOrder.classList.contains("show")) {
    optionsOrder.classList.remove("show");
  } else {
    optionsOrder.classList.add("show");
  }
}

productFilterMobile.addEventListener("click", filterToggleMobile);

function filterToggleMobile() {
  if (filterByMobile.classList.contains("show")) {
    filterByMobile.classList.remove("show");
  } else {
    filterByMobile.classList.add("show");
  }
}

titleOrderMobile.addEventListener("click", orderToggleMobile);

function orderToggleMobile() {
  if (optionOrderByMobile.classList.contains("show")) {
    optionOrderByMobile.classList.remove("show");
  } else {
    optionOrderByMobile.classList.add("show");
  }
}

openFilterColors.addEventListener("click", openColorsFilterMob);

function openColorsFilterMob() {
  if (colors.classList.contains("show")) {
    colors.classList.remove("show");
  } else {
    colors.classList.add("show");
  }
}

closeButton.addEventListener("click", closeOrderFilter);

function closeOrderFilter() {
  optionOrderByMobile.classList.remove("show");
}

closeFilter.addEventListener("click", closeFilterMob);

function closeFilterMob() {
  filterByMobile.classList.remove("show");
}

lowestPrice.addEventListener("click", showLowestPrice);

function showLowestPrice() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  query = "price";
  sort = "asc";

  getDataFromApi();
}

lowestPriceMob.addEventListener("click", showLowestPriceMob);

function showLowestPriceMob() {
  optionOrderByMobile.classList.remove("show");
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  query = "price";
  sort = "asc";

  getDataFromApi();
}

biggestPrice.addEventListener("click", showBiggestPrice);

function showBiggestPrice() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  query = "price";
  sort = "desc";

  getDataFromApi();
}

biggestPriceMob.addEventListener("click", showBiggestPriceMob);

function showBiggestPriceMob() {
  optionOrderByMobile.classList.remove("show");
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  query = "price";
  sort = "desc";

  getDataFromApi();
}

mostRecent.addEventListener("click", showMostRecentProduct);

function showMostRecentProduct() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  query = "date";
  sort = "asc";

  getDataFromApi();
}

mostRecentMob.addEventListener("click", showMostRecentProductMob);

function showMostRecentProductMob() {
  optionOrderByMobile.classList.remove("show");
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  query = "date";
  sort = "asc";

  getDataFromApi();
}

until50.addEventListener("click", showPriceUntil50);

function showPriceUntil50() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  query = "price";
  extraQuery = "&price_lte=50";
  getDataFromApi();
}

until150.addEventListener("click", showPriceUntil150);

function showPriceUntil150() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  sort = "asc";
  query = "price";
  extraQuery = "&price_lte=150&price_gte=51";
  getDataFromApi();
}

until300.addEventListener("click", showPriceUntil300);

function showPriceUntil300() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  sort = "asc";
  query = "price";
  extraQuery = "&price_lte=300&price_gte=151";
  getDataFromApi();
}

until500.addEventListener("click", showPriceUntil500);

function showPriceUntil500() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  sort = "asc";
  query = "price";
  extraQuery = "&price_lte=500&price_gte=301";
  getDataFromApi();
}

greaterThan500.addEventListener("click", showPricegreaterthan500);

function showPricegreaterthan500() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  sort = "asc";
  query = "price";
  extraQuery = "&price_gte=500";
  getDataFromApi();
}

sizeP.addEventListener("click", showProductsWithSizeP);

function showProductsWithSizeP() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  sort = "asc";
  query = "size";
  extraQuery = "&size_like=P";
  getDataFromApi();
}

sizeM.addEventListener("click", showProductsWithSizeM);

function showProductsWithSizeM() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  sort = "asc";
  query = "size";
  extraQuery = "&size_like=M";
  getDataFromApi();
}

sizeG.addEventListener("click", showProductsWithSizeG);

function showProductsWithSizeG() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  sort = "asc";
  query = "size";
  extraQuery = "&size_like=^G,";
  getDataFromApi();
}

sizeGg.addEventListener("click", showProductsWithSizeGg);

function showProductsWithSizeGg() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  sort = "asc";
  query = "size";
  extraQuery = "&size_like=GG";
  getDataFromApi();
}

sizeU.addEventListener("click", showProductsWithSizeU);

function showProductsWithSizeU() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  sort = "asc";
  query = "size";
  extraQuery = "&size_like=U";
  getDataFromApi();
}

size36.addEventListener("click", showProductsWithSize36);

function showProductsWithSize36() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  sort = "asc";
  query = "size";
  extraQuery = "&size_like=36";
  getDataFromApi();
}

size38.addEventListener("click", showProductsWithSize38);

function showProductsWithSize38() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  sort = "asc";
  query = "size";
  extraQuery = "&size_like=38";
  getDataFromApi();
}

size40.addEventListener("click", showProductsWithSize40);

function showProductsWithSize40() {
  //limpar lista de produtos
  product.innerHTML = "";

  page = 1;
  sort = "asc";
  query = "size";
  extraQuery = "&size_like=40";
  getDataFromApi();
}

yellow.addEventListener("click", showProductsWithYellowColor);
yellowMob.addEventListener("click", showProductsWithYellowColor);

function showProductsWithYellowColor() {
  let parentElement = yellowMob.closest(".filterByMobile.show");

  if (parentElement) {
    parentElement.classList.remove("show");
    //limpar lista de produtos
    product.innerHTML = "";

    page = 1;
    sort = "asc";
    query = "color";
    extraQuery = "&color=Amarelo";
    getDataFromApi();
  } else {
    //limpar lista de produtos
    product.innerHTML = "";

    page = 1;
    sort = "asc";
    query = "color";
    extraQuery = "&color=Amarelo";
    getDataFromApi();
  }
}

blue.addEventListener("click", showProductsWithBlueColor);
blueMob.addEventListener("click", showProductsWithBlueColor);

function showProductsWithBlueColor() {
  let parentElement = blueMob.closest(".filterByMobile.show");

  if (parentElement) {
    parentElement.classList.remove("show");
    //limpar lista de produtos
    product.innerHTML = "";

    page = 1;
    sort = "asc";
    query = "color";
    extraQuery = "&color=Azul";
    getDataFromApi();
  } else {
    //limpar lista de produtos
    product.innerHTML = "";

    page = 1;
    sort = "asc";
    query = "color";
    extraQuery = "&color=Azul";
    getDataFromApi();
  }
}

white.addEventListener("click", showProductsWithWhiteColor);
whiteMob.addEventListener("click", showProductsWithWhiteColor);

function showProductsWithWhiteColor() {
  let parentElement = whiteMob.closest(".filterByMobile.show");

  if (parentElement) {
    parentElement.classList.remove("show");

    //limpar lista de produtos
    product.innerHTML = "";

    page = 1;
    sort = "asc";
    query = "color";
    extraQuery = "&color=Branco";
    getDataFromApi();
  } else {
    //limpar lista de produtos
    product.innerHTML = "";

    page = 1;
    sort = "asc";
    query = "color";
    extraQuery = "&color=Branco";
    getDataFromApi();
  }
}

gray.addEventListener("click", showProductsWithGrayColor);
grayMob.addEventListener("click", showProductsWithGrayColor);

function showProductsWithGrayColor() {
  let parentElement = grayMob.closest(".filterByMobile.show");

  if (parentElement) {
    parentElement.classList.remove("show");
    //limpar lista de produtos
    product.innerHTML = "";

    page = 1;
    sort = "asc";
    query = "color";
    extraQuery = "&color=Cinza";
    getDataFromApi();
  } else {
    //limpar lista de produtos
    product.innerHTML = "";

    page = 1;
    sort = "asc";
    query = "color";
    extraQuery = "&color=Cinza";
    getDataFromApi();
  }
}

orange.addEventListener("click", showProductsWithOrangeColor);
orangeMob.addEventListener("click", showProductsWithOrangeColor);

function showProductsWithOrangeColor() {
  let parentElement = grayMob.closest(".filterByMobile.show");

  if (parentElement) {
    parentElement.classList.remove("show");

    //limpar lista de produtos
    product.innerHTML = "";

    page = 1;
    sort = "asc";
    query = "color";
    extraQuery = "&color=Laranja";
    getDataFromApi();
  } else {
    //limpar lista de produtos
    product.innerHTML = "";

    page = 1;
    sort = "asc";
    query = "color";
    extraQuery = "&color=Laranja";
    getDataFromApi();
  }
}

function buyProduct() {
  countBag.innerHTML = Number(countBag.innerHTML) + 1;
}

main();
