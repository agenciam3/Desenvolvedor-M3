var check = document.getElementById("shop")

var estado = check.addEventListener("change", () => {
    var temp = check.checked;

    if (temp) {
        document.getElementById("shopings").classList.remove("carrito--disabled")
        document.getElementById("shopings").classList.add("carrito")

    } else {
        document.getElementById("shopings").classList.remove("carrito")
        document.getElementById("shopings").classList.add("carrito--disabled")

    }
})