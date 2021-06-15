//Variável de paginação dos produtos
var page = 1;

//Constante de produtos por página
const productsPerPage = 6;

//Vetor de produtos carregados
products = [];

//Cores selecionadas no filtro
selected_colors = new Set();

//Tamanhos selecionados no filtro
selected_sizes = new Set();

//Intervalo de preço selecionado no filtro
selected_price_interval = [];

//URL da API
const url = "http://localhost:3000/products";

async function loadProducts(){
    try{

        color_filter    = "";
        size_filter     = "";
        price_filter    = "";

        //Caso tenha cores,tamanhos ou preço selecionados é feito o respectivo filtro para o request na API
        //Todos os filtros e suas respectivas explicações podem ser encontrados na página do json-server : https://github.com/typicode/json-server/#routes

        if(selected_colors && selected_colors.size > 0) 
            color_filter = `colors_like=${Array.from(selected_colors).join('&colors_like=')}`;

        if(selected_sizes && selected_sizes.size > 0)
            size_filter = `sizes_like=${Array.from(selected_sizes).join('&sizes_like=')}`;

        if(selected_price_interval && selected_price_interval.length > 1)
            price_filter = `price_gte=${selected_price_interval[0]}&price_lte=${selected_price_interval[1]}`;

        //É carregado os produtos a partir do inicio com o limite definido a partir da paginação atual
        page_filter = `_start=0&_limit=${page*productsPerPage}`;

        //Concatenação dos filtros
        filter = [color_filter, size_filter, price_filter, page_filter].filter(Boolean).join("&");
        full_url = [url, filter].filter(Boolean).join("?");

        const response = await fetch(`${full_url}`, {
            method: "GET"
        });
        products = await response.json();

        reloadProducts();

    }catch(e){
        products = []
        
    }
}

//Função limpa a div mestre de produtos
function clearProducts(){
    let element = document.getElementById("products");
    element.innerHTML = "";
}

//Função para carregar mais produtos aumenta a página e recarrega os produtos
function loadMore(){
    page++;
    loadProducts();
}

//Função limpa a div mestre de produtos e atualiza com os valores do vetor
function reloadProducts(){
    clearProducts();

    let element = document.getElementById("products");
    
    //Caso o vetor de produtos esteja vazio é adicionado um texto informando
    if(products.length == 0){
        let text = document.createElement('h1');
        text.innerHTML="Não há produtos";
        element.appendChild(text);
        return;
    }

    //Para todos os produtos no vetor é adicionado
    products.forEach(p => {
        let product = document.createElement('div');
        product.setAttribute('class', 'product');
    
        product.innerHTML = 
       `<div class="product-container">
        <img src="imagens/${p.image_name}">

        <h1>${p.title}</h1>
        <b>R$ ${p.price.toFixed(2)}</b>
        <h4>${p.description}</h4>

        <span class="produt-button" onclick="addProduct(${p.id}, 1)">COMPRAR</span>
        </div>`;

        element.appendChild(product);
    });
}

function isMobile(){
    return document.documentElement.clientWidth < 768;
}

//Função que reseta as alterações feitas em modo mobile ao voltar pro modo desktop
function resizeListener(){
    if(!isMobile()){
        document.getElementById("filters").style.display = "";
        document.getElementById("order-mobile").style.display = "";
        document.getElementById("select-color").style.display = "";
        document.getElementById("select-size").style.display = "";
        document.getElementById("select-price").style.display = "";
    }
}

window.addEventListener("resize", resizeListener);

//Carrega os produtos iniciais
loadProducts();