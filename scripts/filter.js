const colors_dic = {
    0: 'Amarelo',
    1: 'Azul',
    2: 'Branco',
    3: 'Cinza',
    4: 'Laranja',
    5: 'Verde',
    6: 'Vermelho',
    7: 'Preto',
    8: 'Rosa',
    9: 'Vinho'
};

const size_dic = {
    0: 'P',
    1: 'M',
    2: 'G',
    3: 'GG',
    4: 'U',
    5: '36',
    6: '38',
    7: '40',
    8: '42',
    9: '44',
    10: '46'
};

const id_price_dic = {
    0:'0-50',
    1:'51-150',
    2:'151-300',
    3:'301-500',
    4:'01-'
}

const id_mb_price_dic = {
    0:'mb_0-50',
    1:'mb_51-150',
    2:'mb_151-300',
    3:'mb_301-500',
    4:'mb_01-'
}

const price_dic = {
    0: {
        min: 0,
        max: 50
    },
    1: {
        min: 51,
        max: 150
    },
    2: {
        min: 151,
        max: 300
    },
    3: {
        min: 301,
        max: 500
    },
    4:  {
        min: 01,
        max: Infinity
    }
}

var color_list = []

var setColor = (value) => {
    if(color_list.includes(value)){
        color_list = color_list.filter((item) => {
            return item !== value;
        }) 
    }else{
        color_list.push(value);
    }   
    
    if (!isMobile()){
        activeFilter();
    }else{
        disableApplyClear();
    }
}


var size_list = []

var setSize = (value) => {
    if(size_list.includes(value)){
        size_list = size_list.filter((item) => {
            return item !== value;
        }) 
    }else{
        size_list.push(value);
    }
    
    if (!isMobile()){
        activeFilter();
    }else{
        disableApplyClear();
    }
}

var price_select = null

var setPrice = (value) =>{
    
    if(value === price_select){
        if(isMobile()){
            let radio = document.getElementById(id_mb_price_dic[value]);
            price_select = null;
            radio.checked = false;
        }else{
            let radio = document.getElementById(id_price_dic[value]);
            price_select = null;
            radio.checked = false;
        }
        
    } else {
        price_select = value;
    }

    if (!isMobile()){
        activeFilter();
    }else{
        disableApplyClear();
    }
}

var order_select = null

var selectOrder = (value) =>{

    order_select = value;

    var order_dic = {
        0:'Mais recentes',
        1:'Menor preço',
        2:'Maior preço'
    }

    if(isMobile()){
        var mb_products = document.getElementById('mb_products_content');
        let mb_order = document.getElementById('mb_order_open');
        mb_order.style.display = 'none';
        mb_products.style.display = 'flex';
    }else{
        let accordion_tilte = document.getElementById('acc_order_title');
        accordion_tilte.innerText = `${order_dic[value]}`;
        let close_accordion = document.getElementById('accordion_open_close');
        close_accordion.style.display = 'none';
    }


    activeFilter();
}

var isMobile = () =>{
    
    if(window.screen.width <= 640){
        return true;
    }else{
        return false;
    }

}

var activeFilter = () =>{

    products.products_filtered = [];
    
    products.products_filtered = products.products_list.filter((product) => {
        if(color_list.length === 0){
            return true;
        }else{
            for (let color of color_list) {
                if (product.color.includes(colors_dic[color])) {
                    return true;
                }
            }
            return false;
        }

        
    }).filter((product) => {
        if(size_list.length === 0){
            return true;
        }else{
            for (let size of size_list) {
                if (product.size.includes(size_dic[size])) {
                    return true;
                }
            }
            return false;
        }

    }).filter((product) => {
        if(price_select === null){
            return true;
        }else{
            var price_filter = price_dic[price_select];
            if (product.price >= price_filter.min && product.price <= price_filter.max){
                return true;
            }
            return false;
        }
    })

    var products_div = document.getElementById("products_content");
    var mb_products_div = document.getElementById("mb_products_content");
    products_div.innerHTML = '';
    mb_products_div.innerHTML = '';

    var load_more_btn = document.getElementById('products_load_more');
    var mb_load_more_btn = document.getElementById('mb_products_load_more');
    if (products.products_filtered.length <= 6) {
        load_more_btn.style.display = 'none';
        mb_load_more_btn.style.display = 'none';
        products.products_loaded = products.products_filtered.length;
    }else{
        load_more_btn.style.display = 'block';
        mb_load_more_btn.style.display = 'block';
        products.products_loaded = 6;
    }
    
    products.products_filtered = sortList(products.products_filtered);
    renderPhotos();
}


var sortList = (list) =>{

    if(order_select === null){
        return list;
    }else{

        return list.sort((a, b) =>{

            switch (order_select){
                case 0:{
                    var dt_a = new Date(a.date_created)
                    var dt_b = new Date(b.date_created)
                    if(dt_a > dt_b){
                        return-1
                    }else{
                        return 1
                    }
                }  
                case 1:{
                    if(a.price < b.price){
                        return -1;
                    }else{
                        return 1;
                    }
                }
                case 2:{
                    if(a.price > b.price){
                        return -1;
                    }else{
                        return 1;
                    }
                }
            }
    
        })
    }
     
}


var clearFilter = () =>{

    var checked = document.getElementsByClassName('mb_color_checkbox');
    
    for (var element of checked){
        element.checked = false;
    }
    
    var button = document.getElementsByClassName('mb_filter_btn');
    for (var element of button){
        element.checked = false;
    }

    let radio = document.getElementById(id_mb_price_dic[price_select]);
    price_select = null;
    if (radio){
    radio.checked = false;
    }
    
    color_list = [];
    size_list = [];

    disableApplyClear();
    activeFilter();
}


var disableApplyClear = () =>{
    var apply_clear = document.getElementById('filter_btn_content');
    if(color_list.length > 0 || size_list.length > 0 || price_select !== null){
        apply_clear.style.display = 'flex';
    }else{
        apply_clear.style.display = 'none';
    }
}