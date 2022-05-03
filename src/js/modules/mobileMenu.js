import mobileFilterApply,{mobileFilterClear} from "./mobileFilterApply"

export default function filterMobile(title, el, index){
    const headerDiv = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.innerHTML = title;
    const button = document.createElement("button");
    button.innerHTML = el;
    headerDiv.appendChild(h1);
    headerDiv.setAttribute('id', `${index}`);
    headerDiv.appendChild(button);
    headerDiv.classList.add(`mobile-menu-options`);
    return headerDiv;
}
function createMobileLi(e, option, mobileFilterOptions, id, className, func){
    e.target.parentElement.children[1].innerText = "^"
    const ul = document.createElement("ul");
    ul.classList.add(`ul-${className}`);
    option.map((key, index) => {
        const li = document.createElement("li");
        li.classList.add("filtrar");
        ul.appendChild(li);
        li.getAttribute("key", index);
        li.onclick =  func;
        li.innerHTML += 
        `   
            <div class="select-items">
                <div class="select select-hidden">
                </div>
            </div>
            <h6>${key}</h6>   
       
        `  });

       return mobileFilterOptions.insertBefore(ul, id)
      
}
export function mobileColors(e, checkValue, cores, mobileFilterOption, idColors, className, func){
    
    if(checkValue[0] === "CORES" && checkValue[1] === "˅"){
      return createMobileLi(e, cores, mobileFilterOption, idColors, className, func)
    }
}

export function mobileSize(e, checkValue, tamanhos, mobileFilterOptions, idSize, className, func){
    if(checkValue[0] === "TAMANHOS" && checkValue[1] === "˅"){
        return createMobileLi(e, tamanhos, mobileFilterOptions, idSize, className, func)
    }
}

/* export function mobilePrice(e, checkValue, preco, mobileFilterOptions, idCor, className){
    if(checkValue[0] === "FAIXA DE PREÇO" && checkValue[1] === "˅"){
        return createMobileLi(e, preco, mobileFilterOptions, idCor, className)
    }
} */

export function mobileFilterMenu(){
    const options = document.querySelector(".options")
    const loader = document.querySelector(".loader");
    const body = document.querySelector("body");
    const div = document.createElement("div");
    div.classList.add("mobile-filter-options");
    const divButton = document.createElement("div");
    divButton.classList.add("mobile-filter-options-button");
    const applyButton = document.createElement("button");
    const clearButton = document.createElement("button");
    applyButton.onclick = mobileFilterApply
    applyButton.innerHTML = "Aplicar";
    clearButton.innerHTML = "Limpar";
    clearButton.onclick = mobileFilterClear
    divButton.appendChild(applyButton);
    divButton.appendChild(clearButton);
    const arr = [ ["filtrar", "X", "id-filtrar"], ["Cores", "˅","id-cores"], ["Tamanhos", "˅","id-tamanhos"], ["Faixa de Preço", "˅", "id-preço"]];
    const optionsMenuMobile = arr.map(valeu => filterMobile(valeu[0], valeu[1], valeu[2]));
    optionsMenuMobile.map((key) => {div.appendChild(key)});    
    div.appendChild(divButton);
    body.appendChild(div);
    options.style.display = "none"
    loader.style.display = "none";
}

export function mobilePrice(e, checkValue, body, options, loader, mobileFilterOptions, preço, idPreco, ulPrice, addClassUlPrice, ulColor, ulSize){
    if( checkValue[1] === "X"){
        body.removeChild(mobileFilterOptions)
        options.style.display = "flex"
        loader.style.display = "block";
    }
    
    if(checkValue[0] === "CORES" && checkValue[1] === "^"){
          e.target.parentElement.children[1].innerText = "˅" 
          mobileFilterOptions.removeChild(ulColor)
     }
    if(checkValue[0] === "TAMANHOS" && checkValue[1] === "^"){
        e.target.parentElement.children[1].innerText = "˅" 
        mobileFilterOptions.removeChild(ulSize)
    }
    if(checkValue[0] === "FAIXA DE PREÇO" && checkValue[1] === "˅"){
            e.target.parentElement.children[1].innerText = "^"
            const ul = document.createElement("ul");
            ul.classList.add("ul-price-filter");
            preço.map((key, index) => {
                const li = document.createElement("li");
                li.classList.add("filtrar");
                li.onclick = addClassUlPrice;
                ul.appendChild(li);
                li.getAttribute("key", index);
                li.innerHTML += 
                `   
                    <div class="select-items">
                        <div class="select select-hidden">
                        </div>
                    </div>
                    <h6>${key}</h6>   
               
                `
        })
            idPreco.parentNode.insertBefore(ul, idPreco.nextSibling)
     }
     if(checkValue[0] === "FAIXA DE PREÇO" && checkValue[1] === "^"){
        e.target.parentElement.children[1].innerText = "˅" 
        mobileFilterOptions.removeChild(ulPrice)
   }
}
