class Products{
  constructor(products){
    this.products = products.slice(0,6);
    this.inventory = products;
    this.cart = [];
    this.display = 6;
  }

  Filter_SortBy(number, confirmation = true){ //A função Filter_SortBy receberá um número indicando o tipo de ordenação desejada. 0 - Recentes, 1 - Menor preço, 2 - Maior Preço
    const size = document.querySelector('input[name="sizes_name"]:checked');
    const color = document.querySelector('input[name="colors"]:checked');
    const price = document.querySelector('input[name="prices"]:checked');

    let temp = this.inventory;

    if(size){
      temp = temp.filter(product => product.sizes.includes(size.value));
    }

    if(color){
      temp = temp.filter(product => product.color == color.value);
    }

    if(price){
      temp = temp.filter(product => product.price >= price.min && product.price <= price.max);
    }

    this.Sort(temp,number);
    this.Sort(this.inventory,number);

    if(temp.length <= this.display )
    {
      const button = document.querySelector('.btn_more');
      button.style.display = 'none';
    }
    else{
      const button = document.querySelector('.btn_more');
      button.style.display = 'inline-block';
    }

    Update(temp.slice(0,this.display));
  }

  Sort(products_array,number){
    if(number == 0)
    {
      products_array.sort((a,b)=>{
        if(a.date > b.date)
        {
          return -1;
        }
        return 1;
      })
    }

    if(number==1)
    {
      products_array.sort((a,b)=>{
        if(a.price < b.price)
        {
          return -1;
        }
        return 1;
      })
    }

    if(number==2)
    {
      products_array.sort((a,b)=>{
        if(a.price > b.price)
        {
          return -1;
        }
        return 1;
      })
    }
  }

  LoadMore(){
    this.display += 3;
    this.Filter_SortBy();

    if(this.products.length <= this.inventory.length)
    {
      const button = document.querySelector('.btn_more');
      button.style.display = 'none';
    }
  }
}

  const Buy = (id) => { //A função recebe o id do produto, o procura e o adicona Products.cart, caso seja necessário utilizar o mesmo depois
    const qnt_cart = document.querySelector('.counter');

    Products.inventory.forEach(product =>{ 
      if(!Products.cart.includes(product)) //Se o produto ja estiver no carrinho nada acontece, a ideia é que o cliente escolha a quantidade de produtos em outra página
      {
        if(product.id == id)
        {
          Products.cart.push(product);
          console.log(Products.cart); // Deixei o log, para demonstrar que a função funciona como foi planejada
        }
      }
    })

    qnt_cart.innerHTML= Products.cart.length;
  }

  const Update = (products) =>
  {
    const container = document.querySelector('.catalog');

    let template = '';

    products.forEach(product => {
        template += `
        <div class="products">
          <img src= ${product.image}></img>
          <h1>${product.title}</h1>
          <h2>R$ ${product.price.toFixed(2).replace(".",",")}</h3>
          <h3>até ${product.installments.quantity}x de R$ ${product.installments.price.toFixed(2).replace(".",",")}</h1>
          <input type="button" class="buy" value="Comprar" onclick="Buy(${product.id})"></div>` ;
    })
    
    container.innerHTML = template;
  }

const renderPosts= async () => {
  let uri= 'http://localhost:3000/products';

  const res= await fetch(uri);
  const products = await res.json();
  
  Products = new Products(products);
  Update(Products.products);
}

window.addEventListener('DOMContentLoaded', () => renderPosts());