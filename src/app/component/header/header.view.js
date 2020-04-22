import { ViewBase } from "../../shared/helper/view-base.js";

export class HeaderView extends ViewBase {

    constructor() {
        super();
    }

    atualizarCarrinho(itens) {
        const element = document.getElementById('cart').childNodes[1];
        let qtd = '-';
        if (itens && itens.length > 0) {
            qtd = itens.length < 10 ? itens.length.toString() : '9+';
        }
        element.setAttribute('data-count', qtd);
    }

    onCarrinhoClick(cb){
        document.getElementById('cart').addEventListener('click', cb);
    }

}