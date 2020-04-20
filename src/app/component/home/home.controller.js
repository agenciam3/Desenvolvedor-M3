export class HomeController {
    filtros = {};
    page = 1;
    page_size = 2;
    end = false;

    orderBy = '';

    constructor(homeView, homeService) {
        this.view = homeView;
        this.service = homeService;
    }

    async Init() {
        this.loadProdutos();
        this.view.loadFiltroCores(await this.service.getCores());
        this.view.loadFiltroTamanhos(await this.service.getTamanhos());

        this.view.onSelectedFilterCor(this.filterCor);
        this.view.onSelectedFilterTamanho(this.filterTamanho);
        this.view.onSelectedFilterPreco(this.filterPreco);
        this.view.onOrderChanged(this.orderItens);
        this.view.onLoadMore(this.carregarMais);
    }

    async loadProdutos() {
        const data = await this.service.getProdutos(this.page, this.page_size, this.filtros, this.orderBy);
        this.end = data.length < this.page_size;
        console.log(this.end);
        this.view.loadProdutos(data, !this.end);
    }

    //----- EVENTS -----
    filterCor = async (ev) => {
        this.filtros['cor'] = this.view.getFiltrosCor();
        this.loadProdutos();
    }

    filterTamanho = async (ev) => {
        this.filtros['tamanho'] = this.view.getFiltrosTamanho();
        this.loadProdutos();
    }

    filterPreco = async (ev) => {
        this.filtros['preco'] = this.view.getFiltrosPreco();
        this.loadProdutos();
    }

    orderItens = async (ev) => {
        this.orderBy = this.view.getOrder();
        console.log(this.orderBy);
        this.loadProdutos();
    }

    carregarMais = async(ev) => {
        this.page++;
        this.loadProdutos();
    }

}