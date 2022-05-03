export default function removerClass(item){
    item.forEach((value) => {
        if(value.children[0].children[0].classList.value === "select") {
            value.children[0].children[0].classList.value = "select select-hidden"
        }
    })
}
export function removerClassTamanho(){
    const tamanhosFilter = document.querySelector(".menu-options-tamanhos");
    for(let i = 0; i < tamanhosFilter.children.length; i++){
        if(tamanhosFilter.children[i].classList.contains("filtrar")) {
            tamanhosFilter.children[i].classList.value = "filtrar"
        }}
}