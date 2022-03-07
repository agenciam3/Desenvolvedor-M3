const urlProducts = "http://localhost:5000/products";

const colors = ["Amarelo", "Azul", "Branco", "Cinza", "Laranja", "Verde", "Vermelho", "Preto", "Rosa", "Vinho"];

//Array com os filtros de cada tipo
let colorFilter = [];
let sizeFilter = [];
let priceFilter = [];

//Variaveis responsaveis para auxiliar no set dos checks dos menus
let tempLengthColorFilter = null;
let tempLengthSizeFilter = null;
let tempLengthPriceFilter = null;
let checksToReset = [];
//

let allProducts = [];
let filteredProducts = [];
let productsPerPage = 9;


localStorage.clear();
getProducts(urlProducts);
renderHtmlColors(colors);
showColors(colors);
checkFilterElements();
listDropdown();
showMore();

//Mobile
mobileOrder();
mobileFilter();
closeMobilePage();
showOptionsMobile();
applyMobileFilter();

//Função responsável por realizar a requisição dos produtos
function getProducts(urlProducts) {
    try {
        fetch(urlProducts)
            .then(res => res.json())
            .then((res) => {
                buildHtmlProduct(res, productsPerPage);
            })
    } catch (error) {
        console.log(error);
    }
}

//Função responsável por buildar o html para os produtos
function buildHtmlProduct(products, productsPerPage = 9) {
    if (!products) {
        return;
    }

    let buttonShowMore = Array.from(document.getElementsByClassName("show-more"))[0];

    if (products.length <= 9 || productsPerPage === allProducts.length) {
        buttonShowMore.style.display = "none";
    } else {
        buttonShowMore.style.display = "block";
    }

    allProducts = allProducts.length === 0 ? products : allProducts;
    products = products.slice(0, productsPerPage);
    products.forEach(product => {
        let listProduct = document.getElementById("product-list");
        if (!listProduct) {
            return;
        }
        let htmlProduct = `
            <div class="product" color=${product.color} date =${product.date} productId = ${product.id} size = ${product.size} price = ${product.price} >
                <img class="image" src=${product.image} alt="">
                <span class="name">${product.name.toUpperCase()}</span>

                <div class="price">
                <span class="value">R$${product.price.toFixed(2).toString().replace(".", ",")}</span>
                <span class="portions">até ${product.parcelamento[0]}x de R$${product.parcelamento[1].toFixed(2).toString().replace(".", ",")}</span>
                </div>

                <button class="buy">COMPRAR</button>
            </div>
        `;

        listProduct.insertAdjacentHTML("beforeend", htmlProduct);

        addCart();
    });

}

//Função responsável por dar o check nos elementos do checkbox
function checkFilterElements() {
    let checks = Array.from(document.getElementsByClassName("check"));
    checks.forEach(check => {
        check.onclick = function (e) {
            let equal;

            if (check.getAttribute("mobile") === "true") {
                tempLengthColorFilter = tempLengthColorFilter === null ? colorFilter.length : tempLengthColorFilter;
                tempLengthSizeFilter = tempLengthSizeFilter === null ? sizeFilter.length : tempLengthSizeFilter;
                tempLengthPriceFilter = tempLengthPriceFilter === null ? priceFilter.length : tempLengthPriceFilter;
                checksToReset.push(check);
            } else {

                let mobileArrayCheck = Array.from(document.getElementsByClassName("check")).filter(elem => elem.getAttribute("mobile") === "true");
                if (check.parentNode.parentNode.id === "colors" || check.parentNode.id === "prices") {
                    mobileArrayCheck = mobileArrayCheck.filter(elem => elem.lastElementChild !== null);
                    equal = mobileArrayCheck.find(mob => mob.lastElementChild.innerText === check.lastElementChild.innerText);
                } else
                    equal = mobileArrayCheck.find(mob => mob.textContent === check.textContent);
            }

            let checked = check.getAttribute('selected');
            checked = checked === "true" ? false : true;

            check.setAttribute("selected", checked);
            if (equal !== undefined) equal.setAttribute("selected", checked);
            if (check.parentNode.getAttribute('class') === "options-size") {

                if (checked === true) {
                    check.style.border = "2px solid #00C0EE";
                    if (equal !== undefined) equal.style.border = "2px solid #00C0EE";
                    sizeFilter.push(check.textContent);
                } else {
                    check.style.border = "1px solid #666666";
                    if (equal !== undefined) equal.style.border = "1px solid #666666";
                    if (!(check.getAttribute("mobile") === "true")) {
                        sizeFilter = sizeFilter.filter(elem => elem !== check.textContent);
                    }
                    if (check.getAttribute("mobile") === "true") teste.push(check);
                }

            } else {

                if (checked === true) {
                    check.firstElementChild.firstElementChild.style.display = "block";
                    if (equal !== undefined) equal.firstElementChild.firstElementChild.style.display = "block";
                    check.parentNode.parentNode.id === "colors" ? colorFilter.push(check.innerText) : priceFilter.push(check.innerText)
                } else {
                    check.firstElementChild.firstElementChild.style.display = "none";
                    if (equal !== undefined) equal.firstElementChild.firstElementChild.style.display = "none";

                    if (check.parentNode.parentNode.id === "colors") {
                        if (!(check.getAttribute("mobile") === "true")) {
                            colorFilter = colorFilter.filter(elem => elem !== check.innerText)
                        }
                    } else {
                        if (!(check.getAttribute("mobile") === "true")) {
                            priceFilter = priceFilter.filter(elem => elem !== check.innerText);
                        }
                    }
                }
            }
            productsPerPage = 9;
            applyFilters();

        }

    });
}

//Função responsável por renderizar o menu de cores nos filtros
function renderHtmlColors(colorArray, size = 5) {
    let containerColors = Array.from(document.getElementsByClassName("checkbox-option")).filter(elem => elem.id === "colors");
    containerColors.forEach(container => {
        let colors = [];
        let addAtribute = false;
        if (container.getAttribute("mobile") === "true") {
            addAtribute = true;
            colors = colorArray;
        } else {
            colors = colorArray.slice(0, size);
        }

        colors.forEach(color => {
            let htmlColorFilter = `
                <div class="check" selected=false mobile="${addAtribute}">
                    <div class="button">
                        <div class="custom-box"></div>
                    </div>
                    <span>${color}</span>
                </div>
            `;
            container.insertAdjacentHTML("beforeend", htmlColorFilter);
        })
    })
}

//Função responsável por mostrar mais cores caso o botão seja pressionado
function showColors(colors) {

    let showAllColors = document.getElementById("all-colors");
    showAllColors.onclick = function (e) {
        let array = colors.slice(5, colors.length);

        array.forEach(color => {
            let htmlColorFilter = `
                <div class="check" selected=false>
                    <div class="button">
                        <div class="custom-box"></div>
                    </div>
                    <span>${color}</span>
                </div>
            `;

            showAllColors.previousElementSibling.insertAdjacentHTML("beforeend", htmlColorFilter);
        });

        showAllColors.style.display = "none";
        checkFilterElements();
        readjustmentFilter(false);
        applyMobileFilter();
    }
}

//Função responsável por aplicar os filtros selecionados pelo usuário
function applyFilters() {
    let filteredArray = allProducts;
    filteredArray = filteredArray.filter(product => {
        if ((colorFilter.length > 0 ? colorFilter.some(elem => elem === product.color) : true) &&
            (sizeFilter.length > 0 ? sizeFilter.some(elem => product.size.some(size => size === elem)) : true) &&
            (priceFilter.length > 0 ? priceFilter.some(elem => priceInInterval(product.price, elem)) : true)) {
            return product;
        }
    });
    document.getElementById("product-list").innerHTML = "";
    filteredProducts = filteredArray;
    buildHtmlProduct(filteredArray, productsPerPage);
}

//Função responsável por verificar se um preço esta em um intervalo
function priceInInterval(price, interval) {
    switch (interval) {
        case "de R$0 até R$50":
            return (price >= 0 && price <= 50);

        case "de R$51 até R$150":
            return (price >= 51 && price <= 150);

        case "de R$151 até R$300":
            return (price >= 151 && price <= 300);

        case "de R$301 até R$500":
            return (price >= 301 && price <= 500);

        case "a partir de R$500":
            return (price >= 500);

        default:
            return false;
    }
}

//Função responsável por mostrar mais produtos
function showMore() {
    let buttonShowMore = Array.from(document.getElementsByClassName("show-more"))[0];
    buttonShowMore.onclick = function (e) {
        e.preventDefault();
        buttonShowMore.style.display = "none";
        document.getElementById("product-list").innerHTML = "";
        productsPerPage = allProducts.length;
        applyFilters();
    }
}

//Função responsável gerenciar o dropdown de modo de listagem
function listDropdown() {
    let htmlIcon = '  <img src="./img/imagevector1.svg"alt = "cart-icon" > ';
    let options = Array.from(document.getElementsByClassName("option"));
    options.forEach(option => {
        option.onclick = function (e) {
            if (option.parentElement.getAttribute("mobile") !== "true") {
                let textElement = document.getElementById("standard-text");
                textElement.innerText = option.innerText;
                textElement.insertAdjacentHTML("beforeend", htmlIcon);
            } else {
                Array.from(document.getElementsByTagName("main"))[0].style.display = "block";
                Array.from(document.getElementsByTagName("header"))[0].style.display = "flex";
                Array.from(document.getElementsByTagName("footer"))[0].style.display = "flex";
                Array.from(document.getElementsByClassName("mobile-page"))[0].style.display = "none";
            }
            orderProducts(option.id);
            document.getElementById("product-list").innerHTML = "";
            buildHtmlProduct(filteredProducts.length > 0 ? filteredProducts : allProducts, productsPerPage);
        }
    });
}

//Função responsável por ordenar o array dos produtos conforme selecionado no select
function orderProducts(orderBy) {
    let param = '';
    let inverse = false;
    switch (orderBy) {
        case "most-recent":
            param = "date";
            inverse = true;
            break;
        case "lowest-price":
            param = "price";
            break;
        case "highest-price":
            param = "price";
            inverse = true;
            break;
    }

    if (filteredProducts.length > 0) {
        filteredProducts.sort(compare);
        allProducts.sort(compare);
    } else {
        allProducts.sort(compare);
    }

    function compare(a, b) {
        if (inverse) {
            let aux = a;
            a = b;
            b = aux;
        }

        if (a[param] < b[param]) { return -1; }
        if (a[param] > b[param]) { return 1; }
        return 0;
    }
}

//Função responsável por adicionar um produto no carrinho
function addCart() {
    let buyButtons = Array.from(document.getElementsByClassName("buy"));
    buyButtons.forEach(button => {
        button.onclick = function (e) {
            let id = button.parentNode.getAttribute("productId");
            let price = button.parentNode.getAttribute("price");
            localStorage.setItem(`${id}`, `${price}`);
            document.getElementById("quantity-cart").innerText = localStorage.length;
        }
    })
}

///Mobile
//Função responsável por abrir o filtro da versão mobile
function mobileFilter() {
    let mobileFilter = document.getElementById("mobile-filter");
    mobileFilter.onclick = function (e) {
        Array.from(document.getElementsByTagName("main"))[0].style.display = "none";
        Array.from(document.getElementsByTagName("header"))[0].style.display = "none";
        Array.from(document.getElementsByTagName("footer"))[0].style.display = "none";
        document.getElementById("mobile-filter-page").style.display = "block";

    }
}

//Função responsável por abrir a pagina de ordenação da versão mobile
function mobileOrder() {
    let mobileOrder = document.getElementById("mobile-order");
    mobileOrder.onclick = function (e) {
        Array.from(document.getElementsByTagName("main"))[0].style.display = "none";
        Array.from(document.getElementsByTagName("header"))[0].style.display = "none";
        Array.from(document.getElementsByTagName("footer"))[0].style.display = "none";
        document.getElementById("mobile-order-page").style.display = "block";

    }
}

//Função responsável pelo gerenciamento dos filtros e da pagina quando o botão de x é pressionado
function closeMobilePage() {
    let closeButtons = Array.from(document.getElementsByClassName("closeButtons"));
    closeButtons.forEach(close => {
        close.onclick = function (e) {
            Array.from(document.getElementsByTagName("main"))[0].style.display = "block";
            Array.from(document.getElementsByTagName("header"))[0].style.display = "flex";
            Array.from(document.getElementsByTagName("footer"))[0].style.display = "flex";
            Array.from(document.getElementsByClassName("mobile-page"))[0].style.display = "none";
            Array.from(document.getElementsByClassName("mobile-page"))[1].style.display = "none";

            if (tempLengthColorFilter !== null) {
                colorFilter = colorFilter.slice(0, tempLengthColorFilter);
            }
            if (tempLengthSizeFilter !== null)
                sizeFilter = sizeFilter.slice(0, tempLengthSizeFilter);
            if (tempLengthPriceFilter !== null)
                priceFilter = priceFilter.slice(0, tempLengthPriceFilter);

            if (checksToReset.length > 0) {

                checksToReset.forEach(elem => {

                    if (elem.parentNode.getAttribute('class') === "options-size") {
                        elem.style.border = "1px solid #666666";
                    } else {
                        elem.firstElementChild.firstElementChild.style.display = "none";
                    }

                })
            }

            tempLengthColorFilter = null;
            tempLengthSizeFilter = null;
            tempLengthPriceFilter = null;
            checksToReset = [];
            readjustmentFilter(true);
            applyFilters();
        }
    });
}

//Função responsável por gerenciar as funcionalidades dos botões do menu de filtro da versão mobile
function showOptionsMobile() {
    let options = Array.from(document.getElementsByClassName("mobile-options"));
    options.forEach(option => {
        option.onclick = function (e) {
            let show = option.nextElementSibling.getAttribute("show");
            show = show === "true" ? false : true;
            let url = show === true ? "./img/imageArrowFliped.svg" : "./img/imagevector1.svg";

            option.nextElementSibling.setAttribute("show", show);
            option.lastChild.setAttribute("src", url);
            option.nextElementSibling.style.display = show === true ? "block" : "none";

            let buttonsFilter = Array.from(document.getElementsByClassName("mobile-filter-buttons"))[0];
            if (options.some(option => option.nextElementSibling.getAttribute("show") === "true")) {
                buttonsFilter.style.display = "flex";
            } else {
                buttonsFilter.style.display = "none";
            }
        }
    });
    buttonsFilterMobile();
}

//Função responsável pela ação de reset dos filtros
function buttonsFilterMobile() {
    let buttons = Array.from(document.getElementsByClassName("button-mobile-filter"));
    buttons.forEach(button => {
        button.onclick = function (e) {
            if (button.id === "reset") {
                colorFilter = [];
                sizeFilter = [];
                priceFilter = [];
                Array.from(document.getElementsByClassName("check")).forEach(elem => {
                    elem.setAttribute("selected", "false");
                    if (elem.parentNode.getAttribute('class') === "options-size") {
                        elem.style.border = "1px solid #666666";
                    } else {
                        elem.firstElementChild.firstElementChild.style.display = "none";
                    }
                });
            }
            applyFilters();
        }
    })
}

//Função responsável por aplicar os filtros na versão mobile
function applyMobileFilter() {
    let apply = document.getElementById("apply");
    apply.onclick = function (e) {
        Array.from(document.getElementsByTagName("main"))[0].style.display = "block";
        Array.from(document.getElementsByTagName("header"))[0].style.display = "flex";
        Array.from(document.getElementsByTagName("footer"))[0].style.display = "flex";
        Array.from(document.getElementsByClassName("mobile-page"))[0].style.display = "none";
        Array.from(document.getElementsByClassName("mobile-page"))[1].style.display = "none";
        removeWhenApply();

        tempLengthColorFilter = null;
        tempLengthSizeFilter = null;
        tempLengthPriceFilter = null;
        checksToReset = [];
        let arrayCheck = Array.from(document.getElementsByClassName("check")).filter(elem => elem.getAttribute("mobile") === "false" || !elem.getAttribute("mobile"));
        let auxArray = arrayCheck.length === 21 ? arrayCheck.slice(0, 5) : arrayCheck.slice(0, 10);

        auxArray.forEach(elem => {
            elem.firstElementChild.firstElementChild.style.display = "none";
            elem.setAttribute("selected", "false");
            if (colorFilter.some(color => elem.lastElementChild.innerText === color)) {
                elem.firstElementChild.firstElementChild.style.display = "block";
                elem.setAttribute("selected", "true");
            }
        });

        auxArray = arrayCheck.length === 21 ? arrayCheck.slice(5, 16) : arrayCheck.slice(10, 21);
        auxArray.forEach(elem => {
            elem.style.border = "1px solid #666666";
            elem.setAttribute("selected", "false");
            if (sizeFilter.some(size => size === elem.textContent)) {
                elem.style.border = "2px solid #00C0EE";
                elem.setAttribute("selected", "true");
            }
        });

        auxArray = arrayCheck.length === 21 ? arrayCheck.slice(16, arrayCheck.length) : arrayCheck.slice(21, arrayCheck.length);
        auxArray.forEach(elem => {
            elem.firstElementChild.firstElementChild.style.display = "none";
            elem.setAttribute("selected", "false");
            if (priceFilter.some(price => price === elem.lastElementChild.innerText)) {
                elem.firstElementChild.firstElementChild.style.display = "block";
                elem.setAttribute("selected", "true");
            }
        });
    }
}

//Função responsável por gerenciar a visualização dos checkbox's no filtro entre a versão web e mobile
function readjustmentFilter(mobile) {

    let checkElems;
    if (mobile === true) {
        checkElems = Array.from(document.getElementsByClassName("check")).filter(elem => elem.getAttribute("mobile") === "true");
    } else {
        checkElems = Array.from(document.getElementsByClassName("check")).filter(elem => elem.getAttribute("mobile") === "false" || !elem.getAttribute("mobile"));
    }

    let colorElement = checkElems.slice(0, 10);
    colorElement.forEach(colorElem => {
        if (colorFilter.some(color => color === colorElem.lastElementChild.innerText)) {
            colorElem.firstElementChild.firstElementChild.style.display = "block";
            colorElem.setAttribute("selected", "true");
        }
    });

    let sizeElement = checkElems.slice(10, 21);
    sizeElement.forEach(sizeElem => {
        if (sizeFilter.some(size => size === sizeElem.textContent)) {
            sizeElem.style.border = "2px solid #00C0EE";
            sizeElem.setAttribute("selected", "true");
        }
    });

    let priceElement = checkElems.slice(21, checkElems.length);
    priceElement.forEach(priceElem => {
        if (priceFilter.some(price => price === priceElem.lastElementChild.innerText)) {
            priceElem.firstElementChild.firstElementChild.style.display = "block";
            priceElem.setAttribute("selected", "true");
        }
    });
}

//Função responsável por remover elementos desmarcados quando aplicado certo filtro.
function removeWhenApply() {

    let mobileChecks = Array.from(document.getElementsByClassName("check")).filter(elem => elem.getAttribute("mobile") === "true");
    mobileChecks = mobileChecks.filter(check => check.getAttribute("selected") === "true");
    sizeFilter = [];
    colorFilter = [];
    priceFilter = [];
    mobileChecks.forEach(check => {
        if (check.parentNode.getAttribute('class') === "options-size") {
            sizeFilter.push(check.textContent);
        } else {
            check.parentNode.parentNode.id === "colors" ? colorFilter.push(check.lastElementChild.innerText) : priceFilter.push(check.lastElementChild.innerText);
        }
    });
    applyFilters();
}