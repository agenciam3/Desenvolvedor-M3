function mbSelectOpen(select_key){
    var options_dic = {
        'mb_filter': 'mb_filter_open',
        'mb_order': 'mb_order_open'
    }
    var select_open = document.getElementById(options_dic[select_key]);

    if (select_open.style.display === "block") {
        select_open.style.display = "none";
    }else {
        select_open.style.display = "block";
    }

}

