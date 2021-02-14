class Produto{

  id = 0;
  nome = '';
  tamanho = '';
  cor = '';
  preco = 0.00;
  parcelas = 0;
  imagem = '';
  uploadAt = null;

  constructor(id, nome, cor, tamanho, preco, parcelas, imagem, uploadAt){
    this.id = id;
    this.nome = nome;
    this.cor = cor;
    this.tamanho = tamanho;
    this.preco = preco;
    this.parcelas = parcelas;
    this.imagem = imagem;
    this.uploadAt = uploadAt;
  }

  toStringPreco(){
    return `R$ ${this.preco.toFixed(2).replace('.', ',')}`
  }

  toStringParcelas(){
    if (this.parcelas <= 0) {
      return 'Á vista!'
    }
    else{
      return `Até ${this.parcelas}x de R$${(this.preco / this.parcelas).toFixed(2).replace('.', ',')}`
    }
  }
};

class Carrinho{

  listaProdutos = [];
  total = 0;

  constructor(listaProdutos){
    this.listaProdutos = listaProdutos;
  }

  add(produto){
    this.listaProdutos.push(produto);
  }

  remove(produto){
    this.listaProdutos = this.listaProdutos.filter(item => item != produto);
  }

  calculaTotal(){
    let precos = this.listaProdutos.map(p => p.preco);
    this.total = precos.reduce((a, b) => a + b, 0);
    return this.total;
  }

  toStringTotal(){

    return `R$ ${this.total.toFixed(2).replace('.', ',')}`
  }
};

window.app.paginaProdutos.model = {
  Produto,
  Carrinho
};