import { API , url , obj} from "./modules/Api";
import createList from "./modules/CreateList";
import { Loader } from "./modules/Loader";
import {renderList} from "./modules/renderList";
import filterColors from "./modules/filterColors";
import Lista from "./modules/Lista";
import {icon , menus, cores, tamanhos, preço} from "./modules/variaveis"
import filterMobile,{ mobileColors, mobileSize, mobilePrice, mobileFilterMenu} from "./modules/mobileMenu";
import removerClass,{ removerClassTamanho } from "./modules/removerClass";
import {addClassUlColor, addClassUlSize, addClassUlPrice} from "./modules/mobileMenuSelect";
import FilterOrder from "./modules/FilterOrder";


const headerIcon = document.querySelector("#icon");
const mainHeader = document.querySelector(".main-header h1");
mainHeader.innerHTML = "Blusas";
headerIcon.innerHTML += icon; 

menus.map((key) => {
    Lista(key.h3, key.array, key.className)
});

const body = document.querySelector("body");

body.addEventListener("mouseover", (e) => {
    if(e.target.name === "Ordenar Itens"){
       e.target.children[0].style.display = "none";
    } 
})

Loader();
renderList();

const liFilter = document.querySelectorAll(".filtrar");

liFilter.forEach(key => key.addEventListener("click", async ()=>{
    removerClassTamanho()
    removerClass(liFilter)
    if(!key.parentElement.classList.contains("menu-options-tamanhos")){
        key.children[0].children[0].classList.toggle("select-hidden")
    }
    if(key.parentElement.classList.contains("menu-options-tamanhos")){
        key.classList.toggle("select-hidden-tamanhos")
    }
     filterColors(key)
}))

const OrderValues = document.querySelector(".OrderValues");

OrderValues.addEventListener("change", FilterOrder)

const mobileFilter = document.querySelector(".mobile-filter");
const options = document.querySelector(".options")
mobileFilter.addEventListener("click", mobileFilterMenu)

body.addEventListener("click", async (e) => {
    const mobileFilterOptions = document.querySelector(".mobile-filter-options");
    const ulColor = document.querySelector(".ul-color-filter");
    const ulSize = document.querySelector(".ul-size-filter");
    const ulPrice = document.querySelector(".ul-price-filter");
    const idTamanhos = document.querySelector("#id-tamanhos");
    const idPreco = document.querySelector("#id-preço");
    const className = ["color-filter", "size-filter", "price-filter"];
    let checkValue = [e.target.parentElement.children[0].innerText, e.target.parentElement.children[1].innerText]
    const loader = document.querySelector(".loader");

    mobileColors(e, checkValue, cores, mobileFilterOptions, idTamanhos, className[0],addClassUlColor)
    mobileSize(e, checkValue, tamanhos, mobileFilterOptions, idPreco, className[1], addClassUlSize)
    mobilePrice(e, checkValue, body, options, loader, mobileFilterOptions, preço, idPreco, ulPrice, addClassUlPrice,ulColor, ulSize)
}) 
function mobileButtonOrder(){
    const containerFilter = document.querySelector(".container-filter");
    const button = document.createElement("button");
    button.classList.add("button-order-mobile");
    button.onclick = mobileButton;
    button.innerText = "Ordenar Por:";
    containerFilter.appendChild(button);
}
mobileButtonOrder()
function mobileButton(){
   
   const body = document.querySelector("body");
   const div = document.createElement("div");
   div.classList.add("mobile-menu-button");
   const ul = document.createElement("ul");
   const arrLi = ["Ordenar Por:", "Mais recente", "Menor Preço", "Maior Preço"];
   arrLi.map((value,index) => {
       const li = document.createElement("li")
       li.innerText = value;
       li.onclick = mobileOrderFilter;
       if(index < 1 ){
        const button = document.createElement("button");
        button.onclick = mobileUlMenu;
        button.innerHTML = "X";
        li.appendChild(button);
       }
       ul.appendChild(li);
   })
  div.appendChild(ul);
  body.appendChild(div);
}
function mobileUlMenu(){
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    body.removeChild(mobileMenuButton);
}

async function mobileOrderFilter(e){
    const ul = document.querySelector("#options-ul");
    const dados = await API(url);
    const loader = document.querySelector(".loader");
    loader.style.display = "none";
    if(e.target.innerText === "MAIS RECENTE"){
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
    if(e.target.innerText === "MAIOR PREÇO"){
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
    if(e.target.innerText === "MENOR PREÇO"){
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
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    body.removeChild(mobileMenuButton); 
}
    

