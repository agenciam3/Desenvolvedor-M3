import { HeaderView } from "./header.view.js"
import { CartService } from "../../shared/services/cart.service.js";

export class HeaderComponent {
    selector = 'header-component';
    template_url = 'component/header/header.component.html';
    style_url = 'component/header/header.component.css';

    constructor() {
        this.view = new HeaderView();
        this.carrinhoService = CartService.getInstance();
    }

    async Init() {
        await this.view.render(this.selector, this.template_url, this.style_url);
        this.view.atualizarCarrinho(await this.carrinhoService.getItens());
        this.carrinhoService.on('changed', this.updateCarrinho);
        this.view.onCarrinhoClick(this.limparCarrinho);
    }

    ///----- EVENTS -----
    updateCarrinho = (itens) => {
        this.view.atualizarCarrinho(itens);
    }

    limparCarrinho = (ev) => {
        this.carrinhoService.clean();
    }
}
