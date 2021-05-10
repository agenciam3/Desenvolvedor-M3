import Generic from '../core/Generic.js';

var __size_choosed;

function getSizeBoxHTML(size){
    return `<div class="sizebox disabled" data-size="${size}">
                <span>${size}</span>
            </div>`;
}

function getSizeChoosed(){
    return __size_choosed;
}

function click(div, allElements, callback){

    __size_choosed = div.dataset.size;

    for(let i = 0; i < allElements.length; i++){
        if(allElements[i] != div){
            if(allElements[i].classList.contains('enabled')){
                allElements[i].classList.remove('enabled');
                allElements[i].classList.add('disabled');
            }
        }
    }
  
    if(!div.classList.contains('enabled')){
        div.classList.add('enabled');
        div.classList.remove('disabled');
    } else {
        div.classList.remove('enabled');
        div.classList.add('disabled');
    }
    

    callback([div.dataset.size]);
    return;
}

function hideOrShow(div_id, css_rule = 'none'){
    let container = document.getElementById(div_id);
    if(container){
        container.style.display = css_rule;
    }
}

export default function SizesBoxes() {
    return {
        create: (div_id = '', list_of_sizes, callback) => {
            let container = Generic().exists_id_on_document(div_id);
            if(container){
                container.innerHTML = '';

                list_of_sizes.forEach((color) => {
                    container.innerHTML += getSizeBoxHTML(color);
                });
                var allElements = document.getElementsByClassName("sizebox");
                for(let i=0; i < allElements.length; i++){
                    allElements[i].addEventListener("click", function() {
                        click(allElements[i], allElements, callback)
                    });
                }
                click(allElements[0], allElements, callback);
                
            }
        },
        hide: (div_id = '') => {
            hideOrShow(div_id);
        },
        show: (div_id = '') => {
            hideOrShow(div_id, 'block');
        },
        getSizeChoosed(){
            return getSizeChoosed();
        }
    }
}