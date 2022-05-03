export function addClassUlColor(e){

    const ulColor = document.querySelectorAll(".ul-color-filter .filtrar");
    ulColor.forEach(key => key.children[0].children[0].classList.value = "select select-hidden")
    e.currentTarget.children[0].children[0].classList.toggle("select-hidden")
}
export function addClassUlSize(e){
    const ulSize = document.querySelectorAll(".ul-size-filter .filtrar");
    ulSize.forEach(key => key.children[0].children[0].classList.value = "select select-hidden")
    e.currentTarget.children[0].children[0].classList.toggle("select-hidden")
}
export function addClassUlPrice(e){
    const ulPrice = document.querySelectorAll(".ul-price-filter .filtrar");
    ulPrice.forEach(key => key.children[0].children[0].classList.value = "select select-hidden")
    e.currentTarget.children[0].children[0].classList.toggle("select-hidden")
}

