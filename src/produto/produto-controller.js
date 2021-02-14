class Controller{

  templateHTML = null;
  produtosHTML = null;

  filtrosHTML = null;
  ordensHTML = null;
  carrinhoHTML = null;

  coresHTML = null;
  tamanhosHTML = null;
  precosHTML = null;

  mobile = false;

  //Dados e formulários

  listagemRenderizados = [];
  listagemProjetados = [];

  dadosFiltroCores = [];
  dadosFiltroTamanhos = [];
  dadosFiltroPrecos = [];

  comFiltro = false;

  constructor(){

    if (window.screen.width > 360) {
      //desktop
      this.templateHTML = document.querySelectorAll('.desktop')[0];
      document.querySelectorAll('.mobile')[0].remove();
      this.mobile = false;
      
      //document.querySelectorAll('body')[0].setAttribute('style', 'overflow-x: hidden');
      
      this.produtosHTML = document.getElementsByClassName('produtos-desktop')[0];
    }
    else {
      //mobile
      this.templateHTML = document.querySelectorAll('.mobile')[0];
      document.querySelectorAll('.desktop')[0].remove();
      this.mobile = true;
    
      this.produtosHTML = document.getElementsByClassName('produtos-mobile')[0];
    }

    this.filtrosHTML = this.templateHTML.getElementsByClassName('filtros')[0];
    this.ordensHTML = this.templateHTML.getElementsByClassName('ordens')[0];
    this.carrinhoHTML = this.templateHTML.getElementsByClassName('carrinho')[0];

    this.coresHTML = this.templateHTML.querySelectorAll('.aside-cores .dropdown')[0];
    this.tamanhosHTML = this.templateHTML.querySelectorAll('.aside-tamanhos .dropdown')[0];
    this.precosHTML = this.templateHTML.querySelectorAll('.aside-precos .dropdown')[0];

    this.produtosHTML.innerHTML = '';

    let carrinho = window.app.paginaProdutos.service.carregarCarrinho();
    this.projetarProdutosNoCarrinho(carrinho, true);
    this.projetarQuantCarrinho(carrinho.length);
    this._atualizarTotalCarrinho();
  }

  //Acesso aos servicos

  _carregarProdutos() {
  
    let produtos = window.app.paginaProdutos.service.carregarProdutos();
    this.listagemRenderizados = produtos;
  
    this.projetarProdutos(produtos, true);
  }
  
  _carregarMais() {
  
    if (this.comFiltro) window.app.paginaProdutos.controller.limparFiltros();
  
    let produtos = window.app.paginaProdutos.service.carregarMais(this.listagemRenderizados.length);
    this.listagemRenderizados = this.listagemRenderizados.concat(produtos);
  
    this.projetarProdutos(this.listagemRenderizados, true);
  }
  
  _aplicarFiltros() {//Com base nos dados RENDERIZADOS / CARREGADOS

    let produtos = window.app.paginaProdutos.service.aplicarFiltros(this.listagemRenderizados, this.dadosFiltroCores, this.dadosFiltroTamanhos, this.dadosFiltroPrecos);
  
    this.projetarProdutos(produtos, true);
    if (this.mobile) this.fecharFiltros();
  }
  
  _aplicarOrdens(ordem) {
  
    let listagem = [];
  
    if (this.comFiltro) {//Com base nos dados PROJETADOS / VISÍVEIS
      listagem = this.listagemProjetados;
    }
    else {//Com base nos dados RENDERIZADOS / CARREGADOS
      listagem = this.listagemRenderizados;
    }
  
    let produtos = window.app.paginaProdutos.service.aplicarOrdens(listagem, parseInt(ordem));
  
    this.projetarProdutos(produtos, true);
    if (this.mobile) this.fecharOrdens();
  }

  _adicionarAoCarrinho(id) {
    let produto = this.listagemRenderizados.find(produto => produto.id == id);
    let itensCarrinho = window.app.paginaProdutos.service.adicionarAoCarrinho(produto);
    this.projetarProdutosNoCarrinho(itensCarrinho, true);
    this.projetarQuantCarrinho(itensCarrinho.length);
  }
  
  _removerDoCarrinho(id) {
    let itensCarrinho = window.app.paginaProdutos.service.removerDoCarrinho(id);
    this.projetarProdutosNoCarrinho(itensCarrinho, true);
    this.projetarQuantCarrinho(itensCarrinho.length);
  }

  _comprar(id) {
    this._adicionarAoCarrinho(id);
    this.abrirCarrinho();
  }

  _atualizarTotalCarrinho() {
    let totalHTML = this.carrinhoHTML.querySelectorAll('.soma')[0];
    let total = window.app.paginaProdutos.service.totalCarrinho();

    totalHTML.textContent = total;
  }

  //Interação com o HTML

  projetarProdutos(produtos, limpar) {
    this.responsiveFooter();
  
    if (limpar) this.produtosHTML.innerHTML = '';
  
    produtos.forEach(p => {
      this.produtosHTML.innerHTML += `
      <div class="card-produto">
        <div class="card-img">
          <img src="./layout/imagens/${p.imagem}">
        </div>
        <div class="card-body">
          <h2 class="nome">${p.nome}</h2>
          <span class="preco">${p.toStringPreco()}</span>
          <span class="parcelas">${p.toStringParcelas()}</span>
        </div>
        <button class="b-secundario" onclick="window.app.paginaProdutos.controller._comprar(${p.id})">COMPRAR</button>
      </div>`;
    });

    this.listagemProjetados = produtos;
  }

  projetarProdutosNoCarrinho(produtos, limpar) {

    this._atualizarTotalCarrinho();

    let carrinho;
    if (this.mobile) carrinho = this.carrinhoHTML.querySelectorAll('.aside-body')[0];
    else carrinho = this.carrinhoHTML.querySelectorAll('.modal-body')[0];

    if (limpar) carrinho.innerHTML = '';

    produtos.forEach(p => {
      carrinho.innerHTML += `
      <div class="item-carrinho-produto">
        <img src="./layout/imagens/${p.imagem}" width="50">
        <div class="rowTop">
          <b class="nome">${p.nome}</b>
          <i class="fas fa-trash" onclick="window.app.paginaProdutos.controller._removerDoCarrinho(${p.id})"></i>
        </div>
        <div class="rowBottom">
          <b>${p.toStringPreco()}</b><br>
          <span>${p.toStringParcelas()}</span>
        </div>
      </div>`;
    });
  }

  projetarQuantCarrinho(quantidade){
    let shopping = document.querySelectorAll('header .shopping .fa-circle small')[0];
    shopping.textContent = quantidade+'';
  }

  abrirFiltros() {
    this.filtrosHTML.setAttribute('style', 'left: 0px;');
    setTimeout(() => {
      this.produtosHTML.setAttribute('style', 'display: none');
    }, 500);
  }
  
  fecharFiltros() {
    this.produtosHTML.removeAttribute('style');
    this.filtrosHTML.setAttribute('style', 'left: -390px;');
  }
  
  abrirOrdens() {
    this.ordensHTML.setAttribute('style', 'left: 0px;');
    setTimeout(() => {
      this.produtosHTML.setAttribute('style', 'display: none');
    }, 500);
  }
  
  fecharOrdens() {
    this.produtosHTML.removeAttribute('style');
    this.ordensHTML.setAttribute('style', 'left: -390px;');
  }

  abrirCarrinho() {
    if (this.mobile) {
      this.carrinhoHTML.setAttribute('style', 'left: 0px;');
      setTimeout(() => {
        this.produtosHTML.setAttribute('style', 'display: none');
      }, 500);
    }
    else{
      this.carrinhoHTML.setAttribute('style', 'top: 80px;');
    }
  }
  
  fecharCarrinho() {
    if (this.mobile) {
      this.produtosHTML.removeAttribute('style');
      this.carrinhoHTML.setAttribute('style', 'left: -390px;');
    }
    else{
      this.carrinhoHTML.removeAttribute('style');
    }
  }
  
  abrirCores() {
    this.coresHTML.removeAttribute('hidden');
    document.querySelectorAll('.aside-cores .fa-minus')[0].removeAttribute('style');
    document.querySelectorAll('.aside-cores .fa-plus')[0].setAttribute('style', 'display: none;');
  }
  
  fecharCores() {
    this.coresHTML.setAttribute('hidden', '');
    document.querySelectorAll('.aside-cores .fa-minus')[0].setAttribute('style', 'display: none;');
    document.querySelectorAll('.aside-cores .fa-plus')[0].removeAttribute('style');
  }
  
  abrirTamanhos() {
    this.tamanhosHTML.removeAttribute('hidden');
    document.querySelectorAll('.aside-tamanhos .fa-minus')[0].removeAttribute('style');
    document.querySelectorAll('.aside-tamanhos .fa-plus')[0].setAttribute('style', 'display: none;');
  }
  
  fecharTamanhos() {
    this.tamanhosHTML.setAttribute('hidden', '');
    document.querySelectorAll('.aside-tamanhos .fa-minus')[0].setAttribute('style', 'display: none;');
    document.querySelectorAll('.aside-tamanhos .fa-plus')[0].removeAttribute('style');
  }

  abrirPrecos() {
    this.precosHTML.removeAttribute('hidden');
    document.querySelectorAll('.aside-precos .fa-minus')[0].removeAttribute('style');
    document.querySelectorAll('.aside-precos .fa-plus')[0].setAttribute('style', 'display: none;');
  }
  
  fecharPrecos() {
    this.precosHTML.setAttribute('hidden', '');
    document.querySelectorAll('.aside-precos .fa-minus')[0].setAttribute('style', 'display: none;');
    document.querySelectorAll('.aside-precos .fa-plus')[0].removeAttribute('style');
  }
  
  checkButton(element) {
    if (element.getAttribute('checked') == null || element.getAttribute('checked') == '') {
      element.setAttribute('checked', 'true');
      element.className = 'b-checkbox-checked ipt';
    }
    else{
      element.removeAttribute('checked');
      element.className = 'b-checkbox ipt';
    }
  }
  
  checkText(element) {
    let opsOrdem = document.querySelectorAll('.ordens .aside-body')[0];
    opsOrdem.querySelectorAll('ul li p').forEach(item => {
      item.className = '';
    });
    element.className = 'p-ordem-checked';
  }
  
  filtragem() {
  
    this.dadosFiltroCores = [];
    let dadosFiltroCoresHTML = this.templateHTML.querySelectorAll('.f-cores .ipt');
    dadosFiltroCoresHTML.forEach((ipt) => {
      if (ipt.checked) this.dadosFiltroCores.push(ipt.nextElementSibling.textContent);
    });
  
    this.dadosFiltroTamanhos = [];
    let dadosFiltroTamanhosHTML = this.templateHTML.querySelectorAll('.f-tamanhos .ipt');
    dadosFiltroTamanhosHTML.forEach((ipt) => {
      if (ipt.attributes.checked) this.dadosFiltroTamanhos.push(ipt.innerHTML);
    });
  
    this.dadosFiltroPrecos = [];
    let dadosFiltroPrecosHTML = this.templateHTML.querySelectorAll('.f-precos .ipt');
    dadosFiltroPrecosHTML.forEach((ipt) => {
      if (ipt.checked) this.dadosFiltroPrecos.push(ipt.nextElementSibling.textContent);
    });
  
    if (this.dadosFiltroCores.length > 0 || this.dadosFiltroTamanhos.length > 0 || this.dadosFiltroPrecos.length > 0) {
      this.comFiltro = true;
    }
  }
  
  limparFiltros() {
    let dadosFiltroCoresHTML = this.templateHTML.querySelectorAll('.f-cores .ipt');
    let dadosFiltroTamanhosHTML = this.templateHTML.querySelectorAll('.f-tamanhos .ipt');
    let dadosFiltroPrecosHTML = this.templateHTML.querySelectorAll('.f-precos .ipt');
  
    dadosFiltroCoresHTML.forEach((item) => {
      item.checked = false;
    });
    dadosFiltroTamanhosHTML.forEach((item) => {
      item.removeAttribute('checked');
      item.className = 'b-checkbox ipt';
    });
    dadosFiltroPrecosHTML.forEach((item) => {
      item.checked = false;
    });
  
    this.comFiltro = false;
    this.filtragem();
    this._aplicarFiltros();
    this.fecharFiltros();
  }
  
  maisCores(element) {
    element.remove();
    let cores = this.templateHTML.querySelectorAll('.f-cores')[0];

    cores.innerHTML += `
    <li><label><input class="ipt" type="checkbox" onclick="window.app.paginaProdutos.controller.filtragem(), window.app.paginaProdutos.controller._aplicarFiltros()"><p>Verde</p></label></li>
    <li><label><input class="ipt" type="checkbox" onclick="window.app.paginaProdutos.controller.filtragem(), window.app.paginaProdutos.controller._aplicarFiltros()"><p>Vermelho</p></label></li>
    <li><label><input class="ipt" type="checkbox" onclick="window.app.paginaProdutos.controller.filtragem(), window.app.paginaProdutos.controller._aplicarFiltros()"><p>Preto</p></label></li>
    <li><label><input class="ipt" type="checkbox" onclick="window.app.paginaProdutos.controller.filtragem(), window.app.paginaProdutos.controller._aplicarFiltros()"><p>Rosa</p></label></li>
    <li><label><input class="ipt" type="checkbox" onclick="window.app.paginaProdutos.controller.filtragem(), window.app.paginaProdutos.controller._aplicarFiltros()"><p>Vinho</p></label></li>
    `;
  }
  
  //footer fix bottom
  responsiveFooter() {
    setTimeout(() => {
      let footer = document.querySelectorAll('footer')[0];
      let wrap = document.querySelectorAll('.wrap')[0];
      if (wrap.clientHeight < 300) footer.className = 'rsp';
      else footer.className = '';
    }, 50);
  }
};

window.app.paginaProdutos.controller = Controller;