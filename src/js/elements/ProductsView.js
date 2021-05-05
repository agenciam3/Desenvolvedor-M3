import Generic from '../core/Generic.js';

function createItemCard(id = '', image = '', name = '', price = 0, division_price = 0){
    return `<div class=\"showcase-item"">
                <img src="${image}">
                <label>${name}</label>
                <label>R$ ${price.toFixed(2)}</label>
                <label>até 3x de ${division_price.toFixed(2)}</label>
                <button class="buy-black" data-product="${id}>Comprar</button>
            </div>`;
}

export default function ProductsView() {
    return {
        create: (div_id = '', data = [], callback) => {
            let container = Generic().exists_id_on_document(div_id);
            if(container){
                container.innerHTML = '';
                for(let i = 0; i < data.length; i++){
                    container.innerHTML += createItemCard(data[i].id, data[i].image, data[i].name, data[i].price, data[i].division_price);
                }
            }
        }
    }
}


// allElements[i].addEventListener("click", function() {
//     click(allElements[i], allElements, true, callback)
// });