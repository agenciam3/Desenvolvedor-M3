var desejo;
var carrinho = [];

function ad_carrionh(valor){

    var item = valor;
    desejo = confirm("Deseja adicionar ao carrinho?");
    console.log(desejo);

    if(desejo == true){
        carrinho.push(item);
    }
    console.log(carrinho);
};

var quant_itens = carrinho.length;

const produtos = [   
    {
    "value" : "Camiseta mescla",
    "preco" : 28.00,
    "cor" : "cinza",
    "tamanho" : "46",
    "imagem" : "../layout/imagens/img_2.png"
    },

    {
    "value" : "saia_couro",
    "preco" : 398,
    "cor" : "preto",
    "tamanho" : "M",
    "imagem" : "../layout/imagens/img_3.png"
    },

    {
    "value" : "cardigan_tigre",
    "preco" : 398,
    "cor" : "laranja",
    "tamanho" : "44",
    "imagem" : "../layout/imagens/img_4.png"
    },

    {
    "value" : "cardigan_white",
    "preco" : 99,
    "cor" : "branco",
    "tamanho" : "G",
    "imagem" : "../layout/imagens/img_5.png"
    },

    {
    "value" : "body_leopardo",
    "preco" : 129,
    "cor" : "amarelo",
    "tamanho" : "M",
    "imagem" : "../layout/imagens/img_6.png"
    },

    {
    "value" : "casaco_pelos",
    "preco" : 398,
    "cor" : "rosa",
    "tamanho" : "P",
    "imagem" : "../layout/imagens/img_7.png"
    },

    {
    "value" : "cropped_strippes",
    "preco" : 120,
    "cor" : "azul",
    "tamanho" : "U",
    "imagem" : "../layout/imagens/img_8.png"
    },

    {
    "value" : "camisa_transparente",
    "preco" : 398,
    "cor" : "preto",
    "tamanho" : "M",
    "imagem" : "../layout/imagens/img_9.png"
    },

    {
    "value" : "POCHETE",
    "preco" : 99,
    "cor" : "preto",
    "tamanho" : "42",
    "imagem" : "../layout/imagens/img_10.png"
    }
];
/*
const imprimir_produto = 
                `<img src="layout/imagens/img_2.png">
                    <figcaption>
                        <p class="produto"> ${produtos[0].value} </p>
                        <p class="preco"><b> R$ ${produtos[0].preco} </b></p>
                        <p class="didive_em"> ate 3x de R$9,33 </p>
                        <button class="btn_comprar" value="camiseta_mescla" onclick="ad_carrionh(value)"> COMPRAR </button>
                    </figcaption>`;


const imprimirproduto = document.querySelector("[data-conteudo-foto]");

imprimirproduto.innerHTML = imprimir_produto*/
/*
var prec;

function selec_prec(Element){
    prec = Element;
    const preco_filtrado = produtos.filter(produtos => (produtos.preco < prec));
    console.log(preco_filtrado);
}

var tam = "";

function tamanho_filtro(Element){
    tam = Element;
    const tamanho_filtrado = produtos.filter(produtos => (produtos.tamanho == tam));
    console.log(tamanho_filtrado);
}

var cor = "";

function cor_filtro(Element){
    cor = Element;
    const cor_filtrado = produtos.filter(produtos => (produtos.cor == cor));
    console.log(cor_filtrado);
}
*/