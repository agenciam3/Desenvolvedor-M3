export class HomeView {

    constructor() {
        this.loadFiltroParcela();
    }

    loadProdutos(produtos = [], hasMore) {
        const target = document.getElementById('produtos');
        for (const p of produtos) {
            target.appendChild(this.generateProdutoElement(p));
        }

        const carregarMais = document.getElementById('btnCarregarMais');
        if (!hasMore)
            carregarMais.classList.add('hidden');
        else
            carregarMais.classList.remove('hidden');
    }


    loadFiltroCores(cores) {
        const target = document.getElementById('filtro-cores');
        const max_itens = 5;
        for (var i = 0; i < cores.length; i++) {
            const c = cores[i];

            const input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            input.setAttribute('id', `clr-${c.id}`)
            input.setAttribute('name', `clr-${c.id}`)
            input.setAttribute('value', c.id);

            const label = document.createElement('label');
            label.setAttribute('for', `clr-${c.id}`);
            label.innerText = c.descricao;

            const br = document.createElement('br');
            if(i+1 > max_itens){
                input.classList.add('hidden');
                label.classList.add('hidden');
                br.classList.add('hidden');
            }

            target.appendChild(input);
            target.appendChild(label);
            target.appendChild(br);
        }
    }

    loadFiltroTamanhos(tamanhos) {
        const target = document.getElementById('filtro-tamanhos');
        target.innerHTML = '';

        for (const t of tamanhos) {
            const div = document.createElement('div');
            div.innerText = t.descricao;
            div.value = t.id;

            div.addEventListener('click', ev => {
                if (div.classList.contains('selected')) {
                    div.classList.remove('selected');
                }
                else {
                    div.classList.add('selected');
                }
            })

            target.appendChild(div);
        }
    }

    loadFiltroParcela() {
        const target = document.getElementById('filtro-precos');
        target.innerHTML = `
            <input type="checkbox" id="pr-1" value="0-50">
            <label for="pr-1">de R$0 até R$50</label><br>
            <input type="checkbox" id="pr-2" value="51-150">
            <label for="pr-2">de R$51 até R$150</label><br>
            <input type="checkbox" id="pr-3" value="151-300">
            <label for="pr-3">de R$151 até R$300</label><br>
            <input type="checkbox" id="pr-4" value="301-500">
            <label for="pr-4">de R$301 até R$500</label><br>
            <input type="checkbox" id="pr-5" value="501-9999999">
            <label for="pr-5">a partir de R$501</label><br>
        `;
        const elements = document.querySelectorAll('#filtro-precos input');
        for (const item of elements) {
            item.addEventListener('click', (ev) => {
                const desired_check = ev.target.checked;
                elements.forEach(x => x.checked = false);//desmarca todos
                ev.target.checked = desired_check;
            });
        }
    }

    getFiltrosCor() {
        var elememts = document.querySelectorAll('#filtro-cores input');
        const filtros = [];
        for (const el of elememts) {
            if (el.checked) {
                filtros.push(Number(el.value));
            }
        }
        return filtros;
    }


    getFiltrosTamanho() {
        var elememts = document.querySelectorAll('#filtro-tamanhos div');
        const filtros = [];
        for (const el of elememts) {
            if (el.classList.contains('selected')) {
                filtros.push(Number(el.value));
            }
        }
        return filtros;
    }

    getFiltrosPreco() {
        var elememts = document.querySelectorAll('#filtro-precos input');
        let resp = null;
        for (const el of elememts) {
            if (el.checked) {
                resp = el.value.split('-').map(Number);
            }
        }
        return resp;
    }

    getOrder() {
        return document.getElementById('order').selectedOptions[0].value;
    }

    cleanProdutos() {
        document.getElementById('produtos').innerHTML = '';
    }

    generateProdutoElement(produto) {
        const p = `
            <div class="item" id="item-${produto.id}">
                <img src="${produto.foto}">
                <div class="descricao">
                    <div>${produto.descricao}</div>
                    <div class="preco">R$${produto.preco.toFixed(2).replace('.', ',')}</div>
                    <div>até ${produto.parcelas.slice(-1)[0].qtd}x de R$${produto.parcelas.slice(-1)[0].val.toFixed(2).replace('.', ',')}</div>
                </div>
                <div class="item-footer"><span>comprar</span></div>
            </div>
        `;
        return document.createRange().createContextualFragment(p);
    }

    mostrarTodasCores(){
        const elements = document.querySelector('#filtro-cores').children;
        for (const el of elements) {
            el.classList.remove('hidden')
        }
        document.getElementById('mostrar-cores').classList.add('hidden');
    }
    // ----- EVENTS -----

    onSelectedFilterCor(cb) {
        const elements = document.querySelectorAll('#filtro-cores input');
        for (const item of elements) {
            item.addEventListener('click', cb);
        }
    }

    onSelectedFilterTamanho(cb) {
        const elements = document.querySelectorAll('#filtro-tamanhos div');
        for (const item of elements) {
            item.addEventListener('click', cb);
        }
    }

    onSelectedFilterPreco(cb) {
        const elements = document.querySelectorAll('#filtro-precos input');
        for (const item of elements) {
            item.addEventListener('click', cb);
        }
    }

    onOrderChanged(cb) {
        const element = document.getElementById('order');
        element.onchange = cb;
    }

    onLoadMore(cb) {
        const element = document.getElementById('btnCarregarMais');
        element.addEventListener('click', cb);
    }

    onComprarClick(cb) {
        const elements = document.querySelectorAll('#produtos .item-footer');
        for (const item of elements) {
            item.addEventListener('click', ev => {
                const id = item.parentElement.id.split('-')[1];
                cb(id);
            });
        }
    }

    onMostrarTodasCores(cb){
        document.getElementById('mostrar-cores').addEventListener('click', cb);
    }

    onCarrinhoClick(cb){
        document.getElementById().addEventListener('click', cb);
    }
}