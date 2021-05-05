/**
 *    Como não há interação com nenhuma API, esse arquivo serve apenas para simular a interação, porém
 * não será utilizado nenhuma chamada HTTP, mas sim a importação do módulo de forma básica. No README
 * da tarefa há um item que diz:
 * 
 * "Interação com JSON para renderizar os produtos (fique livre para criar o JSON no formato que achar 
 * mais adequado)"
 * 
 *    Por essa razão, faço a leitura de um .json para demonstrar a leitura de um arquivo, mas altero o
 * o objeto resultante para aumentar os dados.
 * 
 * O papel desse módulo é:
 *  - Ler o arquivo .json contendo as principais informações dos produtos;
 *  - Criar uma variável global com variações dos produtos e aplicar modificações, como ID por exemplo;
 *  - Aplicar filtros de acordo com a solicitação;
 *  - Retornar o objeto resultante; 
 */
var PRODUCTS_DATA = [];
var LAST_FILTER = {};
var LAST_FILTERED = [];

function generateID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

/**
 * Gera um valor entre os valores informados.
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function randomPrice(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Função para retornar o parcelamento em até 3x.
 * @param {} price 
 */
function divideUpTo3x(price){
  return parseFloat((price/3).toFixed(2));
}

/**
 * Retorna um array contendo 3 tamanhos de roupa aleatórios.
 */
function randomSize(){
  let available_sizes = ["P", "M", "G", "GG", "U", "36", "38", "40", "42", "44", "46"];
  let sizes = [];
  for(let i = 0; i < 3; i++){
    sizes.push(available_sizes[Math.floor(Math.random() * available_sizes.length)]);
  }
  return sizes;
}

/**
 * Preenche o PRODUCTS_DATA com 100 produtos;
 * @param {*} products 
 */
function fillData(products = { products:[{image:null,color: [],price: [],name: null}] }){

  if(!PRODUCTS_DATA.length){
    while(PRODUCTS_DATA.length < 50){
      let base_product = products.products[Math.floor(Math.random() * products.products.length)];
      let new_price = randomPrice(base_product.price[0], base_product.price[1]);
      let new_product = {
        id: generateID(),
        image: base_product.image,
        price: new_price,
        name: base_product.name,
        color: base_product.color,
        sizes: randomSize(),
        division_price:divideUpTo3x(new_price),
        creation_date: new Date()
      }
      PRODUCTS_DATA.push(new_product);
    }
  }
}

function applyFilters(filters = {colors_name:[], sizes:[], price_range:[], orderBy:'cheapest'}){
  
  let filtered = [];
  
  //colors_filter;
  if(filters.colors_name.length > 0){
    PRODUCTS_DATA.forEach((item) => {
      let added = false;
      item.color.map((color) => {
        filters.colors_name.map((color_filter)=>{
          if(!added && color == color_filter){
            filtered.push(item);
            added = true;
          }
        })
      })
    })
  } else {
    filtered = PRODUCTS_DATA;
  }
  
  //sizes_filter;
  if(filters.sizes.length > 0){
    let sizes_filtered = []
    
    filtered.forEach((item) => {
      let added = false;
      item.sizes.map((size) => {
        filters.sizes.map((filter_size)=>{
          if(!added && size == filter_size){
            sizes_filtered.push(item);
            added = true;
          }
        })
      })
    })
    filtered = sizes_filtered;
  }

  //price_filter;
  if(filters.price_range.length > 0){
    let prices_filtered = []
    
    filtered.forEach((item) => {
      if(item.price >= filters.price_range[0] && item.price <= filters.price_range[1]){
        prices_filtered.push(item);
      }
    });

    filtered = prices_filtered;
  }

  //orderBy_filter;
  filtered.sort((a,b) => {

    if(filters.orderBy == 'cheapest'){
      if(a.price > b.price){
        return 1;
      }
      return -1;
    }

    if(filters.orderBy == 'expensive'){
      if(a.price < b.price){
        return 1;
      }
      return -1;
    }

     //date_comparison;
    if(filters.orderBy == 'recent'){
      if(a.creation_date < b.creation_date){
        return 1;
      }
      return -1;
    }


      
  });

  LAST_FILTER = filters;
  LAST_FILTERED = filtered;

  return filtered;
}

function applyPagination(start = 0, range = 10, list = []){
  
  let final_end = start + range;
  let hasMorePages = true;
  
  if(final_end >= list.length){
    hasMorePages = false;
    final_end = list.length;
  }

  
  if(list.length >= start && final_end <= list.length){
    
    return {
      data: list.slice(start, final_end), 
      pagination:{
        total_without_filters: PRODUCTS_DATA.length,
        total_filtered: list.length,
        range_start: start,
        final_range: final_end,
        hasMorePages: hasMorePages
      }
    };
  }
  return null;
}

function extractExtraInfo(){
  let extra = {
    cheapest_price:10000000,
    expensive_price: 0,
    unique_colors: [],
    unique_sizes: []
  }
  LAST_FILTERED.forEach((product) => {
    if(product.price > extra.expensive_price) 
    extra.expensive_price = product.price;
    if(product.price < extra.cheapest_price) 
    extra.cheapest_price = product.price;
    
    product.color.map((color) => {
      if(!extra.unique_colors.includes(color)){
        extra.unique_colors.push(color);
      }
    })

    product.sizes.map((size) => {
      if(!extra.unique_sizes.includes(size)){
        extra.unique_sizes.push(size);
      }
    })

    extra.unique_colors.sort();
    extra.unique_sizes.sort();

  });
  return extra;
}

export default function showcase(
  start_range, 
  end_range, 
  filters = {
    colors_name:[],
    sizes:[],
    price_range:[]
  }
  ) {
    return new Promise((resolve, reject) => {
      try{
        var request = new XMLHttpRequest();
        request.open("GET", "./js/ASP/data/products.json", false);
        request.send(null);
        var JSONObject = JSON.parse(request.responseText);
        fillData(JSONObject);
        let filtered = applyFilters(filters);
        let paginated = applyPagination(start_range, end_range, filtered);
        let extra = extractExtraInfo();
        paginated.extra = extra;
        resolve(paginated);
      } catch (err){
        console.log('Erro ao ler o arquivo JSON! Segue o erro abaixo:', err);
        reject(err);
      }
    });
}