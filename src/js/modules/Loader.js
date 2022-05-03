
import createList  from "./CreateList";
import { API, url } from "./Api";
export const Loader = () =>{
    const options = document.querySelector(".container-main");
    const div = document.createElement("div");
    div.classList.add("loader");
    options.appendChild(div);
    const button = document.createElement("button");
    button.innerHTML = "Carregar Mais";
    button.addEventListener("click", async () => {
        button.style.display = "none";
        const ul = document.querySelector("#options-ul")
        ul.innerHTML = "";
        const dados = await API(url);
        dados.map(key => createList(key));
    })
    div.appendChild(button);
    
}