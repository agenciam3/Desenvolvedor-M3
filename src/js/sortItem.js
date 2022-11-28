/* FUNÇÕES PARA ORGANIZAR OS OBJETOS 
POR DATA, PREÇO MAIS ALTO E PREÇO MAIS BAIXO
*/
async function sortLower() {
    await fetch('http://localhost:5000/products?_sort=price&_order=asc')
        .then((resp) => resp.json())
        .then((data) => {
            data.map(() => {
                renderProduct(data)
            })
        });
}
async function sortHigh() {
    await fetch('http://localhost:5000/products?_sort=price&_order=desc')
        .then((resp) => resp.json())
        .then((data) => {
            data.map(() => {
                renderProduct(data)
            })
        });
}
async function sortDate() {
    await fetch('http://localhost:5000/products?_sort=date&_order=desc')
        .then((resp) => resp.json())
        .then((data) => {
            data.map(() => {
                renderProduct(data)
            })
        });
}