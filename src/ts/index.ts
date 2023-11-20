import { Product } from "./Product";

function main() {
  let colors: string[] = [];
  let prices: string[] = [];
  let sizes: string = '';

  let selectedValues: {
    color: string[];
    price: string[];
    size: string;
  } = {
    color: [],
    price: [],
    size: ""
  };

  const serverUrl = "http://localhost:5000";
  const radioInput = 'input[type="radio"]'
  const checkboxInput = 'input[type="checkbox"]'

  const ELEMENTS = {
    showListColors: document.getElementById("show-icons-btn"),
    filtersBtn: document.getElementById("filters-btn"),
    orderBtn: document.getElementById("order-btn"),
    closeFiltersBtn: document.getElementById("close-filters-btn"),
    closeOrderBtn: document.getElementById("close-order-btn"),
    loadCardBtn: document.getElementById("load-btn"),
    clearFilter: document.getElementById("clear-filters"),
    gettingFiltersData: document.getElementById('get-filters-data'),
    filterOrderMobile: document.getElementById("filter-order-mobile"),
    filtersMobile: document.getElementById("rest-filters-mobile"),
    defaultHiddenColors: document.querySelector(".defaut-colors-hidden"),
    gridContainer: document.querySelector(".content-grid-container"),
    orderOptionsWeb: document.querySelectorAll('.content-select-web .custom-option'),
    orderOptionsMobile: document.querySelectorAll('.order-select-mobile .custom-option'),
    colorContainer: document.querySelectorAll('.color-container'),
    priceContainer: document.querySelectorAll('.price-container'),
    sizeOption: document.querySelectorAll('.size-option'),
  };

  const getProducts = async () => {
    const response = await fetch(`${serverUrl}/products`)
    const data: Product[] = await response.json()
    return data
  }

  const renderProducts = async (start: number, end: number) => {
    try {
      const products = await getProducts();

      for (let i = start; i < end && i < products.length; i++) {
        const product = products[i];

        const card = `
        <div class="content-card">
          <figure class="card-image-container">
            <img src="${product.image}" alt="clothing-image">
          </figure>

          <div class="card-text-container">
            <h2 class="card-clothing-name">${product.name}</h2>
            <div class="card-span-container">
              <span class="card-clothing-price">R$${product.price.toFixed(2)}</span>
              <span class="card-clothing-divide-price">até ${product.parcelamento[0]}x de R$${(product.parcelamento[1] / product.parcelamento[0]).toFixed(2)}</span>
            </div>
            <button class="card-clothing-btn">Comprar</button>
          </div>
        </div>
      `;

        ELEMENTS.gridContainer.innerHTML += card;
      }
    } catch (error) {
      console.error("Erro ao obter produtos:", error);
    }
  };

  const clearInputs = (selector: string) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      if (element instanceof HTMLInputElement) {
        element.checked = false;
      }
    });
  };

  const clearFilterData = () => {
    colors = [];
    prices = [];
    sizes = "";

    clearInputs(radioInput);
    clearInputs(checkboxInput);
  };

  const showFiltersList = () => ELEMENTS.filtersMobile.style.display = 'inline-block';
  const showOrderList = () => ELEMENTS.filterOrderMobile.style.display = 'inline-block';

  const closeMenuFiterMobile = () => {
    ELEMENTS.filtersMobile.style.display = 'none';
    ELEMENTS.filterOrderMobile.style.display = 'none';
  }

  const showColorsList = () => {
    ELEMENTS.showListColors.classList.remove('show-icons-btn');
    ELEMENTS.showListColors.classList.add('hidden');
    ELEMENTS.defaultHiddenColors.classList.remove('hidden')
  }

  const handleLoadButtonClick = () => {
    const lastRenderedIndex = document.querySelectorAll(".content-card").length;
    renderProducts(lastRenderedIndex, lastRenderedIndex + 9);
    ELEMENTS.loadCardBtn.style.display = 'none';
  }

  const handleSizeChange = (checkbox: HTMLInputElement) => {
    if (checkbox.checked) {
      const selectedValue = {
        size: checkbox.value
      };

      sizes = selectedValue.size
      console.log(selectedValue);
    }
  }

  const handleCheckboxChange = (checkbox: HTMLInputElement, values: string[]) => {
    if (checkbox.checked) {
      if (!values.includes(checkbox.value)) {
        values.push(checkbox.value);
      }
    } else {
      const index = values.indexOf(checkbox.value);
      if (index !== -1) {
        values.splice(index, 1);
      }
    }
    console.log(values);
  }

  const handleOrderOptionClick = (option: Element) => {
    const selectedValue = option.getAttribute('data-value');
    closeMenuFiterMobile()
    console.log(selectedValue);
  }

  renderProducts(0, 9);

  ELEMENTS.showListColors.addEventListener('click', showColorsList);
  ELEMENTS.filtersBtn.addEventListener('click', showFiltersList);
  ELEMENTS.orderBtn.addEventListener('click', showOrderList);
  ELEMENTS.closeOrderBtn.addEventListener('click', closeMenuFiterMobile);
  ELEMENTS.closeFiltersBtn.addEventListener('click', closeMenuFiterMobile);
  ELEMENTS.clearFilter.addEventListener('click', clearFilterData);
  ELEMENTS.loadCardBtn.addEventListener("click", handleLoadButtonClick);

  ELEMENTS.gettingFiltersData.addEventListener('click', function () {
    selectedValues = {
      color: colors,
      price: prices,
      size: sizes
    };
    closeMenuFiterMobile()
    console.log(selectedValues);
  });

  ELEMENTS.colorContainer.forEach(container => {
    const checkbox = container.querySelector(checkboxInput) as HTMLInputElement;
    checkbox.addEventListener('change', () => handleCheckboxChange(checkbox, colors));
  });

  ELEMENTS.sizeOption.forEach(container => {
    const checkbox = container.querySelector(radioInput) as HTMLInputElement;
    checkbox.addEventListener('change', () => handleSizeChange(checkbox));
  });

  ELEMENTS.priceContainer.forEach(container => {
    const checkbox = container.querySelector(checkboxInput) as HTMLInputElement;
    checkbox.addEventListener('change', () => handleCheckboxChange(checkbox, prices));
  });

  ELEMENTS.orderOptionsWeb.forEach(option => {
    option.addEventListener('click', () => handleOrderOptionClick(option));
  });

  ELEMENTS.orderOptionsMobile.forEach(option => {
    option.addEventListener('click', () => handleOrderOptionClick(option));
  });
}

document.addEventListener("DOMContentLoaded", main);