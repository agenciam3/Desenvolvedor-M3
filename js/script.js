const produtos = [
    {
        "id":"01",
        "name":"CAMISETA MESCLA",
        "img":"layout/imagens/img_2.png",
        "price":28.00,
        "color":["cinza"],
        "size":"G",
        "portion":3,
        "date":"04/04/2021"
    },
    {
        "id":"02",
        "name":"SAIA DE COURO",
        "img":"layout/imagens/img_3.png",
        "price":398.00,
        "color":["preto"],
        "size":"M",
        "portion":5,
        "date":"04/04/2021"
    },
    {
        "id":"03",
        "name":"CARDIGAN TIGRE",
        "img":"layout/imagens/img_4.png",
        "price":398.00,
        "color":["marrom"],
        "size":"G",
        "portion":5,
        "date":"04/04/2021"
    },
    {
        "id":"04",
        "name":"CARDIGAN OFF WHITE",
        "img":"layout/imagens/img_5.png",
        "price":99.90,
        "color":["branco"],
        "size":"M",
        "portion":3,
        "date":"04/04/2021"
    },
    {
        "id":"05",
        "name":"BODY LEOPARD",
        "img":"layout/imagens/img_6.png",
        "price":129.90,
        "color":["marrom"],
        "size":"M",
        "portion":3,
        "date":"04/04/2021"
    },
    {
        "id":"06",
        "name":"CASACO PELOS",
        "img":"layout/imagens/img_7.png",
        "price":398.00,
        "color":["rosa"],
        "size":"M",
        "portion":5,
        "date":"04/04/2021"
    },
    {
        "id":"07",
        "name":"CROPPED STRIPES",
        "img":"layout/imagens/img_8.png",
        "price":120.00,
        "color":["colorido"],
        "size":"U",
        "portion":3,
        "date":"04/04/2021"
    },
    {
        "id":"08",
        "name":"CAMISA TRANSPARENTE",
        "img":"layout/imagens/img_9.png",
        "price":398.00,
        "color":["preto"],
        "size":"38",
        "portion":5,
        "date":"04/04/2021"
    },
    {
        "id":"09",
        "name":"POCHETE CLUTCH",
        "img":"layout/imagens/img_10.png",
        "price":99.00,
        "color":["preto"],
        "size":"M",
        "portion":3,
        "date":"04/04/2021"
    }
]

document.getElementById("list-banners").innerHTML = `
    ${produtos.map(function (prod) {
        let installment = (prod.price / prod.portion).toFixed(2).replace('.', ',');
        return `
            <figure class="wrapper-banner">
                <img class="main-banner" src="${prod.img}">
                <figcaption class="main-caption">
                    <h1 class="p-name">${prod.name}</h1>
                        <p class="price">R$ ${(prod.price).toFixed(2).replace('.', ',')}</p>
                        <p class="portion">até ${prod.portion}x de R$ ${installment}</p>
                        <div class="wrap">
                            <span>COMPRAR</span>
                        </div>
                </figcaption>
            </figure>
        `
    }).join('')}
`;