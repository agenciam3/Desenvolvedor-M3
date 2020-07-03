var cart_count = 0

var products = {
    products_loaded: 6,
    products_list: [
        {
            src: "./layout/imagens/img_2.png",
            name: "Camiseta Mescla",
            price: 28.00,
            value_parcel: 9.33,
            qtd_parcel: 3,
            color: ["Cinza"],
            size: ["P", "M", "G"],
            date_created: '2020-07-01'
        },
        {
            src: "./layout/imagens/img_3.png",
            name: "Saia em couro",
            price: 398.00,
            value_parcel: 30.00,
            qtd_parcel: 5,
            color: ["Preto"],
            size: ["U"],
            date_created: '2019-05-01'
        },
        {
            src: "./layout/imagens/img_4.png",
            name: "Cardigan tigre",
            price: 398.00,
            value_parcel: 30.00,
            qtd_parcel: 5,
            color: ["Laranja", "Preto"],
            size: ["36", "38", "40", "42"],
            date_created: '2020-04-01'
        },
        {
            src: "./layout/imagens/img_5.png",
            name: "Cardigan off white",
            price: 99.90,
            value_parcel: 33.30,
            qtd_parcel: 3,
            color: ["Branco"],
            size: ["G", "GG", "U", "46"],
            date_created: '2020-03-01'
        },
        {
            src: "./layout/imagens/img_6.png",
            name: "Body leopardo",
            price: 129.90,
            value_parcel: 43.43,
            qtd_parcel: 3,
            color: ["Amarelo"],
            size: ["M"],
            date_created: '2020-03-29'
        },
        {
            src: "./layout/imagens/img_7.png",
            name: "Casaco pelos",
            price: 398.00,
            value_parcel: 30.00,
            qtd_parcel: 5,
            color: ["Rosa"],
            size: ["P", "36", "42", "46"],
            date_created: '2020-03-28'
        },
        {
            src: "./layout/imagens/img_8.png",
            name: "Cropped stripes",
            price: 120.00,
            value_parcel: 40.00,
            qtd_parcel: 3,
            color: ["Azul", "Amarelo", "Laranja", "Verde"],
            size: ["M", "G", "GG", "U", "42", "46"],
            date_created: '2020-01-12'
        },
        {
            src: "./layout/imagens/img_9.png",
            name: "Camisa transparente",
            price: 398.00,
            value_parcel: 30.00,
            qtd_parcel: 5,
            color: ["Preto", "Transparente"],
            size: ["P", "36", "40", "42"],
            date_created: '2019-11-21'    
        },
        {
            src: "./layout/imagens/img_10.png",
            name: "Pochete clutch",
            price: 99.00,
            value_parcel: 33.00,
            qtd_parcel: 3,
            color: ["Preto"],
            size: ["U"],
            date_created: '2018-09-16'
        }
    ],
    products_filtered:[]
};


function renderPhotos() {
    var products_div = document.getElementById("products_content");
    var mb_products_div = document.getElementById("mb_products_content");
    var i;
    for (i = 0; i < products.products_loaded; i++){
        var products_div_itens = document.createElement('div');
        products_div_itens.className = "products_div_itens";

        var img = document.createElement('img');
        img.src = products.products_filtered[i].src;
        img.className = "products_div_itens_img";
        products_div_itens.appendChild(img);

        var span_title = document.createElement('span');
        span_title.innerHTML = products.products_filtered[i].name;
        span_title.className = "products_div_itens_name";
        products_div_itens.appendChild(span_title);

        var span_price = document.createElement('span');
        span_price.innerHTML = `R$ ${products.products_filtered[i].price.toFixed(2).replace('.', ',')}`;
        span_price.className = "products_div_itens_price";
        products_div_itens.appendChild(span_price);

        var span_parcel = document.createElement('span');
        span_parcel.innerHTML = `até ${products.products_filtered[i].qtd_parcel}x de R$ ${products.products_filtered[i].value_parcel.toFixed(2).replace('.', ',')}`;
        span_parcel.className = "products_div_itens_parcel";
        products_div_itens.appendChild(span_parcel);

        var btn_buy = document.createElement('button');
        btn_buy.onclick = () => {
            let header_cart_count = document.getElementById('header_cart_count');
            cart_count += 1;
            header_cart_count.innerHTML = cart_count;
        }
        btn_buy.className = "products_div_itens_btn_buy";
        btn_buy.innerHTML = "COMPRAR"

        var mb_products_div_itens = products_div_itens.cloneNode(true);
        var mb_btn_buy = btn_buy.cloneNode(true)

        mb_btn_buy.onclick = () => {
            let header_cart_count = document.getElementById('header_cart_count');
            cart_count += 1;
            header_cart_count.innerHTML = cart_count;
        }

        products_div_itens.appendChild(btn_buy);
        mb_products_div_itens.appendChild(mb_btn_buy);

        mb_products_div.appendChild(mb_products_div_itens);
        products_div.appendChild(products_div_itens);    
    } 
}

function loadMore(){
    var products_div = document.getElementById("products_content");  
    var mb_products_div = document.getElementById("mb_products_content"); 
    var products_load_more = document.getElementById('products_load_more');
    var mb_products_load_more = document.getElementById('mb_products_load_more');
    
    for (products.products_loaded; products.products_loaded < products.products_filtered.length; products.products_loaded++){
        var products_div_itens = document.createElement('div');
        products_div_itens.className = "products_div_itens";

        var img = document.createElement('img');
        img.src = products.products_filtered[products.products_loaded].src;
        img.className = "products_div_itens_img";
        products_div_itens.appendChild(img);

        var span_title = document.createElement('span');
        span_title.innerHTML = products.products_filtered[products.products_loaded].name;
        span_title.className = "products_div_itens_name";
        products_div_itens.appendChild(span_title);

        var span_price = document.createElement('span');
        span_price.innerHTML = `R$ ${products.products_filtered[products.products_loaded].price.toFixed(2).replace('.', ',')}`;
        span_price.className = "products_div_itens_price";
        products_div_itens.appendChild(span_price);

        var span_parcel = document.createElement('span');
        span_parcel.innerHTML = `até ${products.products_filtered[products.products_loaded].qtd_parcel}x de R$ ${products.products_filtered[products.products_loaded].value_parcel.toFixed(2).replace('.', ',')}`;
        span_parcel.className = "products_div_itens_parcel";
        products_div_itens.appendChild(span_parcel);

        var btn_buy = document.createElement('button');
        btn_buy.onclick = () => {
            var header_cart_count = document.getElementById('header_cart_count');
            cart_count += 1;
            header_cart_count.innerHTML = cart_count;
        }
        btn_buy.className = "products_div_itens_btn_buy";
        btn_buy.innerHTML = "COMPRAR"
        products_div_itens.appendChild(btn_buy);

        
        var mb_products_div_itens = products_div_itens.cloneNode(true);

        mb_products_div.appendChild(mb_products_div_itens);
        products_div.appendChild(products_div_itens);    
    }
    if (products.products_loaded = products.products_filtered.length){
        mb_products_load_more.style.display = 'none';
        products_load_more.style.display = 'none';
    }
}


//      =====================================================================================================
products.products_filtered = products.products_list;
renderPhotos();
//      =====================================================================================================

//         TROCAR DE LUGAR DEPOIS!!!!!
var colors_loaded;
var all_colors = document.getElementsByClassName('side_bar_colors');
function renderColors(){
    for(colors_loaded = 0; colors_loaded < 5; colors_loaded++){
        all_colors[colors_loaded].style.display = 'block';
    }
}

renderColors();

function show_more_colors(){
    var side_bar_more_colors = document.getElementById('side_bar_more_colors');
    var qtd_colors  = document.getElementsByClassName('side_bar_colors').length;
    for(colors_loaded; colors_loaded < qtd_colors; colors_loaded++){
        all_colors[colors_loaded].style.display = 'block';
    }
    if (colors_loaded = qtd_colors){
        side_bar_more_colors.style.display = 'none';
    }
}
