async function productServices() {
    const products = await
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            // .then(json => console.log(json))
            .catch(e => Error(e))
    return products
}

export default productServices()
