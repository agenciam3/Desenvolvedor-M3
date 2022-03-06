fetch('http://localhost:5000/products')
    .then(function (res) {
        return res.json();
    })
    .then(function (json) {
        createModel(json);
    });

function startFilterMobile(){
    const buttonFilter = document.querySelector('.filter-button');
    const buttonOrder = document.querySelector('.order-button');
    const colorFilterArea = document.querySelector('.filter-cors-mobile');
    const sizeFilterArea = document.querySelector('.filter-size-mobile');
    const priceRangeFilterArea = document.querySelector('.filter-price-range-mobile');
    const openSizeFilter = document.querySelector('.open-size-filter');
    const openCorFilter = document.querySelector('.open-color-filter');
    const openPriceRangeFilter = document.querySelector('.open-price-range-filter');
    const closeButton = document.querySelector('.close-filter');
    const closeButtonOrder = document.querySelector('.close-order');
    const filterArea = document.querySelector('.area-filter-mobile');
    const orderArea = document.querySelector('.area-order-mobile');

    buttonFilter.addEventListener('click', function(){
        filterArea.style.left = '0px';
    });

    buttonOrder.addEventListener('click', function(){
        orderArea.style.left = '0px';
    });

    openCorFilter.addEventListener('click', function(){
        sizeFilterArea.style.display = 'none';
        priceRangeFilterArea.style.display = 'none';
        if(colorFilterArea.style.display == 'flex'){
            colorFilterArea.style.display = 'none';
        } else {
            colorFilterArea.style.display = 'flex';
        }
    });

    openSizeFilter.addEventListener('click', function(){
        colorFilterArea.style.display = 'none';
        priceRangeFilterArea.style.display = 'none';
        if(sizeFilterArea.style.display == 'flex'){
            sizeFilterArea.style.display = 'none';
        } else {
            sizeFilterArea.style.display = 'flex';
        }
    });
    
    openPriceRangeFilter.addEventListener('click', function(){
        sizeFilterArea.style.display = 'none';
        colorFilterArea.style.display = 'none';
        if(priceRangeFilterArea.style.display == 'flex'){
            priceRangeFilterArea.style.display = 'none';
        } else {
            priceRangeFilterArea.style.display = 'flex';
        }
    });

    closeButton.addEventListener('click', function(){
        filterArea.style.left = '-100%';
    });

    closeButtonOrder.addEventListener('click', function(){
        orderArea.style.left = '-100%';
    });
}

function ClearCard(){
    const cards = document.querySelectorAll('.element-product');

    cards.forEach(element =>{
        element.remove();
    });
}

function moreFilterColorPlus(element){
    if(element.style.display === 'none'){
        element.style.display = 'flex';
    } else {
        element.style.display = 'none';
    }
}

function moreFilterColor(){
    const MoreColorElement = document.querySelector('.swipe-button');
    const allFilterColors = document.querySelectorAll('.color-none');

    MoreColorElement.addEventListener('click', function(){
        allFilterColors.forEach(element => {
            moreFilterColorPlus(element);
        });
    });
}

function Order(type){
    switch (type){
        case "lowest-price":
            fetch('http://localhost:5000/products')
                .then(function (res) {
                    return res.json();
                })
                .then(function (json) {
                    json.sort(function (a, b) {
                        if (a.price > b.price) {
                          return 1;
                        }
                        if (a.price < b.price) {
                          return -1;
                        }
                        
                        return 0;
                    });
                    ClearCard();
                    createModel(json);
                });
            break;
        case "biggest-price":
            fetch('http://localhost:5000/products')
                .then(function (res) {
                    return res.json();
                })
                .then(function (json) {
                    json.sort(function (a, b) {
                        if (a.price > b.price) {
                        return -1;
                        }
                        if (a.price < b.price) {
                        return 1;
                        }
                        
                        return 0;
                    });
                    ClearCard();
                    createModel(json);
                });
            break;
        case "more-recent":
            fetch('http://localhost:5000/products')
                .then(function (res) {
                    return res.json();
                })
                .then(function (json) {
                    ClearCard();
                    createModel(json);
                });
            break;
        case "more-recent":
            fetch('http://localhost:5000/products')
                .then(function (res) {
                    return res.json();
                })
                .then(function (json) {
                    json.sort(function (a, b) {
                        const a1 = a.date.split('-');
                        const b1 = b.date.split('-');
                        if (  
                            (parseInt(a1[0]) > parseInt(b1[0])) && (parseInt(a1[1]) > parseInt(b1[1])) && (parseInt(a1[2]) > parseInt(b1[2])) ||
                            (parseInt(a1[0]) > parseInt(b1[0])) && (parseInt(a1[1]) > parseInt(b1[1])) ||
                            (parseInt(a1[0]) > parseInt(b1[0]))
                        ) {
                          return 1;
                        }
                        if (
                            (parseInt(a1[0]) < parseInt(b1[0])) && (parseInt(a1[1]) < parseInt(b1[1])) && (parseInt(a1[2]) < parseInt(b1[2])) ||
                            (parseInt(a1[0]) < parseInt(b1[0])) && (parseInt(a1[1]) < parseInt(b1[1])) ||
                            (parseInt(a1[0]) < parseInt(b1[0]))
                        ) {
                          return -1;
                        }
                        
                        return 0;
                    });
                    ClearCard();
                    createModel(json);
                });
            break;
    }

}

function ActiveOrder(){
    const orderElements = document.querySelector('select.order');

    orderElements.addEventListener('change', function(){
        Order(this.value);
    });

}

function MoreButton(){
    const moreButtonElement = document.querySelector('button.more-elements');
    const productElementsNone = document.querySelectorAll('.card-none');

    moreButtonElement.addEventListener("click", function(){
        productElementsNone.forEach(elementsProduct => {
            elementsProduct.style.display = 'flex';
        });
    });
}

function quantityProductCar(){
    const quantityArea = document.querySelector('span.area-number');
    const quantity = localStorage.getItem('@M3Store_KeyProduct');
    const len = quantity.split(',');

    if(quantity === null){
        quantityArea.textContent = '0';
    } else if( len.length > 9 ){
        quantityArea.textContent = '+9';
    } else {
        quantityArea.textContent = `${len.length}`;
    }
}

function filterSearch(key){
    const mainKey = key;
    fetch('http://localhost:5000/products')
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            const arrayJson = [];
            const test =(mainKey.split('-')).length;

            console.log(test)

            for(let j=0; j<json.length;j++){
                if(mainKey == json[j].color){
                    arrayJson.push(json[j]);
                } else if( test == 2 ) {
                    const [range1 , range2 ] = mainKey.split('-');

                    if(json[j].price > parseFloat(range1) && json[j].price < parseFloat(range2)){
                        arrayJson.push(json[j]);
                    } else if(range1 == '500' && json[j].price > parseFloat(range1)){
                        arrayJson.push(json[j]);
                    }

                }
                
                for(let i=0; i<json[j].size.length;i++){
                    if(mainKey == json[j].size[i]){
                        arrayJson.push(json[j]);
                    }
                }
            }
            ClearCard();
            createModel(arrayJson);

        });

    
}

function filterButton() {
    const allInputs = document.querySelectorAll('input.unique-click');

    $(document).ready(function () {
        $('.unique-click').on('change', function () {
            $('.unique-click').not(this).prop('checked', false);
        });
    });

    allInputs.forEach(elements => {
        elements.addEventListener("click", function () {
            filterSearch(this.value);
        });
    });
}

function activeButtons() {
    const buyButtonElements = document.querySelectorAll('button.buy-button-product');

    buyButtonElements.forEach(element => {
        element.addEventListener("click", function () {
            const key = this.value;
            const CardBuy = document.querySelector('section.card-buy');

            const array = [];
            
            if(localStorage.getItem('@M3Store_KeyProduct') !== null){
                array.push(localStorage.getItem('@M3Store_KeyProduct'));
            }
            
            array.push(key);


            localStorage.setItem('@M3Store_KeyProduct', array);

            quantityProductCar();

            CardBuy.style.bottom = '10vh';
            CardBuy.style.display = 'flex';

            setTimeout(() => {
                CardBuy.style.bottom = '-100vh';
                CardBuy.style.display = 'none';
            }, 2000);

        });
    });
}

function createModel(value) {
    console.log(value)

    const elementArea = document.querySelector('div.elements');
    const arrayElement = [];

    function addClass(idT){
        if(idT+1 >= 7 ){
            return 'card-none';
        } else {
            return '';
        }
    }

    for (let i = 0; i < value.length; i++) {


        let elementProduct = `
        <fieldset class="element-product ${ addClass(i) }">
            <div class="image-product">
                <img src="${value[i].image}" alt="Image Product - ${value[i].name}">
            </div>
            <div class="description-product">
                <h1 class="name-product">${value[i].name}</h1>
                <strong class="value-product">R$ ${modifyPoint(value[i].price)}</strong>
                <span class="value-split">até ${value[i].parcelamento[0]}x de R$ ${modifyPoint(value[i].parcelamento[1])}</span>
            </div>
            <button value="${value[i].id}" class="buy-button-product">comprar</button>
        </fieldset>
        `;

        arrayElement.push(elementProduct);
    }

    arrayElement.forEach(element=>{
        elementArea.append(document.createRange().createContextualFragment(element));
    });

    activeButtons();
    MoreButton();
}

function modifyPoint(value) {
    const name = `${value}`;
    return name.replace('.', ',');
}

quantityProductCar();
filterButton();
MoreButton();
ActiveOrder();
moreFilterColor();
startFilterMobile();