import {
  Filters,
  OrderFunctions,
  Product
} from "./types";

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

  let currentOrderFunction: ((a: Product, b: Product) => number) | null = null;

  const openedFilters = {
    size: selectedValues.size,
    color: selectedValues.color,
    price: selectedValues.price,
  };

  const serverUrl = "http://localhost:5000";
  const radioInput = 'input[type="radio"]'
  const checkboxInput = 'input[type="checkbox"]'

  const orderFunctions: OrderFunctions = {
    'menor preço': (a: Product, b: Product) => a.price - b.price,
    'maior preço': (a: Product, b: Product) => b.price - a.price,
    'mais recentes': (a: Product, b: Product) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  };

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

  const renderProducts = async (
    start: number,
    end: number,
    filters?: Filters,
    sortOrder?: (a: Product, b: Product) => number
  ) => {
    try {
      ELEMENTS.gridContainer.innerHTML = "<p>Carregando...</p>";

      const products = await getProducts();

      const filteredProducts = products.filter(product => {
        const sizeFilter = filters.size === "" || (Array.isArray(product.size) && product.size.includes(filters.size));
        const colorFilter = filters.color.length === 0 || filters.color.some((selectedColor: string) => product.color.includes(selectedColor));

        const priceFilter = filters.price.length === 0 || filters.price.some((selectedPrice: string) => {
          if (selectedPrice.includes('-')) {
            const [minPrice, maxPrice] = selectedPrice.split('-').map(Number);
            return product.price >= minPrice && product.price <= maxPrice;
          } else {
            const price = Number(selectedPrice);
            return product.price === price;
          }
        });

        return colorFilter && sizeFilter && priceFilter
      });

      const sortedProducts = sortOrder ? filteredProducts.slice().sort(sortOrder) : filteredProducts;
      ELEMENTS.gridContainer.innerHTML = "";

      if (sortedProducts.length === 0) {
        ELEMENTS.gridContainer.innerHTML = "<p>Nenhum produto encontrado.</p>";
      } else {
        for (let i = start; i < end && i < sortedProducts.length; i++) {
          const product = sortedProducts[i];

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
      }
    } catch (error) {
      ELEMENTS.gridContainer.innerHTML = "<p>Dados não podem ser carregados.</p>";
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
    renderProducts(0, 9, openedFilters);
  };

  const showFiltersList = () => {
    ELEMENTS.filtersMobile.style.display = 'inline-block';
  }

  const showOrderList = () => {
    ELEMENTS.filterOrderMobile.style.display = 'inline-block';
  }

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
    renderProducts(lastRenderedIndex, lastRenderedIndex + 9, openedFilters);
    ELEMENTS.loadCardBtn.style.display = 'none';
  }

  const handleSizeChange = (checkbox: HTMLInputElement) => {
    if (checkbox.checked) {
      const selectedValue = {
        size: checkbox.value
      };

      sizes = selectedValue.size

      const newFilter = {
        size: sizes,
        color: selectedValues.color,
        price: selectedValues.price,
      };

      ELEMENTS.gridContainer.innerHTML = "";
      renderProducts(0, 9, newFilter);
    }
  }

  const handleCheckboxChange = (
    checkbox: HTMLInputElement,
    values: string[],
    filterType: 'color' | 'price'
  ) => {
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

    const newFilter = {
      size: selectedValues.size,
      color: filterType === 'color' ? values : selectedValues.color,
      price: filterType === 'price' ? values : selectedValues.price
    };

    ELEMENTS.gridContainer.innerHTML = "";
    renderProducts(0, 9, newFilter);
  }

  const handleOrderOptionClick = async (option: Element) => {
    try {
      const selectedOrderValue = option.getAttribute('data-value');
      clearInputs(radioInput);
      clearInputs(checkboxInput);
      closeMenuFiterMobile();

      if (selectedOrderValue) {
        const orderFunction = orderFunctions[selectedOrderValue as keyof OrderFunctions];
        if (orderFunction) {
          currentOrderFunction = orderFunction;
          await renderProducts(0, 9, openedFilters, currentOrderFunction);
        } else {
          console.error('Invalid sorting option:', selectedOrderValue);
        }
      } else {
        console.error('Invalid sorting option attribute');
      }
    } catch (error) {
      console.error('Error handling order option click:', error);
    }
  };

  renderProducts(0, 9, openedFilters);

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

    const newFilter = selectedValues;

    ELEMENTS.gridContainer.innerHTML = "";
    renderProducts(0, 9, newFilter);
  });

  ELEMENTS.colorContainer.forEach(container => {
    const checkbox = container.querySelector(checkboxInput) as HTMLInputElement;
    checkbox.addEventListener('change', () => handleCheckboxChange(checkbox, colors, 'color'));
  });

  ELEMENTS.sizeOption.forEach(container => {
    const checkbox = container.querySelector(radioInput) as HTMLInputElement;
    checkbox.addEventListener('change', () => handleSizeChange(checkbox));
  });

  ELEMENTS.priceContainer.forEach(container => {
    const checkbox = container.querySelector(checkboxInput) as HTMLInputElement;
    checkbox.addEventListener('change', () => handleCheckboxChange(checkbox, prices, 'price'));
  });

  ELEMENTS.orderOptionsWeb.forEach(option => {
    option.addEventListener('click', () => handleOrderOptionClick(option));
  });

  ELEMENTS.orderOptionsMobile.forEach(option => {
    option.addEventListener('click', () => handleOrderOptionClick(option));
  });
}

document.addEventListener("DOMContentLoaded", main);