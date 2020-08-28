// inicio da populacao de array e loadmore

const produtos = [
    {
        id: 2,
        name: 'CAMISETA MESCLA',
        price: 99,
        cents: '00',
        color: [],
        size: 'P',
        maxparcelas: 3,
        img: './imagens/img_' 
    },
    {
        id: 3,
        name: 'SAIA EM COURO',
        price: 398,
        cents: '00',
        color: [],
        size: 'M',
        maxparcelas: 5,
        img: './imagens/img_' 
    },
    {
        id: 4,
        name: 'CARDIGAN TIGRE',
        price: 398,
        cents: '00',
        color: [],
        size: 'G',
        maxparcelas: 5,
        img: './imagens/img_' 
    },
    {
        id: 5,
        name: 'CARDIGAN OFFWHITE',
        price: 99,
        cents: '90',
        color: [],
        size: '',
        maxparcelas: 3,
        img: './imagens/img_' 
    },
    {
        id: 6,
        name: 'BODY LEOPARDO',
        price: 129,
        cents: '90',
        color: [],
        size: '',
        maxparcelas: 3,
        img: './imagens/img_' 
    },
    {
        id: 7,
        name: 'CASACO PELOS',
        price: 398,
        cents: '00',
        color: [],
        size: '',
        maxparcelas: 5,
        img: './imagens/img_' 
    },
];

const fullProducts = [
    {
        id: 2,
        name: 'CAMISETA MESCLA',
        price: 99,
        cents: '00',
        color: 'cinza',
        size: 'P',
        maxparcelas: 3,
        img: './imagens/img_' 
    },
    {
        id: 3,
        name: 'SAIA EM COURO',
        price: 398,
        cents: '00',
        color: '',
        size: 'M',
        maxparcelas: 5,
        img: './imagens/img_' 
    },
    {
        id: 4,
        name: 'CARDIGAN TIGRE',
        price: 398,
        cents: '00',
        color: 'laranja',
        size: 'G',
        maxparcelas: 5,
        img: './imagens/img_' 
    },
    {
        id: 5,
        name: 'CARDIGAN OFFWHITE',
        price: 99,
        cents: '90',
        color: '',
        size: '',
        maxparcelas: 3,
        img: './imagens/img_' 
    },
    {
        id: 6,
        name: 'BODY LEOPARDO',
        price: 129,
        cents: '90',
        color: '',
        size: '',
        maxparcelas: 3,
        img: './imagens/img_' 
    },
    {
        id: 7,
        name: 'CASACO PELOS',
        price: 398,
        cents: '00',
        color: '',
        size: '',
        maxparcelas: 5,
        img: './imagens/img_' 
    },
    {
        id: 8,
        name: 'CROPPED STRIPES',
        price: 120,
        cents: '00',
        color: '',
        size: '',
        maxparcelas: 3,
        img: './imagens/img_' 
    },
    {
        id: 9,
        name: 'CAMISA TRANSPARENTE',
        price: 398,
        cents: '00',
        color: '',
        size: '',
        maxparcelas: 5,
        img: './imagens/img_' 
    },
    {
        id: 10,
        name: 'POCHETE CLUTCH',
        price: 99,
        cents: '00',
        color: '',
        size: '',
        maxparcelas: 3,
        img: './imagens/img_' 
    },
]

const produtosDiv = document.querySelector(".products")
const loadMore = document.querySelector(".loadMore")

const produtosInicial = `
    ${produtos.map(produto => 
        `<div class="product">
            <img src="${produto.img}${produto.id}.png">
            <h5>${produto.name}</h5>
            <h4>R$${produto.price},${produto.cents}</h4>
            <h5>até ${produto.maxparcelas}x de R${produto.price/produto.maxparcelas}</h5>
            <button>Comprar</button>
            
        </div>`
     ).join('')}
     
`;

const productsFull = `
    ${fullProducts.map(produto => 
        `<div class="product">
            <img src="${produto.img}${produto.id}.png">
            <h5>${produto.name}</h5>
            <h4>R$${produto.price},${produto.cents}</h4>
            <h5>até ${produto.maxparcelas}x de R${produto.price/produto.maxparcelas}</h5>
            <button>Comprar</button>
        </div>
        `
     ).join('')}
`;


loadMore.addEventListener("click", () =>{
    produtosDiv.innerHTML = productsFull;
})

produtosDiv.innerHTML = produtosInicial;

// fim da populacao de array e loadmore


const sizes = document.querySelectorAll(".sizeSquare")

for (let i = 0; i < sizes.length; i++) {
     sizes[i].addEventListener("click", function() {
       sizes[i].classList.toggle("checkedSquare");
       const tamanho = produtos.filter(d => d.size == sizes[i].innerHTML);

       const produtosFiltrados = `
       ${tamanho.map(produto => 
           `<div class="product">
               <img src="${produto.img}${produto.id}.png">
               <h5>${produto.name}</h5>
               <h4>R$${produto.price},${produto.cents}</h4>
               <h5>até ${produto.maxparcelas}x de R${produto.price/produto.maxparcelas}</h5>
               <button>Comprar</button>
           </div>
           `
        ).join('')}
      `
        produtosDiv.innerHTML = produtosFiltrados
       
     });
}

// const colors = document.querySelectorAll(".colorSquares")

// for (let i = 0; i < colors.length; i++) {
//        colors[i].addEventListener("click",() => {
//        colors[i].classList.toggle("checkedColor");
//        let cores = fullProducts.filter(d => d.color == colors[i].innerHTML);
//        console.log(cores)
//      });
// }


