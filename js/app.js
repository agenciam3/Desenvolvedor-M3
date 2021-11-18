const items = document.querySelector('#items');
const templateCard = document.querySelector('#template__card').content;
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
    obtenerProductos();
});

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

        console.log(products)
        const {id, image, description, product, price} = products;

        const clone = templateCard.cloneNode(true);
        clone.querySelector('.card__image').setAttribute('src', image);
        clone.querySelector('#description').textContent = description;
        clone.querySelector('.card__title').textContent = product;
        clone.querySelector('h3').textContent = `R$ ${price}`;
        fragment.appendChild(clone);
    });
    items.appendChild(fragment)
}