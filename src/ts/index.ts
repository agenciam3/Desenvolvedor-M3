import { Product } from "./Product";

const serverUrl = "http://localhost:5000";
const apiUrl = "http://localhost:5000/products";
const initialProducts = 9;
let currentPage = 1;
let productList: Product[] = [];
let filteredProducts = productList;
let selectedFilters: { type: string; value: string }[] = [];

const filtersMetadata: {
  type: "color" | "size" | "price";
  container: Element;
}[] = [
  {
    type: "color",
    container: document.querySelector(".filterColorsContainer"),
  },
  { type: "size", container: document.querySelector(".filtersSizeContainer") },
  {
    type: "price",
    container: document.querySelector(".filtersPriceContainer"),
  },
];

const filtersContainer = document.querySelector(".filterContainer");

function filterCheck(e: any) {
  e.target.checked;
  if (e.target.checked) {
    selectedFilters.push({
      value: e.target.getAttribute("name"),
      type: e.target.getAttribute("data-type"),
    });
    console.log(selectedFilters);
  } else {
    selectedFilters = selectedFilters.filter((filter) => {
      return filter.value !== e.target.getAttribute("name");
    });
  }
  console.log(e.target.getAttribute("name"));
  filteredProducts = productList.filter((product) => {
    if (selectedFilters.length === 0) {
      return true;
    }
    return selectedFilters.some((filter) => {
      switch (filter.type) {
        case "color":
          return product.color === filter.value;
        case "size":
          return product.size.some((size) => {
            return filter.value === size;
          });
      }
    });
  });

  renderProducts(filteredProducts.slice(0, initialProducts));
  console.log(filteredProducts);
  console.log(selectedFilters);
}

function generateFilterElements(productList: Product[]) {
  filtersMetadata.forEach((filterMetadata) => {
    const filterList = productList.reduce((acc, curr) => {
      if (filterMetadata.type === "size") {
        const sizes: string[] = [];
        curr.size.forEach((size) => {
          acc.includes(size) ? null : sizes.push(size);
        });
        return [...acc, ...sizes];
      }
      return acc.includes(curr[filterMetadata.type])
        ? acc
        : [...acc, curr[filterMetadata.type]];
    }, []);

    filterList.forEach((filter) => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      label.appendChild(checkbox);
      label.insertAdjacentText("beforeend", filter);
      label.setAttribute("for", filter);
      label.setAttribute("class", "label");
      checkbox.setAttribute("id", filter);
      checkbox.setAttribute("name", filter);
      checkbox.addEventListener("change", filterCheck);
      checkbox.dataset.type = filterMetadata.type;
      console.log(label);

      filterMetadata.container.appendChild(label);
    });
  });
}

function main() {
  console.log(serverUrl);
  const loadMoreButton = document.getElementById("loadMoreBtn");
  if (loadMoreButton) {
    loadMoreButton.addEventListener("click", loadMoreProducts);
  }
  fetchProducts();
  const orderSelect = document.getElementById("order") as HTMLSelectElement;

  if (orderSelect) {
    orderSelect.addEventListener("change", () => {
      const selectedOption = orderSelect.value;

      if (selectedOption === "recentes") {
        filteredProducts.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      } else if (selectedOption === "menorPreço") {
        filteredProducts.sort((a, b) => {
          return a.price - b.price;
        });
      } else if (selectedOption === "maiorPreço") {
        filteredProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }

      renderProducts(filteredProducts.slice(0, initialProducts));
    });
  }
}

document.addEventListener("DOMContentLoaded", main);

function fetchProducts() {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao acessar os produtos");
      }
      return response.json();
    })
    .then((products: Product[]) => {
      filteredProducts = products;
      productList = products;

      generateFilterElements(productList);
      renderProducts(filteredProducts.slice(0, initialProducts));
      if (productList.length <= initialProducts) {
        hideLoadMoreButton();
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}

function renderProducts(products: Product[]) {
  const productsDiv = document.getElementById("productsContainer");
  productsDiv.innerHTML = "";
  const productItems = products.map((product) => {
    return `
      <div class="productCard">
        <img src="${product.image}" alt="">
        <p class="tittleCard">${product.name}</p>
        <p class="productPrice">R$ ${product.price.toFixed(2)}</p>
        <p class="productInstallment">até ${
          product.parcelamento[0]
        }x de R$ ${product.parcelamento[1].toFixed(2)}</p>
        <button class="btnBuy">COMPRAR</button>
      </div>
    `;
  });
  productsDiv.innerHTML += productItems.join("");
}

function loadMoreProducts() {
  const startIndex = currentPage * initialProducts;
  const endIndex = startIndex + initialProducts;
  const nextPageProducts = productList.slice(0, endIndex);
  renderProducts(nextPageProducts);
  currentPage++;
  if (currentPage * initialProducts >= productList.length) {
    hideLoadMoreButton();
  }
}

function hideLoadMoreButton() {
  const loadMoreButton = document.getElementById("loadMoreBtn");
  if (loadMoreButton) {
    loadMoreButton.style.display = "none";
  }
}
