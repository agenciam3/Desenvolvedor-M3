let navbar = document.getElementById('navbar');
let headerIconBag = document.getElementById('bag');
let headerIconTimes = document.getElementById('times');

let logo = document.getElementById('logo');
let orderTitle = document.getElementById('orderTitle');
let filterTitle = document.getElementById('filterTitle');

let cart = document.getElementById('cart');

let titleAndBtn = document.getElementById('title-and-order');

let mainTitle = document.getElementsByClassName('type-title');

let filterOrderBtn = document.getElementsByClassName('mobile-order-btn');

let orderContent = document.getElementById('dropdown-order-content');

let dropdownOrder = document.getElementById('dropdown-order');
let dropdownBtn = document.getElementsByClassName('dropdown-order-btn');
let dropdownContent = document.getElementById('dropdown-order-content');

let dropdownContentItem = document.getElementsByClassName('dropdown-order-content-item');

let containerFilters = document.getElementById('container-filters');
let containerProducts = document.getElementById('container-products');

let subtitleColor = document.getElementById('subtitle-color');
let subtitleSize = document.getElementById('subtitle-size');
let subtitlePrice = document.getElementById('subtitle-price');

let divColor = document.getElementById('colors');
let divSize = document.getElementById('sizes');
let divPrice = document.getElementById('prices');

let colorSeeAllBtn = document.getElementById('see-all-btn');
let colorSeeAll = document.getElementById('see-all-colors');

let radio = document.getElementsByClassName('radio');

let loadMoreBtn = document.getElementById('load-more-btn');

let footer = document.getElementById('footer');

let filterBtn = document.getElementById('mobile-btn-filter');
let orderBtn = document.getElementById('mobile-btn-order');

orderBtn.onclick = function() {
  navbar.classList.remove('navbar');
  navbar.classList.add('navbar-onclick-btn');

  headerIconBag.classList.add('none');
  headerIconTimes.classList.remove('none');

  cart.classList.add('none');

  logo.classList.add('none');
  orderTitle.classList.remove('none');

  mainTitle[0].classList.add('none');

  for(let i = 0; i < filterOrderBtn.length; i++) {
    filterOrderBtn[i].classList.add('none');
  }

  titleAndBtn.classList.remove('title-and-order');

  dropdownOrder.classList.add('dropdown-order-container');
  dropdownOrder.classList.remove('dropdown-order');

  dropdownBtn[0].classList.add('none');
  
  dropdownContent.classList.remove('dropdown-order-content');
  dropdownContent.classList.add('dropdown-mobile-content');

  for(let i = 0; i < dropdownContentItem.length; i++) {
    dropdownContentItem[i].classList.add('order-mobile-items');
  }

  for(let i = 2; i >= 0; i--) {
    dropdownContentItem[i].classList.remove('dropdown-order-content-item');
  }

  containerProducts.classList.add('none');

  loadMoreBtn.classList.add('none');

  footer.classList.add('none');
}

filterBtn.onclick = function() {
  navbar.classList.remove('navbar');
  navbar.classList.add('navbar-onclick-btn');

  headerIconBag.classList.add('none');
  headerIconTimes.classList.remove('none');

  logo.classList.add('none');
  filterTitle.classList.remove('none');

  cart.classList.add('none');
  
  titleAndBtn.classList.add('none');

  containerProducts.classList.add('none');
  containerFilters.classList.add('show-container-filters');
  containerFilters.classList.remove('container-filters');

  subtitleColor.classList.remove('subtitle');
  subtitleSize.classList.remove('subtitle');
  subtitlePrice.classList.remove('subtitle');

  subtitleColor.classList.add('subtitle-btn');
  subtitleSize.classList.add('subtitle-btn');
  subtitlePrice.classList.add('subtitle-btn');

  subtitleColor.innerHTML = 'Cores <i class="icon fas fa-plus"></i>';
  subtitleSize.innerHTML = 'Tamanhos <i class="icon fas fa-plus"></i>';
  subtitlePrice.innerHTML = 'Faixa de preço <i class="icon fas fa-plus"></i>';

  divColor.classList.add('none');
  divSize.classList.add('none');
  divPrice.classList.add('none');

  colorSeeAllBtn.classList.add('none');
  colorSeeAll.classList.add('show-colors');

  for(let i = 0; i < radio.length; i++) {
    radio[i].classList.add('radio-padding');
  }

  divSize.classList.remove('sizes');
  divSize.classList.add('sizes-mobile');

  for(let i = 0; i < sizesValue.length; i++) {
    document.getElementById(sizesValue[i]).classList.add('size-btn-mobile');
  }

  loadMoreBtn.classList.add('none');

  footer.classList.add('none');
}

headerIconTimes.addEventListener('click', function() {
  getScreenSize(1);
});

function getScreenSize(id) {
  let screenWidth = window.innerWidth;

  if(screenWidth >= 768 || id === 1) {
    navbar.classList.add('navbar');
    navbar.classList.remove('navbar-onclick-btn');

    headerIconBag.classList.remove('none');
    headerIconTimes.classList.add('none');

    cart.classList.remove('none');

    logo.classList.remove('none');
    filterTitle.classList.add('none');
    orderTitle.classList.add('none');

    titleAndBtn.classList.remove('none');

    mainTitle[0].classList.remove('none');

    for(let i = 0; i < filterOrderBtn.length; i++) {
      filterOrderBtn[i].classList.remove('none');
    }

    titleAndBtn.classList.add('title-and-order');

    dropdownOrder.classList.remove('dropdown-order-container');
    dropdownOrder.classList.add('dropdown-order');

    dropdownBtn[0].classList.remove('none');

    dropdownContent.classList.remove('dropdown-mobile-content');
    dropdownContent.classList.add('dropdown-order-content');

    let dropdownContentItemAfter = document.getElementsByClassName('order-mobile-items');

    for(let i = 0; i < dropdownContentItemAfter.length; i++) {
      dropdownContentItemAfter[i].classList.add('dropdown-order-content-item');
    }

    for(let i = 0; i < dropdownContentItemAfter.length; i++) {
      dropdownContentItemAfter[i].classList.remove('order-mobile-items');
    }

    containerProducts.classList.remove('none');
    containerFilters.classList.remove('show-container-filters');
    containerFilters.classList.add('container-filters');

    subtitleColor.classList.remove('subtitle-btn');
    subtitleSize.classList.remove('subtitle-btn');
    subtitlePrice.classList.remove('subtitle-btn');

    subtitleColor.classList.remove('subtitle-padding');
    subtitleSize.classList.remove('subtitle-padding');
    subtitlePrice.classList.remove('subtitle-padding');
    
    subtitleColor.classList.add('subtitle');
    subtitleSize.classList.add('subtitle');
    subtitlePrice.classList.add('subtitle');

    subtitleColor.innerHTML = 'Cores';
    subtitleSize.innerHTML = 'Tamanhos';
    subtitlePrice.innerHTML = 'Faixa de preço';

    divColor.classList.remove('none');
    divSize.classList.remove('none');
    divPrice.classList.remove('none');
    
    colorSeeAllBtn.classList.remove('none');
    colorSeeAll.classList.remove('show-colors');

    for(let i = 0; i < radio.length; i++) {
      radio[i].classList.remove('radio-padding');
    }

    divSize.classList.add('sizes');
    divSize.classList.remove('sizes-mobile');

    for(let i = 0; i < sizesValue.length; i++) {
      document.getElementById(sizesValue[i]).classList.remove('size-btn-mobile');
    }

    loadMoreBtn.classList.remove('none');

    footer.classList.remove('none');
  }
}

subtitleColor.addEventListener('click', function() {
  showDiv(1);
});

subtitleSize.addEventListener('click', function() {
  showDiv(2);
});

subtitlePrice.addEventListener('click', function() {
  showDiv(3);
});

function showDiv(id) {
  if(id === 1) {
    divColor.classList.toggle('none');
    subtitleColor.classList.toggle('subtitle-padding');

    if(divColor.classList.contains('none')) {
      subtitleColor.innerHTML = 'Cores <i class="icon fas fa-plus"></i>';
    } else {
      subtitleColor.innerHTML = 'Cores <i class="icon fas fa-minus"></i>';
    }
  }

  if(id === 2) {
    divSize.classList.toggle('none');
    subtitleSize.classList.toggle('subtitle-padding');

    if(divSize.classList.contains('none')) {
      subtitleSize.innerHTML = 'Tamanhos <i class="icon fas fa-plus"></i>';
    } else {
      subtitleSize.innerHTML = 'Tamanhos <i class="icon fas fa-minus"></i>';
    }
  }

  if(id === 3) {
    divPrice.classList.toggle('none');
    subtitlePrice.classList.toggle('subtitle-padding');

    if(divPrice.classList.contains('none')) {
      subtitlePrice.innerHTML = 'Faixa de preço <i class="icon fas fa-plus"></i>';
    } else {
      subtitlePrice.innerHTML = 'Faixa de preço <i class="icon fas fa-minus"></i>';
    }
  }
}