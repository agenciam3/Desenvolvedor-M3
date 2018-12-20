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
                    // $('#optbut').css('height', '46px');
                    break;
                }

            case 'fc2':
                {
                    size = '180px';
                    //  $('#optbut').css('height', '46px');
                    break;
                }

            case 'fc3':
                {
                    size = '292px';
                    // $('#optbut').css('height', '46px');
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
});