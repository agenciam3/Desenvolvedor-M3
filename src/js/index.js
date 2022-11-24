const serverurl = process.env.SERVER_API;
console.log("Dev m3", serverurl);
/*-----------------------------------------*/
const COMPRAR = "comprar"
const CORES = ["Amarelo", "Azul", "Branco", "Cinza", "Laranja"]
const TAMANHOS = ["P", "M", "G", "GG", "U", "36", "38", "40", "42", "44", "46"]
const FAIXA_DE_PRECO = ["de " + [0, 50], [51, 150], [151, 300], [301, 500], [500, 1000]]
const TITULOS = ["CORES", "TAMANHOS", "FAIXA DE PREÇO"]
let products = []
let productsFiltered = []
let filterActive = []
const API = fetch('http://localhost:5000/products')
    .then(response => response.json())
    .then(text => {
        products = text
        renderOptions(TITULOS[0], CORES)
        renderOptions(TITULOS[1], TAMANHOS)
        renderOptions(TITULOS[2], FAIXA_DE_PRECO)
        products.forEach((element, index) => {
            FAIXA_DE_PRECO.forEach((faixa, indice) => {
                if (element.price >= faixa[0] && element.price <= faixa[1]) {
                    element.pricerange = faixa
                }
            })
        })
        console.log(products)
        products.forEach((element, index) => {
            renderCard(element, index)
        })
        renderFooter()
    })

function triggerReRender(trigger, filter) {
    let anchor = document.getElementById('cardDiv')
    while (anchor.hasChildNodes()) {
        anchor.removeChild(anchor.lastChild);
    }
    if (trigger == "FILTER") {
        products.forEach((element, index) => {
            if (filter.length == 0) {
                renderCard(element, index)
            } else {
                if (filter.includes(element.color) || (filter.includes(element.size[0] || element.size[1])) || filter.includes(element.pricerange)) {
                    renderCard(element, index)
                }
            }
        })
    }
    else if (trigger == "ORDERBY") {
        if (isOrderedAsc == null && isOrderedDesc == null) {
            return "ERRO"
        } else {
            products.forEach((element, index) => {
                if (filter.length == 0) {
                    renderCard(element, index)
                } else {
                    if (filter.includes(element.color) || (filter.includes(element.size[0] || element.size[1])) || filter.includes(element.pricerange)) {
                        renderCard(element, index)
                    }
                }
            })
        }
    }
}
function renderCard(element, index) {
    let anchor = document.getElementById('cardDiv')
    var div = document.createElement('div')
    let img = document.createElement('img')
    let productName = document.createElement('h3')
    productName.innerHTML = `${element.name}`
    let productPrice = document.createElement('h2')
    productPrice.innerHTML = `R$ ${element.price}`
    let installmentText = document.createElement("p")
    installmentText.innerHTML = `até ${element.parcelamento[0]}x de R$ ${element.parcelamento[1]}`
    let buttonBuy = document.createElement('button')
    buttonBuy.innerHTML = COMPRAR
    img.setAttribute('src', element.image)
    div.setAttribute("id", index)
    div.setAttribute('class', 'card')
    div.append(img)
    div.append(productName)
    div.append(productPrice)
    div.append(installmentText)
    div.append(buttonBuy)
    anchor.appendChild(div)
}

function renderOptions(title, separator) {
    let anchor = document.getElementById('optionsDiv')
    var div = document.createElement('div')
    let colorOptionsText = document.createElement("h1")
    div.setAttribute("class", "optionsDiv")
    colorOptionsText.innerHTML = `${title}`
    anchor.append(div)
    div.append(colorOptionsText)
    separator.forEach((element) => {
        let inputChoice = document.createElement("input")
        let inputText = document.createElement("span")
        inputText.setAttribute("class", "checkmark")
        inputChoice.setAttribute("type", "checkbox")
        inputChoice.addEventListener('click', (event) => {
            if (filterActive.includes(element)) {
                filterActive.pop(element)
                triggerReRender("FILTER", filterActive)
                console.log("popped")
                console.log(filterActive)
            } else {
                filterActive.push(element)
                triggerReRender("FILTER", filterActive)
                console.log("pushed")
                console.log(filterActive)
            }
        })
        let labelInput = document.createElement("label")
        labelInput.setAttribute("for", element)
        labelInput.setAttribute("class", "container")
        inputText.innerText = `${element}`
        labelInput.append(inputChoice, inputText)
        div.append(labelInput)
    })
}

function renderFooter() {
    let anchor = document.getElementById("footer")
    var div = document.createElement("div")
    var innerTextFooter = document.createElement("h3")
    div.setAttribute("class", "footerDiv")
    innerTextFooter.setAttribute("class", "footerText")
    innerTextFooter.innerHTML = `Agência M3 - Agência de Performance Digital`
    div.append(innerTextFooter)
    anchor.append(div)
}