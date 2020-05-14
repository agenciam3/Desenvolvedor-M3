let cardBox = document.getElementById('container-cards')
let boxInputCores = document.getElementById('box-input-cores');
let boxButtonTamanhos = document.getElementById('box-button-tamanhos');
let boxInputPrecos = document.getElementById('box-input-precos');

let carrinho = [];

const checkBoxPickOne = (checkbox) => {
    /*---------Estruturando para só um checkbox poder ser escolhido----------*/
    var checkboxes = document.getElementsByName('check')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}

const cardEffects = () => {
    let cards = document.getElementsByClassName('card');
    let delay = 0.2;
    Object.values(cards).forEach(card => {
        card.style.animationDelay = delay + "s"
        delay += 0.2;
    })
}

