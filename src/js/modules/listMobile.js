const ListMobile = (element, array, className) =>{
   
    const ul = document.createElement("ul");
    ul.classList.add(className);
    element.appendChild(ul);
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

export default ListMobile ;