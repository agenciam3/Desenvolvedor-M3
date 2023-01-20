import { ajaxReqProducts } from "../libs/ajaxReqProducts";
import { elementCreate } from "../libs/elementCreate";

export async function clearFilter(){
    const inputSize = $(".input-size input");
    const inputCors = $(".input-cors input");
    const inputPrices = $(".input-price-range input");
    const areaResult = $(".elements");

    let arrayElement;

    $(".footer-buttons .clear").on("click", async function(){
        $(inputPrices).prop("checked", false);
        $(inputCors).prop("checked", false);
        $(inputSize).prop("checked", false);

        const allList = await ajaxReqProducts();

        arrayElement = elementCreate(allList);

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
    });
}