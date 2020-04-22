import { EventEmitter } from "../helper/event-emitter.js";

export class CartService extends EventEmitter {
    static _instance = null;

    static getInstance() {
        if (!this._instance) {
            this._instance = new CartService();
        }
        return this._instance;
    }

    constructor() {
        super();
    }

    addItem(new_item) {
        let itens = this.getItens() || [];
        itens.push(new_item);
        localStorage.setItem('carrinho', JSON.stringify(itens));
        super.emit('changed', itens);
    }

    getItens() {
        return JSON.parse(localStorage.getItem('carrinho'));
    }

    clean(){
        localStorage.removeItem('carrinho', '');
        super.emit('changed', []);
    }
}