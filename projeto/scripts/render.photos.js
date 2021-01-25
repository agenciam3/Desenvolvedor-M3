// CALL THE FUNCTION RENDERPRODUCTS AS SOON AS THE WINDOW IS CHARGED
document.body.onload = renderProducts;

var products = {
    itensLoad: 6,
    itens: [
        {
            src: './images/img_2.png',
            name: 'Camiseta Mescla',
            price: 'R$ 28,00',
            parcel: 'até 3x de R$9,33',
            color: ['Cinza'],
            size: ['P', 'M', 'G'],
            dateInsert: '2020-05-17'
        },
        {
            src: './images/img_3.png',
            name: 'Saia em couro',
            price: 'R$ 398,00',
            parcel: 'até 5x de R$30,00',
            color: ['Laranja'],
            size: ['P'],
            dateInsert: '2020-02-13'
        },
        {
            src: './images/img_4.png',
            name: 'Cardigan tigre',
            price: 'R$ 398,00',
            parcel: 'até 5x de R$30,00',
            color: ['Laranja', 'Preto', 'Branco'],
            size: ['P', '36', '38', '40', '42'],
            dateInsert: '2020-01-05'
        },
        {
            src: './images/img_5.png',
            name: 'Cardigan off white',
            price: 'R$ 99,90',
            parcel: 'até 3x de R$33,30',
            color: ['Branco'],
            size: ['P', 'G', 'GG', 'U', '46'],
            dateInsert: '2020-03-03'
        },
        {
            src: './images/img_6.png',
            name: 'Body leopardo',
            price: 'R$ 129,90',
            parcel: 'até 3x de R$43,43',
            color: ['Amarelo'],
            size: ['P'],
            dateInsert: '2020-05-17'
        },
        {
            src: './images/img_7.png',
            name: 'Casaco pelos',
            price: 'R$ 398,00',
            parcel: 'até 5x de R$30,00',
            color: ['Rosa'],
            size: ['P', '36', '42', '46'],
            dateInsert: '2019-12-17'
        },
        {
            src: './images/img_8.png',
            name: 'Cropped stripes',
            price: 'R$ 120,00',
            parcel: 'até 3x de R$40,00',
            color: ['Azul', 'Amarelo', 'Laranja', 'Verde'],
            size: ['M', 'G', 'GG', 'U', '42', '46'],
            dateInsert: '2019-09-20'
        },
        {
            src: './images/img_9.png',
            name: 'Camisa transparente',
            price: 'R$ 398,00',
            parcel: 'até 5x de R$30,00',
            color: ['Preto', 'Transparente'],
            size: ['P', '36', '40', '42'],
            dateInsert: '2020-01-23'
        },
        {
            src: './images/img_10.png',
            name: 'Pochete clutch',
            price: 'R$ 99,00',
            parcel: 'até 3x de R$33,00',
            color: ['Branco'],
            size: ['M', 'G'],
            dateInsert: '2020-02-12'
        }
    ]
}

var listProductsCopy = products.itens;

/* GET ELEMENT CREATED IN HTML, CREATE A NEW ELEMENT, INSERT THE PRODUCTS IN 
THIS NEW ELEMENT AND RENDER IN ELEMENT ALREADY CREATED IN HTML*/
function renderProducts(){
    var renderContainer = document.querySelector('.render-container');
    var section = document.createElement('section');
    section.className = 'section-products';
    section.id = "section-products";

    for(var count = 0; count < products.itensLoad; count++){
        var divItem = loadProducts(count);
        section.appendChild(divItem);
    }

    var loadMoreContainer = document.createElement('div');
    loadMoreContainer.className = 'load-more-container';

    var loadMoreTitle = document.createElement('p');
    loadMoreTitle.innerHTML = "Carregar Mais";
    loadMoreTitle.className = 'title';
    loadMoreTitle.id = "load-more-title";

    renderContainer.appendChild(section);

    if(products.itens.length > 6){
        loadMoreContainer.appendChild(loadMoreTitle);
        renderContainer.appendChild(loadMoreContainer);
        loadMoreProducts();
    }

    buyProducts();
}


// CREATE ELEMENT BY ELEMENT THAT WILL BE SHOWED IN THE PRODUCTS IN INTERFACE AND INSERT IT IN A NEW ELEMENT CREATED HERE
function loadProducts(count){
    var product = document.createElement('div');
    product.className = 'product-container';

    var img = document.createElement('img');
    img.className = 'img-product'
    img.setAttribute('src', products.itens[count].src);

    var nameContainer = document.createElement('div');
    nameContainer.className = 'title-container';

    var name = document.createElement('p');
    name.innerHTML = products.itens[count].name;
    name.className = 'title';

    nameContainer.appendChild(name);

    var priceContainer = document.createElement('div');
    priceContainer.className = 'price-container';

    var price = document.createElement('p');
    price.innerHTML = products.itens[count].price;
    price.className = 'title'

    priceContainer.appendChild(price);

    var parcelContainer = document.createElement('div');
    parcelContainer.className = 'parcel-container';

    var parcel = document.createElement('p');
    parcel.innerHTML = products.itens[count].parcel;
    parcel.className = 'title';

    parcelContainer.appendChild(parcel);

    var buyContainer = document.createElement('div');
    buyContainer.className = 'buy-container'

    var buy = document.createElement('p');
    buy.className = 'title';
    buy.innerHTML = "Comprar";

    buyContainer.appendChild(buy);

    product.appendChild(img);
    product.appendChild(nameContainer);
    product.appendChild(priceContainer);
    product.appendChild(parcelContainer);
    product.appendChild(buyContainer);

    return product;
}

function loadMoreProducts(){
    var loadMoreTitle = document.getElementById("load-more-title");
    loadMoreTitle.addEventListener("click", function(){

        var section  = document.getElementById("section-products");
        for(i = products.itensLoad; i < products.itens.length; i++){
            var divItem = loadProducts(i);
            section.appendChild(divItem);
        }

        loadMoreTitle.style.display = "none";
    });
}
