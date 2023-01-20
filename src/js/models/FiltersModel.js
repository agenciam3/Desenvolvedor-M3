import { ajaxReqProducts } from "../libs/ajaxReqProducts";

export async function FilterModel(value, key) {
    const arrData = await ajaxReqProducts();
    const arrFilted = [];

    if(key === "color"){
        for(let i =0; i < arrData.length; i++){
            for(let j =0; j < value.length; j++){
                if(arrData[i][key] === value[j]){
                    arrFilted.push(arrData[i]);
                }
            }
        }
    } else if (key === "size"){
        for(let i =0; i < arrData.length; i++){
            for(let j =0; j < value.length; j++){
                for(let k =0; k < arrData[i][key].length; k++){
                    if(arrData[i][key][k] === value[j]){
                        arrFilted.push(arrData[i]);
                    }
                }
            }
        }
    } else if (key === "price"){
        for(let i =0; i < arrData.length; i++){
            for(let j =0; j < value.length; j++){
                let [lessPrice, maxPrice] = value[j].split("-");
                if(maxPrice != "all"){
                    if(arrData[i][key] >= parseInt(lessPrice) && arrData[i][key] < parseInt(maxPrice)){
                        arrFilted.push(arrData[i]);
                    }
                } else {
                    if(arrData[i][key] > parseInt(lessPrice)){
                        arrFilted.push(arrData[i]);
                    }
                }
            }
        }
    }

    return arrFilted;
}