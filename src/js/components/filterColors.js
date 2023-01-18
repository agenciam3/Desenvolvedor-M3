import { load, notFound } from "../libs/defaultFilted";
import { elementCreate } from "../libs/elementCreate";
import { filterProduct } from "../libs/filterSearch";

function checkedInputs(){
    const inputCors = $(".input-cors input");

    let arr = [];

    $(inputCors).each(function(key, element){
        if($(element)[0].checked){
            arr.push($(element)[0].defaultValue)
        }
    });

    return arr;
}

export function filterColors() {
    var arrFiltedProducts,
        arrayElement;

    const areaResult = $(".elements");
    const inputCors = $(".input-cors input");

    $(inputCors).on("click", async function () {
        let statusChecked = $(this)[0].checked;
        let allCheckedInputs = checkedInputs();

        if (statusChecked) {
            $(areaResult).addClass("loading");
            $(areaResult).removeClass("notFound");
            $(areaResult).empty();
            $(areaResult).append(load);

            arrFiltedProducts = await filterProduct(allCheckedInputs, "color");

            arrayElement = elementCreate(arrFiltedProducts);

            setTimeout(function () {
                $(areaResult).empty();
                $(areaResult).removeClass("loading");

                if (arrayElement.length > 0) {
                    arrayElement.forEach(element => {
                        $(areaResult).append(document.createRange().createContextualFragment(element));
                    });
                } else {
                    $(areaResult).addClass("notFound");
                    $(areaResult).append(notFound);
                }
            }, 2000);
        }
    });
}