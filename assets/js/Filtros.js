function filtraProdutosCor(produtos, colors){
    var estoque_filtrado = [];
    var tamanho_estoque = produtos.length;
    var length_cores = colors.length;
    for(i=0; i < tamanho_estoque; i++){
        var verifica_insercao = 0;
        for(j=0; j < length_cores; j++){
            for(k=0; k < produtos[i].color.length; k++){
                if(colors[j] == produtos[i].color[k] && verifica_insercao == 0){
                    estoque_filtrado.push(produtos[i]);
                    verifica_insercao = 1;  
                }
            }
        }
    }
    return estoque_filtrado;
}
function filtraProdutosTamanho(produtos, sizes){
    var estoque_filtrado = [];
    var tamanho_estoque = produtos.length;
    var length_tamanhos = sizes.length;
    for(i=0; i < tamanho_estoque; i++){
        for(j=0; j < length_tamanhos; j++){
            if(produtos[i].size == sizes[j]){
                estoque_filtrado.push(produtos[i]);
            }
        }
    }
    return estoque_filtrado;
}
function filtraProdutosPreco(produtos, ranges){
    var estoque_filtrado = [];
    var tamanho_estoque = produtos.length;
    var length_range = ranges.length;
    for(i=0; i < tamanho_estoque; i++){
        for(j=0; j < length_range; j++){
            if(ranges[i] != 501){
                var range = ranges[j].split("-");
                if(range[0] <= produtos[i].price && range[1] >= produtos[i].price){
                    estoque_filtrado.push(produtos[i]);
                }
            }else{
                if(produtos[i].price >= ranges[j]){
                    estoque_filtrado.push(produtos[i]);
                }
                
            }
        }
    }
    return estoque_filtrado;
}

    
    
