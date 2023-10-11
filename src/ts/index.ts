import { Product } from "./Product";

const serverUrl = "http://localhost:5000";
const apiUrl = "http://localhost:5000/products";

let initialProducts = 9;
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
];

const filtersContainer = document.querySelector(".filterContainer");

function filterCheck(e: any) {
  e.target.checked;
  if (e.target.checked) {
    selectedFilters.push({
      value: e.target.getAttribute("name"),
      type: e.target.getAttribute("data-type"),
    });
  } else {
    selectedFilters = selectedFilters.filter((filter) => {
      return filter.value !== e.target.getAttribute("name");
    });
  }

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

      if (window.innerWidth <= 1024) {
        initialProducts = 4;
      } else {
        initialProducts = 9;
      }
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
        <button class="btnBuy" id="btnBuyId">COMPRAR</button>
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

/////////////

const btnMobileContainer = document.querySelector(".btnMobile");
const modal = document.querySelector(".modal") as HTMLDivElement;
const btnOrder = document.querySelector(".btnOrder");
const closeBtn = document.querySelector(".close-btn") as HTMLElement;
createModal(btnMobileContainer, "Ordenar", "ORDENAR", closeBtn);

if (window.innerWidth < 768) {
  createFilterModal();
}
console.log(window.innerWidth);
function createFilterModal() {
  const filtersContainer = document.createElement("div");
  const filterColorsContainer = document.querySelector(
    ".filterColorsContainer"
  );
  const filterSizeContainer = document.querySelector(".filtersSizeContainer");
  const filterPriceContainer = document.querySelector(".filtersPriceContainer");
  filtersContainer.appendChild(filterColorsContainer);
  filtersContainer.appendChild(filterSizeContainer);
  filtersContainer.appendChild(filterPriceContainer);

  console.log(filterColorsContainer, "testetet");
  createModal(btnMobileContainer, "Filtrar", "FILTRAR", filtersContainer);
}

function createModal(
  parent: Element,
  label: string,
  title: string,
  content: Element | undefined
) {
  const openBtn = document.createElement("button");
  openBtn.classList.add(label.toLowerCase());
  const modal = document.createElement("div");
  openBtn.innerText = label;
  modal.classList.add("modal");
  const header = document.createElement("header");
  const span = document.createElement("span");
  span.innerText = title;
  const closeBtn = document.createElement("button");

  closeBtn.addEventListener("click", () => {
    modal.style.left = "100%";
  });

  openBtn.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      modal.style.left = "0";
    }
  });
  parent.appendChild(openBtn);
  header.appendChild(span);
  header.appendChild(closeBtn);
  modal.appendChild(header);
  document.body.appendChild(modal);

  modal.appendChild(content);
}

/////////////

const priceRanges: { label: string; minPrice: number; maxPrice: number }[] = [
  { label: "de R$0 até R$350", minPrice: 0, maxPrice: 350 },
  { label: "de R$51 até R$150", minPrice: 51, maxPrice: 150 },
  { label: "de R$151 até R$300", minPrice: 151, maxPrice: 300 },
  { label: "de R$301 até R$500", minPrice: 301, maxPrice: 500 },
  { label: "A partir de R$500", minPrice: 500, maxPrice: Infinity },
];

function filterByPrice(minPrice: number, maxPrice: number) {
  filteredProducts = productList.filter((product) => {
    const productPrice = product.price;
    return productPrice >= minPrice && productPrice <= maxPrice;
  });

  renderProducts(filteredProducts.slice(0, initialProducts));
}

function createPriceFilters() {
  const priceFilterContainer = document.querySelector(".filtersPriceContainer");
  if (!priceFilterContainer) return;

  priceRanges.forEach((range) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "priceRange";
    input.value = range.label;

    input.setAttribute("data-filtered", "false");

    input.addEventListener("change", () => {
      const isFiltered = input.getAttribute("data-filtered") === "true";

      if (isFiltered) {
        input.setAttribute("data-filtered", "false");
        renderProducts(productList.slice(0, initialProducts));
      } else {
        input.setAttribute("data-filtered", "true");
        filterByPrice(range.minPrice, range.maxPrice);
      }
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(range.label));
    priceFilterContainer.appendChild(label);
  });
}

createPriceFilters();
