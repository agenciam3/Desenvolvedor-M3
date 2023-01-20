import { activeCardForBuy } from "../libs/activeCardForBuy";
import { moreButton } from "../libs/moreButton";
import { notFound } from "../libs/defaultFilted";

export function ClearFilterView(arrayElement){
    const areaResult = $(".elements");
    const arrInputs = [".input-size input", ".input-cors input", ".input-price-range input"];

    arrInputs.forEach(function(e){
        $(`${e}`).prop("checked", false);
    });

    setTimeout(function () {
        $(areaResult).empty();
        $(areaResult).removeClass("loading");

        if (arrayElement.length > 0) {
            arrayElement.forEach(element => {
                $(areaResult).append(document.createRange().createContextualFragment(element));
            });

            moreButton();
            activeCardForBuy();
        } else {
            $(areaResult).addClass("notFound");
            $(areaResult).append(notFound);
        }
    }, 2000);
}