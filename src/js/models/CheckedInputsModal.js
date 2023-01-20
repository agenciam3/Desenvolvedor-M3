export function CheckedInputsModal(key){
    const arrInputs = [".input-price-range", ".input-cors", ".input-size"];

    arrInputs.forEach(function(e){
        if(e !== key && e !== undefined){
            $(`${e} input`).prop("checked", false);
        }
    });

    let arr = [];

    $(`${key} input`).each(function(k, element){
        if($(element)[0].checked){
            arr.push($(element)[0].defaultValue)
        }
    });

    return arr;
}