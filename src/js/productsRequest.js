const productsPerPage = 9;
let page = 0;

module.exports = (sort, colors, sizes, prices, products, reload = true) => {
  let queryParams = [];
  if (reload) {
    page = 0;
    $(".products")[0].innerHTML = "";
  } else {
    page++;
  }
  if (sort)
    queryParams.push(
      `_sort=${sort.split("-")[0]}&_order=${sort.split("-")[1]}`
    );
  if (sizes.length > 0)
    sizes.forEach((size) => {
      queryParams.push(`size_like=${size}`);
    });
  if (colors.length > 0)
    colors.forEach((color) => {
      queryParams.push(`color_like=${color}`);
    });
  if (prices.length > 0)
    prices.forEach((priceInterval) => {
      priceInterval
        .split("-")
        .forEach((price, index) =>
          index !== 1
            ? queryParams.push(`price_gte=${price}`)
            : queryParams.push(`price_lte=${price}`)
        );
    });
  queryParams.push(
    `_start=${page > 0 ? page * productsPerPage : 0}&_limit=${productsPerPage}`
  );

  $.get(
    `http://localhost:5000/products${
      queryParams.length > 0 ? `?${queryParams.join("&")}` : ""
    }`,
    function (data) {
      if (data.length < 9) {
        $("#load-more").hide();
      } else {
        $("#load-more").show();
      }
      data.forEach((product) => {
        products.push(product);
        $(".products").append(`
        <div class="product">
          <img class="product-image" src=${product.image} />
          <p class="product-name">${product.name.toUpperCase()}</p>
          <p class="product-price">R$ ${
            (product.price % 1 === 0
              ? product.price.toString() + ",00"
              : product.price.toString().replace(".", ",")) +
            (product.price.toString().split(".")[1] !== undefined &&
            product.price.toString().split(".")[1].length === 1
              ? "0"
              : "")
          }</p>
          <p class="product-installments">até ${
            product.parcelamento[0]
          }x de R$ ${
          (product.parcelamento[1] % 1 === 0
            ? product.parcelamento[1].toString() + ",00"
            : product.parcelamento[1].toString().replace(".", ",")) +
          (product.parcelamento[1].toString().split(".")[1] !== undefined &&
          product.parcelamento[1].toString().split(".")[1].length === 1
            ? "0"
            : "")
        }</p>
          <div class="product-grow"></div>
          <button key=${product.id} class="btn-buy btn-black">COMPRAR</button>
        </div>
      `);
      });
    }
  );
};
