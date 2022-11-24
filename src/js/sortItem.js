async function sortLower() {
    await fetch(productsUrl)
        .then((resp) => resp.json())
        .then((data) => {
            data.map(() => {
                const sortByLower = data.sort((a, b) => {
                    a.price = parseFloat(a.price)
                    b.price = parseFloat(b.price)
                    if (a.price < b.price) {
                        return -1
                    } else {
                        return true

                    }
                })
                renderProduct(sortByLower)

            })
        });
}
async function sortHigh() {
    await fetch(productsUrl)
        .then((resp) => resp.json())
        .then((data) => {
            data.map(() => {
                const sortByHigh = data.sort((a, b) => {
                    a.price = parseFloat(a.price)
                    b.price = parseFloat(b.price)
                    if (a.price > b.price) {
                        return -1
                    } else {
                        return true
                    }
                })
                renderProduct(sortByHigh)
            })
        });
}
async function sortDate() {
    await fetch(productsUrl)
        .then((resp) => resp.json())
        .then((data) => {
            data.map(() => {
                const sortByDate = data.sort((a, b) => {
                    a.date = parseFloat(a.date)
                    b.date = parseFloat(b.date)
                    if (a.date > b.date) {
                        return -1
                    } else {
                        return true
                    }
                })
                renderProduct(sortByDate)
            })
        });

}