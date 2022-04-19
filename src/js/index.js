import 'regenerator-runtime/runtime';

const getAllProducts = async () => {
  const productsFetch = await fetch('http://localhost:5000/products');
  const productsJson = await productsFetch.json();
  return productsJson
};

const generateHtmlProduct = products => {

  const productsReduce = products.reduce((accumulator, {name, price, parcelamento, image}) => {
    accumulator += 
      `
        <div class="products--cardItem">
          <div class="products--imageCardItem">
            <img src=${image} alt="">
          </div>
          <div class="products--textInformationCardItem">
            <h3>${name}</h3>
            <p class="bold">R$ ${price}</p>
            <p class="text-installments">até ${parcelamento[0]}x de ${parcelamento[1]}</p>
          </div>
          <div class="products--buttonBuyCardItem">
            <button>Comprar</button>
          </div>
        </div>
      `
    return accumulator
  }, '')

  return productsReduce
}

const insertProductsIntoPage = htmlProduct => {
  const divProductsContainer = document.querySelector('.products--cardContainer')
  divProductsContainer.innerHTML = htmlProduct
}

const promisesResolve = async () => {
  const products = await getAllProducts()
  const htmlProduct = await generateHtmlProduct(products)
  const insertHtml = insertProductsIntoPage(htmlProduct)
}

promisesResolve()
