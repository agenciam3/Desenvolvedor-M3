import Generic from '../core/Generic.js';

function getComboboxHTML(){
    return `<select name="select-ordernation-filter" id="select-ordernation-filter">
                <option value="" disabled selected>Ordenar por:</option>
                <option value="recent">Mais recenter</option>
                <option value="cheapest">Menor preço</option>
                <option value="expensive">Maior preço</option>
            </select>`;
}

function click(value, callback){
    callback(value);
    return;
}

function hideOrShow(div_id, css_rule = 'none'){
    let container = document.getElementById(div_id);
    if(container){
        container.style.display = css_rule;
    }
}

export default function OrdenationCombobox() {
    return {
        create: (div_id = '', callback) => {
            let container = Generic().exists_id_on_document(div_id);
            if(container){
                container.innerHTML = getComboboxHTML();
                let element = document.getElementById('select-ordernation-filter');
                if(element){
                    element.addEventListener('change', (evt) => {
                        click(evt.target.value, callback);
                    })
                } else {
                    console.log('Erro ao adicionar o listener para o filtro de ordenação.');
                }
            }
        },
        hide: (div_id = '') => {
            hideOrShow(div_id);
        },
        show: (div_id = '') => {
            hideOrShow(div_id, 'block');
        }
    }
}