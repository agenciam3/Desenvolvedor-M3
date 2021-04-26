function ordenaProdutos(sort, produtos){
    switch(sort){
        case 'value_desc':
            produtos.sort(function(a,b){
                if(a.price < b.price){
                    return 1;
                }
                if(a.price > b.price){
                    return -1;
                }
                return 0;
            })
            return(produtos);
            break;
        case 'value_asc':
            produtos.sort(function(a,b){
                if(a.price > b.price){
                    return 1;
                }
                if(a.price < b.price){
                    return -1;
                }
                return 0;
            })
            return(produtos);
            break;
        case 'new': 
            produtos.sort(function(a,b){
                var data_a = new Date((a.date).split('/').reverse().join('/'));
                var data_b = new Date((b.date).split('/').reverse().join('/'));
                if(data_a < data_b){
                    return 1;
                }
                if(data_a > data_b){
                    return -1;
                }
                return 0;
            })
            return(produtos);
            break;
    }

}
