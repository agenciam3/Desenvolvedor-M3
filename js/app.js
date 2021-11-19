// Variables
const cards = document.querySelector('#cards');
const items = document.querySelector('#items');
const emptyCart = document.querySelector('.btn__empty');
const templateCard = document.querySelector('#template__card').content;
const templateItems= document.querySelector('#template-items').content;
const fragment = document.createDocumentFragment();
const car = document.querySelector('#car');
let cart = {};

// EventListener
document.addEventListener('DOMContentLoaded', () => {
    obtenerProductos();
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



// Funciones
const obtenerProductos = async() =>{
    try {
        const res = await fetch('datos.json');
        const dates = await res.json();
        paintCards(dates)
    } catch (error) {
        console.log(error)
    }
}

const paintCards = dates =>{
    dates.forEach(products => {

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

const addProductsCar = e =>{
    e.preventDefault();
    const classBtn = e.target.classList.contains('card__button');
    if(classBtn){
        const productSelected = e.target.parentElement.parentElement;
        readDatesProduct(productSelected);
    }
    e.stopPropagation();
}

const readDatesProduct = product =>{
    // creo un objeto con la informacion del producto
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
}

const limpiarCart = () =>{
    while(items.firstChild){
        items.removeChild(items.firstChild);
    }
}

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

