import { ClearFilterModal } from "../models/ClearFilterModal";
import { ClearFilterView } from "../views/ClearFilterView";

export class ClearFilterController {
    index(){
        let arrayElement;

        $(".footer-buttons .clear").on("click", async function(){
            arrayElement = await ClearFilterModal();

            ClearFilterView(arrayElement);
        });
    }
}