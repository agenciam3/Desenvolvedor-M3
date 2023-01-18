import { addClass } from "./filterSearch";
import { modifyPoint } from "./modifyPoint";

export function elementCreate(arrFiltedProducts){
    const arrayElement = [];

    for (let i = 0; i < arrFiltedProducts.length; i++) {
        let elementProduct = `
            <li class="element-product ${addClass(i)}">
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