import {API, url} from "./Api";
import createList from "./CreateList";

const body = document.querySelector("body");
export default async function mobileFilterApply(){
    const ulColor = document.querySelectorAll(".ul-color-filter .filtrar") !== null ? document.querySelectorAll(".ul-color-filter .filtrar") : [];
    const ulSize = document.querySelectorAll(".ul-size-filter .filtrar") !== null ? document.querySelectorAll(".ul-size-filter .filtrar") : [];
    const ulPrice = document.querySelectorAll(".ul-price-filter .filtrar") !== null ? document.querySelectorAll(".ul-price-filter .filtrar") : [];
    let filterColors;
    let filterSize;
    let filterPrice;
    const options = document.querySelector(".options");
    ulColor.forEach(key => {
        if(key.children[0].children[0].classList.value === "select"){
            return  filterColors = key.children[1].innerText
        }
    })
    ulSize.forEach(key => {
        if(key.children[0].children[0].classList.value === "select"){
            return  filterSize = key.children[1].innerText
        }
    })
    ulPrice.forEach(key => {
        if(key.children[0].children[0].classList.value === "select"){
            return  filterPrice = key.children[1].innerText
        }
    })
    const mobileFilterOptions = document.querySelector(".mobile-filter-options");
    const data = await API(url);
    let arr = []
    if(filterColors !== undefined && filterSize == undefined && filterPrice == undefined){
       
      arr = data.filter(key => key.color === filterColors)
    }
    if(filterColors == undefined && filterSize !== undefined && filterPrice == undefined){
       arr = data.filter(key => key.size[0] === filterSize || key.size[1] === filterSize)
    }
    if(filterColors == undefined && filterSize == undefined && filterPrice !== undefined){
        switch(filterPrice){
            case "de R$0 até R$50":
                arr = data.filter(key =>key.price > 0 && key.price <= 50);
                break;
            case "de R$51 até R$150":
                arr = data.filter(key =>key.price > 50 && key.price <= 150);
                  break;
            case "de R$151 até R$ 300":
                arr = data.filter(key =>key.price > 150 && key.price <= 300);
                break;
            case "de R$301 até R$500":
                arr = data.filter(key =>key.price > 300 && key.price <= 500);
                  break;
            case "a partir de R$500":
                arr = data.filter(key =>key.price > 500);
                break;
        }  
    }
    if(filterColors !== undefined && filterSize !== undefined && filterPrice == undefined){
       const arr1 = data.filter(key => key.color === filterColors)
       
       arr = arr1.filter(key => key.size[0] === filterSize || key.size[1] === filterSize)
    }
    if(filterColors !== undefined && filterSize == undefined && filterPrice !== undefined){
       const arr1 = data.filter(key => key.color === filterColors)
       
       switch(filterPrice){
        case "de R$0 até R$50":
            arr = arr1.filter(key =>key.price > 0 && key.price <= 50);
            break;
        case "de R$51 até R$150":
            arr = arr1.filter(key =>key.price > 50 && key.price <= 150);
              break;
        case "de R$151 até R$ 300":
            arr = arr1.filter(key =>key.price > 150 && key.price <= 300);
            break;
        case "de R$301 até R$500":
            arr = arr1.filter(key =>key.price > 300 && key.price <= 500);
              break;
        case "a partir de R$500":
            arr = arr1.filter(key =>key.price > 500);
            break;
    }  
    }
    if(filterColors == undefined && filterSize !== undefined && filterPrice !== undefined){
       const arr1 = data.filter(key => key.size[0] === filterSize || key.size[1] === filterSize)
      
       switch(filterPrice){
        case "de R$0 até R$50":
            arr = arr1.filter(key =>key.price > 0 && key.price <= 50);
            break;
        case "de R$51 até R$150":
            arr = arr1.filter(key =>key.price > 50 && key.price <= 150);
              break;
        case "de R$151 até R$ 300":
            arr = arr1.filter(key =>key.price > 150 && key.price <= 300);
            break;
        case "de R$301 até R$500":
            arr = arr1.filter(key =>key.price > 300 && key.price <= 500);
              break;
        case "a partir de R$500":
            arr = arr1.filter(key =>key.price > 500);
            break;
    }  
    }
    if(filterColors !== undefined && filterSize !== undefined && filterPrice !== undefined){
       const arr1 = data.filter(key => key.size[0] === filterSize || key.size[1] === filterSize)
       const arr2 = arr1.filter(key => key.color === filterColors )
       switch(filterPrice){
        case "de R$0 até R$50":
            arr = arr2.filter(key =>key.price > 0 && key.price <= 50);
            break;
        case "de R$51 até R$150":
            arr = arr2.filter(key =>key.price > 50 && key.price <= 150);
              break;
        case "de R$151 até R$ 300":
            arr = arr2.filter(key =>key.price > 150 && key.price <= 300);
            break;
        case "de R$301 até R$500":
            arr = arr2.filter(key =>key.price > 300 && key.price <= 500);
              break;
        case "a partir de R$500":
            arr = arr2.filter(key =>key.price > 500);
            break;
    }  
    }
    if(filterColors == undefined && filterSize == undefined && filterPrice == undefined){
        arr = data 
    }
    const ul = document.querySelector("#options-ul")
    ul.innerHTML = "";
    body.removeChild(mobileFilterOptions)
    options.style.display = "flex"
    const listScreen = arr.map(key=> key)
    if(listScreen.length === 0){
        ul.innerHTML = `<h1>Não temos nenhum produto com esses filtros</h1>`;
    }
     listScreen.map(key => createList(key)) 

}
export async function mobileFilterClear(){
    const data = await API(url);
    const mobileFilterOptions = document.querySelector(".mobile-filter-options");
    const options = document.querySelector(".options");
    const ul = document.querySelector("#options-ul");
    ul.innerHTML = "";
    data.map(key => createList(key))
    body.removeChild(mobileFilterOptions)
    options.style.display = "flex"
}
