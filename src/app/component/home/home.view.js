export class HomeView {

    constructor() {
        this.loadFiltroPreco();
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
        const targetMobile = document.getElementById('filtro-cores-mobile');

        this.generateFiltroCores(cores, target, false);
        this.generateFiltroCores(cores, targetMobile, true);
    }


    loadFiltroTamanhos(tamanhos) {
        const targets = [
            document.getElementById('filtro-tamanhos'),
            document.getElementById('filtro-tamanhos-mobile')
        ];

        const createElement = (tamanho) => {
            const div = document.createElement('div');
            div.innerText = tamanho.descricao;
            div.value = tamanho.id;
            div.addEventListener('click', ev => {
                ev.target.classList.toggle('selected');
            });
            return div;
        }

        for (const t of tamanhos) {
            targets.forEach(x => x.appendChild(createElement(t)));
        }
    }

    loadFiltroPreco() {
        this.generateFiltroPreco(document.getElementById('filtro-precos'), false);
        this.generateFiltroPreco(document.getElementById('filtro-precos-mobile'), true);
    }

    getFiltrosCor(isMobile = false) {
        var elememts = !isMobile ? document.querySelectorAll('#filtro-cores input') : document.querySelectorAll('#filtro-cores-mobile input');
        const filtros = [];
        for (const el of elememts) {
            if (el.checked) {
                filtros.push(Number(el.value));
            }
        }
        return filtros;
    }


    getFiltrosTamanho(isMobile = false) {
        var elememts = !isMobile ? document.querySelectorAll('#filtro-tamanhos div') : document.querySelectorAll('#filtro-tamanhos-mobile div');
        const filtros = [];
        for (const el of elememts) {
            if (el.classList.contains('selected')) {
                filtros.push(Number(el.value));
            }
        }
        return filtros;
    }

    getFiltrosPreco(isMobile = false) {
        var elememts = !isMobile ? document.querySelectorAll('#filtro-precos input') : document.querySelectorAll('#filtro-precos-mobile input');
        let resp = null;
        for (const el of elememts) {
            if (el.checked) {
                resp = el.value.split('-').map(Number);
            }
        }
        return resp;
    }

    getOrder(isMobile = false) {
        // debugger;
        if (!isMobile) {
            return document.getElementById('order').selectedOptions[0].value;
        }
        else {
            const elements = document.querySelectorAll('#dropdown-ordem section');
            for (const el of elements) {
                if (el.getAttribute('selected') == 'true') {
                    return el.getAttribute('value');
                }
            }
        }
    }

    cleanProdutos() {
        document.getElementById('produtos').innerHTML = '';
    }

    //----- DropDown -----

    hideDropdownAll() {
        this.hideDropdownFiltrar();
        this.hideDropdownOrdenar();
    }

    toggleDropdownFiltrar() {
        document.getElementById('dropdown-filtros').classList.toggle('hidden');
    }
    hideDropdownFiltrar() {
        document.getElementById('dropdown-filtros').classList.add('hidden');
    }

    toggleDropdownOrdenar() {
        document.getElementById('dropdown-ordem').classList.toggle('hidden');
    }
    hideDropdownOrdenar() {
        document.getElementById('dropdown-ordem').classList.add('hidden');
    }

    initDropdown() {
        const elements = document.querySelectorAll('.dropdown-item-tile');
        for (const element of elements) {
            element.addEventListener('click', (ev) => {
                element.parentElement.children[1]?.classList.toggle('hidden');
            });
        }
    }
    // ----- Generate -----
    generateFiltroCores(cores, target, isMobile) {
        const max_itens = 5;
        const prefix = isMobile ? 'm-clr' : 'clr';
        for (var i = 0; i < cores.length; i++) {
            const c = cores[i];

            const input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            input.setAttribute('id', `${prefix}-${c.id}`)
            input.setAttribute('name', `${prefix}-${c.id}`)
            input.setAttribute('value', c.id);

            const label = document.createElement('label');
            label.setAttribute('for', `${prefix}-${c.id}`);
            label.innerText = c.descricao;

            const br = document.createElement('br');

            if (!isMobile && (i + 1 > max_itens)) {
                input.classList.add('hidden');
                label.classList.add('hidden');
                br.classList.add('hidden');
            }
            target.appendChild(input);
            target.appendChild(label);
            target.appendChild(br);
        }
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

    generateFiltroPreco(target, isMobile) {
        const prefix = isMobile ? 'm-pr' : 'pr';
        target.innerHTML = `
            <input type="checkbox" id="${prefix}-1" value="0-50">
            <label for="${prefix}-1">de R$0 até R$50</label><br>
            <input type="checkbox" id="${prefix}-2" value="51-150">
            <label for="${prefix}-2">de R$51 até R$150</label><br>
            <input type="checkbox" id="${prefix}-3" value="151-300">
            <label for="${prefix}-3">de R$151 até R$300</label><br>
            <input type="checkbox" id="${prefix}-4" value="301-500">
            <label for="${prefix}-4">de R$301 até R$500</label><br>
            <input type="checkbox" id="${prefix}-5" value="501-9999999">
            <label for="${prefix}-5">a partir de R$501</label><br>
        `;

        //permitir apenas 1 checkbox selecionado
        const elements = document.querySelectorAll('#filtro-precos input');
        for (const item of elements) {
            item.addEventListener('click', (ev) => {
                const desired_check = ev.target.checked;
                elements.forEach(x => x.checked = false);//desmarca todos
                ev.target.checked = desired_check;
            });
        }
    }

    mostrarTodasCores() {
        const elements = document.querySelector('#filtro-cores').children;
        for (const el of elements) {
            el.classList.remove('hidden')
        }
        document.getElementById('mostrar-cores').classList.add('hidden');
    }

    limparFiltrosDropDown() {
        document.querySelectorAll('#filtro-cores-mobile input').forEach(item => item.checked = false);
        document.querySelectorAll('#filtro-tamanhos-mobile div').forEach(item => item.classList.remove('selected'));
        document.querySelectorAll('#filtro-precos-mobile input').forEach(item => item.checked = false);
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
            item.onclick = (ev) => {
                const id = item.parentElement.id.split('-')[1];
                cb(id);
            }
        }
    }

    onMostrarTodasCores(cb) {
        document.getElementById('mostrar-cores').addEventListener('click', cb);
    }

    onDropdownFiltrarClick(cb) {
        document.getElementById('dropdown-filtrar').addEventListener('click', cb);
    }

    onDropdownOrdenarClick(cb) {
        document.getElementById('dropdown-ordenar').addEventListener('click', cb);
    }

    onDropdownAplicarClick(cb) {
        this.hideDropdownAll();
        document.getElementById('dropdown-aplicar').addEventListener('click', cb);
    }

    onDropdownLimparClick(cb) {
        document.getElementById('dropdown-limpar').addEventListener('click', cb);
    }

    onDropDownOrderClick(cb) {
        const elementsMobile = document.querySelectorAll('#dropdown-ordem section');
        for (const item of elementsMobile) {
            item.addEventListener('click', (ev) => {
                elementsMobile.forEach(x => x.setAttribute('selected', 'false'))
                item.setAttribute('selected', 'true');
                cb();
            })
        }
    }


}