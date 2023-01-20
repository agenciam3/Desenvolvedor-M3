import { activeCardForBuy } from "../libs/activeCardForBuy";
import { moreButton } from "../libs/moreButton";
import { addClass } from "../libs/filterSearch";

export function OrderView(arrList) {
    $(".elements").empty();

    $(arrList).each(function (key, element) {
        $(element).removeClass("card-none");

        $(element).addClass(addClass(key));

        $(".elements").append(element)
    });

    activeCardForBuy();
    moreButton();
}