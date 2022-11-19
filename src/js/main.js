const sizes = document.querySelector('.border-none')
const dropDown = document.querySelector('.drop-down')
const btn = document.querySelector('.show-colors')

const showColor = () => {
    if (dropDown.classList.contains('drop-down')) {
        dropDown.classList.remove('drop-down')
        dropDown.classList.add('show')
        btn.style.display = "none"
    }
}

Array.from(document.querySelectorAll('.border-none')).map((item) => {
    item.addEventListener('click', () => {
        if (item.classList.contains('border-none')) {
            item.classList.remove('border-none')
            item.classList.add('border')
        } else {
            item.classList.remove('border')
            item.classList.add('border-none')
        }

    })
})