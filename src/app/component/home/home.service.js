import APP from '../../../environment.js';

export class HomeService {

    constructor() {

    }

    async getProdutos(page, page_size, filtros, order) {
        const req = await fetch(APP.data + 'produtos.json');
        let resp = await req.json();

        if (filtros) {
            resp = this.filter(resp, filtros);
        }

        if (order) {
            resp = this.order(resp, order);
        }

        return this.paginate(resp, page, page_size);
    }

    async getCores() {
        const req = await fetch(APP.data + 'cores.json');
        return await req.json();
    }

    async getTamanhos() {
        const req = await fetch(APP.data + 'tamanhos.json');
        return await req.json();
    }

    async getProdutoById(id) {
        const req = await fetch(APP.data + 'produtos.json');
        let resp = await req.json();
        return resp.find(x => x.id == id);
    }

    // ----- helper -----
    filter(array, filtros) {
        let resp = array;
        if (filtros.cor && filtros.cor.length > 0) {
            resp = resp.filter(x => x.cores.find(c => filtros.cor.indexOf(c.id) != -1) != undefined);
        }
        if (filtros.tamanho && filtros.tamanho.length > 0) {
            resp = resp.filter(x => x.tamanhos.find(t => filtros.tamanho.indexOf(t.id) != -1) != undefined);
        }

        if (filtros.preco && filtros.preco.length > 0) {
            const min = filtros.preco[0];
            const max = filtros.preco[1];
            resp = resp.filter(x => x.preco >= min && x.preco <= max);
        }
        return resp;
    }

    paginate(array, page, page_size) {
        return array.slice((page - 1) * page_size, page * page_size);
    }

    order(array, order) {
        const compareNumber = (a, b, key) => { return a[key] - b[key]; }

        let resp = array;
        if (order) {
            const type = order.split('-')[0];
            switch (type) {
                case 'recente':
                    resp = resp.sort((a, b) => compareNumber(a, b, 'id'));
                    break;
                case 'preco':
                    resp = resp.sort((a, b) => compareNumber(a, b, 'preco'));
                    break;
            }
        }
        return order.includes('-desc') ? resp.reverse() : resp;
    }

}