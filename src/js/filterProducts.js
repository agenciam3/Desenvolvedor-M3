async function filterColorAndSize() {
    await fetch(productsUrl)
        .then((resp) => resp.json())
        .then((data) => {
            data.map(() => {
                const checkSizeValue = [...document.querySelectorAll('.checkboxs2')].filter((input => input.checked)).map((input) => input.value)
                const checkColorValue = [...document.querySelectorAll('.checkboxs1')].filter((input => input.checked)).map((input) => input.value)
                console.log(checkSizeValue, checkColorValue)

                const filterSize = data.filter(({ size }) => {
                    if (checkSizeValue.includes(size[0]))
                        return size[0]
                })

                const filterColor = data.filter(({ color }) => {
                    if (checkColorValue.includes(color))
                        return color
                })

                const filterResult = filterColor.concat(filterSize)
                const filter = filterResult.filter(({ color, size }) => {
                    return color, size
                })

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

            });

        })
}

async function filterPrice() {
    await fetch(productsUrl)
        .then((resp) => resp.json())
        .then((data) => {
            data.map(() => {
                const filteredPrice1 = data.filter(function(x) { return x.price >= 0 && x.price <= 50 })
                const filteredPrice2 = data.filter(function(x) { return x.price >= 51 && x.price <= 150 })
                const filteredPrice3 = data.filter(function(x) { return x.price >= 151 && x.price <= 300 })
                const filteredPrice4 = data.filter(function(x) { return x.price >= 301 && x.price <= 500 })

                const checkPriceValue = [...document.querySelectorAll('.checkboxs')].filter((input => input.checked)).map((input) => input.value)
                console.log(checkPriceValue)

                if (checkPriceValue >= 1 && checkPriceValue <= 50 && checkPriceValue.length >= 1) {
                    renderProduct(filteredPrice1)


                } else if (checkPriceValue >= 51 && checkPriceValue <= 150) {
                    renderProduct(filteredPrice2)

                } else if (checkPriceValue >= 151 && checkPriceValue <= 300) {
                    renderProduct(filteredPrice3)

                } else if (checkPriceValue >= 301 && checkPriceValue <= 500) {
                    renderProduct(filteredPrice4)

                } else if (checkPriceValue >= 0 && checkPriceValue <= 5000) {
                    renderProduct(data)

                } else if (checkPriceValue.length <= 0) {
                    renderProduct(data)

                }
            })
        })
}