const sizes = document.querySelector('.size-item')
const dropDown = document.querySelector('.drop-down')
const btn = document.querySelector('.show-colors')
const sortOptions = document.querySelector('.sort-options')
const sort = document.querySelector('.sort')
const totalCart = document.querySelector('.total span')
const more1 = document.querySelector('.more1')
const more2 = document.querySelector('.more2')
const more3 = document.querySelector('.more3')
const dropDownColor = document.querySelector('.dropDown-color')
const dropDownSize = document.querySelector('.dropDown-size')
const dropDownPrice = document.querySelector('.dropDown-price')
const size = document.querySelector('.sizes')
const btnsApply = document.querySelector('.btn-apply')
const btnApply = document.querySelector('.apply')
const btnClean = document.querySelector('.clean')
const inputs = document.querySelector('input[type="checkbox"]')


/* FUNÇÕES PARA ALTERAR ESTADO DA UI */

const closeMenuSort = () => {
    document.querySelector('.sort-container').style.right = '100vw'
}
const openMenuSort = () => {
    document.querySelector('.sort-container').style.right = '0vw'
}
const closeMenuFilter = () => {
    document.querySelector('aside').style.right = '100vw'
}
const openMenuFilter = () => {
    document.querySelector('aside').style.right = '0vw'
}

const showColor = () => {
    if (dropDown.classList.contains('hide')) {
        dropDown.classList.remove('hide')
        btn.style.display = "none"
    }
}
const showSort = () => {
    if (sortOptions.classList.contains('hide')) {
        sortOptions.classList.remove('hide')
        sortOptions.classList.add('show')
    } else {
        sortOptions.classList.remove('show')
        sortOptions.classList.add('hide')
    }
}

const showOptionColor = () => {
    if (dropDownColor.classList.contains('hidden')) {
        dropDownColor.classList.remove('hidden')
        dropDownColor.classList.add('show1')
        more1.style.rotate = "90deg"
    } else {
        dropDownColor.classList.remove('show1')
        dropDownColor.classList.add('hidden')
        more1.style.rotate = "0deg"
    }

}

const showOptionSize = () => {
    if (dropDownSize.classList.contains('hidden') && btnsApply.classList.contains('hidden')) {
        dropDownSize.classList.remove('hidden')
        dropDownSize.classList.add('show1')
        more2.style.rotate = "90deg"
        size.style.height = "270px"
    } else {
        dropDownSize.classList.remove('show1')
        dropDownSize.classList.add('hidden')
        more2.style.rotate = "0deg"
        size.style.height = "100px"
    }
}
const showOptionPrice = () => {
    if (dropDownPrice.classList.contains('hidden') && btnsApply.classList.contains('hidden')) {
        dropDownPrice.classList.remove('hidden')
        dropDownPrice.classList.add('show1')
        more3.style.rotate = "90deg"
    } else {
        dropDownPrice.classList.remove('show1')
        dropDownPrice.classList.add('hidden')
        more3.style.rotate = "0deg"
    }
}

function showMore() {
    document.getElementById('cards').style.height = "100%"
    document.querySelector('.btn-container').style.display = "none"
}



/* MARCA O CHECKBOX DO FILTRO TAMANHO */

Array.from(document.querySelectorAll('.size-item')).map((item) => {
    item.addEventListener('click', () => {
        if (item.classList.contains('size-item')) {
            item.classList.add('border')
            item.classList.remove('size-item')
        } else {
            item.classList.remove('border')
            item.classList.add('size-item')
        }
    })
})