import { Product } from "./Product";

const serverUrl = "http://localhost:5000";

// data
const colorsData = [
  { id: "orange", name: "Laranja" },
  { id: "green", name: "Verde" },
  { id: "red", name: "Vermelho" },
  { id: "black", name: "Preto" },
  { id: "pink", name: "Rosa" },
  { id: "wine", name: "Vinho" }
];

// constants ids
const show_list_colors = document.querySelector("#show-icons-btn");
const filters_btn = document.querySelector("#filters-btn");
const order_btn = document.querySelector("#order-btn");
const close_filters_btn = document.querySelector("#close-filters-btn");
const close_order_btn = document.querySelector("#close-order-btn");
const load_btn = document.querySelector("#load-btn");

// constants classes
const show_list_items = document.querySelector(".show-list-items");
const filter_order_mobile = document.querySelector(".filter-order-mobile");
const filters_mobile = document.querySelector(".rest-filters-mobile");

// fetch
const getProducts = async () => {
  const response = await fetch(`${serverUrl}/products`)
  const data: Product[] = await response.json()
  return data
}

// click events functions
const showColorsList = () => {
  show_list_colors.classList.remove('show-icons-btn');
  show_list_colors.classList.add('hidden');

  colorsData.forEach(color => {
    const inputContainer = `
    <div class="input-container">
    <input type="checkbox" id="${color.id}" name="${color.name}" />
    <label for="${color.id}">${color.name}</label>
  </div>
    `
    show_list_items.innerHTML += inputContainer;
  });
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

// click events
// colors list
show_list_colors.addEventListener('click', showColorsList);
show_list_colors.addEventListener('click', showColorsList);

// filters btns mobile
filters_btn.addEventListener('click', showFiltersList);
order_btn.addEventListener('click', showOrderList);
close_order_btn.addEventListener('click', closeOrderList);
close_filters_btn.addEventListener('click', closeFiltersList);

load_btn.addEventListener("click", () => {
  const lastRenderedIndex = document.querySelectorAll(".content-card").length;
  renderProducts(lastRenderedIndex, lastRenderedIndex + 9);

  if (load_btn) {
    (load_btn as HTMLElement).style.display = 'none';
  }
});

renderProducts(0, 9);

// default
function main() {
  console.log(serverUrl);
}

document.addEventListener("DOMContentLoaded", main);