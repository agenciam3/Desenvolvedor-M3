//Função para maximizar e minimizar ver todas as cores
function toggleColors(){
    let element = document.getElementById("more-colors");
    let btn = document.getElementById("more-colors-btn");

    if(element.style.display == "block"){
        element.style.display = "none";
        btn.innerHTML = 'Ver todas as cores <i class="fas fa-angle-down"></i>';
    }else{
        element.style.display = "block";
        btn.innerHTML = 'Ver menos cores <i class="fas fa-angle-up"></i>'
    }
}

//Função adiciona os eventlisteners para os inputs dos filtros
function addInputEvents(){

    let colorForm = document.getElementById("fColor");
    let colorInputs = colorForm.getElementsByTagName("input");

    //Para os inputs é adinado um evento ao alterar o valor que chama uma função que atualiza os valores do filtro
    //resetam a paginação e recarrega os produtos.

    for(let i = 0; i < colorInputs.length; i++){
        colorInputs[i].addEventListener("change",  function(){
            toggleColorInput(colorInputs[i]);
            page = 1;
            loadProducts();
        }, false);
    }

    let sizeForm = document.getElementById("fSize");
    let sizeInputs = sizeForm.getElementsByTagName("input");

    for(let i = 0; i < sizeInputs.length; i++){
        sizeInputs[i].addEventListener("change",  function(){
            toggleSizeInput(sizeInputs[i]);
            page = 1;
            loadProducts();
        }, false);
    }

    let priceForm = document.getElementById("fPrice");
    let priceInputs = priceForm.getElementsByTagName("input");

    for(let i = 0; i < priceInputs.length; i++){
        priceInputs[i].addEventListener("change",  function(){
            togglePriceInput(priceInputs[i]);
            page = 1;
            loadProducts();
        }, false);
    }
}

//Função limpra todos os filtros e as variaveis que armazenam
function clearFilters(){
    let inputs = document.getElementsByTagName("input");
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].checked != undefined){
            inputs[i].checked = false;
        }
    }

    selected_colors.clear();
    selected_sizes.clear();
    selected_price_interval = [];

    //Resetamos a paginação
    page = 1;
    //Recarregamos os produtos
    loadProducts();
}

function toggleColorInput(input){
    let value = input.getAttribute("data-value");
    if(input.checked)
        selected_colors.add(value);
    else
        selected_colors.delete(value);
}

function toggleSizeInput(input){
    let value = input.getAttribute("data-value");
    if(input.checked)
        selected_sizes.add(value);
    else
        selected_sizes.delete(value);
}

function togglePriceInput(input){
    let value = input.getAttribute("id");

    price_interval = [];

    switch(value){
        case "price1": price_interval = [0, 50]; break;
        case "price2": price_interval = [51, 150]; break;
        case "price3": price_interval = [151, 300]; break;
        case "price4": price_interval = [301, 500]; break;
        case "price5": price_interval = []; break;
    }

    selected_price_interval = price_interval;
}

function toggleFilter(name, title){
    let element = document.getElementById(name);

    console.log();

    if(element.style.display == "block"){
        element.style.display = "none";
        title.lastChild.setAttribute("class", "fas fa-plus");
    }else{
        element.style.display = "block";
        title.lastChild.setAttribute("class", "fas fa-minus");
    }
}

//Função para versão mobile abrir a aba de filtros
function switchFilterTab(show){
    let element = document.getElementById("filters");
    element.style.display = (show ? "block" : "none");    
}

//Função para versão mobile abrir a aba de ordenação
function switchOrderTab(show){
    let element = document.getElementById("order-mobile");
    element.style.display = (show ? "block" : "none");    
}

//Adicionamos os eventos nos inputs do filtro
addInputEvents();