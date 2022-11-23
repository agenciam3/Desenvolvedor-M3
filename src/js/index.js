import { getProducts } from "./api";

let offset = 9;
let products = [];
let colorsFilter = new Set([]);
let sizeFilter = new Set([]);
let priceFilter = "";

document.addEventListener("DOMContentLoaded", () => {
  loadProductsToDOM();
  watchSizeFilter();

  const loadMore = document.getElementById("loadMore");
  loadMore.onclick = () => {
    offset *= 2;
    loadProductsToDOM(offset, 0);
  };
});

function loadProductsToDOM() {
  loadProducts(offset, 0);
}

function loadProducts(limit, offset) {
  const productsContainer = document.getElementById("container-products");

  productsContainer.innerHTML = "";

  getProducts(limit, offset).then((apiProducts) => {
    products = apiProducts;

    // Color filter
    products = products.filter((product) => {
      if (!colorsFilter.size) return true;
      return colorsFilter.has(product.color);
    });

    // Size filter
    products = products.filter((product) => {
      if (!sizeFilter.size) return true;
      return product.size.some((size) => sizeFilter.has(size));
    });

    // Price filter
    products = products.filter((product) => {
      if (priceFilter === "") return true;

      switch (priceFilter) {
        case "0-50":
          return product.price >= 0 && product.price <= 50;
        case "51-150":
          return product.price >= 51 && product.price <= 150;
        case "151-300":
          return product.price >= 151 && product.price <= 300;
        case "301-500":
          return product.price >= 301 && product.price <= 500;
        default:
          return product.price >= 500;
      }
    });

    // update products
    products.forEach((product) => {
      const productElement = createProductElement(product);
      productsContainer.appendChild(productElement);
    });
  });
}

function createProductElement(product) {
  const productElement = document.createElement("div");
  productElement.classList.add("product");

  const productImage = document.createElement("img");
  productImage.src = product.image;
  productImage.classList.add("product-image");

  const productTitle = document.createElement("div");
  productTitle.classList.add("product-title");
  productTitle.innerText = product.name;

  const productPrice = document.createElement("div");
  productPrice.classList.add("product-price");
  productPrice.innerText = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  const button = document.createElement("button");
  button.classList.add("product-button");
  button.innerText = "Comprar";

  const productinstallments = document.createElement("div");
  productinstallments.classList.add("product-installments");
  productinstallments.innerText = `até ${
    product.parcelamento[0]
  } de ${Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.parcelamento[1])}`;

  productElement.appendChild(productImage);
  productElement.appendChild(productTitle);
  productElement.appendChild(productPrice);
  productElement.appendChild(productinstallments);
  productElement.appendChild(button);

  return productElement;
}

function watchSizeFilter() {
  // we need this function to watch for changes in the size filter
  // because it's not a input, we need to use the change event :(
  const sizes = document.getElementsByClassName("size-filter-check");

  for (let i = 0; i < sizes.length; i++) {
    const size = sizes.item(i);

    size.addEventListener("click", () => {
      if (!size.hasAttribute("checked")) {
        size.setAttribute("checked", "");
      } else {
        size.removeAttribute("checked");
      }

      if (size.hasAttribute("checked")) {
        sizeFilter.add(size.id.replace("tam", ""));
      } else {
        sizeFilter.delete(size.id.replace("tam", ""));
      }
      loadProductsToDOM();
    });
  }
}

// --Filters colors

let inputsColors = document.querySelectorAll(
  '#cores-fields input[type="checkbox"]'
);
inputsColors.forEach((e) => {
  e.addEventListener("change", () => {
    if (e.checked) {
      colorsFilter.add(e.id.replace("c", ""));
    } else {
      colorsFilter.delete(e.id.replace("c", ""));
    }
    loadProductsToDOM();
  });
});

// --Filters price

let inputsPrice = document.querySelectorAll(
  '#precos-fields input[type="checkbox"]'
);

inputsPrice.forEach((e) => {
  e.addEventListener("change", () => {
    if (e.checked) {
      priceFilter = e.id.replace("p", "");
    } else {
      priceFilter = "";
    }
    loadProductsToDOM();
  });
});
