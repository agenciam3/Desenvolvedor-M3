"use strict"
import Generic from '../core/Generic.js';

var __selected_value;

function getComboboxHTML(){
    return `<select name="select-ordernation-filter" id="select-ordernation-filter-combobox">
                <option value="" disabled selected>Ordenar por:</option>
                <option value="recent">Mais recente</option>
                <option value="cheapest">Menor preço</option>
                <option value="expensive">Maior preço</option>
            </select>`;
}

function getListHTML(){
    return `
    <div class="select-ordenation-filter-list" id="select-ordernation-filter-list">
        <div class="option selected" data-value="recent">Mais recente</div>
        <div class="option" data-value="cheapest">Menor preço</div>
        <div class="option" data-value="expensive">Maior preço</div>
    </div>
    `;
}

function click(value, callback){
    __selected_value = value;
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
        create: (div_id = '', callback, type = 'combobox') => {
            let container = Generic().exists_id_on_document(div_id);
            if(container){
                let element;
                if(type == 'combobox'){
                    container.innerHTML = getComboboxHTML();
                    element = document.getElementById('select-ordernation-filter-combobox');
                }

                if(type == 'list'){
                    container.innerHTML = getListHTML();
                    element = document.getElementById('select-ordernation-filter-list');
                }
                
                if(element && type == 'combobox'){
                    element.addEventListener('change', (evt) => {
                        click(evt.target.value, callback);
                        if(type == 'combobox'){
                            element.value = __selected_value;
                        }
                    })
                }

                if(element && type == 'list'){
                    let subElements = element.getElementsByClassName('option');
                    for (let i = 0; i < subElements.length; i++) {
                        subElements[i].addEventListener("click", () => {
                            click(subElements[i].dataset.value, callback);
                            if(__selected_value != undefined){
                                let nElements = element.getElementsByClassName('option');
                                for (let i = 0; i < nElements.length; i++) {
                                    if(nElements[i].dataset.value == __selected_value){
                                        nElements[i].classList.add('selected');
                                    } else if(nElements[i].classList.contains('selected')){
                                        nElements[i].classList.remove('selected');
                                    }
                                }
                            }
                        })
                    }
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