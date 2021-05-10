"use strict"
import Generic from '../core/Generic.js';

function getColorCheckboxHTML(value){
    return `<span class="colorcheck"><label><input type="checkbox" class="color_checkbox" value="${value}">${value}</label></span>`;
}

function click(checkbox, allElements, multiple = false, callback){
    
    
    if(checkbox.checked){
        checkbox.checked = true;
    } else {
        checkbox.checked = false;
    }
    

    let value = [];

    switch(multiple){
        case true:
            for(let i=0; i < allElements.length; i++){
                if( allElements[i].checked ){
                    value.push(allElements[i].value);
                }
            }
            break;
        case false:
            for(let i=0; i < allElements.length; i++){
                if( allElements[i] != checkbox ){
                    allElements[i].checked = false;
                }
            }
            value = checkbox.value;
            break;
    }

    callback(value);
    return;
}

export default function ColorsCheckboxes() {
    return {
        create: (div_id = '', array_of_string = [], callback) => {
            
            //verificar se existe antes de criar novos para fazer a marcação certa.
            if(document.getElementsByClassName("color_checkbox").length > 0){
                return;
            }

            let container = Generic().exists_id_on_document(div_id);
            if(container){
                container.innerHTML = '';
                array_of_string.forEach((color) => {
                    container.innerHTML += getColorCheckboxHTML(color);
                });
                var allElements = document.getElementsByClassName("color_checkbox");
                for(let i=0; i < allElements.length; i++){
                    allElements[i].addEventListener("click", function() {
                        click(allElements[i], allElements, true, callback)
                    });
                }
                
            }
        }
    }
}