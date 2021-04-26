
export class ProductsService {

  allProducts = []

  async fetch() {
    const response = await fetch('http://localhost:3000/products')
    if (!response.ok) return

    this.allProducts.push(...(await response.json()))
  }

}