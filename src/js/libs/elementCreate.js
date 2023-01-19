import { addClass } from "./filterSearch";
import { modifyPoint } from "./modifyPoint";

function sizeProduct(arr){
    let stringValue = "";

    for(let i = 0; i < arr.length; i++){
        (i) === arr.length -1 ? stringValue+=`${arr[i]}` : stringValue+=`${arr[i]}-`;
    }

    return stringValue;
}

export function elementCreate(arrFiltedProducts){
    const arrayElement = [];

    for (let i = 0; i < arrFiltedProducts.length; i++) {
        let elementProduct = `
            <li 
                class="element-product ${addClass(i)}"
                data-size="${sizeProduct(arrFiltedProducts[i].size)}"
                data-price="${arrFiltedProducts[i].price}"
                data-color="${arrFiltedProducts[i].color}"
                data-date="${arrFiltedProducts[i].date}"
            >
                <div class="image-product">
                    <img src="${arrFiltedProducts[i].image}" alt="Image Product - ${arrFiltedProducts[i].name}">
                </div>
                <div class="description-product">
                    <h1 class="name-product">${arrFiltedProducts[i].name}</h1>
                    <strong class="value-product">R$ ${modifyPoint(arrFiltedProducts[i].price)}</strong>
                    <span class="value-split">até ${arrFiltedProducts[i].parcelamento[0]}x de R$ ${modifyPoint(arrFiltedProducts[i].parcelamento[1])}</span>
                </div>
                <button data-value="${arrFiltedProducts[i].id}" class="buy-button-product">comprar</button>
            </li>
        `;

        arrayElement.push(elementProduct);
    }

    return arrayElement;
}