export function saveProductsList(arr){
    const arrString = JSON.stringify(arr);

    localStorage.setItem("@M3Store_ListProduct", arrString);
}

export function getProductsList(){
    const stringList = localStorage.getItem("@M3Store_ListProduct");

    return JSON.parse(stringList);
}