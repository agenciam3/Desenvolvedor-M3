async function filterColorAndSize() {
    await fetch(productsUrl)
        .then((resp) => resp.json())
        .then((data) => {
            data.map(() => {

                /* SELECIONA O CHECKBOX CLICADO E ADICIONA EM UM ARRAY */
                const checkSizeValue = [...document.querySelectorAll('.checkboxs2')].filter((input => input.checked)).map((input) => input.value)
                const checkColorValue = [...document.querySelectorAll('.checkboxs1')].filter((input => input.checked)).map((input) => input.value)
                console.log("Tamanho:", checkSizeValue, "Cor:", checkColorValue)

                /* FILTROS PARA COMPARAR SE OS OBJETOS CONTEM O VALOR DO FILTRO CLICADO */

                const filterSize = data.filter(({ size }) => {
                    if (checkSizeValue.includes(size[0]))
                        return size[0]
                })


                const filterColor = data.filter(({ color }) => {
                    if (checkColorValue.includes(color))
                        return color
                })

                /*ADICIONA OS 2 FILTROS COR E TAMANHO EM UM UNICO ARRAY */

                const filterResult = filterColor.concat(filterSize)
                const filter = filterResult.filter(({ color, size }) => {
                    return color, size
                })

                /* VERIFICA AS CONDIÇÕES PARA VER QUAL PRODUTO VAI RENDERIZAR*/

                if (checkColorValue.length >= 1) {
                    renderProduct(filterColor)

                } else if (checkColorValue.length <= 0) {
                    renderProduct(data)

                }
                if (checkSizeValue + checkSizeValue) {
                    renderProduct(filterSize)
                }
                if (checkColorValue === checkSizeValue) {
                    renderProduct(filter)

                }

                if (filterResult.length <= 1) {
                    btnsApply.classList.add('hidden')
                    btnsApply.classList.remove('show')
                }

                if (filterResult.length >= 1) {
                    btnsApply.classList.add('show')
                    btnsApply.classList.remove('hidden')
                }

            });
        })

}

async function filterPrice() {
    await fetch(productsUrl)
        .then((resp) => resp.json())
        .then((data) => {
            data.map(() => {

                /* FILTROS DE PREÇOS */

                const filteredPrice1 = data.filter((x) => { return x.price >= 0 && x.price <= 50 })
                const filteredPrice2 = data.filter((x) => { return x.price >= 51 && x.price <= 150 })
                const filteredPrice3 = data.filter((x) => { return x.price >= 151 && x.price <= 300 })
                const filteredPrice4 = data.filter((x) => { return x.price >= 301 && x.price <= 500 })

                /* SELECIONA O CHECKBOX CLICADO E ADICIONA EM UM NOVO ARRAY */

                const checkPriceValue = [...document.querySelectorAll('.checkboxs')].filter((input => input.checked)).map((input) => input.value)
                console.log("Preço menor que:", checkPriceValue)

                /* VERIFICA AS CONDIÇÕES PARA VER QUAL PRODUTO VAI RENDERIZAR */

                if (checkPriceValue >= 1 && checkPriceValue <= 50 && checkPriceValue.length >= 1) {
                    renderProduct(filteredPrice1)

                } else if (checkPriceValue >= 51 && checkPriceValue <= 150) {
                    renderProduct(filteredPrice2)

                } else if (checkPriceValue >= 151 && checkPriceValue <= 300) {
                    renderProduct(filteredPrice3)

                } else if (checkPriceValue >= 301 && checkPriceValue <= 500) {
                    renderProduct(filteredPrice4)

                } else if (checkPriceValue >= 500 && checkPriceValue <= 1000) {
                    renderProduct(data)

                } else if (checkPriceValue.length <= 0) {
                    renderProduct(data)
                }
                if (checkPriceValue.length <= 1) {
                    btnsApply.classList.add('hidden')
                    btnsApply.classList.remove('show')
                }

                if (checkPriceValue.length >= 1) {
                    btnsApply.classList.add('show')
                    btnsApply.classList.remove('hidden')
                }

            })
        })
}