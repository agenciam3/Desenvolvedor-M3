import {
  CartItem,
  Filters,
  OrderFunctions,
  Product,
  RenderOptionsType
} from "./types";

function main() {
  let colors: string[] = [];
  let prices: string[] = [];
  let sizes: string = "";

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

  const shoppingCart: CartItem[] = [];
  const radioInput = 'input[type="radio"]'
  const checkboxInput = 'input[type="checkbox"]'

  const openedFilters = {
    size: selectedValues.size,
    color: selectedValues.color,
    price: selectedValues.price,
  };

  const orderFunctions: OrderFunctions = {
    "menor preço": (a: Product, b: Product) => a.price - b.price,
    "maior preço": (a: Product, b: Product) => b.price - a.price,
    "mais recentes": (a: Product, b: Product) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  };

  const ELEMENTS = {
    showListColors: document.getElementById("show-icons-btn"),
    filtersBtn: document.getElementById("filters-btn"),
    orderBtn: document.getElementById("order-btn"),
    closeFiltersBtn: document.getElementById("close-filters-btn"),
    closeOrderBtn: document.getElementById("close-order-btn"),
    loadCardBtn: document.getElementById("load-btn"),
    clearFilter: document.getElementById("clear-filters"),
    gettingFiltersData: document.getElementById("get-filters-data"),
    filterOrderMobile: document.getElementById("filter-order-mobile"),
    filtersMobile: document.getElementById("rest-filters-mobile"),
    cartAmount: document.getElementById("cart-amount-item"),
    defaultHiddenColors: document.querySelector(".defaut-colors-hidden"),
    gridContainer: document.querySelector(".content-grid-container"),
    contentDropdownMobile: document.querySelectorAll(".content-dropdown-mobile"),
    orderOptionsWeb: document.querySelectorAll(".content-select-web .custom-option"),
    orderOptionsMobile: document.querySelectorAll(".order-select-mobile .custom-option"),
    colorContainer: document.querySelectorAll(".color-container"),
    priceContainer: document.querySelectorAll(".price-container"),
    sizeOption: document.querySelectorAll(".size-option"),
  };

  const getProductsUrl = (): string => {
    return "http://localhost:5000/products";
  }

  const getProductByIdUrl = (productId: string): string => {
    return `http://localhost:5000/products/${productId}`;
  }

  const fetchJson = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    return response.json();
  }

  const getProducts = async (): Promise<Product[]> => {
    return fetchJson<Product[]>(getProductsUrl());
  }

  const getProductById = async (productId: string): Promise<Product> => {
    return fetchJson<Product>(getProductByIdUrl(productId));
  }

  const renderLoading = (): void => {
    ELEMENTS.gridContainer.innerHTML = "<p>Carregando...</p>";
  }

  const renderNoProducts = (): void => {
    ELEMENTS.gridContainer.innerHTML = "<p>Nenhum produto encontrado.</p>";
  }

  const renderError = (message: string): void => {
    ELEMENTS.gridContainer.innerHTML = `<p>${message}</p>`;
  }

  const renderProductCard = (product: Product): string => {
    return `
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
          <button class="card-clothing-btn" data-product-id="${product.id}">Comprar</button>
        </div>
      </div>`;
  }

  const renderProductsGrid = (
    products: Product[],
    start?: number,
    end?: number,
  ): void => {
    const gridContainer = ELEMENTS.gridContainer;
    gridContainer.innerHTML = "";

    if (products.length === 0) {
      renderNoProducts();
    } else {
      for (let i = start; i < end && i < products.length; i++) {
        const product = products[i];
        const card = renderProductCard(product);
        gridContainer.innerHTML += card;
      }
    }
  };

  const showFiltersList = () => {
    ELEMENTS.filtersMobile.style.display = "inline-block";
  }

  const showOrderList = () => {
    ELEMENTS.filterOrderMobile.style.display = "inline-block";
  }

  const closeMenuFiterMobile = () => {
    ELEMENTS.filtersMobile.style.display = "none";
    ELEMENTS.filterOrderMobile.style.display = "none";
  }

  const showColorsList = () => {
    ELEMENTS.showListColors.classList.remove("show-icons-btn");
    ELEMENTS.showListColors.classList.add("hidden");
    ELEMENTS.defaultHiddenColors.classList.remove("hidden")
  }

  const handleToggleDropdownMobile = (event: MouseEvent) => {
    const dropdown = event.currentTarget as HTMLElement;
    dropdown.classList.toggle("active");
  }

  const clearInputs = (selector: string): void => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      if (element instanceof HTMLInputElement) {
        element.checked = false;
      }
    });
  }

  const clearFilterData = () => {
    colors = [];
    prices = [];
    sizes = "";

    clearInputs(radioInput);
    clearInputs(checkboxInput);
    renderProducts({
      start: 0,
      end: 9,
      filters: openedFilters
    });
  };

  const updateTotalQuantity = (cart: CartItem[]): void => {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    ELEMENTS.cartAmount.innerHTML = totalQuantity.toString();
  }

  const renderProducts = async (options: RenderOptionsType) => {
    try {
      renderLoading()

      const products = await getProducts();
      const { start, end, filters, sortOrder } = options;

      const filteredProducts = products.filter(product => {
        const sizeFilter = filters.size === "" || (Array.isArray(product.size) && product.size.includes(filters.size));
        const colorFilter = filters.color.length === 0 || filters.color.some((selectedColor: string) => product.color.includes(selectedColor));
        const priceFilter = filters.price.length === 0 || filters.price.some((selectedPrice: string) => {
          if (selectedPrice.includes("-")) {
            const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);
            return product.price >= minPrice && product.price <= maxPrice;
          } else {
            const price = Number(selectedPrice);
            return product.price === price;
          }
        });
        return colorFilter && sizeFilter && priceFilter
      });
      const sortedProducts = sortOrder ? filteredProducts.slice().sort(sortOrder) : filteredProducts;
      renderProductsGrid(sortedProducts, start, end);
    } catch (error) {
      renderError("Dados não podem ser carregados.");
    }
  };

  renderProducts({
    start: 0,
    end: 9,
    filters: openedFilters
  });

  const handleLoadButtonClick = async () => {
    const lastRenderedIndex = document.querySelectorAll(".content-card").length;
    const totalProducts = await getProducts();
    const nextRenderIndex = lastRenderedIndex + 3;

    renderProducts(
      {
        start: 0,
        end: nextRenderIndex,
        filters: openedFilters
      });

    if (nextRenderIndex >= totalProducts.length) {
      ELEMENTS.loadCardBtn.style.display = "none";
    } else {
      ELEMENTS.loadCardBtn.style.display = "inline-block";
    }
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
      renderProducts({
        start: 0,
        end: 9,
        filters: newFilter
      });
    }
  }

  const handleCheckboxChange = (
    checkbox: HTMLInputElement,
    values: string[],
    filterType: "color" | "price"
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
      color: filterType === "color" ? values : selectedValues.color,
      price: filterType === "price" ? values : selectedValues.price
    };

    ELEMENTS.gridContainer.innerHTML = "";
    renderProducts({
      start: 0,
      end: 9,
      filters: newFilter
    });
  }

  const handleOrderOptionClick = async (option: Element) => {
    try {
      const selectedOrderValue = option.getAttribute("data-value");
      clearInputs(radioInput);
      clearInputs(checkboxInput);
      closeMenuFiterMobile();

      if (selectedOrderValue) {
        const orderFunction = orderFunctions[selectedOrderValue as keyof OrderFunctions];
        if (orderFunction) {
          currentOrderFunction = orderFunction;
          await renderProducts({
            start: 0,
            end: 9,
            filters: openedFilters,
            sortOrder: currentOrderFunction
          });
        } else {
          console.error("Invalid sorting option:", selectedOrderValue);
        }
      } else {
        console.error("Invalid sorting option attribute");
      }
    } catch (error) {
      console.error("Error handling order option click:", error);
    }
  };

  const handleUpdateQuantityCart = async (productId: string) => {
    try {
      const product = await getProductById(productId);

      if (product) {
        const existingCartItem = shoppingCart.find(item => item.product.id === productId);

        if (existingCartItem) {
          existingCartItem.quantity++;
        } else {
          shoppingCart.push({ product, quantity: 1 });
        }
        updateTotalQuantity(shoppingCart);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleGettingFiltersData = async (
    colors: string[],
    prices: string[],
    sizes: string
  ): Promise<void> => {
    selectedValues = {
      color: colors,
      price: prices,
      size: sizes
    };
    closeMenuFiterMobile();
    const newFilter = selectedValues;
    ELEMENTS.gridContainer.innerHTML = "";
    renderProducts({
      start: 0,
      end: 9,
      filters: newFilter
    });
  }

  ELEMENTS.showListColors.addEventListener("click", showColorsList);
  ELEMENTS.filtersBtn.addEventListener("click", showFiltersList);
  ELEMENTS.orderBtn.addEventListener("click", showOrderList);
  ELEMENTS.closeOrderBtn.addEventListener("click", closeMenuFiterMobile);
  ELEMENTS.closeFiltersBtn.addEventListener("click", closeMenuFiterMobile);
  ELEMENTS.clearFilter.addEventListener("click", clearFilterData);
  ELEMENTS.loadCardBtn.addEventListener("click", handleLoadButtonClick);

  ELEMENTS.gridContainer.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.matches(".card-clothing-btn")) {
      const productId = target.getAttribute("data-product-id");
      handleUpdateQuantityCart(productId);
    }
  });

  ELEMENTS.gettingFiltersData.addEventListener("click", function () {
    selectedValues = {
      color: colors,
      price: prices,
      size: sizes
    };
    handleGettingFiltersData(
      selectedValues.color,
      selectedValues.price,
      selectedValues.size
    )
  });

  ELEMENTS.contentDropdownMobile.forEach(dropdown => {
    dropdown.addEventListener("click", handleToggleDropdownMobile);
  });

  ELEMENTS.colorContainer.forEach(container => {
    const checkbox = container.querySelector(checkboxInput) as HTMLInputElement;
    checkbox.addEventListener("change", () => handleCheckboxChange(checkbox, colors, "color"));
  });

  ELEMENTS.sizeOption.forEach(container => {
    const checkbox = container.querySelector(radioInput) as HTMLInputElement;
    checkbox.addEventListener("change", () => handleSizeChange(checkbox));
  });

  ELEMENTS.priceContainer.forEach(container => {
    const checkbox = container.querySelector(checkboxInput) as HTMLInputElement;
    checkbox.addEventListener("change", () => handleCheckboxChange(checkbox, prices, "price"));
  });

  ELEMENTS.orderOptionsWeb.forEach(option => {
    option.addEventListener("click", () => handleOrderOptionClick(option));
  });

  ELEMENTS.orderOptionsMobile.forEach(option => {
    option.addEventListener("click", () => handleOrderOptionClick(option));
  });
}

document.addEventListener("DOMContentLoaded", main);