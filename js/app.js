$("select").each(function () {
  var $this = $(this),
    numberOfOptions = $(this).children("option").length;

  $this.addClass("select-hidden");
  $this.wrap('<div class="select"></div>');
  $this.after('<div class="select-styled"></div>');

  var $styledSelect = $this.next("div.select-styled");
  $styledSelect.text($this.children("option").eq(0).text());

  var $list = $("<ul />", {
    class: "select-options",
  }).insertAfter($styledSelect);

  for (var i = 0; i < numberOfOptions; i++) {
    $("<li />", {
      text: $this.children("option").eq(i).text(),
      rel: $this.children("option").eq(i).val(),
    }).appendTo($list);
  }

  var $listItems = $list.children("li");

  $styledSelect.click(function (e) {
    e.stopPropagation();
    $("div.select-styled.active")
      .not(this)
      .each(function () {
        $(this).removeClass("active").next("ul.select-options").hide();
      });
    $(this).toggleClass("active").next("ul.select-options").toggle();
  });

  $listItems.click(function (e) {
    e.stopPropagation();
    $styledSelect.text($(this).text()).removeClass("active");
    $this.val($(this).attr("rel"));
    $list.hide();
    catalog._changeProducts();
  });

  $(document).click(function () {
    $styledSelect.removeClass("active");
    $list.hide();
  });
});

const productslist = [
  {
    product: "CAMISETA MESCLA",
    img: "/img/img_2.png",
    price: 28.0,
    displayPrice: "28,00",
    paymentTimes: "3x de R$9,33",
    colors: ["cinza"],
    sizes: ["p", "m", "g", "gg"],
    addedOn: "2015-05-26 12:00:00",
  },
  {
    product: "SAIA EM COURO",
    img: "/img/img_3.png",
    price: 398.0,
    displayPrice: "398,00",
    paymentTimes: "5x de R$30,00",
    colors: ["marron"],
    sizes: ["36", "40", "42", "44"],
    addedOn: "2009-05-26 12:00:00",
  },
  {
    product: "CARDIGAN TIGRE",
    img: "/img/img_4.png",
    price: 398.0,
    displayPrice: "398,00",
    paymentTimes: "5x de R$30,00",
    colors: ["marron"],
    sizes: ["p", "g", "gg"],
    addedOn: "2012-05-26 12:00:00",
  },
  {
    product: "CARDIGAN OFF WHITE",
    img: "/img/img_5.png",
    price: 99.0,
    displayPrice: "99,00",
    paymentTimes: "3x de R33,30",
    colors: ["branco"],
    sizes: ["p", "m", "g"],
    addedOn: "2012-05-26 12:00:00",
  },
  {
    product: "BODY LEOPARDO",
    img: "/img/img_6.png",
    price: 129.0,
    displayPrice: "129,00",
    paymentTimes: "3x de R$43,43",
    colors: ["marron"],
    sizes: ["m"],
    addedOn: "2012-05-26 12:00:00",
  },
  {
    product: "CASACO PELOS",
    img: "/img/img_7.png",
    price: 398.0,
    displayPrice: "398,00",
    paymentTimes: "5x de R$30,00",
    colors: ["rosa", "azul"],
    sizes: ["p", "m", "g", "gg", "u"],
    addedOn: "2012-05-26 12:00:00",
  },
  {
    product: "CROPPED STRIPES",
    img: "/img/img_8.png",
    price: 120.0,
    displayPrice: "120,00",
    paymentTimes: "3x de R$40,00",
    colors: ["amarelo", "colorido", "laranja"],
    sizes: ["p", "m"],
    addedOn: "2012-05-26 12:00:00",
  },
  {
    product: "CAMISA TRANSPARENTE",
    img: "/img/img_9.png",
    price: 398.0,
    displayPrice: "398,00",
    paymentTimes: "3x de R$30,00",
    colors: ["preto", "transparente"],
    sizes: ["p", "m", "g"],
    addedOn: "2012-05-26 12:00:00",
  },
  {
    product: "POCHETE CLUTCH",
    img: "/img/img_10.png",
    price: 99.0,
    displayPrice: "99,00",
    paymentTimes: "3x de R$33,00",
    colors: ["preto"],
    sizes: ["p", "m",],
    addedOn: "2012-05-26 12:00:00",
  },
];

const products = {
  _productsOptions: {
    productsAmount: 6,
  },
  _setProducts(arr) {
    $(".products__content").empty();

    if (arr.length > products._productsOptions.productsAmount) {
      $("#loadMoreBtn").show();
    } else {
      $("#loadMoreBtn").hide();
    }

    arr.forEach(function (item, idx) {
      if (idx >= products._productsOptions.productsAmount) {
        return false;
      }
      $(".products__content").append(`
              <div class="products__item" data-colors="${item.colors}">
              <div class="products__item__img">
              <img src="${item.img}" alt="" srcset="">
              </div>
              <span class="products__item__title product__title">
              ${item.product}
              </span>
              <span class="products__item__price product__price">
              R$ ${item.displayPrice}
              </span>
              <span class="products__item__price-info product__info">
              até ${item.paymentTimes}
              </span>
              <a href="javascript:void(0)" class="btn btn--black">COMPRAR</a>
              </div>
              `);
    });
  },
};

const catalog = {
  _getColors() {
    let elements = $(`input[name='color']`);
    let selectedColors = [];

    elements.each(function (item, idx) {
      if ($(idx).is(":checked")) {
        selectedColors.push($(this).val());
      }
    });
    return selectedColors;
  },
  _getSizes() {
    let elements = $(`input[name='size']`);
    let selectedSizes = [];

    elements.each(function (item, idx) {
      if ($(idx).is(":checked")) {
        selectedSizes.push($(this).val());
      }
    });

    return selectedSizes;
  },
  _getPriceRange() {
    const priceRangeElement = $(`input[name=range-price]:checked`);

    if (priceRangeElement.val() && priceRangeElement.val() != "01") {
      return priceRangeElement.val().split("-");
    }

    return false;
  },
  _filters() {
    const elementFilters = $(
      `input[name='color'], input[name='size'], input[name=range-price] `
    );

    elementFilters.on("change", function () {
      catalog._changeProducts();
    });
  },
  _changeProducts() {
    
    if ($("#order").val() === "latest") {
      productslist.sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn));
    }
    if ($("#order").val() === "price") {
      productslist.sort((a, b) => a.price - b.price);
    }
    if ($("#order").val() === "expensive") {
      productslist.sort((a, b) => b.price - a.price);
    }

    let FilteredProducts = productslist
      .filter(function (n, i) {
        if (catalog._getColors() != 0) {
          for (let i in catalog._getColors()) {
            if(n.colors.includes(catalog._getColors()[i])){
              return n.colors.includes(catalog._getColors()[i]);
            }
          }
        } else {

          return true;
        }
      })
      .filter(function (n, i) {
        if (catalog._getSizes() != 0) {
          for (let i in catalog._getSizes()) {
            if(n.sizes.includes(catalog._getSizes()[i])){
              return n.sizes.includes(catalog._getSizes()[i]);
            }
          }
        } else {
          return true;
        }
      })
      .filter(function (n, i) {
        let priceRange = catalog._getPriceRange();
        if (priceRange) {
          return n.price >= priceRange[0] && n.price <= priceRange[1];
        }
        return true;
      });

    products._setProducts(FilteredProducts);
  },
};

const uiControl = {
  _loadMore() {
    $("#loadMoreBtn").on("click", function () {
      products._productsOptions.productsAmount +=
        products._productsOptions.productsAmount;
      catalog._changeProducts();
    });
  },
  _showMoreColors(){
    $('#showMoreColors').on('click', function(){
      $('.side-bar__colors__label').fadeIn()
      $(this).hide()
    })
  },
  _mobileCatalog(){
    $('#mobile-filter-btn').on('click', function(){
      $('.catalog').fadeIn()
      $('.catalog__filters').fadeIn()
      $('body').css('overflow', "hidden")
    })

    $('#mobile-order-btn').on('click', function(){
      $('.catalog').fadeIn()
      $('.catalog__order').fadeIn()
      $('body').css('overflow', "hidden")
    })

    $('.closeCatalog').on('click', function(){
      $('.catalog').hide()
      $('.catalog__filters').hide()
      $('.catalog__order').hide()
      $('body').css('overflow', "scroll")
    })


    $('.catalog__items-icon').on('click', function(){
      
      if($(this).data().status === 'closed'){
        $($(this).data().ref).show()
        $(this).data().status = 'opened'
        $(this).attr('src', '/img/minus.svg')
      }else{
        $($(this).data().ref).hide()
        $(this).data().status = 'closed'
        $(this).attr('src', '/img/plus.svg')
      }
    })

    $('.mobile-order').on('click', function(){
      $('#order').val($(this).data().value)
      $('.catalog').hide()
      $('.catalog__order').hide()
      $('body').css('overflow', "scroll")
      catalog._changeProducts();
    })
  },
  init() {
    uiControl._loadMore();
    uiControl._showMoreColors();
    uiControl._mobileCatalog();
  },
};

$(document).ready(function () {
  catalog._filters();
  uiControl.init();
  products._setProducts(productslist);
});
