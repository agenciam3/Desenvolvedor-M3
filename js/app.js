// Variables
const cards = document.querySelector('#cards');
const items = document.querySelector('#items');
const emptyCart = document.querySelector('.btn__empty');
const templateCard = document.querySelector('#template__card').content;
const templateItems= document.querySelector('#template-items').content;
const fragment = document.createDocumentFragment();
const car = document.querySelector('#car');
let data = [];  // Save information of Json
let cart = {}; // shopping cart

// Selector for search
const checks = document.querySelectorAll('.colors');
const sizes = document.querySelectorAll('.sizes__item span');
const checkPrice = document.querySelectorAll('.check__price');

// Variable for Modal
const modal = document.querySelector('#modal');


// EventListener
document.addEventListener('DOMContentLoaded', () => {
    obtenerProductos();

    if(localStorage.getItem('carrito')){
        cart = JSON.parse(localStorage.getItem('carrito'))
        paintShoppingCart();
    }
});

cards.addEventListener('click', e =>{
    addProductsCar(e)
});

car.addEventListener('click', e =>{
    deletedCart(e)
});

emptyCart.addEventListener('click', () =>{
    cart = {};
    limpiarCart();
});

 // EventListener for search checkboxes

 for(let checkbox of checks){
    checkbox.addEventListener('click', function(){
        if(this.checked == true) {
            searchData.cor = this.value
            filterProduct();
        }else{
            paintCards(data)
        }
    })
}

// EventListener for search Sizes
sizes.forEach(items =>{
    items.addEventListener('click', function(){
            items.classList.toggle('sizes__new');
            if(items.classList.contains('sizes__new')){
                searchData.tamanho = items.childNodes[0].data;
                filterProduct()
            }
            else
            paintCards(data)
    })
    
});

// EventListener for search prices
for(let check of checkPrice){
    check.addEventListener('click', function(){
        if(this.checked == true) {
            searchData.preco = parseInt(this.value)            
            filterProduct()
        }else{
            paintCards(data)
        }
    })
}

//EvenListener for menu accordion
const accordion = document.querySelectorAll('.accordion__content');

for(i = 0; i<accordion.length; i++){
    accordion[i].addEventListener('click', function(e){
        if(e.target.classList.contains('accordion__label')){
            this.classList.toggle('active')
        }
    })
}


// Funciones

// function for open Modal
const openModal = () =>{
    modal.style.display = 'flex';
}

const closeModal = () =>{
    modal.style.display = 'none';
}

const obtenerProductos = async() =>{
    try {
        const res = await fetch('datos.json');
        const dates = await res.json();
        data = dates;
        paintCards(data)
    } catch (error) {
        console.log(error)
    }
}

// Paint cards
const paintCards = data =>{

    cleanHTML()
    console.log(data)
    data.forEach(products => {
        const {id, image, description, product, price} = products;

        templateCard.querySelector('.card__image').setAttribute('src', image);
        templateCard.querySelector('.description').textContent = description;
        templateCard.querySelector('.card__title').textContent = product;
        templateCard.querySelector('h3').textContent = `R$ ${price}`;
        templateCard.querySelector('.card__button').dataset.id = id;

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });
    cards.appendChild(fragment)
}

// Add product to shopping cart
const addProductsCar = e =>{
    e.preventDefault();
    const classBtn = e.target.classList.contains('card__button');
    if(classBtn){
        const productSelected = e.target.parentElement.parentElement;
        readDatesProduct(productSelected);
    }
    e.stopPropagation();
}

// Create an object with information of product
const readDatesProduct = product =>{
    
    objProduct = {
        image: product.querySelector('.card__image').src,
        id: product.querySelector('.card__button').dataset.id,
        title: product.querySelector('.card__title').textContent,
        price: product.querySelector('.card__price').textContent,
        description: product.querySelector('.description').textContent,
        quantity: 1
    }

    if(cart.hasOwnProperty(objProduct.id)){
        objProduct.quantity = cart[objProduct.id].quantity + 1;
    }
    cart[objProduct.id] = {...objProduct}
    paintShoppingCart();
}

// Paint information in the shopping cart
const paintShoppingCart = () =>{

    limpiarCart();

    Object.values(cart).forEach(item => {

        const {id, image, title, price, quantity} = item

        templateItems.querySelectorAll('td img')[0].setAttribute('src', image);
        templateItems.querySelectorAll('td')[1].textContent = title;
        templateItems.querySelectorAll('td')[2].textContent = price;
        templateItems.querySelectorAll('td')[3].textContent = quantity;
        templateItems.querySelector('.btn-delete').dataset.id = id;

        const clone = templateItems.cloneNode(true);
        fragment.appendChild(clone);
    })
    items.appendChild(fragment)

    // Agrego carrito a Localstorage
    almacenarStorage();
}

const almacenarStorage = () =>{
    localStorage.setItem('carrito', JSON.stringify(cart))
}


// Clean HTML shopping cart
const limpiarCart = () =>{
    while(items.firstChild){
        items.removeChild(items.firstChild);
    }
}

// Delete an item of shopping cart
const deletedCart = (e) =>{
    e.preventDefault();

    if(e.target.classList.contains('btn-delete')){
        const productId = e.target.getAttribute('data-id')
        
        cart = Object.values(cart).filter(item => item.id !== productId);
        console.log(cart)
        
        paintShoppingCart();
    }
    e.stopPropagation();
    
}

// Create object to filter products

const searchData = {
    cor: '',
    tamanho: '',
    preco: ''
}

function filterProduct(){
    const result = data.filter(filtrarColor).filter(searchSizes).filter(searchPrice);
    paintCards(result);
}

function filtrarColor(data){
    const {cor} = searchData;
    if(cor){
        return data.color === cor;
    }
    return data;
}

const searchSizes = (data) => {
    const {tamanho} = searchData;
    if(tamanho){
        return data.size === tamanho.toLowerCase();
    }
    return data;
}

const searchPrice = (data) =>{
    const {preco} = searchData;
    if(preco){
        const valor = preco;
            if(valor > 0 && valor <= 50){
            return data.price > 0 && data.price <= 50;
            }else 
            if(valor > 50 && valor <= 150){
                return data.price > 50 && data.price <= 150;
            }else if(valor > 150 && valor <= 300){
                return data.price > 150 && data.price <= 300;
            }else if(valor > 300 && valor <= 500){
                return data.price > 300 && data.price <= 500;
            }else if(valor > 0 ){
                return data;
            }
    }else
        return data;
}

function cleanHTML(){
    while(cards.firstChild){
        cards.removeChild(cards.firstChild)
    }
}


