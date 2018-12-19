$(document).ready(function () {


    $('#filt').on('click', function () {

        $('#opcoes').css('left', '0%');
        $('#filtrar').css('left', '0%');
    });

    $('#ord').on('click', function () {

        $('#opcoes').css('left', '0%');
        $('#ordenar').css('left', '0%');
    });

    $('.fcjs').on('click', function () {

        $('#opcoes').css('left', '-100%');
        $('#ordenar').css('left', '-100%');
        $('#filtrar').css('left', '-100%');
    });

    $('.fcjs2').on('click', function () {

        var id = $(this).attr('id');

        $(this).toggleClass('fclose2');

        var size;
        switch (id) {
            case 'fc1':
                {
                    size = '1190px';
                    break;
                }

            case 'fc2':
                {
                    size = '408px';
                    break;
                }

            case 'fc3':
                {
                    size = '595px';
                    break;
                }
        }

        var tam = $('.' + id).css('height');

        if (tam != '0px') {
            size = '0px';
        }

        $('.' + id).css('height', size);

    });
});