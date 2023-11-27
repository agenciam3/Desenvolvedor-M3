import { Product } from "./Product";

let page = 1
const serverUrl = "http://localhost:5000";
const productsContainer = document.querySelector(".products") as HTMLDivElement;
const select = document.querySelector(".select") as HTMLSelectElement;
const coresCheckboxList = document.getElementById("cores") as HTMLUListElement;
const tamanhosCheckboxList = document.getElementById("tamanhos") as HTMLUListElement;
const faixaPrecoCheckboxList = document.getElementById("faixa-preco") as HTMLUListElement;

function fetchData() {
  try {
    const itemsPerPage = window.innerWidth <= 1023 ? 4 : 9;

    fetch(`${serverUrl}/products?_limit=${itemsPerPage * page}${select.value == "recentes"?"&_sort=date&_order=desc":""}${select.value == "menor-preco"?"&_sort=price":""}${select.value == "maior-preco"?"&_sort=price&_order=desc":""}`)
      .then(response => response.json())
      .then((data: Product[]) => {
        localStorage.setItem('products', JSON.stringify(data));
        renderProducts(data);
      })
      .catch(error => console.error("Error fetching data:", error));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

window.addEventListener('resize', fetchData);

let quantidadeNaSacola = 0;

function adicionarAoCarrinho() {
  quantidadeNaSacola++;

  const productBagCount = document.getElementById("productBagCount");
  if (productBagCount) {
    productBagCount.textContent = quantidadeNaSacola.toString();
  }

  console.log(`Produto adicionado ao carrinho. Total: ${quantidadeNaSacola}`);
}

function renderProducts(products: Product[]) {
  productsContainer.innerHTML = "";

  const filteredProducts = applyFilters(products);

  if (filteredProducts.length === 0) {
    const noProductsMessage = document.createElement("p");
    noProductsMessage.textContent = "Não há produtos disponíveis para os filtros selecionados.";
    productsContainer.appendChild(noProductsMessage);
  } else {
    filteredProducts.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h2>${product.name}</h2>
        <span>R$ ${product.price.toFixed(2)}</span>
        <p>até ${product.parcelamento[0]}x de R$${product.parcelamento[1].toFixed(2)}</p>
        <button class="buy-button">
          COMPRAR
        </button>`;
      productsContainer.appendChild(card);

      const buyButton = card.querySelector(".buy-button") as HTMLButtonElement;
      buyButton.addEventListener("click", () => adicionarAoCarrinho());
    });
  }
}

function sortProducts(option: string, products: Product[] = []) {
  let sortedData: Product[] = [];

  if (products.length === 0) {
    products = JSON.parse(localStorage.getItem('products') || '[]');
  }

  switch (option) {
    case 'recentes':
      sortedData = products.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      break;
    case 'menor-preco':
      sortedData = products.sort((a, b) => a.price - b.price);
      break;
    case 'maior-preco':
      sortedData = products.sort((a, b) => b.price - a.price);
      break;
    default:
      sortedData = products;
  }

  return sortedData;
}

function setupOrderSelect() {
  const orderSelect = document.querySelector<HTMLElement>(".order-select")
  const mostRecent = document.querySelector(".most-recent")
  const select = document.querySelector<HTMLSelectElement>("#productSort") 
  const lowerPrice = document.querySelector(".lower-price")
  const higherPrice = document.querySelector(".higher-price")

  orderSelect.style.overflow = "hidden"

  orderSelect.addEventListener("click", () =>{
    if (orderSelect.style.overflow == "hidden"){
      orderSelect.style.overflow = ""
    }else {
      orderSelect.style.overflow = "hidden"
    }
  })

  mostRecent.addEventListener("click", () => {
    select.value = "recentes"
    fetchData()
  })
  lowerPrice.addEventListener("click", () => {
    select.value = "menor-preco"
    fetchData()
  })
  higherPrice.addEventListener("click", () => {
    select.value = "maior-preco"
    fetchData()
  })
}

function seeAllColors(): boolean{
  const allColorsButton = document.querySelector<HTMLElement>("#allColors");
  const openColors = document.querySelector<HTMLElement>("#cores")

  if (!allColorsButton)
  return false

  openColors.style.maxHeight = "135px"
  allColorsButton.addEventListener("click", () => {
      openColors.style.maxHeight = ""
      allColorsButton.style.display = "none"

  })

}

function getSelectedSizes(): string[] {
  const selectedSizes: string[] = [];
  const sizeButtons = document.querySelectorAll("#tamanhos button.selected");

  sizeButtons.forEach((button) => {
    const value = button.getAttribute("data-value");
    if (value) {
        selectedSizes.push(value.toLowerCase());
    }
  });

  return selectedSizes;
}

function applyFilters(products: Product[]): Product[] {
  const selectedColors = getSelectedValues(coresCheckboxList);
  const selectedSizes = getSelectedSizes();
  const selectedPriceRanges = getSelectedValues(faixaPrecoCheckboxList);

  const filteredProducts = products.filter(product => {
    const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.color.toLowerCase());

    const sizeMatch =
      selectedSizes.length === 0 ||
      product.size.some(size => selectedSizes.includes(size.toLowerCase()));

    const priceMatch =
      selectedPriceRanges.length === 0 || matchesPriceRange(product.price, selectedPriceRanges);

    return colorMatch && sizeMatch && priceMatch;
  });
  sortProducts(select.value, filteredProducts);

  return filteredProducts;
}



function getSelectedValues(checkboxList: HTMLUListElement): string[] {
  const selectedValues: string[] = [];
  const checkboxes = checkboxList.querySelectorAll("input[type=checkbox]:checked");

  checkboxes.forEach((checkbox) => {
    const value = (checkbox as HTMLInputElement).getAttribute("data-value");
    if (value) {
      selectedValues.push(value.toLowerCase());
    }
  });

  return selectedValues;
}


function matchesPriceRange(price: number, selectedRanges: string[]): boolean {
  for (const range of selectedRanges) {
    const [minStr, maxStr] = range.split('-');
    const min = minStr === '' ? Number.NEGATIVE_INFINITY : parseFloat(minStr);
    const max = maxStr === '' ? Number.POSITIVE_INFINITY : parseFloat(maxStr);

    if (!isNaN(min) && price < min) {
      continue;
    }

    if (!isNaN(max) && price > max) {
      continue;
    }

    return true;
  }

  return false;
}

function addEventListenerToCheckboxList(checkboxList: HTMLUListElement) {
  checkboxList.addEventListener("click", () => {
    toggleSelection(event);
    fetchData();
  });
}


function toggleSelection(event: Event) {
  const target = event.target as HTMLButtonElement;

  if (target.tagName === "BUTTON") {
    target.classList.toggle("selected");
  }
}

function loadMore() {
  const loadMoreButton = document.querySelector("#load-more")
  
  loadMoreButton.addEventListener("click", () => {
    page++
    fetchData()
  })

}

function main() {
  console.log(serverUrl);

  document.addEventListener("DOMContentLoaded", () => {
    select.addEventListener("change", () => fetchData());
    addEventListenerToCheckboxList(coresCheckboxList);
    addEventListenerToCheckboxList(tamanhosCheckboxList);
    addEventListenerToCheckboxList(faixaPrecoCheckboxList);
    setupOrderSelect();

    seeAllColors();

    loadMore();

    fetchData();

  });
}

main();