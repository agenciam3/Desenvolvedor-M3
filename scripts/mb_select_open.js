function mbSelectOpen(select_key){
    var options_dic = {
        'mb_filter': 'mb_filter_open',
        'mb_order': 'mb_order_open'
    }
    var select_open = document.getElementById(options_dic[select_key]);
    var mb_products = document.getElementById('mb_products_content');

    if (select_open.style.display === "block") {
        select_open.style.display = "none";
        mb_products.style.display = 'flex'


    }else {
        select_open.style.display = "block";
        mb_products.style.display = 'none'

    }

}

