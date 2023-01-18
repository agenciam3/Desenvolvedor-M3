import { ajaxReqProducts } from "./ajaxReqProducts";

export function addClass(idT) {
    if(idT + 1 >= 7 ){
        return "card-none";
    } else {
        return "";
    }
}

export async function filterProduct(value, key) {
    const arrData = await ajaxReqProducts();
    const arrFilted = [];

    for(let i =0; i < arrData.length; i++){
        for(let j =0; j < value.length; j++){
            if(arrData[i][key] === value[j]){
                arrFilted.push(arrData[i]);
            }
        }
    }

    return arrFilted;
}