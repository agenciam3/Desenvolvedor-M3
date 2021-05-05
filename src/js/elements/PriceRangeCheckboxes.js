import Generic from '../core/Generic.js';

function getPriceCheckboxHTML(min, max){
    min = parseInt(min);
    max = parseInt(max)
    return `<span class="pricecheck"><label><input type="checkbox" class="price_checkbox" value="${[min, max]}">Entre R$${min} e R$${max}</label></span>`;
}

function click(checkbox, allElements, multiple = false, callback){
  
    let value = [];

    if(checkbox.checked){
        checkbox.checked = true;
    } else {
        checkbox.checked = false;
    }

    switch(multiple){
        case true:
            for(let i=0; i < allElements.length; i++){
                if( allElements[i].checked ){
                    value.push(allElements[i].value.split(','));
                }
            }
            break;
        case false:
            for(let i=0; i < allElements.length; i++){
                if( allElements[i] != checkbox ){
                    allElements[i].checked = false;
                }
            }
            value = checkbox.value.split(',');
            break;
    }

    callback(value);
    return;
}

function hideOrShow(div_id, css_rule = 'none'){
    let container = document.getElementById(div_id);
    console.log('escondeu!', container)
    if(container){
        container.style.display = css_rule;
    }
}

export default function PriceRangeCheckboxes() {
    return {
        create: (div_id = '', minimum_and_maximum_array, itens_quantity = 1, callback) => {
            let container = Generic().exists_id_on_document(div_id);
            if(container){
                container.innerHTML = '';
                let min = minimum_and_maximum_array[0];
                let max = minimum_and_maximum_array[1];
                
                if((min > max) || (min < 10) || (max < 20)){
                    hideOrShow(div_id);
                } else {
                    hideOrShow(div_id, 'block');
                }

                let dv = 1;
                
                

                let diff = max-min;

                if(diff > 50){
                    dv = Math.round(diff / diff*3);
                }

                (dv < 1) ? dv = 1 : dv;

                console.log('DIFF -> ', diff, 'DV -> ', dv)
                let montante = min; 
                for(let x = 0; x < dv; x++){
                    let novo_montante = montante + (diff/dv + x);
                    if (x+1 >= dv){
                        novo_montante = max;
                    }
                    container.innerHTML += getPriceCheckboxHTML(montante, novo_montante);
                    montante = novo_montante;
                }
                var allElements = document.getElementsByClassName("price_checkbox");
                for(let i=0; i < allElements.length; i++){
                    allElements[i].addEventListener("click", function() {
                        click(allElements[i], allElements, false, callback)
                    });
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