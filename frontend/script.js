const produtos = [
    {
        id: 2,
        name: 'CAMISETA MESCLA',
        price: 99,
        cents: '00',
        color: [],
        size: '',
        maxparcelas: 3,
        img: './imagens/img_' 
    },
    {
        id: 3,
        name: 'SAIA EM COURO',
        price: 398,
        cents: '00',
        color: [],
        size: '',
        maxparcelas: 5,
        img: './imagens/img_' 
    },
    {
        id: 4,
        name: 'CARDIGAN TIGRE',
        price: 398,
        cents: '00',
        color: [],
        size: '',
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
    {
        id: 8,
        name: 'CROPPED STRIPES',
        price: 120,
        cents: '00',
        color: [],
        size: '',
        maxparcelas: 3,
        img: './imagens/img_' 
    },
    {
        id: 9,
        name: 'CAMISA TRANSPARENTE',
        price: 398,
        cents: '00',
        color: [],
        size: '',
        maxparcelas: 5,
        img: './imagens/img_' 
    },
    {
        id: 10,
        name: 'POCHETE CLUTCH',
        price: 99,
        cents: '00',
        color: [],
        size: '',
        maxparcelas: 3,
        img: './imagens/img_' 
    },
];

let maxProdutos = 6

const listaDeProdutos = `
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


const produtosDiv = document.querySelector(".products")
produtosDiv.innerHTML = listaDeProdutos;
