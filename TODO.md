### JSON
- [ ] Lembrar de tirar os produtos adicionais

### HTML
- [ ] add Ver todas as cores
- [ ] label check boxes relacionar aos check boxes


### CSS
- [ ] Select ordenar customizar
- [ ] Colocar Fonts
- [ ] Responsividade
- [ ] Carregar mais transition
- [ ] Diminuir botões comprar
- [ ] Imagem hover zoom *Segundo plano*
- [ ] Checkbox customizar
- [ ] Transition: produtos
- [ ] Transition: aba filtros
- [ ] Transition: aba ordenar
- [ ] Transition: categorias filtros

### JS
- [X] Funcionalidade: Filtrar produtos por cor
- [X] Funcionalidade: Filtrar produtos por tamanho
- [X] Funcionalidade: Filtrar produtos por preço
- [X] Integrar os filtros
- [X] Funcionalidade: Adicionar produto ao carrinho.
- [ ] minicart *Segundo plano*
- [ ] Funcionalidade: Ordenar *Segundo plano*
- [X] Funcionalidade: Carregar mais produtos.
- [ ] Responsividade
- [ ] Opacidade botão carregar mais
- [ ] Alterar o parametro de carregar mais para 2 por carregamento
- [ ] Tratar espaço em branco do filtro


## Rascunho

for (let i = 0; i < tamanhosSelecionados.length; i++) {
                for (let j = 0; j < this.#listaProdutos.length; j++) {
                    for (let k = 0; k < this.#listaProdutos[j].tamanhos.length; k++) {
                        if (tamanhosSelecionados[i] == this.#listaProdutos[j].tamanhos[k]) {
                            if (listaAuxiliar.indexOf(this.#listaProdutos[j]) == -1 && listaDeElem.indexOf(this.#listaProdutos[j]) == -1) {
                                listaAuxiliar.push(this.#listaProdutos[j]);
                                break;
                            }
                        } 
                    }
                }
            }