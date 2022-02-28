function filterToggle(toggle) {
    const target = document.querySelector('.c-section__filter')
    toggle ? target.classList.add('--toggle') : target.classList.remove('--toggle')
}

function orderByToggle(toggle) {
    const target = document.querySelector('.c-section__orderBy')
    toggle ? target.classList.add('--toggle') : target.classList.remove('--toggle')
}

export { filterToggle, orderByToggle }