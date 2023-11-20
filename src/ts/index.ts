import { Product } from "./Product";

const serverUrl = "http://localhost:5000";

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

function main() {
  const show_list_colors = document.querySelector("#show-icons-btn");
  const filters_btn = document.querySelector("#filters-btn");
  const order_btn = document.querySelector("#order-btn");
  const close_filters_btn = document.querySelector("#close-filters-btn");
  const close_order_btn = document.querySelector("#close-order-btn");
  const load_btn = document.querySelector("#load-btn");
  const clearFilter = document.querySelector("#clear-filters");
  const orderOptionsWeb = document.querySelectorAll('.content-select-web .custom-option');
  const orderOptionsMobile = document.querySelectorAll('.order-select-mobile .custom-option');
  const colorContainer = document.querySelectorAll('.color-container');
  const priceContainer = document.querySelectorAll('.price-container');
  const sizeOption = document.querySelectorAll('.size-option');
  const gettingFiltersData = document.getElementById('get-filters-data');
  const defaut_colors_hidden = document.querySelector(".defaut-colors-hidden");
  const filter_order_mobile = document.querySelector(".filter-order-mobile");
  const filters_mobile = document.querySelector(".rest-filters-mobile");

  const getProducts = async () => {
    const response = await fetch(`${serverUrl}/products`)
    const data: Product[] = await response.json()
    return data
  }

  const showColorsList = () => {
    show_list_colors.classList.remove('show-icons-btn');
    show_list_colors.classList.add('hidden');
    defaut_colors_hidden.classList.remove('hidden')
  }

  const showFiltersList = () => {
    if (filters_mobile) {
      (filters_mobile as HTMLElement).style.display = 'inline-block';
    }
  }

  const showOrderList = () => {
    if (filter_order_mobile) {
      (filter_order_mobile as HTMLElement).style.display = 'inline-block';
    }
  }

  const closeOrderList = () => {
    if (filter_order_mobile) {
      (filter_order_mobile as HTMLElement).style.display = 'none';
    }
  }

  const closeFiltersList = () => {
    if (filters_mobile) {
      (filters_mobile as HTMLElement).style.display = 'none';
    }
  }

  const clearFilterData = () => {
    colors = [];
    prices = [];
    sizes = "";

    const clearInputs = (selector: string) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        if (element instanceof HTMLInputElement) {
          element.checked = false;
        }
      });
    };

    clearInputs('input[type="radio"]');
    clearInputs('input[type="checkbox"]');
  };

  const renderProducts = async (start: number, end: number) => {
    try {
      const products = await getProducts();
      const gridContainer = document.querySelector(".content-grid-container");

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

        gridContainer.innerHTML += card;
      }
    } catch (error) {
      console.error("Erro ao obter produtos:", error);
    }
  };

  show_list_colors.addEventListener('click', showColorsList);
  filters_btn.addEventListener('click', showFiltersList);
  order_btn.addEventListener('click', showOrderList);
  close_order_btn.addEventListener('click', closeOrderList);
  close_filters_btn.addEventListener('click', closeFiltersList);
  clearFilter.addEventListener('click', clearFilterData);

  gettingFiltersData.addEventListener('click', function () {
    selectedValues = {
      color: colors,
      price: prices,
      size: sizes
    };

    console.log(selectedValues);
  });

  colorContainer.forEach(container => {
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;

    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        if (!colors.includes(checkbox.name)) {
          colors.push(checkbox.name);
        }
      } else {
        const index = colors.indexOf(checkbox.name);
        if (index !== -1) {
          colors.splice(index, 1);
        }
      }

      console.log(colors);
    });
  });

  sizeOption.forEach(container => {
    const checkbox = container.querySelector('input[type="radio"]') as HTMLInputElement;

    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        const selectedValue = {
          size: checkbox.value
        };

        sizes = selectedValue.size
        console.log(selectedValue);
      }
    });
  });

  priceContainer.forEach(container => {
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;

    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        if (!prices.includes(checkbox.value)) {
          prices.push(checkbox.value);
        }
      } else {
        const index = prices.indexOf(checkbox.value);
        if (index !== -1) {
          prices.splice(index, 1);
        }
      }

      console.log(prices);
    });
  });

  orderOptionsWeb.forEach(option => {
    option.addEventListener('click', function () {
      const selectedValue = option.getAttribute('data-value');
      console.log(selectedValue);
    });
  });

  orderOptionsMobile.forEach(option => {
    option.addEventListener('click', function () {
      const selectedValue = option.getAttribute('data-value');
      closeOrderList()
      console.log(selectedValue);
    });
  });

  load_btn.addEventListener("click", () => {
    const lastRenderedIndex = document.querySelectorAll(".content-card").length;
    renderProducts(lastRenderedIndex, lastRenderedIndex + 9);

    if (load_btn) {
      (load_btn as HTMLElement).style.display = 'none';
    }
  });

  renderProducts(0, 9);
}

document.addEventListener("DOMContentLoaded", main);