import { addClass } from "../libs/filterSearch";
import { activeCardForBuy } from "./activeCardForBuy";
import { moreButton } from "./moreButton";
import { orderMethod } from "./orderProducts";

export function orderProductsMobile(){
    $(".main-content-order span").on("click", function(){
        let val = $(this).attr("data-value");

        let arrList = orderMethod(val);

        $(".elements").empty();

        $(arrList).each(function(key, element){
            $(element).removeClass("card-none");

            $(element).addClass(addClass(key));

            $(".elements").append(element)
        });

        activeCardForBuy();
        moreButton();
    });
}