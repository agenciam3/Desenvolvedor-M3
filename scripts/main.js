// DATA MODULE
function dataModule() {
  this.products = [];
  this.filteredProducts = [];
  this.page = 0;
}

// REQUEST MODULE

function requestModule(rendersModule, dataModule, filtersModule) {
  this.rendersModule = rendersModule;
  this.dataModule = dataModule;
  this.filtersModule = filtersModule;
  this.requestJSON();
}

requestModule.prototype.requestJSON = function () {
  fetch("/json/products.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const productsOrdered = this.filtersModule.order(
        data.products,
        this.filtersModule.filters.order
      );
      this.dataModule.products = Object.assign([], data.products);
      this.dataModule.filteredProducts = Object.assign([], data.products);
      rendersModuleInstance.products(productsOrdered);
    });
};

// UTILS MODULE
function utilsModule() {}

utilsModule.prototype.bubbleSort = function (products) {
  let len = products.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (products[j].price > products[j + 1].price) {
        let tmp = products[j];
        products[j] = products[j + 1];
        products[j + 1] = tmp;
      }
    }
  }
  return products;
};

// SHOPCART MODULE
function shopcartModule() {
  this.products = [];
}
shopcartModule.prototype.add = function (event) {
  const productsID = event.currentTarget.dataset.id;
  let exists = false;
  if (this.products.length > 0) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id == productsID) {
        exists = true;
        this.products[i].quantity += 1;
      }
    }
  }
  if (!exists) {
    this.products.push({ id: productsID, quantity: 1 });
  }
  return this.products.reduce((acc, product) => acc + product.quantity, 0);
};

// EFFECT MODULE
function effectsModule(accordionContainer, accordionContainerArrow) {
  this.accordionContainer = accordionContainer;
  this.accordionContainerArrow = accordionContainerArrow;
}
effectsModule.prototype.accordionDesktop = function () {
  if (this.accordionContainer.style.maxHeight) {
    this.accordionContainer.style.maxHeight = null;
    this.accordionContainerArrow.style.transform = "rotate(0deg)";
  } else {
    this.accordionContainer.style.maxHeight =
      this.accordionContainer.scrollHeight + "px";
    this.accordionContainerArrow.style.transform = "rotate(180deg)";
  }
};
effectsModule.prototype.accordionFiltersMobile = function (event) {
  const btnRef = event.currentTarget.dataset.id;
  const icon = event.currentTarget.children[0];
  const element = document.getElementById(btnRef);

  if (element.style.maxHeight) {
    element.style.maxHeight = null;
    element.style.opacity = "0";
    element.style.visibility = "hidden";
    icon.classList.remove("fa-minus");
    icon.classList.add("fa-plus");
  } else {
    element.style.maxHeight = element.scrollHeight + "px";
    element.style.opacity = "1";
    element.style.visibility = "visible";
    icon.classList.remove("fa-plus");
    icon.classList.add("fa-minus");
  }
};
effectsModule.prototype.buyButtonEffect = function (event) {
  event.target.innerHTML = `<i class="fas fa-check"></i>`;
  setTimeout(() => {
    event.target.innerHTML = `COMPRAR`;
  }, 1000);
};
effectsModule.prototype.modalToggle = function (event) {
  const modal = document.getElementById(event.currentTarget.dataset.target);
  const openClass = event.currentTarget.dataset.open;
  const closeClass = event.currentTarget.dataset.close;
  if (modal.classList.contains(closeClass)) {
    modal.classList.remove(closeClass);
    modal.classList.add(openClass);
  } else {
    modal.classList.remove(openClass);
    modal.classList.add(closeClass);
  }
};

// BINDERS MODULE
function bindersModule(
  rendersModule,
  shopcartModule,
  effectsModule,
  filtersModule,
  dataModule,
  accordionDesktopButton,
  modalButton,
  accordionMobileButton,
  filtersCheckbox,
  orderSelect,
  clearFiltersBtn,
  loadMoreBtnElement
) {
  this.shopcartModule = shopcartModule;
  this.effectsModule = effectsModule;
  this.rendersModule = rendersModule;
  this.filtersModule = filtersModule;
  this.dataModule = dataModule;
  this.accordionDesktopButton = accordionDesktopButton;
  this.modalButton = modalButton;
  this.accordionMobileButton = accordionMobileButton;
  this.filtersCheckbox = filtersCheckbox;
  this.orderSelectElement = orderSelect;
  this.clearFiltersBtn = clearFiltersBtn;
  this.loadMoreBtnElement = loadMoreBtnElement;
  this.accordionDesktopBinder();
  this.accordionMobileBinder();
  this.modalButtons();
  this.filterCheckbox();
  this.ordersSelect();
  this.clearFilterBtn();
  this.loadMoreBtn();
}
bindersModule.prototype.accordionDesktopBinder = function () {
  this.accordionDesktopButton.addEventListener("click", () =>
    this.effectsModule.accordionDesktop()
  );
};
bindersModule.prototype.accordionMobileBinder = function () {
  for (let i = 0; i < this.accordionMobileButton.length; i++) {
    this.accordionMobileButton[i].addEventListener("click", (event) => {
      this.effectsModule.accordionFiltersMobile(event);
    });
  }
};

bindersModule.prototype.modalButtons = function () {
  for (let i = 0; i < this.modalButton.length; i++) {
    this.modalButton[i].addEventListener("click", (event) => {
      this.effectsModule.modalToggle(event);
    });
  }
};

bindersModule.prototype.ordersSelect = function () {
  this.orderSelectElement.addEventListener("change", (event) => {
    this.dataModule.page = 0;
    this.filtersModule.filters.order = event.currentTarget.value;
    const productsFilteredByColor = this.filtersModule.color(
      this.dataModule.products,
      this.filtersModule.filters.colors
    );
    const productsFilteredBySize = this.filtersModule.size(
      productsFilteredByColor,
      this.filtersModule.filters.sizes
    );
    const productsOrdered = this.filtersModule.order(
      productsFilteredBySize,
      this.filtersModule.filters.order
    );

    this.rendersModule.products(productsOrdered);
  });
};

bindersModule.prototype.filterCheckbox = function () {
  for (let i = 0; i < this.filtersCheckbox.length; i++) {
    this.filtersCheckbox[i].addEventListener("click", (event) => {
      this.dataModule.page = 0;
      const filterType = event.currentTarget.dataset.filter;
      const filterValue = event.currentTarget.dataset.value;
      switch (filterType) {
        case "color":
          if (event.currentTarget.checked) {
            this.filtersModule.filters.colors.push(filterValue);
          } else {
            const filterValueIndex = this.filtersModule.filters.colors.indexOf(
              filterValue
            );
            if (filterValueIndex > -1) {
              this.filtersModule.filters.colors.splice(filterValueIndex);
            }
          }

          break;
        case "size":
          if (event.currentTarget.checked) {
            this.filtersModule.filters.sizes.push(filterValue);
          } else {
            const filterValueIndex = this.filtersModule.filters.sizes.indexOf(
              filterValue
            );
            if (filterValueIndex > -1) {
              this.filtersModule.filters.sizes.splice(filterValueIndex);
            }
          }
          break;
        case "price":
          const valuesArr = [
            Number(event.currentTarget.dataset.minvalue),
            Number(event.currentTarget.dataset.maxvalue),
          ];
          if (event.currentTarget.checked) {
            this.filtersModule.filters.prices.push(valuesArr);
          } else {
            let filterValueIndex = -1;
            this.filtersModule.filters.prices.map((price, index) => {
              if (price[0] == valuesArr[0] && price[1] == valuesArr[1]) {
                filterValueIndex = index;
              }
            });

            if (filterValueIndex > -1) {
              this.filtersModule.filters.prices.splice(filterValueIndex);
            }
          }

          break;
      }
      const productsFilteredByColor = this.filtersModule.color(
        this.dataModule.products,
        this.filtersModule.filters.colors
      );
      const productsFilteredBySize = this.filtersModule.size(
        productsFilteredByColor,
        this.filtersModule.filters.sizes
      );
      const productsOrdered = this.filtersModule.order(
        productsFilteredBySize,
        this.filtersModule.filters.order
      );
      const productsFilteredByPrice = this.filtersModule.price(
        productsOrdered,
        this.filtersModule.filters.prices
      );
      this.dataModule.filteredProducts = productsFilteredByPrice;
      this.rendersModule.products(productsFilteredByPrice);
    });
  }
};
bindersModule.prototype.clearFilterBtn = function () {
  this.clearFiltersBtn.addEventListener("click", () => {
    this.filtersModule.clearFilters(this.filtersCheckbox);
  });
};
bindersModule.prototype.loadMoreBtn = function () {
  this.loadMoreBtnElement.addEventListener("click", () => {
    this.dataModule.page += 1;

    this.rendersModule.products(this.dataModule.filteredProducts);
  });
};

// RENDERS MODULE
function rendersModule(
  bagCounterElement,
  productsContentElement,
  buyButtonsElement,
  shopcartModule,
  effectsModule,
  dataModule,
  loadMoreBtnElement
) {
  this.bagCounterElement = bagCounterElement;
  this.productsContentElement = productsContentElement;
  this.buyButtonsElement = buyButtonsElement;
  this.shopcartModule = shopcartModule;
  this.effectsModule = effectsModule;
  this.dataModule = dataModule;
  this.loadMoreBtnElement = loadMoreBtnElement;
}
rendersModule.prototype.buyButton = function () {
  for (let i = 0; i < this.buyButtonsElement.length; i++) {
    this.buyButtonsElement[i].addEventListener("click", (event) => {
      this.effectsModule.buyButtonEffect(event);
      const quantity = this.shopcartModule.add(event);
      this.bagCounter(quantity);
    });
  }
};
rendersModule.prototype.bagCounter = function (quantity) {
  this.bagCounterElement.innerHTML = quantity;
};
rendersModule.prototype.products = function (products) {
  let template = "";
  const productsMaxSize = 5 + this.dataModule.page * 2;
  const shouldChangeLoadMoreBtn = products.length + 1 <= productsMaxSize;
  if (shouldChangeLoadMoreBtn) {
    this.loadMoreBtnElement.innerHTML = "TODOS CARREGADOS";
    this.loadMoreBtnElement.style.backgroundColor = "gray";
  } else {
    this.loadMoreBtnElement.innerHTML = "CARREGAR MAIS";
  }
  const slicedProducts = products.slice(0, productsMaxSize);

  for (let i = 0; i < slicedProducts.length; i++) {
    const parcelPrice = (slicedProducts[i].price / slicedProducts[i].parcels)
      .toFixed(2)
      .toString()
      .replace(".", ",");
    const price = slicedProducts[i].price
      .toFixed(2)
      .toString()
      .replace(".", ",");
    template += `<div class="productContent">
            <img src="/layout/imagens/${slicedProducts[i].image}" />
            <h4 class="productName">${slicedProducts[i].name}</h4>
            <strong>R$ ${price}</strong>
            <div>até ${slicedProducts[i].parcels}x de R$${parcelPrice}</div>
            <button class="buyButton" data-id="${slicedProducts[i].id}">COMPRAR</button>
          </div>`;
  }

  this.productsContentElement.innerHTML = template;
  this.buyButton();
};

function filtersModule(utilsModule) {
  this.utilsModule = utilsModule;

  this.filters = { colors: [], sizes: [], prices: [], order: "moreRecents" };
}

filtersModule.prototype.order = function (products, orderType) {
  const newProducts = Object.assign([], products);
  switch (orderType) {
    case "moreRecents": {
      newProducts.reverse();
      return newProducts;
    }
    case "lesserPrices": {
      return this.utilsModule.bubbleSort(newProducts);
    }
    case "biggerPrices": {
      const productsSorted = this.utilsModule.bubbleSort(newProducts);

      productsSorted.reverse();
      return productsSorted;
    }
  }
};

filtersModule.prototype.color = function (products, colorsType) {
  if (colorsType.length == 0) return products;
  const filteredProducts = products.filter((product) => {
    return product.colors.some((color) => colorsType.includes(color));
  });

  return filteredProducts;
};

filtersModule.prototype.size = function (products, sizesType) {
  if (sizesType.length == 0) return products;
  const filteredProducts = products.filter((product) => {
    return product.sizes.some((size) => sizesType.includes(size));
  });

  return filteredProducts;
};

filtersModule.prototype.price = function (products, pricesType) {
  if (pricesType.length == 0) return products;
  const filteredProducts = products.filter((product) =>
    pricesType.some((price) => {
      if (price[1] == -1) {
        return product.price > price[0];
      }
      return product.price > price[0] && product.price < price[1];
    })
  );
  return filteredProducts;
};
filtersModule.prototype.clearFilters = function (checkbox) {
  for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].checked = false;
  }
};
filtersModule.prototype.loadMore = function () {};

// CREATE INSTANCES
const dataModuleInstance = new dataModule();
const utilsModuleInstance = new utilsModule();
const filtersModuleInstance = new filtersModule(utilsModuleInstance);
const effectsModuleInstance = new effectsModule(
  document.getElementById("accordionContainer"),
  document.getElementsByClassName("arrow")[0]
);
const shopcartModuleInstance = new shopcartModule();
const rendersModuleInstance = new rendersModule(
  document.getElementById("bagCounter"),
  document.getElementById("productsContent"),
  document.getElementsByClassName("buyButton"),
  shopcartModuleInstance,
  effectsModuleInstance,
  dataModuleInstance,
  document.getElementById("loadMore")
);

const requestModuleInstance = new requestModule(
  rendersModuleInstance,
  dataModuleInstance,
  filtersModuleInstance
);

const bindersModuleInstance = new bindersModule(
  rendersModuleInstance,
  shopcartModuleInstance,
  effectsModuleInstance,
  filtersModuleInstance,
  dataModuleInstance,
  document.getElementById("btnColorAccordion"),
  document.getElementsByClassName("modalButton"),
  document.getElementsByClassName("accordionMobileBtn"),
  document.getElementsByClassName("filtersCheckbox"),
  document.getElementById("orderSelect"),
  document.getElementById("clearFilters"),
  document.getElementById("loadMore")
);
