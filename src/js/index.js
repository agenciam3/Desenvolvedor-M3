const urlProducts = "http://localhost:5000/products";

const colors = ["Verde", "Vermelho", "Preto", "Rosa", "Vinho"];

let colorFilter = [];
let sizeFilter = [];
let priceFilter = [];
// let orderBy = '';
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


function getProducts(urlProducts) {
    try {
        fetch(urlProducts)
            .then(res => res.json())
            .then((res) => {
                buildHtmlProduct(res, productsPerPage);
                // addCart();
            })
    } catch (error) {
        console.log(error);
    }
}

function buildHtmlProduct(products, productsPerPage = 9) {
    if (!products) {
        return;
    }

    let buttonShowMore = Array.from(document.getElementsByClassName("show-more"))[0];

    if (products.length < 9 || productsPerPage === allProducts.length) {
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
                <span class="name">${product.name}</span>

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
                let mobileArrayCheck = Array.from(document.getElementsByClassName("check")).filter(elem => elem.getAttribute("mobile"));
                if (check.parentNode.parentNode.id === "colors" || check.parentNode.id === "prices") {
                    equal = mobileArrayCheck.find(mob => mob.lastElementChild.innerText === check.lastElementChild.innerText);
                } else
                    equal = mobileArrayCheck.find(mob => mob.textContent === check.textContent);
            }
            console.log(equal);
            let checked = check.getAttribute('selected');
            checked = checked === "true" ? false : true;

            check.setAttribute("selected", checked);

            if (check.parentNode.getAttribute('class') === "options-size") {

                if (checked === true) {
                    check.style.border = "2px solid #00C0EE";
                    if (equal !== undefined) equal.style.border = "2px solid #00C0EE";
                    sizeFilter.push(check.textContent);
                } else {
                    check.style.border = "1px solid #666666";
                    if (equal !== undefined) equal.style.border = "1px solid #666666";
                    sizeFilter = sizeFilter.filter(elem => elem !== check.textContent);
                }

            } else {

                if (checked === true) {
                    check.firstElementChild.firstElementChild.style.display = "block";
                    if (equal !== undefined) equal.firstElementChild.firstElementChild.style.display = "block";
                    check.parentNode.parentNode.id === "colors" ? colorFilter.push(check.innerText) : priceFilter.push(check.innerText)
                } else {
                    check.firstElementChild.firstElementChild.style.display = "none";
                    if (equal !== undefined) equal.firstElementChild.firstElementChild.style.display = "none";
                    check.parentNode.parentNode.id === "colors" ? colorFilter = colorFilter.filter(elem => elem !== check.innerText) : priceFilter = priceFilter.filter(elem => elem !== check.innerText);
                }
            }
            productsPerPage = 9;
            applyFilters();

        }

    });
}

function showColors(colors) {

    let showAllColors = document.getElementById("all-colors");
    showAllColors.onclick = function (e) {
        colors.forEach(color => {
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
    }
}

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

function showMore() {
    let buttonShowMore = Array.from(document.getElementsByClassName("show-more"))[0];
    buttonShowMore.onclick = function (e) {
        e.preventDefault();
        buttonShowMore.style.display = "none";
        document.getElementById("product-list").innerHTML = "";
        productsPerPage = allProducts.length;
        buildHtmlProduct(allProducts, productsPerPage);
    }
}

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

function orderProducts(orderBy) {
    let param = '';
    let inverse = false;
    switch (orderBy) {
        case "most-recent":
            param = "date";
            break;
        case "lowest-price":
            param = "price";
            break;
        case "highest-price":
            param = "price";
            inverse = true;
            break;
    }

    // let auxArray = [];
    // auxArray = filteredProducts.length > 0 ? filteredProducts : allProducts;

    // auxArray.sort(compare(a, b));

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
function mobileFilter() {
    let mobileFilter = document.getElementById("mobile-filter");
    mobileFilter.onclick = function (e) {
        Array.from(document.getElementsByTagName("main"))[0].style.display = "none";
        Array.from(document.getElementsByTagName("header"))[0].style.display = "none";
        Array.from(document.getElementsByTagName("footer"))[0].style.display = "none";
        document.getElementById("mobile-filter-page").style.display = "block";

    }
}

function mobileOrder() {
    let mobileOrder = document.getElementById("mobile-order");
    mobileOrder.onclick = function (e) {
        Array.from(document.getElementsByTagName("main"))[0].style.display = "none";
        Array.from(document.getElementsByTagName("header"))[0].style.display = "none";
        Array.from(document.getElementsByTagName("footer"))[0].style.display = "none";
        document.getElementById("mobile-order-page").style.display = "block";

    }
}

function closeMobilePage() {
    let closeButtons = Array.from(document.getElementsByClassName("closeButtons"));
    closeButtons.forEach(close => {
        close.onclick = function (e) {
            Array.from(document.getElementsByTagName("main"))[0].style.display = "block";
            Array.from(document.getElementsByTagName("header"))[0].style.display = "flex";
            Array.from(document.getElementsByTagName("footer"))[0].style.display = "flex";
            Array.from(document.getElementsByClassName("mobile-page"))[0].style.display = "none";
            Array.from(document.getElementsByClassName("mobile-page"))[1].style.display = "none";

            // console.log(tempLengthColorFilter, tempLengthSizeFilter, tempLengthPriceFilter);
            if (tempLengthColorFilter !== null)
                colorFilter = colorFilter.slice(0, tempLengthColorFilter);
            if (tempLengthSizeFilter !== null)
                sizeFilter = sizeFilter.slice(0, tempLengthSizeFilter);
            if (tempLengthPriceFilter !== null)
                priceFilter = priceFilter.slice(0, tempLengthPriceFilter);

            if (checksToReset.length > 0) {

                checksToReset.forEach(elem => {
                    elem.setAttribute("selected", "false");
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
            applyFilters();
        }
    });
}

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

function applyMobileFilter() {
    let apply = document.getElementById("apply");
    apply.onclick = function (e) {
        Array.from(document.getElementsByTagName("main"))[0].style.display = "block";
        Array.from(document.getElementsByTagName("header"))[0].style.display = "flex";
        Array.from(document.getElementsByTagName("footer"))[0].style.display = "flex";
        Array.from(document.getElementsByClassName("mobile-page"))[0].style.display = "none";
        Array.from(document.getElementsByClassName("mobile-page"))[1].style.display = "none";
        // colorFilter = colorFilter.slice(0, tempLengthColorFilter);
        // sizeFilter = sizeFilter.slice(0, tempLengthSizeFilter);
        // priceFilter = sizeFilter.slice(0, tempLengthPriceFilter);
        // checksToReset.forEach(elem => {
        //     elem.setAttribute("selected", "false");
        //     if (elem.parentNode.getAttribute('class') === "options-size") {
        //         elem.style.border = "1px solid #666666";
        //     } else {
        //         elem.firstElementChild.firstElementChild.style.display = "none";
        //     }
        // })
        tempLengthColorFilter = null;
        tempLengthSizeFilter = null;
        tempLengthPriceFilter = null;
        checksToReset = [];
        let arrayCheck = Array.from(document.getElementsByClassName("check")).filter(elem => !elem.getAttribute("mobile"));
        let auxArray = arrayCheck.slice(0, 10);
        auxArray.forEach(elem => {
            if (colorFilter.some(color => elem.lastElementChild.innerText === color)) {
                elem.firstElementChild.firstElementChild.style.display = "block";
            }
        })
        auxArray = arrayCheck.slice(10, 22);
        auxArray.forEach(elem => {
            if (sizeFilter.some(size => size === elem.textContent)) {
                elem.style.border = "2px solid #00C0EE";
            }
        });

        auxArray = arrayCheck.slice(22, arrayCheck.length);
        auxArray.forEach(elem => {
            if (priceFilter.some(price => price === elem.lastElementChild.innerText)) {
                elem.firstElementChild.firstElementChild.style.display = "block";
            }
        });
    }
}