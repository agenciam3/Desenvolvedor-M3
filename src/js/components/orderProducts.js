import { addClass } from "../libs/filterSearch";
import { activeCardForBuy } from "./activeCardForBuy";
import { moreButton } from "./moreButton";

function orderMethod(key){
    const arrProducts = $(".elements li").clone();
    let aux;

    if(key === "lowest-price"){
        aux = $(arrProducts).sort(function(a, b){
            return $(a)[0].attributes["data-price"].value - $(b)[0].attributes["data-price"].value;
        });
    } else if(key === "biggest-price"){
        aux = $(arrProducts).sort(function(a, b){
            return $(b)[0].attributes["data-price"].value - $(a)[0].attributes["data-price"].value;
        });
    } else if(key === "more-recent") {
        aux = $(arrProducts).sort(function(a, b){
            let aDate = new Date($(a)[0].attributes["data-date"].value);
            let bDate = new Date($(b)[0].attributes["data-date"].value);

            return bDate.valueOf() - aDate.valueOf();
        });
    }
    
    return aux;
}

export function orderProducts(){
    $("#smarthint-search-sort-select").on("change", function(){
        let val = $(this).val();
        let arrList = orderMethod(val);

        $(".elements").empty();

        $(arrList).each(function(key, element){
            $(element).removeClass("card-none");

            $(element).addClass(addClass(key));

            $(".elements").append(element)
        });

        activeCardForBuy();
        moreButton();
    })
}