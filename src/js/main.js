const sizes = document.querySelector('.border-none')
const showColors = document.querySelector('.')


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