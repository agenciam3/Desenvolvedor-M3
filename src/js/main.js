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
                    size = '650px'; // 650
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
        $('#fc11').toggleClass('fc11b');
        $(this).css('display', "none");
        $('.menoscor').css('display', 'block');
    });

    $('.menoscor').on('click', function () {
        $('#fc11').toggleClass('fc11b');
        $(this).css('display', "none");
        $('.maiscor').css('display', 'block');
    });




    // produtos JSON

    var prod = {
        "p": [{
                "nome": "CAMISETA MESCLA",
                "preco": "28.00",
                "parcela": "até 3x de R$9,33",
                "cor": ['Branco', 'Amarelo'],
                "tamanho": ['P', 'M', 'G'],
                "cod": "1"
            },
            {
                "nome": "SAIA EM COURO",
                "preco": "398.00",
                "parcela": "até 5x de R$30,00",
                "cor": ['Preto', 'Azul'],
                "tamanho": ['M', 'G', 'GG'],
                "cod": "2"
            },
            {
                "nome": "CARDIGAN TIGRE",
                "preco": "398.00",
                "parcela": "até 5x de R$30,00",
                "cor": ['Laranja', 'Preto'],
                "tamanho": ['G', 'GG', 'U'],
                "cod": "3"
            },
            {
                "nome": "CARDIGAN OFF WHITE",
                "preco": "99.90",
                "parcela": "até 3x de R$33,30",
                "cor": ['Branco', 'Cinza'],
                "tamanho": ['GG', 'U', '36'],
                "cod": "4"
            },
            {
                "nome": "BODY LEOPARDO",
                "preco": "129.90",
                "parcela": "até 3x de R$33,30",
                "cor": ['Laranja', 'Preto'],
                "tamanho": ['U', '36', '38'],
                "cod": "5"
            },
            {
                "nome": "CASACO PELOS",
                "preco": "398.00",
                "parcela": "até 5x de R$30,00",
                "cor": ['Rosa', 'Branco'],
                "tamanho": ['36', '38', '40'],
                "cod": "6"
            },
            {
                "nome": "CROPPED STRIPES",
                "preco": "120.00",
                "parcela": "até 3x de R$40,00",
                "cor": ['Laranja', 'Amarelo'],
                "tamanho": ['38', '40', '42'],
                "cod": "7"
            },
            {
                "nome": "CAMISA TRANSPARENTE",
                "preco": "398.00",
                "parcela": "até 5x de R$30,00",
                "cor": ['Preto', 'Laranja'],
                "tamanho": ['40', '42', '44'],
                "cod": "8"
            },
            {
                "nome": "POCHETE CLUTH",
                "preco": "99.00",
                "parcela": "até 3x de R$33,00",
                "cor": ['Preto', 'Verde'],
                "tamanho": ['42', '44', '46'],
                "cod": "9"
            },
            {
                "nome": "CAMISA MESCLA V2",
                "preco": "56.00",
                "parcela": "até 3x de R$18,66",
                "cor": ['Branco', 'Vermelho'],
                "tamanho": ['44', '46', 'P'],
                "cod": "10"
            },
            {
                "nome": "SAIA DE COURO V2",
                "preco": "796.00",
                "parcela": "até 5x de R$60,00",
                "cor": ['Preto', 'Rosa'],
                "tamanho": ['46', 'P', 'M'],
                "cod": "11"
            },
            {
                "nome": "CARDIGAN TIGRE V2",
                "preco": "796.00",
                "parcela": "até 5x de R$60,00",
                "cor": ['Laranja', 'Preto'],
                "tamanho": ['P', 'M', 'G'],
                "cod": "12"
            },
            {
                "nome": "CARDIGAN OFF WHITE V2",
                "preco": "199.80",
                "parcela": "até 3x de R$66,60",
                "cor": ['Branco', 'Preto'],
                "tamanho": ['M', 'G', 'U'],
                "cod": "13"
            },
            {
                "nome": "BODY LEOPARDO V2",
                "preco": "259.80",
                "parcela": "até 3x de R$66,60",
                "cor": ['Laranja', 'Preto'],
                "tamanho": ['G', 'U', '36'],
                "cod": "14"
            },
            {
                "nome": "CASACO PELOS V2",
                "preco": "796.00",
                "parcela": "até 5x de R$60,00",
                "cor": ['Rosa', 'Vinho'],
                "tamanho": ['U', '36', '38'],
                "cod": "15"
            },
            {
                "nome": "CROPPED STRIPES V2",
                "preco": "240.00",
                "parcela": "até 3x de R$80,00",
                "cor": ['Laranja', 'Azul'],
                "tamanho": ['36', '38', '40'],
                "cod": "16"
            },
            {
                "nome": "CAMISA TRANSPARENTE",
                "preco": "796.00",
                "parcela": "até 5x de R$60,00",
                "cor": ['Preto', 'Vinho'],
                "tamanho": ['40', '42', '44'],
                "cod": "17"
            },
            {
                "nome": "POCHETE CLUTH V2",
                "preco": "199.00",
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
            $('#produtos1').append("<div class='prod'><img src='images/" + prod.p[arr[i]].cod + ".png' alt=''><h2>" + prod.p[arr[i]].nome + "</h2><h3>R$ " + prod.p[arr[i]].preco.replace('.', ',') + "</h3><p>" + prod.p[arr[i]].parcela + "</p><div class='button2' data-cod='" + prod.p[arr[i]].cod + "'><h1>Comprar</h1></div></div>")

            if (i == 8) {
                $('#produtos1').append(" <div id='mais1' class='mais'><p> Carregar Mais </p></div>");
                $('#produtos1').append("<div id='produtos2' class='produtos'></div>");
            }
        }

        if (i > 8) {


            $('#produtos2').append("<div class='prod'><img src='images/" + prod.p[arr[i]].cod + ".png' alt=''><h2>" + prod.p[arr[i]].nome + "</h2><h3>R$ " + prod.p[arr[i]].preco.replace('.', ',') + "</h3><p>" + prod.p[arr[i]].parcela + "</p><div class='button2' data-cod='" + prod.p[arr[i]].cod + "'><h1>Comprar</h1></div></div>")

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

        if (pcar == 0) {
            $('.prods').css('display', 'none');
        }
    }

    // manipulação localStorage
    $(".button2").on('click', function () {
        var x = $(this).attr('data-cod');

        prodcar[pcar] = prod.p[x - 1];

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



    // PAGINA SEU CARRINHO

    // abrir pagina
    var gerou = 0;

    $('#bag').on('click', function () {

        geracar();

        $('#carrinho').css('top', '0%');

        setTimeout(function () {

            $('#carrinho').css('opacity', '1');
        }, 300);
    });

    // fechar pagina

    $('#close-car').on('click', function () {
        $('#carrinho').css('opacity', '0');

        setTimeout(function () {

            $('#carrinho').css('top', '-100%');
        }, 300);
    });

    // gerar produtos na pagina
    function geracar() {

        $('#ur-car').html('');
        // console.log('\n\n GERACAR');
        var lisprod = prodcar;
        var soma = 0;

        for (var i = 0; i < pcar; i++) {

            $('#ur-car').append('<div class="carr-prod" ><img src="images/' + lisprod[i].cod + '.png" alt=""><div class="carr-txt" ><h1>' + lisprod[i].nome + '</h1> <h2> R$ ' + lisprod[i].preco.replace('.', ',') + '</h2> <h3>' + lisprod[i].parcela + '</h3> </div> <div id="excluir" class="cp-ex" data-id="' + i + '" ><div class="fclose" > </div> </div> </div>');

            // soma += parseFloat(lisprod[i].preco);
            soma += parseFloat(lisprod[i].preco);
            //  console.log('\n item: ', lisprod[i]);
        };


        $('.carr-txt2 h1').html('Valor Total R$ ' + soma.toFixed(2).replace('.', ','));

    }

    //geracar();
    // 

    // excluir produto

    $(document).on('click', '#excluir', function () {
        var data = $(this).attr('data-id');
        // console.log(data);
        var data = parseInt(data);
        prodcar.splice(data, 1);

        pcar -= 1;

        localStorage.setItem('qtdx', JSON.stringify(pcar));
        //console.log('\qtd final : ', pcar);

        localStorage.setItem('lista', JSON.stringify(prodcar));
        //console.log('\nlista : ', prodcar);
        geracar();
        prods();
    });




    // FILTRAR 


    // TODOS

    var listacores = [];
    listacores.push(0);

    console.log('\n LISTA CORES: ', listacores[0]);

    // NÃO FUNCIONA
    // $("input:radio").on('click', function () {

    //     if ($(this).is(':checked')) {
    //         console.log('\n - valores 1 ' + this.id);

    //         var id11 = $("input:radio[name='cores']:checked").id;
    //         var id22 = $("input:radio[name='tamanhos']:checked").id;
    //         var id33 = $("input:radio[name='valores']:checked").id;


    //         var num = this.id;

    //         var num2 = parseFloat(id33);

    //         var a, b, c;


    //         switch (num2) {
    //             case 50:
    //                 {
    //                     a = 0;
    //                     b = 50;
    //                     break;
    //                 }

    //             case 150:
    //                 {
    //                     a = 51;
    //                     b = 150;
    //                     break;
    //                 }

    //             case 300:
    //                 {
    //                     a = 151;
    //                     b = 300;
    //                     break;
    //                 }

    //             case 500:
    //                 {
    //                     a = 301;
    //                     b = 500;
    //                     break;
    //                 }

    //             case 501:
    //                 {
    //                     c = 501;
    //                     break;
    //                 }
    //         }

    //         var valor;
    //         var valorx

    //         $('#produtos1').html('');
    //         for (var i = 0; i < 18; i++) {

    //             valor = prod.p[i].tamanho[0];
    //             valor2 = prod.p[i].tamanho[1];
    //             valor3 = prod.p[i].tamanho[2];

    //             valorx = prod.p[i].preco;

    //             if (id11 == prod.p[i].cor[0] || id11 == prod.p[i].cor[1] || id22 == valor || id22 == valor2 || id22 == valor3 || a < valorx && valorx < b || valorx > c) {

    //                 $('#produtos1').append("<div class='prod'><img src='images/" + prod.p[i].cod + ".png' alt=''><h2>" + prod.p[i].nome + "</h2><h3>R$ " + prod.p[i].preco.replace('.', ',') + "</h3><p>" + prod.p[i].parcela + "</p><div class='button2' data-cod='" + prod.p[i].cod + "'><h1>Comprar</h1></div></div>");
    //             }
    //         }

    //     }
    // });

    // CORES

    $("input:radio[name='cores']").change(function () {
        if ($(this).is(':checked')) {
            console.log('\n - valores 1 ' + this.id);

            $('#produtos1').html('');
            for (var i = 0; i < 18; i++) {
                if (this.id == prod.p[i].cor[0] || this.id == prod.p[i].cor[1]) {
                    console.log('\n id:', prod.p[i].nome);
                    $('#produtos1').append("<div class='prod'><img src='images/" + prod.p[i].cod + ".png' alt=''><h2>" + prod.p[i].nome + "</h2><h3>R$ " + prod.p[i].preco.replace('.', ',') + "</h3><p>" + prod.p[i].parcela + "</p><div class='button2' data-cod='" + prod.p[i].cod + "'><h1>Comprar</h1></div></div>");
                }
            }
        }
    });

    // TAMANHO

    $("input:radio[name='tamanhos']").change(function () {
        if ($(this).is(':checked')) {
            console.log('\n - valores 1 ' + this.id);

            var num = this.id;

            $('#produtos1').html('');

            for (var i = 0; i < 18; i++) {

                valor = prod.p[i].tamanho[0];
                valor2 = prod.p[i].tamanho[1];
                valor3 = prod.p[i].tamanho[2];

                if (this.id == valor || this.id == valor2 || this.id == valor3) {
                    console.log('\n id:', prod.p[i].nome);
                    $('#produtos1').append("<div class='prod'><img src='images/" + prod.p[i].cod + ".png' alt=''><h2>" + prod.p[i].nome + "</h2><h3>R$ " + prod.p[i].preco.replace('.', ',') + "</h3><p>" + prod.p[i].parcela + "</p><div class='button2' data-cod='" + prod.p[i].cod + "'><h1>Comprar</h1></div></div>");
                }
            }
        }
    });


    // VALORES

    $("input:radio[name='valores']").change(function () {
        if ($(this).is(':checked')) {
            // console.log('\n - valores 1 ' + this.id);

            var num2 = parseFloat(this.id);

            var a, b, c;


            switch (num2) {
                case 50:
                    {
                        a = 0;
                        b = 50;
                        break;
                    }

                case 150:
                    {
                        a = 51;
                        b = 150;
                        break;
                    }

                case 300:
                    {
                        a = 151;
                        b = 300;
                        break;
                    }

                case 500:
                    {
                        a = 301;
                        b = 500;
                        break;
                    }

                case 501:
                    {
                        c = 501;
                        break;
                    }
            }

            var valorx;
            // console.log('\n - valores 2 ' + valor);

            $('#produtos1').html('');
            for (var i = 0; i < 18; i++) {

                valorx = prod.p[i].preco;

                // console.log('\n', a, ' - ', b, ' - ', valor);
                if (a < valorx && valorx < b) {
                    console.log('\n id:', prod.p[i].nome);
                    $('#produtos1').append("<div class='prod'><img src='images/" + prod.p[i].cod + ".png' alt=''><h2>" + prod.p[i].nome + "</h2><h3>R$ " + prod.p[i].preco.replace('.', ',') + "</h3><p>" + prod.p[i].parcela + "</p><div class='button2' data-cod='" + prod.p[i].cod + "'><h1>Comprar</h1></div></div>")

                }

                if (valorx > c) {
                    console.log('\n id:', prod.p[i].nome);
                    $('#produtos1').append("<div class='prod'><img src='images/" + prod.p[i].cod + ".png' alt=''><h2>" + prod.p[i].nome + "</h2><h3>R$ " + prod.p[i].preco.replace('.', ',') + "</h3><p>" + prod.p[i].parcela + "</p><div class='button2' data-cod='" + prod.p[i].cod + "'><h1>Comprar</h1></div></div>")

                }
            }
        }
    });


    // ESVAZIAR CARRINHO 


    $('#ecar-but').on('click', function () {
        prodcar = [];
        pcar = 0;

        localStorage.setItem('qtdx', JSON.stringify(pcar));
        localStorage.setItem('lista', JSON.stringify(prodcar));

        geracar();
        prods();
    });




    //  LIMPAR FILTROS

    //  LIMPAR FILTROS
    // não funciona
    $('input:radio').on('click', function () {

        $('.rad').each(function () {
            $(this).attr('checked', false);
        });
    });


    // ORDENAR 

    $('.button4').on('click', function () {

        var lista = [];

        $('.button2').each(function () {
            lista.push($(this).attr('data-cod'));
        });

        $('#produtos1').html('');
        jQuery.each(lista, function (key, val) {
            $('#produtos1').append("<div class='prod'><img src='images/" + prod.p[arr[val]].cod + ".png' alt=''><h2>" + prod.p[arr[val]].nome + "</h2><h3>R$ " + prod.p[arr[val]].preco.replace('.', ',') + "</h3><p>" + prod.p[arr[val]].parcela + "</p><div class='button2' data-cod='" + prod.p[arr[val]].cod + "'><h1>Comprar</h1></div></div>");

        })
    });

});