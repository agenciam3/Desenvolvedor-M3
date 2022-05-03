import {API, url} from "./Api";
import createList from "./CreateList";
export default async function FilterOrder(e){
    const ul = document.querySelector("#options-ul");
    const dados = await API(url);
    if(e.target.value === "Mais recente"){
        const array = dados.sort((a, b ) => {
            if(a.date < b.date){
                return 1
            }
            if(a.date > b.date){
                return -1
            }
            return 0
        })
        ul.innerHTML = "";
        array.map(key => createList(key))
    }
    if(e.target.value === "Maior Preço"){
        const array = dados.sort((a, b ) => {
            if(a.price < b.price){
                return 1
            }
            if(a.price > b.price){
                return -1
            }
            return 0

        })
        ul.innerHTML = "";
        array.map(key => createList(key))
    }
    if(e.target.value === "Menor Preço"){
         const array = dados.sort((a, b ) => {
            if(a.price < b.price){
                return -1
            }
            if(a.price > b.price){
                return 1
            }
            return 0

        })
        ul.innerHTML = "";
        array.map(key => createList(key))
    }
}