import { Product } from "./Product";

const serverUrl = "http://localhost:5000";

function main() {
  console.log(serverUrl);
}

document.addEventListener("DOMContentLoaded", main);

//bodyHeader dropdown script
const bodyHeaderOptionsSelect = document.querySelector<HTMLElement>('.body-header-options-select');
const bodyHeaderOptionsSelectDropdown = document.querySelector<HTMLElement>('.body-header-options-select-dropdown');
const bodyHeaderOptionsSelectDropdownOptions = document.querySelectorAll<HTMLElement>('.body-header-options-select-dropdown-option');
const arrowIconActiveOrder = document.querySelector<HTMLElement>('#arrow-icon-order');

let isSelectOpen: boolean = false;

bodyHeaderOptionsSelect.addEventListener("click", () => {
  if(isSelectOpen) {
    bodyHeaderOptionsSelectDropdown.style.display = "none"; 
    arrowIconActiveOrder.style.transform = "rotate(0deg)";
    handleCloseStuff();
  } else {
    bodyHeaderOptionsSelectDropdown.style.display = "flex";
    arrowIconActiveOrder.style.transform = "rotate(180deg)";
    handleOpenMobileOrder();
  }
  isSelectOpen = !isSelectOpen;
  
})

bodyHeaderOptionsSelectDropdownOptions.forEach(option => {
  option.addEventListener("click", () => {
    bodyHeaderOptionsSelectDropdown.style.display = "none";
    bodyHeaderOptionsSelectMobileOrder.classList.remove("body-header-options-select-mobile-onclick");
    bodyHeaderOptionsSelectDropdown.classList.remove("body-header-options-select-dropdown-mobile");
    arrowIconActiveOrder.style.transform = "rotate(0deg)";
    closeButton.style.display = "none";
    isSelectOpen = false;
    }) 
  })

//

//sidebar show-all-colors script
const bodySidebarShowAllColors = document.querySelector<HTMLElement>('.body-sidebar-show-all-colors');
const inputCheckboxFilterHidden = document.querySelectorAll<HTMLElement>('.input-checkbox-filter-hidden');
const spanShowColors = document.querySelector<HTMLElement>('#span-show-colors');
const arrowIconActiveColors = document.querySelector<HTMLElement>('#arrow-icon-colors');

let isInputHidden: boolean = true;

bodySidebarShowAllColors.addEventListener("click", () => {
  if (isInputHidden) {
    inputCheckboxFilterHidden.forEach(input => {
      input.style.display = "flex";
      spanShowColors.innerHTML = "Mostrar menos cores";
      arrowIconActiveColors.style.transform = "rotate(180deg)";
    })
    isInputHidden = !isInputHidden;
  } else {
    inputCheckboxFilterHidden.forEach(input => {
      input.style.display = "none";
      spanShowColors.innerHTML = "Ver todas as cores";
      arrowIconActiveColors.style.transform = "rotate(0deg)";
    })
    isInputHidden = !isInputHidden;
  }
})

//body header options select mobile onclick

const closeButton = document.querySelector<HTMLElement>(".close-button");
const closeButtonFilter = document.getElementById("close-icon-filter");

//order
const bodyHeaderOptionsSelectMobileOrder = document.querySelector<HTMLElement>('#body-header-options-select-mobile-order');

const handleOpenMobileOrder = () => {
  bodyHeaderOptionsSelectDropdown.style.display = "flex";
  bodyHeaderOptionsSelectMobileOrder.classList.add("body-header-options-select-mobile-onclick");
  bodyHeaderOptionsSelectDropdown.classList.add("body-header-options-select-dropdown-mobile");
  closeButton.style.display = "block";
}

bodyHeaderOptionsSelectMobileOrder.addEventListener("click", () => {
  handleOpenMobileOrder(); 
  isSelectOpen = !isSelectOpen;
  arrowIconActiveOrder.style.transform = "rotate(180deg)";
});

//filter
const bodyHeaderOptionsSelectMobileFilter = document.querySelector<HTMLElement>('#body-header-options-select-mobile-filter');
const bodySidebarFilterContent = document.querySelector<HTMLElement>('.body-sidebar-filter-content');
// const bodySidebarFilterColors = document.querySelector<HTMLElement>('body-sidebar-filter-colors');


bodyHeaderOptionsSelectMobileFilter.addEventListener("click", () => {
  bodySidebarFilterContent.classList.add("body-sidebar-filter-content-mobile");
  // bodyHeaderOptionsSelectMobileFilter.classList.add("body-header-options-select-mobile-onclick");
  inputCheckboxFilterHidden.forEach(input => {
    input.style.display = "flex"
  });
  // bodyHeaderOptionsSelectDropdown.classList.add("body-header-options-select-dropdown-mobile");
  closeButtonFilter.style.display = "block";
})

//filter open/close filters options

const bodySidebarFilterColorsTitle = document.querySelector<HTMLElement>('.body-sidebar-filter-colors-title');
const bodySidebarFilterColorsList = document.querySelector<HTMLElement>('.body-sidebar-filter-colors-list');

const bodySidebarFilterSizeTitle = document.querySelector<HTMLElement>('.body-sidebar-filter-size-title');
const bodySidebarFiltersGridSizesBox = document.querySelector<HTMLElement>('.body-sidebar-filters-grid-sizes-box');

const bodySidebarFilterPriceTitle = document.querySelector<HTMLElement>('.body-sidebar-filter-price-title');
const bodySidebarFilterPricesList = document.querySelector<HTMLElement>('.body-sidebar-filter-prices-list');

let isColorListOpen: boolean = false;
let isSizesListOpen: boolean = false;
let isPricesListOpen: boolean = false;

bodySidebarFilterColorsTitle.addEventListener("click", () => {
  if (isColorListOpen) {
    bodySidebarFilterColorsList.classList.remove("body-sidebar-filter-colors-list-closed");
  } else {
    bodySidebarFilterColorsList.classList.add("body-sidebar-filter-colors-list-closed");
  }

  isColorListOpen = !isColorListOpen;
})

bodySidebarFilterSizeTitle.addEventListener("click", () => {
  if (isSizesListOpen) {
    bodySidebarFiltersGridSizesBox.classList.remove("body-sidebar-filters-grid-sizes-box-closed");
  } else {
    bodySidebarFiltersGridSizesBox.classList.add("body-sidebar-filters-grid-sizes-box-closed");
  }

  isSizesListOpen = !isSizesListOpen;
})

bodySidebarFilterPriceTitle.addEventListener("click", () => {
  if (isPricesListOpen) {
    bodySidebarFilterPricesList.classList.remove("body-sidebar-filter-prices-list-closed");
  } else {
    bodySidebarFilterPricesList.classList.add("body-sidebar-filter-prices-list-closed");
  }

  isPricesListOpen = !isPricesListOpen;
})
//

//close button
const handleCloseStuff = () => {
  bodyHeaderOptionsSelectDropdown.style.display = "none";
  bodyHeaderOptionsSelectMobileOrder.classList.remove("body-header-options-select-mobile-onclick");
  bodyHeaderOptionsSelectDropdown.classList.remove("body-header-options-select-dropdown-mobile");
  bodyHeaderOptionsSelectMobileFilter.classList.remove("body-header-options-select-mobile-onclick");
  bodySidebarFilterContent.classList.remove("body-sidebar-filter-content-mobile");

  inputCheckboxFilterHidden.forEach(input => {
    input.style.display = "none"
  });

  closeButton.style.display = "none";
  closeButtonFilter.style.display = "none";
}

closeButton.addEventListener("click", () => {
  handleCloseStuff();
  isSelectOpen = !isSelectOpen;
  arrowIconActiveOrder.style.transform = "rotate(0deg)";
});

closeButtonFilter.addEventListener("click", handleCloseStuff);
//

//clean button
const cleanButton = document.querySelector<HTMLElement>(".clean-button");
const checkboxes = Array.from(document.querySelectorAll<HTMLInputElement>(".checkbox"));

cleanButton.addEventListener("click", () => {
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  })
  shouldFilter = false
  renderProducts();
})
//

//apply button
const applyButton = document.querySelector<HTMLElement>(".apply-button");

applyButton.addEventListener("click", handleCloseStuff);


//products search

const productsContainer = document.querySelector<HTMLElement>('.products-container');
const emptySearch = document.querySelector<HTMLElement>('.empty-search');

const searchProduct = async () => {
  const response = await fetch(`http://localhost:5000/products`)
    .then(response => response.json())
    .then(json => json)
    .catch(erro => console.log(erro));
  
  return response
}

// searchProduct();

let isMobile: boolean = window.innerWidth <= 640
let productRenderList: Product[]
let productsApi: Product[]
let filteredProducts: Product[] = [];
let shouldFilter: boolean = false;
let productListLimit: number = isMobile ? 4 : 9

const renderProducts = async () => {
  // await searchProduct();

  
  productsApi = await searchProduct();
  productRenderList = shouldFilter ? filteredProducts : productsApi;
 
  if (
    (!isMobile && productRenderList.length > 9 && productListLimit === 9) ||
    (isMobile && productRenderList.length > 4 && productListLimit === 4)
  ){
    loadMoreButton.style.display = "flex";
  } else if (productRenderList.length === 0 || productListLimit > productRenderList.length) {
    loadMoreButton.style.display = "none";
  }

  

  if (productRenderList.length > 0) {
    productsContainer.innerHTML = productRenderList.slice(0, productListLimit).map((item: Product) => {

      const formattedPrice = item.price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      return (
          `<div class="product">           
            <img src=".${item.image}" alt="product img" class="product-img">
            <h3 class="product-title">${item.name}</h3>
            <span class="product-price">${formattedPrice}</span>
            <span class="product-price-installment">até ${item.parcelamento[0]}x de R$${item.parcelamento[1]}</span>
            <div class="product-buy-button">
              <span>COMPRAR</span>
            </div>                     
          </div>`
      )
    }).join('');
    emptySearch.innerHTML = "";
  } else {
    productsContainer.innerHTML = ""
    emptySearch.innerHTML = (
      `<div class="product-list-empty">
        <span>Busca vazia.</span>
      </div>`
    );
  }
 
}
//

//load more button
const loadMoreButton = document.querySelector<HTMLElement>('.load-more-button');

loadMoreButton.addEventListener("click", () => {
  productListLimit = productListLimit + productListLimit;
  renderProducts();
  
  if (productListLimit > productRenderList.length) {
    loadMoreButton.style.display = "none";
  }
})
//

//cart counter
const headerCarrinhoCounter = document.querySelector<HTMLElement>('.header-carrinho-counter');

let clicks: number = 0;

document.body.addEventListener("click", (e: any) => {
  if (e.target.closest('.product-buy-button')) {
    clicks += 1;
    headerCarrinhoCounter.innerHTML = `${clicks}`;
  }
})


const handleFilterProducts = () => {
  filteredProducts = [];
  shouldFilter = true;
  productListLimit = isMobile ? 4 : 9;
  const checkedColorFilters = checkboxes.filter((checkbox) => checkbox.checked && checkbox.name === 'color');
  const checkedSizeFilters = checkboxes.filter((checkbox) => checkbox.checked && checkbox.name === 'size');
  const checkedPriceFilters = checkboxes.filter((checkbox) => checkbox.checked && checkbox.name === 'price');

  productsApi.forEach((product) => {
    const colorFilterMatch = checkedColorFilters.some(checkbox => product.color.toLowerCase() === checkbox.value);
    const sizeFilterMatch = checkedSizeFilters.some(checkbox => product.size.includes(checkbox.value));
    const priceFilterMatch = checkedPriceFilters.some(checkbox => {
      let priceRange = checkbox.value.split("a");
      if (priceRange.length === 1 && product.price >= +priceRange[0]) {
        return true;
      }
      return +priceRange[0] <= product.price && +priceRange[1] >= product.price;
    });

    if(
      (colorFilterMatch || checkedColorFilters.length === 0) &&
      (sizeFilterMatch || checkedSizeFilters.length === 0) &&
      (priceFilterMatch || checkedPriceFilters.length === 0) &&
      !filteredProducts.some((p) => p.id === product.id)) {
      filteredProducts.push(product);
    }
  });

};

const handleFilter = () => {
  handleFilterProducts();
  renderProducts();
}

checkboxes.forEach(checkbox => {
  if (!isMobile) {
    checkbox.addEventListener("click", handleFilter);
  }
})
applyButton.addEventListener("click", handleFilter);

const handleOrderBy = (orderByParam: string) => {
  const productRenderList = shouldFilter ? filteredProducts : productsApi;

  switch (orderByParam) {
    case "selectMaisRecentes":
      productRenderList.sort((a, b) => {
        return (new Date(b.date) as any) - (new Date(a.date) as any);
      });
      break;
      case "selectMenorPreco":
        productRenderList.sort((a, b) => a.price - b.price);
        break;
      case "selectMaiorPreco":
        productRenderList.sort((b, a) => a.price - b.price);
        break;

      default:
        break;
  }

  productsApi = productRenderList;
  filteredProducts = productRenderList;
}

const orderByMaisRecentes = document.getElementById('selectMaisRecentes');
const orderByMenorPreco = document.getElementById('selectMenorPreco');
const orderByMaiorPreco = document.getElementById('selectMaiorPreco');

orderByMaisRecentes.addEventListener("click", () => {
  handleOrderBy("selectMaisRecentes");
  renderProducts();
  shouldFilter = true;
});
orderByMenorPreco.addEventListener("click", () => {
  handleOrderBy("selectMenorPreco");
  renderProducts();
  shouldFilter = true;
});
orderByMaiorPreco.addEventListener("click", () => {
  handleOrderBy("selectMaiorPreco");
  renderProducts();
  shouldFilter = true;
});

renderProducts();
