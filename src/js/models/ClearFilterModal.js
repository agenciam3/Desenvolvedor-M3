import { ajaxReqProducts } from "../libs/ajaxReqProducts";
import { elementCreate } from "../libs/elementCreate";

export async function ClearFilterModal(){
    const allList = await ajaxReqProducts();

    return elementCreate(allList);
}