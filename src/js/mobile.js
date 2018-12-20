$(document).ready(function () {

    // abre a janela + filtrar
    $('#filt').on('click', function () {

        $('#opcoes').css('left', '0%');
        $('#filtrar').css('left', '0%');
    });


    // abre a janela + ordenar
    $('#ord').on('click', function () {

        $('#opcoes').css('left', '0%');
        $('#ordenar').css('left', '0%');
    });


    // fecha a janela + ordenar e filtrar
    $('.fcjs').on('click', function () {

        $('#opcoes').css('left', '-100%');
        $('#ordenar').css('left', '-100%');
        $('#filtrar').css('left', '-100%');
    });

    // flag para abrir botões ( aplicar + limpar)
    var size2 = 0;

    // abre filtros
    $('.fcjs2').on('click', function () {

        var id = $(this).attr('id');

        $(this).toggleClass('fclose2');

        var size;
        switch (id) {
            case 'fc1':
                {
                    size = '650px';
                    break;
                }

            case 'fc2':
                {
                    size = '180px';
                    break;
                }

            case 'fc3':
                {
                    size = '292px';
                    break;
                }
        }


        var tam = $('.' + id).css('height');

        if (tam != '0px') {
            size = '0px';
            size2 -= 1;
        } else {
            size2 += 1;
        }

        $('.' + id).css('height', size);


        // botões aplicar + limpar
        if (size2 == 0) {
            $('#optbut').css('height', '0px');
        }

        if (size2 > 0) {
            $('#optbut').css('height', '46px');
        }

        // correção possivel erro
        if (size2 < 0) {
            size2 = 0;
        }

        if (size2 > 3) {
            size2 = 3;
        }

    });


    // mais cores

    $('.maiscor').on('click', function () {
        $(this).toggleClass('maiscor2');
    });





    // produtos JSON

    var prod = {
        "p": [{
                "nome": "CAMISETA MESCLA",
                "preco": "28,00",
                "parcela": "até 3x de R$9,33",
                "cor": ['Branco', 'Amarelo'],
                "tamanho": ['P', 'M', 'G'],
                "cod": "1"
            },
            {
                "nome": "SAIA EM COURO",
                "preco": "398,00",
                "parcela": "até 5x de R$30,00",
                "cor": ['Preto', 'Azul'],
                "tamanho": ['M', 'G', 'GG'],
                "cod": "2"
            },
            {
                "nome": "CARDIGAN TIGRE",
                "preco": "398,00",
                "parcela": "até 5x de R$30,00",
                "cor": ['Laranja', 'Preto'],
                "tamanho": ['G', 'GG', 'U'],
                "cod": "3"
            },
            {
                "nome": "CARDIGAN OFF WHITE",
                "preco": "99,90",
                "parcela": "até 3x de R$33,30",
                "cor": ['Branco', 'Cinza'],
                "tamanho": ['GG', 'U', '36'],
                "cod": "4"
            },
            {
                "nome": "BODY LEOPARDO",
                "preco": "129,90",
                "parcela": "até 3x de R$33,30",
                "cor": ['Laranja', 'Preto'],
                "tamanho": ['U', '36', '38'],
                "cod": "5"
            },
            {
                "nome": "CASACO PELOS",
                "preco": "398,00",
                "parcela": "até 5x de R$30,00",
                "cor": ['Rosa', 'Branco'],
                "tamanho": ['36', '38', '40'],
                "cod": "6"
            },
            {
                "nome": "CROPPED STRIPES",
                "preco": "120,00",
                "parcela": "até 3x de R$40,00",
                "cor": ['Laranja', 'Amarelo'],
                "tamanho": ['38', '40', '42'],
                "cod": "7"
            },
            {
                "nome": "CAMISA TRANSPARENTE",
                "preco": "398,00",
                "parcela": "até 5x de R$30,00",
                "cor": ['Preto', 'Laranja'],
                "tamanho": ['40', '42', '44'],
                "cod": "8"
            },
            {
                "nome": "POCHETE CLUTH",
                "preco": "99,00",
                "parcela": "até 3x de R$33,00",
                "cor": ['Preto', 'Verde'],
                "tamanho": ['42', '44', '46'],
                "cod": "9"
            },
            {
                "nome": "CAMISA MESCLA V2",
                "preco": "56,00",
                "parcela": "até 3x de R$18,66",
                "cor": ['Branco', 'Vermelho'],
                "tamanho": ['44', '46', 'P'],
                "cod": "10"
            },
            {
                "nome": "SAIA DE COURO V2",
                "preco": "796,00",
                "parcela": "até 5x de R$60,00",
                "cor": ['Preto', 'Rosa'],
                "tamanho": ['46', 'P', 'M'],
                "cod": "11"
            },
            {
                "nome": "CARDIGAN TIGRE V2",
                "preco": "796,00",
                "parcela": "até 5x de R$60,00",
                "cor": ['Laranja', 'Preto'],
                "tamanho": ['P', 'M', 'G'],
                "cod": "12"
            },
            {
                "nome": "CARDIGAN OFF WHITE V2",
                "preco": "199,80",
                "parcela": "até 3x de R$66,60",
                "cor": ['Branco', 'Preto'],
                "tamanho": ['M', 'G', 'U'],
                "cod": "13"
            },
            {
                "nome": "BODY LEOPARDO V2",
                "preco": "259,80",
                "parcela": "até 3x de R$66,60",
                "cor": ['Laranja', 'Preto'],
                "tamanho": ['G', 'U', '36'],
                "cod": "14"
            },
            {
                "nome": "CASACO PELOS V2",
                "preco": "796,00",
                "parcela": "até 5x de R$60,00",
                "cor": ['Rosa', 'Vinho'],
                "tamanho": ['U', '36', '38'],
                "cod": "15"
            },
            {
                "nome": "CROPPED STRIPES V2",
                "preco": "240,00",
                "parcela": "até 3x de R$80,00",
                "cor": ['Laranja', 'Azul'],
                "tamanho": ['36', '38', '40'],
                "cod": "16"
            },
            {
                "nome": "CAMISA TRANSPARENTE",
                "preco": "796,00",
                "parcela": "até 5x de R$60,00",
                "cor": ['Preto', 'Vinho'],
                "tamanho": ['40', '42', '44'],
                "cod": "17"
            },
            {
                "nome": "POCHETE CLUTH V2",
                "preco": "199,00",
                "parcela": "até 3x de R$66,00",
                "cor": ['Preto', 'Verde'],
                "tamanho": ['42', '44', '46'],
                "cod": "18"
            }
        ]
    }

    // funciona
    // console.log(prod.p[0].cor[0]);


    // função embaralha para renderizar aleatoriamente
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    arr = shuffle(arr);

    // produtos principais
    for (var i = 0; i < 18; i++) {

        if (i < 9) {
            $('#produtos1').append("<div class='prod'><img src='images/" + prod.p[arr[i]].cod + ".png' alt=''><h2>" + prod.p[arr[i]].nome + "</h2><h3>R$ " + prod.p[arr[i]].preco + "</h3><p>" + prod.p[arr[i]].parcela + "</p><div class='button2' data-cod='" + prod.p[arr[i]].cod + "'><h1>Comprar</h1></div></div>")

            if (i == 8) {
                $('#produtos1').append(" <div id='mais1' class='mais'><p> Carregar Mais </p></div>");
                $('#produtos1').append("<div id='produtos2' class='produtos'></div>");
            }
        }

        if (i > 8) {


            $('#produtos2').append("<div class='prod'><img src='images/" + prod.p[arr[i]].cod + ".png' alt=''><h2>" + prod.p[arr[i]].nome + "</h2><h3>R$ " + prod.p[arr[i]].preco + "</h3><p>" + prod.p[arr[i]].parcela + "</p><div class='button2' data-cod='" + prod.p[arr[i]].cod + "'><h1>Comprar</h1></div></div>")

            if (i == 17) {
                $('#produtos2').append(" <div id='mais2' class='mais'><p> Carregar Menos </p></div>");
            }
        }

    };

    // abre mais produtos

    $('#mais1 p').on('click', function () {
        $('#mais1').css('display', 'none');
        $('#mais2').css('display', 'initial');
        $('#produtos2').css('height', 'fit-content');
    });

    // fecha o mais produtos
    $('#mais2 p').on('click', function () {
        $('#produtos2').css('height', '0');
        $('#mais2').css('display', 'none');
        $('#mais1').css('display', 'initial');
    });


    // CARRINHO DE COMPRAS

    // funciona
    // var x = $('.prod:nth-child(1) .button2').attr('data-cod');
    // console.log(x);

    var prodcar = [];
    var prodcar2;

    var pcar = 0;
    var pcar2;

    prodcar2 = JSON.parse(localStorage.getItem('lista'));
    pcar2 = JSON.parse(localStorage.getItem('qtdx'));

    console.log(pcar);

    if (pcar2 != null) {
        prodcar = prodcar2;
        console.log(prodcar);
    }

    if (prodcar2 != null) {
        if (pcar2.qtd > 0) {
            console.log(pcar2.qtd);
            pcar = parseInt(pcar2.qtd);
            console.log('\npcar 2º: ', pcar);
        }
    }

    prods();

    function prods() {
        if (pcar > 0) {
            $('.prods').css('display', 'initial');
            $('#qtd').html(pcar);
        }
    }

    $(".button2").on('click', function () {
        var x = $(this).attr('data-cod');

        // console.log('\n 1--' + x);

        prodcar[pcar] = prod.p[x - 1];

        // console.log('\n conteudo: ', prodcar[pcar]);

        pcar += 1;

        prods();

        var quantidade = {
            "qtd": "0"
        };

        quantidade.qtd = pcar;
        console.log('\n quantidade : ', quantidade);

        localStorage.setItem('qtdx', JSON.stringify(quantidade));
        console.log('\qtd final : ', pcar);

        localStorage.setItem('lista', JSON.stringify(prodcar));
        console.log('\nlista : ', prodcar);
    });


});