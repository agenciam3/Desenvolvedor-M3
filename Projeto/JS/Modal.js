/*-------------Funções do modal-----------*/
const abrirFiltrar = () => {
    modalBoxFiltrar.style.display = "block";
}

const closeFiltrar = () => {
    modalBoxFiltrar.style.display = "none";
}

const abrirOrdenar = () => {
    modalBoxOrdenar.style.display = "block";
}

const closeOrdenar = () => {
    modalBoxOrdenar.style.display = "none";
}

export const toogleModal = (value) => {
    console.log(value)
    switch (value) {
        case "abrirFiltrar":
            abrirFiltrar();
            break;
        case "closeFiltrar":
            closeFiltrar();
            break;
        case "abrirOrdenar":
            abrirOrdenar();
            break;
        case "closeOrdenar":
            closeOrdenar()
            break;
        default:
            closeOrdenar();
            closeFiltrar()
    }
}