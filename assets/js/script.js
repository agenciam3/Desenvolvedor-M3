$(document).ready(function(){
    // MAIN SCRIPT
    // Exibe os produtos na tela no carregamento do site
    var produtos_tela = products;
    var carrinho = [];
    listaProdutos(produtos_tela);

    //CARRINHO
    $('body').on('click', '.body_products_item_info_buy_button', function() {
        var id = $(this).parent().data('id');
        var qtdProdutos = products.length;
        for(i=0; i < qtdProdutos; i++){
            if(id==products[i].id){
                carrinho.push(products[i])
            }
        }
        $('.header_content_cart_box_counter>span').text(carrinho.length);
    })

    //SUBMIT FILTROS
    $('#form_filters').submit(function(e){
        e.preventDefault();
        // Instância de variáveis
        var estoque_filtrado = products;
        var cores_selecionadas = [];
        var tamanhos_selecionados = [];
        var range_selecionados = [];
        $('#form_filters input[name=color]:checked').each(function(){
            cores_selecionadas.push($(this).val());
        })
        $('#form_filters input[name=size]:checked').each(function(){
            tamanhos_selecionados.push($(this).val());
        })
        $('#form_filters input[name=range_price]:checked').each(function(){
            range_selecionados.push($(this).val());
        })
        if(cores_selecionadas.length>0){
            var estoque_filtrado = filtraProdutosCor(estoque_filtrado, cores_selecionadas);
        }
        if(tamanhos_selecionados.length>0){
            var estoque_filtrado = filtraProdutosTamanho(estoque_filtrado, tamanhos_selecionados);
        }
        if(range_selecionados.length>0){
            var estoque_filtrado = filtraProdutosPreco(estoque_filtrado, range_selecionados);
        }

        var ordem = $('.body_content_custom_select_options').data('order')
        if(ordem != 0){
            var estoque_ordenado = ordenaProdutos(ordem, estoque_filtrado);
        }else{
            var estoque_ordenado = estoque_filtrado;
        }

        if(estoque_ordenado.length > 0){
            listaProdutos(estoque_ordenado);
        }else{
            $('.body_products_box').empty();
            $('.body_products_box').append('<div class="body_products_box_no_content"><h3> Não há produtos com essas características :( </h3></div>');
            
        }
        produtos_tela = estoque_ordenado;
        if($(document).width() < 860){
            $('.body_sidebar_filters').removeClass('filter_mobile_active');
            $('body').css('overflow-y', '');
        }

    })
     
    // Menus mobile
    $('.body_content_header_mobile_filter').on('click', function(){
        $('.body_sidebar_filters').addClass('filter_mobile_active')
        $('body').css('overflow-y', 'hidden');
    })
    $('.header_filter_mobile_close').on('click', function(){
        $('.body_sidebar_filters').removeClass('filter_mobile_active')
        $('body').css('overflow-y', '');
    })
    $('.body_content_header_mobile_ordenar').on('click', function(){
        $('.body_content_header_order_products_mobile').addClass('filter_mobile_active');
        $('body').css('overflow-y', 'hidden');
    })
    $('.header_order_mobile_close').on('click', function(){
        $('.body_content_header_order_products_mobile').removeClass('filter_mobile_active');
        $('body').css('overflow-y', '');
    })
    $('.body_sidebar_content_order_option').on('click', function(){
        $('.body_content_header_order_products_mobile').removeClass('filter_mobile_active');
        $('.body_content_custom_select>div.body_content_custom_select_box>span>p').text($(this).children().text())
        $('body').css('overflow-y', '');
        $('.body_content_custom_select_options').data('order', $(this).find('span').data('order'))
        var produtos_ordenados = ordenaProdutos($(this).find('span').data('order'), produtos_tela);
        listaProdutos(produtos_ordenados);

    })
    //Filter dropdown

    $('.body_siderbar_filters_title').on('click', function(){
        if($(document).width() < 860){
            $(this).siblings().slideToggle(200);
            $(this).find('.circle-plus').toggleClass('opened');
        }
    })
    //Clear filter mobile
    $('.body_sidebar_clear_mobile').on('click', function(){
        $('#form_filters').find(':checkbox').prop('checked', false);
    })

    // Custom Select
    $('.body_content_custom_select_box').on('click', function(){
        $(this).parent().toggleClass('custom_select_open');
        $('.body_content_custom_select_options').slideToggle(200);
    })
    $('.body_content_custom_select_options>div').on('click', function(){
        $('.body_content_custom_select>div.body_content_custom_select_box>span>p').text($(this).children().text())
        $('.body_content_custom_select').removeClass('custom_select_open');
        $('.body_content_custom_select_options').slideToggle(200);
        // alert($(this).find('span').data('order'));
        $('.body_content_custom_select_options').data('order', $(this).find('span').data('order'))
        var produtos_ordenados = ordenaProdutos($(this).find('span').data('order'), produtos_tela);
        listaProdutos(produtos_ordenados);
        
    })
    // Carregar mais
    $('body').on('click', '.body_products_load_more_box', function () {
        $(".body_products_item:hidden").slice(0, 6).slideDown(100);
        if ($(".body_products_item:hidden").length == 0) {
            $(".body_products_load_more_box").fadeOut(300);
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
    });
    // Exibir mais cores
    $('.body_sidebar_show_all_colors').on('click', function(){
        $('.body_sidebar_drop_color').slideToggle(200);
        $(this).find('img').toggleClass('opened');
        if($(this).find('img').hasClass('opened')){
            $('.body_sidebar_show_all_colors').find('span').text('Ver menos cores');
        }else{
            $('.body_sidebar_show_all_colors').find('span').text('Ver todas as cores');
        }
    })
    
})