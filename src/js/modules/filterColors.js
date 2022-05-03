import { API , url} from "./Api"
import  createList  from "./CreateList"



export async function readEvent (id){
    const dados = await API(url);
    const filtrar = id.children[1].innerHTML
    let filterDados = dados.filter(key =>key.color == filtrar || key.size[0] == filtrar || key.size[1] == filtrar);
    switch(filtrar){
        case "de R$0 até R$50":
            filterDados = dados.filter(key =>key.price > 0 && key.price <= 50);
            break;
        case "de R$51 até R$150":
            filterDados = dados.filter(key =>key.price > 50 && key.price <= 150);
              break;
        case "de R$151 até R$ 300":
            filterDados = dados.filter(key =>key.price > 150 && key.price <= 300);
            break;
        case "de R$301 até R$500":
            filterDados = dados.filter(key =>key.price > 300 && key.price <= 500);
              break;
        case "a partir de R$500":
            filterDados = dados.filter(key =>key.price > 500);
            break;
    }  
            return filterDados;
   
}

export default async function filterColors(id){
    
    const ul = document.querySelector("#options-ul");
    ul.innerHTML = "";
    const dadosFiltrados = await readEvent(id);
    if(dadosFiltrados.length === 0){
        ul.innerHTML = `<h1>Não temos nenhum produto com esses filtros</h1>`;
    }
    dadosFiltrados.map(key => createList(key))
    
    
}

