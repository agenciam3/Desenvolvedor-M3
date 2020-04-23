import { FooterView } from "./footer.view.js";

export class FooterComponent {
    selector = 'footer-component';
    template_url = 'component/footer/footer.component.html';
    style_url = 'component/footer/footer.component.css';

    constructor() {
        this.view = new FooterView();
    }

    async Init() {
        await this.view.render(this.selector, this.template_url, this.style_url);
    }

}