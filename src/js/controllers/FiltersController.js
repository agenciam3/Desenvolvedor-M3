import { CheckedInputsModal } from "../models/CheckedInputsModal";
import { FilterModel } from "../models/FiltersModel";
import { FilterView } from "../views/FilterView";

export class FilterController {
    colors() {
        const inputCors = $(".input-cors input");

        $(inputCors).on("click", async function(){
            let statusChecked = $(this)[0].checked;
            let allCheckedInputs = CheckedInputsModal(".input-cors");
            let arrFiltedProducts = await FilterModel(allCheckedInputs, "color");

            FilterView(statusChecked, arrFiltedProducts);
        });
    }

    sizes(){
        const inputCors = $(".input-size input");

        $(inputCors).on("click", async function(){
            let statusChecked = $(this)[0].checked;
            let allCheckedInputs = CheckedInputsModal(".input-size");
            let arrFiltedProducts = await FilterModel(allCheckedInputs, "size");

            FilterView(statusChecked, arrFiltedProducts);
        });
    }

    prices(){
        const inputCors = $(".input-price-range input");

        $(inputCors).on("click", async function(){
            let statusChecked = $(this)[0].checked;
            let allCheckedInputs = CheckedInputsModal(".input-price-range");
            let arrFiltedProducts = await FilterModel(allCheckedInputs, "price");

            FilterView(statusChecked, arrFiltedProducts);
        });
    }

    start(){
        this.colors();
        this.prices();
        this.sizes();
    }
}