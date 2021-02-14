const produtosJSON = window.app.paginaProdutos.mock;
//const _Produto = window.app.paginaProdutos.model;

class Service{

  itensPorRenderizacao = 0;
  carrinho = [];

  constructor(itensPorRenderizacao){
    this.itensPorRenderizacao = itensPorRenderizacao;

    if (!window.sessionStorage.getItem('carrinho')) {
      window.sessionStorage.setItem('carrinho', JSON.stringify([]));
    }
  };

  carregarProdutos() {
  
    let produtos = [];
  
    JSON.parse(produtosJSON).forEach((p) => {
      if (produtos.length < this.itensPorRenderizacao) {
        produtos.push(new Produto(p.id, p.nome, p.cor, p.tamanho, p.preco, p.parcelas, p.imagem, new Date(p.uploadAt)));
      }
    });
  
    return produtos;
  }
  
  carregarMais(quantProdutos) {
  
    let produtosAux = JSON.parse(produtosJSON).slice(quantProdutos, quantProdutos + this.itensPorRenderizacao);
  
    let produtos = produtosAux.map((p) => {
      return new Produto(p.id, p.nome, p.cor, p.tamanho, p.preco, p.parcelas, p.imagem, new Date(p.uploadAt));
    });
  
    return produtos;
  }

  aplicarFiltros(listagemProdutos, dadosFiltroCores, dadosFiltroTamanhos, dadosFiltroPrecos) {

    if (dadosFiltroCores.length > 0) {
      listagemProdutos = listagemProdutos.filter((p) => {
        let x = 0;
        dadosFiltroCores.forEach((fc) => {
          if (p.cor == fc) x++;
        });
        if (x > 0) return true;
        else return false;
      });
    }

    if (dadosFiltroTamanhos.length > 0) {
      listagemProdutos = listagemProdutos.filter((p) => {
        let x = 0;
        dadosFiltroTamanhos.forEach((ft) => {
          if (p.tamanho == ft) x++;
        });
        if (x > 0) return true;
        else return false;
      });
    }

    if (dadosFiltroPrecos.length > 0) {
      listagemProdutos = listagemProdutos.filter((p) => {
        switch (dadosFiltroPrecos[0]) {
          case "de R$ 0 até R$ 50":
            if (p.preco < 51) return true;
            else return false;

          case "de R$ 51 até R$ 150":
            if (p.preco > 50 && p.preco < 151) return true;
            else return false;
    
          case "de R$ 151 até R$ 300":
            if (p.preco > 150 && p.preco < 301) return true;
            else return false;
    
          case "de R$ 301 até R$ 500":
            if (p.preco > 300 && p.preco < 501) return true;
            else return false;
    
          case "a partir de R$ 501":
            if (p.preco > 500) return true;
            else return false;
    
          default:
            return false;
        }
      });
    }
  
    return listagemProdutos;
  }
  
  aplicarOrdens(listagemProdutos, ordem) {
  
    switch (ordem) {
      case 0:
        this.quickSort(listagemProdutos, 0, listagemProdutos.length - 1, 'uploadAt', false);
        break;
      case 1:
        this.quickSort(listagemProdutos, 0, listagemProdutos.length - 1, 'preco', true);
        break;
      case 2:
        this.quickSort(listagemProdutos, 0, listagemProdutos.length - 1, 'preco', false);
        break;
      default:
        break;
    }
    return listagemProdutos;
  }

  carregarCarrinho() {

    let carrinhoStorage = JSON.parse(window.sessionStorage.getItem('carrinho'));
    this.carrinho = carrinhoStorage.map(i => new Produto(i.id, i.nome, i.cor, i.tamanho, i.preco, i.parcelas, i.imagem, i.uploadAt));
    return this.carrinho;
  }

  totalCarrinho() {

    let carrinho = new Carrinho(this.carrinho);
    carrinho.calculaTotal();
    return carrinho.toStringTotal();
  }

  adicionarAoCarrinho(produto) {

    let carrinhoStorage = new Carrinho(JSON.parse(window.sessionStorage.getItem('carrinho')));

    console.log(carrinhoStorage.listaProdutos);
    if (!carrinhoStorage.listaProdutos.find(item => item.id == produto.id)) {//não permite itens repetidos
      carrinhoStorage.add(produto);

      window.sessionStorage.setItem('carrinho', JSON.stringify(carrinhoStorage.listaProdutos));

      carrinhoStorage.listaProdutos = carrinhoStorage.listaProdutos.map(i => new Produto(i.id, i.nome, i.cor, i.tamanho, i.preco, i.parcelas, i.imagem, i.uploadAt));
      this.carrinho = carrinhoStorage.listaProdutos;
    }

    return this.carrinho;
  }

  removerDoCarrinho(id) {

    let carrinhoStorage = new Carrinho(JSON.parse(window.sessionStorage.getItem('carrinho')));

    let item = carrinhoStorage.listaProdutos.find(item => item.id == id);
    carrinhoStorage.remove(item);

    window.sessionStorage.setItem('carrinho', JSON.stringify(carrinhoStorage.listaProdutos));

    carrinhoStorage = carrinhoStorage.listaProdutos.map(i => new Produto(i.id, i.nome, i.cor, i.tamanho, i.preco, i.parcelas, i.imagem, i.uploadAt));
    this.carrinho = carrinhoStorage;

    return this.carrinho;
  }
  
  // ---------------- Ordenação ----------------
  
  quickSort(listagem, start, end, attComparacao, crescente) {
    if (start >= end) {
      return;
    }
  
    let index = this.particao(listagem, start, end, attComparacao, crescente);
  
    this.quickSort(listagem, start, index - 1, attComparacao, crescente);
    this.quickSort(listagem, index + 1, end, attComparacao, crescente);
  }
  
  particao(listagem, start, end, attComparacao, crescente){
    const pivo = listagem[end];
    let posicaoPivo = start;
    for (let i = start; i < end; i++) {
      if (crescente) {
        if (listagem[i][attComparacao] < pivo[attComparacao]) {
          [listagem[i], listagem[posicaoPivo]] = [listagem[posicaoPivo], listagem[i]];
          posicaoPivo++;
        }
      }
      else{
        if (listagem[i][attComparacao] > pivo[attComparacao]) {
          [listagem[i], listagem[posicaoPivo]] = [listagem[posicaoPivo], listagem[i]];
          posicaoPivo++;
        }
      }
    }
  
    [listagem[posicaoPivo], listagem[end]] = [listagem[end], listagem[posicaoPivo]]
    return posicaoPivo;
  }

};

window.app.paginaProdutos.service = Service;