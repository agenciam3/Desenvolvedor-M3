// PopUp de Confirmação

var soma = 0

function Comprar(){

    let popup = document.getElementById('popup')
    document.getElementById('quant')

    //let container = document.getElementsByClassName('container')[0]
    //container.style.opacity="0.4"

    popup.style.display='block'

}

//Adicionando produto ao Carrinho 

function Confirmacao(){

    let ok = document.getElementById('btn-confirmar')
    let popup = document.getElementById('popup')
    let mensagemProduto = document.getElementsByClassName('add_carrinho')[0]
    let fechar = document.getElementsByClassName('btn-close')
    
        soma
        soma += 1
        quant.innerHTML = `${soma}` 
    
        popup.style.display='none'

        mensagemProduto.style.display='block'

}

//Sair da Mensagem 

function Sair(){

    let mensagemProduto = document.getElementsByClassName('add_carrinho')[0]
    let fechar = document.getElementsByClassName('btn-close')

    mensagemProduto.style.display='none'


}

//Cancelar adição ao carrinho

function Cancelar(){

    let cancelar = document.getElementById('btn-cancelar')
    let popup = document.getElementById('popup')

    popup.style.display='none'

}

// Mostrar mais Cores


function MostrarMaisCores(){

    let txt = document.getElementById('res');
    let exibir = document.getElementById('escondidos');

    if(exibir.style.display == 'block'){
        exibir.style.display = 'none';
        txt.innerHTML = 'Ver todas as cores +  ';

    }

    else{
        exibir.style.display = 'block';
        txt.innerHTML = 'Ver menos cores - ';
    }

}

//Deixando as bordas do filtro tamanho selecionadas

function clicar(){

    let button = document.querySelectorAll('class.tamanhos')

    button.style.border='#00c2f3'
}

let selected = document.querySelector('.selected')
let optionsContainer = document.querySelector('.option-container')

let optionList = document.querySelectorAll('.option')

selected.addEventListener('click', ()=>{
    optionsContainer.classList.toggle('active');

});

optionList.forEach(o => {
    o.addEventListener('click', ()=>{
        selected.innerHTML = o.querySelector('label').innerHTML;
        optionsContainer.classList.remove('active');
        
    })

});
