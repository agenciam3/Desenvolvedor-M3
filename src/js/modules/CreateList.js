let cont = 1;

function createList(key){
    const list = document.querySelector("#options-ul");
    
    const li = document.createElement("li");
    li.getAttribute(key.id);
    li.classList.add("options-item");
    list.appendChild(li);
    
    const img = document.createElement("img");
    img.src = key.image;
    img.alt = key.name;
    li.appendChild(img);
    
    const div = document.createElement("div");
    li.appendChild(div);
    
    const h3 = document.createElement("h3");
    h3.innerHTML = key.name.toUpperCase();
    div.appendChild(h3);
    
    const p = document.createElement("p");
    p.innerHTML = key.price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    div.appendChild(p);
    
    const p1 = document.createElement("p");
    p1.innerHTML = `até ${key.parcelamento[0]}x de ${(key.price / key.parcelamento[0]).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}`;
    div.appendChild(p1);
    
    const button = document.createElement("button");
    button.innerHTML = "Comprar";
   
    button.addEventListener("click", (e) => {
        const qtd = document.querySelector(".cont");
        qtd.style.display = "block";
        qtd.innerHTML = `${ cont }`
        cont += 1
     });
    
    div.appendChild(button);
}

export default createList;