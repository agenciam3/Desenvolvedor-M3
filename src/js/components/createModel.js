import { moreButton } from "./moreButton";
import { activeCardForBuy } from "./activeCardForBuy";
import { elementCreate } from "../libs/elementCreate";
import { saveProductsList } from "../libs/productsList";

export class CreateModal {
    elementArea = $(".elements");

    constructor(reqResult){
        this.reqResult = reqResult;
    }

    render() {
        let arrayElement;
        const arrResult = this.reqResult;

        arrayElement = elementCreate(arrResult);

        arrayElement.forEach(element=>{
            $(this.elementArea).append(document.createRange().createContextualFragment(element));
        });

        saveProductsList(arrResult);

        moreButton();
        activeCardForBuy();
    }
}