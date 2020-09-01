const produtos = [
    {
        id: 2,
        name: 'CAMISETA MESCLA',
        price: 99,
        cents: '00',
        color: 'Cinza',
        size: 'P',
        maxparcelas: 3,
        img: './imagens/img_',
        quantidade: 0,
        date: new Date('2019-06-28') 
    },
    {
        id: 3,
        name: 'SAIA EM COURO',
        price: 398,
        cents: '00',
        color: 'Amarelo',
        size: 'M',
        maxparcelas: 5,
        img: './imagens/img_' ,
        quantidade: 0,
        date: new Date('2020-06-28')
    },
    {
        id: 4,
        name: 'CARDIGAN TIGRE',
        price: 398,
        cents: '00',
        color: 'Laranja',
        size: 'G',
        maxparcelas: 5,
        img: './imagens/img_' ,
        quantidade: 0,
        date: new Date('2021-06-28')
    },
    {
        id: 5,
        name: 'CARDIGAN OFFWHITE',
        price: 99,
        cents: '90',
        color: 'Branco',
        size: 'GG',
        maxparcelas: 3,
        img: './imagens/img_' ,
        quantidade: 0,
        date: new Date('')
    },
    {
        id: 6,
        name: 'BODY LEOPARDO',
        price: 129,
        cents: '90',
        color: 'Laranja',
        size: 'U',
        maxparcelas: 3,
        img: './imagens/img_' ,
        quantidade: 0,
        date: new Date('')
    },
    {
        id: 7,
        name: 'CASACO PELOS',
        price: 398,
        cents: '00',
        color: '',
        size: '',
        maxparcelas: 5,
        img: './imagens/img_' ,
        quantidade: 0,
        date: new Date('')
    },
    {
        id: 8,
        name: 'CROPPED STRIPES',
        price: 120,
        cents: '00',
        color: '',
        size: '',
        maxparcelas: 3,
        img: './imagens/img_' ,
        quantidade: 0,
        date: new Date('')
    },
    {
        id: 9,
        name: 'CAMISA TRANSPARENTE',
        price: 398,
        cents: '00',
        color: '',
        size: '',
        maxparcelas: 5,
        img: './imagens/img_' ,
        quantidade: 0,
        date: new Date('')
    },
    {
        id: 10,
        name: 'POCHETE CLUTCH',
        price: 99,
        cents: '00',
        color: '',
        size: '',
        maxparcelas: 3,
        img: './imagens/img_' ,
        quantidade: 0,
        date: new Date('')
    },
]

const carrinho = [
    {
        id: [],
        quantidade: 0,
    }
]

const produtosDiv = document.querySelector(".products")

const produtosArray = `
    ${produtos.slice(0,5).map(produto => 
        `<div class="product">
            <img src="${produto.img}${produto.id}.png">
            <h5>${produto.name}</h5>
            <h4>R$${produto.price},${produto.cents}</h4>
            <h5>até ${produto.maxparcelas}x de R${produto.price/produto.maxparcelas}</h5>
            <button data-quantidade="0" key="${produto.id}">Comprar</button>
        </div>`
     ).join('')}
`;

produtosDiv.innerHTML = produtosArray

const loadMore = document.querySelector(".loadMore")
loadMore.addEventListener("click", () =>{
    produtosFull = `${produtos.map(produto => 
        `<div class="product">
            <img src="${produto.img}${produto.id}.png">
            <h5>${produto.name}</h5>
            <h4>R$${produto.price},${produto.cents}</h4>
            <h5>até ${produto.maxparcelas}x de R${produto.price/produto.maxparcelas}</h5>
            <button key="${produto.id}">Comprar</button>
            
        </div>`
     ).join('')}`;
     produtosDiv.innerHTML = produtosFull
})

const sizes = document.querySelectorAll(".sizeSquare")
for (let i = 0; i < sizes.length; i++) {
     sizes[i].addEventListener("click", function() {
       sizes[i].classList.toggle("checkedSquare");
       const tamanho = produtos.filter(d => d.size == sizes[i].innerHTML);
       produtosDiv.innerHTML = null

       const produtosFiltradosTamanho = `
       ${tamanho.map(produto => 
           `<div class="product">
               <img src="${produto.img}${produto.id}.png">
               <h5>${produto.name}</h5>
               <h4>R$${produto.price},${produto.cents}</h4>
               <h5>até ${produto.maxparcelas}x de R${produto.price/produto.maxparcelas}</h5>
               <button key="${produto.id}">Comprar</button>
           </div>
           `
        ).join('')}
      ` 
      if(document.querySelector(".checkedSquare")){
        produtosDiv.innerHTML = produtosFiltradosTamanho
    }else{
        produtosDiv.innerHTML = produtosArray
    }      
  });
}



const colors = document.querySelectorAll(".colorSquares")
for (let i = 0; i < colors.length; i++) {
    colors[i].addEventListener("click", () => {
      const cores = produtos.filter(d => d.color == colors[i].innerHTML);
      colors[i].classList.toggle("checkedSquareColor");
      produtosDiv.innerHTML = null

      const produtosFiltradosCor = `
      ${cores.map(produto => 
          `<div class="product">
              <img src="${produto.img}${produto.id}.png">
              <h5>${produto.name}</h5>
              <h4>R$${produto.price},${produto.cents}</h4>
              <h5>até ${produto.maxparcelas}x de R${produto.price/produto.maxparcelas}</h5>
              <button key="${produto.id}">Comprar</button>
          </div>
          `
       ).join('')}
     ` 
     if(document.querySelector(".checkedSquareColor")){
       produtosDiv.innerHTML = produtosFiltradosCor
   }else{
       produtosDiv.innerHTML = produtosArray
   }      
 });
}

const prices = document.querySelectorAll(".txtPrice")
const squarePrice = document.querySelectorAll(".priceSquares")
for(let i = 0; i < prices.length; i++){
    prices[i].addEventListener("click", () =>{
        const datasetValue = prices[i].dataset.price
        const precos = produtos.filter(d => d.price < datasetValue);
        squarePrice[i].classList.toggle("priceSquareChecked");

      const produtosFiltradosPreco = `
      ${precos.map(produto => 
          `<div class="product">
              <img src="${produto.img}${produto.id}.png">
              <h5>${produto.name}</h5>
              <h4>R$${produto.price},${produto.cents}</h4>
              <h5>até ${produto.maxparcelas}x de R${produto.price/produto.maxparcelas}</h5>
              <button key="${produto.id}">Comprar</button>
          </div>
          `
       ).join('')}
     ` 
     if(document.querySelector(".checkedSquareColor")){
       produtosDiv.innerHTML = produtosFiltradosPreco
   }else{
       produtosDiv.innerHTML = produtosArray
   }      
 });
}

const order = document.getElementById("order");

document.getElementById("recentsMobile").addEventListener("click", () => {
    const recents = `${produtos.sort((a, b) => b.date - a.date).map(produto => 
        `<div class="product">
            <img src="${produto.img}${produto.id}.png">
            <h5>${produto.name}</h5>
            <h4>R$${produto.price},${produto.cents}</h4>
            <h5>até ${produto.maxparcelas}x de R${produto.price/produto.maxparcelas}</h5>
            <button key="${produto.id}">Comprar</button>
        </div>
        `
     ).join('')}
    ` 
    produtosDiv.innerHTML = recents;
})
document.getElementById("lowMobile").addEventListener("click", () => {
    const ascending = `${produtos.sort((a, b) => a.price - b.price).map(produto => 
        `<div class="product">
            <img src="${produto.img}${produto.id}.png">
            <h5>${produto.name}</h5>
            <h4>R$${produto.price},${produto.cents}</h4>
            <h5>até ${produto.maxparcelas}x de R${produto.price/produto.maxparcelas}</h5>
            <button key="${produto.id}">Comprar</button>
        </div>
        `
     ).join('')}
    ` 
    produtosDiv.innerHTML = ascending;
})
document.getElementById("highMobile").addEventListener("click", () => {
    const descending = `${produtos.sort((a, b) => b.price - a.price).map(produto => 
        `<div class="product">
            <img src="${produto.img}${produto.id}.png">
            <h5>${produto.name}</h5>
            <h4>R$${produto.price},${produto.cents}</h4>
            <h5>até ${produto.maxparcelas}x de R${produto.price/produto.maxparcelas}</h5>
            <button key="${produto.id}">Comprar</button>
        </div>
        `
     ).join('')}
    ` 
    produtosDiv.innerHTML = descending;
})


order.addEventListener("change", () =>{

    if(order.value == 1){
        const recents = `${produtos.sort((a, b) => b.date - a.date).map(produto => 
            `<div class="product">
                <img src="${produto.img}${produto.id}.png">
                <h5>${produto.name}</h5>
                <h4>R$${produto.price},${produto.cents}</h4>
                <h5>até ${produto.maxparcelas}x de R${produto.price/produto.maxparcelas}</h5>
                <button key="${produto.id}">Comprar</button>
            </div>
            `
         ).join('')}
        ` 
        produtosDiv.innerHTML = recents;
    }

    if(order.value == 3){
        const descending = `${produtos.sort((a, b) => b.price - a.price).map(produto => 
            `<div class="product">
                <img src="${produto.img}${produto.id}.png">
                <h5>${produto.name}</h5>
                <h4>R$${produto.price},${produto.cents}</h4>
                <h5>até ${produto.maxparcelas}x de R${produto.price/produto.maxparcelas}</h5>
                <button key="${produto.id}">Comprar</button>
            </div>
            `
         ).join('')}
        ` 
        produtosDiv.innerHTML = descending;
    }

    if(order.value == 2){
        const ascending = `${produtos.sort((a, b) => a.price - b.price).map(produto => 
            `<div class="product">
                <img src="${produto.img}${produto.id}.png">
                <h5>${produto.name}</h5>
                <h4>R$${produto.price},${produto.cents}</h4>
                <h5>até ${produto.maxparcelas}x de R${produto.price/produto.maxparcelas}</h5>
                <button key="${produto.id}">Comprar</button>
            </div>
            `
         ).join('')}
        ` 
        produtosDiv.innerHTML = ascending;
    }     
})

document.getElementById("btnFiltrar").addEventListener("click", () => {
    document.querySelector(".filters").classList.add("flex")
    document.querySelector("body").style.overflow = "hidden";
})


document.getElementById("btnOrdenar").addEventListener("click", () => {
    document.querySelector(".filterOrdenar").classList.add("flex")
    document.querySelector("body").style.overflow = "hidden";
    console.log("ordenar")
})

function closeFilter(){
    document.querySelector(".filters").classList.remove("flex")
    document.querySelector(".filterOrdenar").classList.remove("flex")
}
