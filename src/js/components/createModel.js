import { modifyPoint } from "../libs/modifyPoint";
import { moreButton } from "./moreButton";
import { activeCardForBuy } from "./activeCardForBuy";

export class CreateModal {
    elementArea = $(".elements");
    arrayElement = [];

    constructor(reqResult){
        this.reqResult = reqResult;
    }

    addClass(idT) {
        if(idT + 1 >= 7 ){
            return "card-none";
        } else {
            return "";
        }
    }

    render() {
        const arrResult = this.reqResult;

        for (let i = 0; i < arrResult.length; i++) {
            let elementProduct = `
            <li class="element-product ${ this.addClass(i) }">
                <div class="image-product">
                    <img src="${arrResult[i].image}" alt="Image Product - ${arrResult[i].name}">
                </div>
                <div class="description-product">
                    <h1 class="name-product">${arrResult[i].name}</h1>
                    <strong class="value-product">R$ ${modifyPoint(arrResult[i].price)}</strong>
                    <span class="value-split">até ${arrResult[i].parcelamento[0]}x de R$ ${modifyPoint(arrResult[i].parcelamento[1])}</span>
                </div>
                <button data-value="${arrResult[i].id}" class="buy-button-product">comprar</button>
            </li>
            `;
    
            this.arrayElement.push(elementProduct);
        }

        this.arrayElement.forEach(element=>{
            $(this.elementArea).append(document.createRange().createContextualFragment(element));
        });

        moreButton();
        activeCardForBuy();
    }
}