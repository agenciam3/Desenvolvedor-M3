const ul = document.querySelector("#products");
const li = document.querySelector(".card");
const carregar = document.querySelector("#carregar");
const menor = document.querySelector("#menor");

const getProducts = async () => {
  const response = await fetch("http://localhost:5000/products");
  const jsonResponse = await response.json();
  return jsonResponse;
};

const filterProductsByColor = async (colors = []) => {
  const products = await getProducts();
  const filteredShirts = [];
  products.forEach((product) => {
    colors.forEach((color) => {
      if (color === product.color) {
        filteredShirts.push(product);
      }
    });
  });
  return filteredShirts;
}

const filterProductsBySize = async (sizes = []) => {
  const products = await getProducts();

  const filteredShirtsBySize = [];
  sizes.forEach((size) => {
    products.forEach((product) => {
      product.size.forEach((productSize) => {
        if (size === productSize) filteredShirtsBySize.push(product);
      });
    });
  });
  return filteredShirtsBySize;
};


const getShirtsBySize = async () => {
  let sizes = document.getElementById('sizes');
  let colors = document.querySelectorAll("form[name='colors'] input[type='checkbox']");
  let sizesList = document.querySelectorAll("form[name='sizes'] input[type='checkbox']");
  let inputs = document.querySelectorAll("input[type=checkbox]");

  let shirtSizes = [];
  Array.from(sizes.elements).forEach((size) => {
    if (size.checked) shirtSizes.push(size.name);
  });

  let filteredProducts = [];
  let allProducts = [];

  let allUnchecked = [...inputs].every((el) => !el.checked);

  if (allUnchecked) {
    allProducts = await getProducts();
    renderProducts(allProducts);
  } else {
    filteredProducts = await filterProductsBySize(shirtSizes);
    renderProducts(filteredProducts);
  }

  sizes.addEventListener("change", async () => {
    let shirtSizes = [];
    Array.from(sizes.elements).forEach((size) => {
      if (size.checked) shirtSizes.push(size.name);
    });

    let filteredProducts = [];
    let allProducts = [];

    let allUnchecked = [...inputs].every((el) => !el.checked);

    if (allUnchecked) {
      allProducts = await getProducts();
      renderProducts(allProducts);
    } else {
      filteredProducts = await filterProductsBySize(shirtSizes);
      renderProducts(filteredProducts);
    }

    let someColorChecked = [...colors].some((el) => el.checked)
    let someSizeChecked = [...sizesList].some((el) => el.checked)
    let allSizesUnchecked = [...sizesList].every((el) => !el.checked)
    let allColorsUnchecked = [...colors].every((el) => !el.checked)

    if (someColorChecked && someSizeChecked) {
      getShirtsByColorAndSize();
    }
    else if (allSizesUnchecked) {
      getShirtsByColor();
    }
  });
};

const getShirtsByColor = async () => {
  let colors = document.getElementById('colors');
  let sizes = document.querySelectorAll("form[name='sizes'] input[type='checkbox']");
  let colorsList = document.querySelectorAll("form[name='colors'] input[type='checkbox']");
  let inputs = document.querySelectorAll('input[type=checkbox]');

  let shirtColors = [];
  Array.from(colors.elements).forEach((color) => {
    if (color.checked) shirtColors.push(color.name);
  });

  let filteredProducts = [];
  let allProducts = [];

  let allUnchecked = [...inputs].every((el) => !el.checked)

  if (allUnchecked) {
    allProducts = await getProducts();
    renderProducts(allProducts);
  } else {
    filteredProducts = await filterProductsByColor(shirtColors);
    renderProducts(filteredProducts);
  }

  colors.addEventListener('change', async () => {
    let shirtColors = [];
    Array.from(colors.elements).forEach((color) => {
      if (color.checked) shirtColors.push(color.name);
    });

    let filteredProducts = [];
    let allProducts = [];

    let allUnchecked = [...inputs].every((el) => !el.checked)

    if (allUnchecked) {
      allProducts = await getProducts();
      renderProducts(allProducts);
    } else {
      filteredProducts = await filterProductsByColor(shirtColors);
      renderProducts(filteredProducts);
    }

    let someSizeChecked = [...sizes].some((el) => el.checked)
    let allColorsUnchecked = [...colorsList].every((el) => !el.checked)
    let allSizesUnchecked = [...sizes].every((el) => !el.checked)
    let someColorChecked = [...colorsList].some((el) => el.checked)

    if (someSizeChecked && someColorChecked) {
      getShirtsByColorAndSize();
    }
    else if (allColorsUnchecked) {
      getShirtsBySize();
    }
  });
}

const getShirtsByColorAndSize = async () => {
  let colors = document.getElementById('colors');
  let sizes = document.getElementById('sizes');

  let shirtColors = [];
  Array.from(colors.elements).forEach((color) => {
    if (color.checked) shirtColors.push(color.name);
  });

  let shirtSizes = [];
  Array.from(sizes.elements).forEach((size) => {
    if (size.checked) shirtSizes.push(size.name);
  });

  const shirtsFilteredBySize = await filterProductsBySize(shirtSizes);
  const shirtsFilteredByColor = await filterProductsByColor(shirtColors);

  let filteredByColorAndSize = [];
  shirtsFilteredBySize.forEach((shirtFilteredBySize) => {
    shirtsFilteredByColor.forEach((shirtFilteredByColor) => {
      if (shirtFilteredByColor.color === shirtFilteredBySize.color){
        if(filteredByColorAndSize.some((shirt) => shirt.id === shirtFilteredBySize.id)) return;
        filteredByColorAndSize.push(shirtFilteredBySize)
      }
    });
  });
  renderProducts(filteredByColorAndSize);
}


// ----- FILTER BY PRICE
const filterProductsByPrice = async (price = []) => {
  const products = await getProducts();
  const filteredShirts = [];
  products.forEach((product) => {
    price.forEach((price) => {
      if (price === product.price) {
        filteredShirts.push(product);
      }
    });
  });
  return filteredShirts;
}

const getShirtsByPrice = () => {
  let prices = document.getElementById('prices');
  let textinputs = document.querySelectorAll('input[type=checkbox]');

  prices.addEventListener('change', async () => {
    let shirtPrices = [];
    Array.from(prices.elements).forEach((price) => {
      if (price.checked) shirtPrices.push(price.name);
    });

    let filteredProducts = [];
    let allProducts = [];

    let allUnchecked = [...textinputs].every((el) => !el.checked)

    if (allUnchecked) {
      allProducts = await getProducts();
      renderProducts(allProducts);
    } else {
      filteredProducts = await filterProductsByPrice(shirtPrices);
      renderProducts(filteredProducts);
    }
  });
}


// ----- RENDER
const renderProducts = (products) => {
  let productsTemplate = [];
  productsTemplate = products.map((item) =>
    `
    <li class="card">
    <img src="./${item.image}" alt="">
    <p class="title">${item.name} </p>
    <p class="price">R$ ${item.price.toFixed(2)}</p>
    <p class="parcela">até ${item.parcelamento[0]}x de R$ ${item.parcelamento[1].toFixed(2)}</p>
    <button>COMPRAR</button>
    </li> 
    `
  ).slice(0,9).join("");

  ul.innerHTML = '';
  ul.innerHTML += productsTemplate;
};


getProducts().then((products) => renderProducts(products));
getShirtsByPrice()
getShirtsByColor();
getShirtsBySize();