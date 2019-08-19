// Alterna o preenchimento do checkbox por meio da classe 'checked'
const inputsCheckbox = document.querySelectorAll('div.checkbox');

inputsCheckbox.forEach(inputCheckbox => {
    inputCheckbox.onclick = function() {
        if(this.classList.contains('checked')) {
            this.classList.remove('checked');
        }
        else {
            this.classList.add('checked');
        }
    };
});

// Alterna a seleção do elemento 'tamanho' por meio da classe 'selected'
const inputsSize = document.querySelectorAll('div.size');

inputsSize.forEach(inputSize => {
    inputSize.onclick = function() {
        if(this.classList.contains('selected')) {
            this.classList.remove('selected');
        }
        else {
            this.classList.add('selected');
        }
    };
});
