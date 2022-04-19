import 'regenerator-runtime/runtime'

const button = document.querySelector("#button")
console.log(button)

const loadAllProducts = async () => {
  console.log('chamou')

  const getProducts = await fetch('http://localhost:5000/products')
  const productsResponse = await getProducts.json()
  console.log(productsResponse)
  return productsResponse
}

button.addEventListener('click', loadAllProducts)