const Lista = (h3, array, className) =>{
    const listaCores = document.querySelector(".menu-options")
    const ul = document.createElement("ul");
    ul.classList.add(className);
    listaCores.appendChild(ul);
    ul.innerHTML = `<h3>${h3}</h3>`
    array.map((key, index) => {
        const li = document.createElement("li");
        li.classList.add("filtrar");
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
       
    });
    
}

export default Lista ;