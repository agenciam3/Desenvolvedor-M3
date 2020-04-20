export class HomeView {

    constructor() {
        this.loadFiltroParcela();
    }

    loadProdutos(produtos = [], hasMore) {
        const target = document.getElementById('produtos');
        let itens = "";
        for (const p of produtos) {
            itens += `
                <div class="item">
                    <img src="${p.foto}">
                    <div class="descricao">
                        <div>${p.descricao}</div>
                        <div class="preco">R$${p.preco.toFixed(2).replace('.', ',')}</div>
                        <div>até ?x de R$??</div>
                    </div>
                    <div class="item-footer"><span>comprar</span></div>
                </div>
            `
        }

        if(!hasMore){
            document.getElementById('btnCarregarMais').classList.add('hidden');
        }
        else{
            document.getElementById('btnCarregarMais').classList.remove('hidden');
        }
        
        target.innerHTML += itens;
    }


    loadFiltroCores(cores) {
        const target = document.getElementById('filtro-cores');
        let itens = "";
        for (const c of cores) {
            itens += `
                <input type="checkbox" id="clr-${c.id}" name="${c.descricao}" value="${c.id}">
                <label for="clr-${c.id}">${c.descricao}</label><br>
            `;
        }
        target.innerHTML = itens;
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
                console.log(el);
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

}