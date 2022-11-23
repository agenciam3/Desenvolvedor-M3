const sizes = document.querySelector('.size-item')
const dropDown = document.querySelector('.drop-down')
const btn = document.querySelector('.show-colors')
const sortOptions = document.querySelector('.sort-options')
const sort = document.querySelector('.sort')

const showColor = () => {
    if (dropDown.classList.contains('hide')) {
        dropDown.classList.remove('hide')
        dropDown.classList.add('show')
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