import fetchProductJSON from "./fetchProductJSON";

const contentCategory = document.getElementById("content-category");

function createCard(image, name, price, parcelamento, id) {
  // let card = document.createElement("div").classList.add("card-product");
  // let image = document.createElement("img").classList.add("img-product");
  // let name = document.createElement("h3").classList.add("title-product");
  // let price = document.createElement("span").classList.add("price-product");
  // let parcelamento = document
  //   .createElement("span")
  //   .classList.add("parcelamento-product");
  // let id = document.createElement("button").classList.add("btn-prduct");
  // card.appendChild(image, name, price, parcelamento, id)
}

fetchProductJSON("http://localhost:5000/products").then((product) => {
  // product.forEach((card) => {
  //   const template = `
  // <div class="card-product">
  //       <img class="img-product" src="${card.image}" alt="" />
  //       <h3 class="title-product">${card.name}</h3>
  //       <span class="price-product">${card.price}</span>
  //       <span class="parcelamento-product">${card.parcelamento}</span>
  //       <button class="btn-prduct" value="${card.id}" >$COMPRAR</button>
  // </div>`;
  //   console.log((contentCategory.innerHTML = template));
  //   contentCategory.innerHTML = template;
  // });

  product.map((product) => {
    const template = `
    <div class="card-product">
          <img class="img-product" src="${product.image}" alt="" />
          <h3 class="title-product">${product.name}</h3>
          <span class="price-product">${product.price}</span>
          <span class="parcelamento-product">${product.parcelamento}</span>
          <button class="btn-prduct" value="${product.id}" >$COMPRAR</button>
    </div>

    `;

    let card = document.createElement("div").classList.add("card-product");

    let image = document.createElement("img").classList.add("img-product");
    image.innerHTML = product.image;
    let name = document.createElement("h3").classList.add("title-product");
    let price = document.createElement("span").classList.add("price-product");
    let parcelamento = document
      .createElement("span")
      .classList.add("parcelamento-product");
    let id = document.createElement("button").classList.add("btn-prduct");
    card.appendChild(image);

    console.log(card);
    // return contentCategory.childNodes(template);

    //console.log(template);
  });

  product.forEach((product) => {
    console.log(product.name);
    const template = `
  <div class="card-product">
        <img class="img-product" src="${card.image}" alt="" />
        <h3 class="title-product">${card.name}</h3>
        <span class="price-product">${card.price}</span>
        <span class="parcelamento-product">${card.parcelamento}</span>
        <button class="btn-prduct" value="${card.id}" >$COMPRAR</button>
  </div>`;
    // console.log((contentCategory.innerHTML = template));
    // contentCategory.innerHTML = template;
  });
});

function listingProduct(url) {}

const Products = () => {
  fetchProductJSON().then((product) => {
    product.forEach((card) => {
      const template = `
    <div class="card-product">
          <img class="img-product" src="${card.image}" alt="" />
          <h3 class="title-product">${card.name}</h3>
          <span class="price-product">${card.price}</span>
          <span class="parcelamento-product">${card.parcelamento}</span>
          <button class="btn-prduct" value="${card.id}" >$COMPRAR</button>
    </div>`;
      console.log((contentCategory.innerHTML = template));
      contentCategory.innerHTML = template;
    });

    // product.map((product) => {
    //   const template = `
    // <div class="card-product">
    //       <img class="img-product" src="${product.image}" alt="" />
    //       <h3 class="title-product">${product.name}</h3>
    //       <span class="price-product">${product.price}</span>
    //       <span class="parcelamento-product">${product.parcelamento}</span>
    //       <button class="btn-prduct" value="${product.id}" >$COMPRAR</button>
    // </div>

    // `;

    //   console.log(template);

    //   return (contentCategory.innerHTML = template);
    // });

    return;
  });
};

export default Products();
