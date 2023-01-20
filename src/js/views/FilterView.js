import { activeCardForBuy } from "../libs/activeCardForBuy";
import { moreButton } from "../libs/moreButton";
import { load, notFound } from "../libs/defaultFilted";
import { elementCreate } from "../libs/elementCreate";
import { saveProductsList } from "../libs/productsList";

export function FilterView(statusChecked, arrFiltedProducts){
    var arrayElement;

    const areaResult = $(".elements");

    if (statusChecked) {
        $(areaResult).addClass("loading");
        $(areaResult).removeClass("notFound");
        $(areaResult).empty();
        $(areaResult).append(load);

        saveProductsList(arrFiltedProducts);

        arrayElement = elementCreate(arrFiltedProducts);

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
}