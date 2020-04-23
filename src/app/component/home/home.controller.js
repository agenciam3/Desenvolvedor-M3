export class HomeController {
    filtros = {};
    orderBy = '';
    page = 1;
    page_size = 6;
    page_end = false;

    /**
     * @param {import('./home.view').HomeView} homeView 
     * @param {import('./home.service').homeService} homeService 
     * @param {import('../../shared/services/cart.service').CartService} carrinhoService
     */
    constructor(homeView, homeService, carrinhoService) {
        this.view = homeView;
        this.service = homeService;
        this.carrinhoService = carrinhoService;
    }

    async Init() {
        this.loadProdutos();
        this.view.loadFiltroCores(await this.service.getCores());
        this.view.loadFiltroTamanhos(await this.service.getTamanhos());
        this.view.initDropdown();

        this.view.onSelectedFilterCor(this.filterCor);
        this.view.onSelectedFilterTamanho(this.filterTamanho);
        this.view.onSelectedFilterPreco(this.filterPreco);
        this.view.onOrderChanged(this.orderItens);
        this.view.onLoadMore(this.carregarMais);
        this.view.onMostrarTodasCores(this.mostrarCores);

        this.view.onDropdownFiltrarClick(this.showDropdownFiltrar);
        this.view.onDropdownOrdenarClick(this.showDropdownOrdenar);
        this.view.onDropdownLimparClick(this.dropdownFiltroLimpar);
        this.view.onDropdownAplicarClick(this.dropdownFiltroAplicar);
        this.view.onDropDownOrderClick(this.dropdownOrdenar);
    }

    async loadProdutos() {
        if (this.page_end) { return; }
        const data = await this.service.getProdutos(this.page, this.page_size, this.filtros, this.orderBy);
        this.page_end = data.length < this.page_size;
        this.view.loadProdutos(data, !this.page_end);
        this.view.onComprarClick(this.adicionarAoCarrinho);
    }

    resetProduto() {
        this.view.cleanProdutos();
        this.page = 1;
        this.page_end = false;
    }

    //----- EVENTS -----
    filterCor = async (ev) => {
        this.filtros['cor'] = this.view.getFiltrosCor();
        this.resetProduto();
        this.loadProdutos();
    }

    filterTamanho = async (ev) => {
        this.filtros['tamanho'] = this.view.getFiltrosTamanho();
        this.resetProduto();
        this.loadProdutos();
    }

    filterPreco = async (ev) => {
        this.filtros['preco'] = this.view.getFiltrosPreco();
        this.resetProduto();
        this.loadProdutos();
    }

    orderItens = async (ev) => {
        this.orderBy = this.view.getOrder();
        this.resetProduto();
        this.loadProdutos();
    }

    carregarMais = async (ev) => {
        this.page++;
        this.loadProdutos();
    }

    adicionarAoCarrinho = async (id) => {
        const item = await this.service.getProdutoById(id);
        this.carrinhoService.addItem(item);
    }

    mostrarCores = (ev) => {
        this.view.mostrarTodasCores();
    }

    showDropdownFiltrar = (ev) => {
        this.view.hideDropdownOrdenar();
        this.view.toggleDropdownFiltrar();
    }

    showDropdownOrdenar = (ev) => {
        this.view.hideDropdownFiltrar();
        this.view.toggleDropdownOrdenar();
    }

    dropdownFiltroLimpar = (ev) => {
        this.view.limparFiltrosDropDown();
    }

    dropdownFiltroAplicar = (ev) => {
        this.filtros['cor'] = this.view.getFiltrosCor(true);
        this.filtros['tamanho'] = this.view.getFiltrosTamanho(true);
        this.filtros['preco'] = this.view.getFiltrosPreco(true);
        this.view.hideDropdownAll();
        this.resetProduto();
        this.loadProdutos();
    }

    dropdownOrdenar = (ev) => {
        this.orderBy = this.view.getOrder(true);
        this.resetProduto();
        this.loadProdutos();
    }

}