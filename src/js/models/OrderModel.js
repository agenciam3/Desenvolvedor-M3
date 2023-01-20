export function OrderModel(key){
    const arrProducts = $(".elements li").clone();
    let arrAux;

    if(key === "lowest-price"){
        arrAux = $(arrProducts).sort(function(a, b){
            return $(a)[0].attributes["data-price"].value - $(b)[0].attributes["data-price"].value;
        });
    } else if(key === "biggest-price"){
        arrAux = $(arrProducts).sort(function(a, b){
            return $(b)[0].attributes["data-price"].value - $(a)[0].attributes["data-price"].value;
        });
    } else if(key === "more-recent") {
        arrAux = $(arrProducts).sort(function(a, b){
            let aDate = new Date($(a)[0].attributes["data-date"].value);
            let bDate = new Date($(b)[0].attributes["data-date"].value);

            return bDate.valueOf() - aDate.valueOf();
        });
    }
    
    return arrAux;
}