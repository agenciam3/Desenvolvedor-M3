import Generic from '../core/Generic.js';

function getPriceCheckboxHTML(min, max){
    min = parseInt(min);
    max = parseInt(max)
    return `<span class="pricecheck"><label><input type="checkbox" class="price_checkbox" value="${[min, max]}">Entre ${min} e R$${max}</label></span>`;
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

export default function ColorsCheckboxes() {
    return {
        create: (div_id = '', minimum_and_maximum_array, callback) => {
            let container = Generic().exists_id_on_document(div_id);
            if(container){
                container.innerHTML = '';
                let min = minimum_and_maximum_array[0];
                let max = minimum_and_maximum_array[1];
                let diff = max-min;
                let part = (diff / 4);
                for(let x = 0; x < 4; x++){
                    if(x == 0){
                        container.innerHTML += getPriceCheckboxHTML(1, part-1);
                    }
                    if(x == 1 || x == 2){
                        container.innerHTML += getPriceCheckboxHTML(part, (part * 2));
                        part = (part * 2) +1; 
                    }
                    if(x == 3){
                        container.innerHTML += getPriceCheckboxHTML(part, max);
                    }
                }
                var allElements = document.getElementsByClassName("price_checkbox");
                for(let i=0; i < allElements.length; i++){
                    allElements[i].addEventListener("click", function() {
                        click(allElements[i], allElements, false, callback)
                    });
                }
                
            }
        }
    }
}