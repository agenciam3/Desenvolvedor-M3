
let show = true;
import { products } from "../../db.json";

const asideFilterToggle = document.querySelector('aside');
const orderToggle = document.querySelector('.order-mobile');
const orderClose = orderToggle.querySelector('.x');





const toggleCores = asideFilterToggle.querySelector(".cores");
const toggleTamanhos = asideFilterToggle.querySelector(".tamanhos");
const togglePrecos = asideFilterToggle.querySelector(".faixa-preco");


document.addEventListener("click", (e) => {
    let click = e.target;





    if (click.classList.contains('ordenar')) {
        document.body.style.overflow = show ? "hidden" : "initial";
        orderToggle.classList.toggle("on", show);
        show = !show;

    }
    if (click.classList.contains('x')) {
        show = !show;
        document.body.style.overflow = show ? "hidden" : "initial";
        orderToggle.classList.toggle("on", show);

    }
    if (click.classList.contains('filtrar')) {
        document.body.style.overflow = show ? "hidden" : "initial";
        asideFilterToggle.classList.toggle("on", show);
        show = !show;

    }
    if (click.classList.contains('x-filtrar')) {
        show = !show;
        document.body.style.overflow = show ? "hidden" : "initial";
        asideFilterToggle.classList.toggle("on", show);

    }


    if (click.classList.contains("titulo-cores")) {

        toggleCores.classList.toggle("on-cores", show);
        show = !show;

    }

    if (click.classList.contains(".tamanhos-titulo")) {

        toggleTamanhos.classList.toggle("tamanhos-on", show);
        show = !show;

    }


    if (click.classList.contains("preco")) {

        togglePrecos.classList.toggle("on-preco", show);
        show = !show;


    }









    if (click.classList.contains('limpar')) {


        document.body.style.overflow = "initial";
        asideFilterToggle.classList.toggle("on", show);
        asideFilterToggle.querySelectorAll('input').checked = !checked;
    }
    if (click.classList.contains('aplicar')) {


        document.body.style.overflow = "initial";
        asideFilterToggle.classList.toggle("on", show);

    }
    if (toggleCores && toggleTamanhos || togglePrecos) document.body.style.overflow = "initial";




})


class Products {
    constructor(colorFilter, id, tamFilter, priceFilter, allFilter) {
        this.renderProducts(colorFilter||tamFilter || priceFilter);
        this.filtrocor(products);
        this.filtroTam(products);
        this.allFilters(colorFilter|| tamFilter|| priceFilter);
        this.filtroPrice(products)
        this.buy(id);
    }

    allFilters(colorFilter, tamFilter, priceFilter) {
        let allFilter = [];
        let colors = []
        let sizes = []
        let precos = []
        precos = document.getElementsByName('price')
        colors = document.getElementsByName('cor');
        sizes = document.getElementsByName('tamanho');
    
        for(let prec of precos) {
            if(prec.checked) {
                this.renderProducts(priceFilter);
            }else {
                prec.checked = false;

            }
        }

        for(let size of sizes) {
            if(size.checked) {
                this.renderProducts(tamFilter);
            }else {
                size.checked =false;

            }
        }

        for(let color of colors){
            if(color.checked) {
                this.renderProducts(colorFilter)
            }else {
                
                color.checked = false;
            }
        }

        
        
    }

    renderProducts(Filter) {
        let itens = [...Filter];


        let html = document.querySelector('.products');



        let listaProduto = [];
        for (let item of itens) {
            let parcela = item.price / item.parcelamento[0];
            let produto = '';
            produto += `
                <div class="productoes">
                <img src= ${item.image}></img>
                <h1 id="product-h1">${item.name}</h1>
                <h2 id="product-h2">R$ ${item.price.toFixed(2)}</h3>
                <h3 id="product-h1">até ${item.parcelamento[0]}x de R$ ${parcela.toFixed(2)}</h1>
                <input type="button" class="buy" value="Comprar" onclick="buy(${item.id})"></div>
                `;
            listaProduto.push(produto)



            item++
            html.innerHTML = listaProduto;
        }









    }




    buy(id) {

        let ids = id;
        let totalProd = 0;


        let bag = document.querySelector('.bag-counter--span');


        ids = 1;
        totalProd += ids;
        bag.innerHTML = totalProd;



    }

    filtrocor(products) {
         let active = false;
 let checkboxes = document.getElementsByName('cor');
           
           let colorFilter = [];
       let clickes = []
        clickes = document.addEventListener('click', e => {
            let items = products;
            let click = e.target;
           
          
        
            colorFilter= items.filter(produto =>
                produto.color.includes(`${click.value}`));
            
               
           
           this.renderProducts([...colorFilter]);
        });
        

    }
    filtroTam(products) {


        document.addEventListener('click', e => {
            let items = products;
            let click = e.target;
            let checkboxes = document.querySelectorAll("tamanho");


            

            let tamFilter = [];

            tamFilter = items.filter(produto =>
                produto.size.includes(`${click.value}`));


        

            this.renderProducts([...tamFilter]);

        })

    }




    filtroPrice(products) {


        document.addEventListener('click', e => {
            let items = products;
            let click = e.target;
            let checkboxes = document.querySelectorAll("preco");
            let priceFilter = [];
            let switchPrice = click.value
            
            if(click.value =='50'){
            priceFilter = items.filter(produto => 
                produto.price >=0 && produto.price <=50)

                this.renderProducts([...priceFilter])    
            }else if(click.value == '51') {
                priceFilter = items.filter(produto => 
                    produto.price >=51 && produto.price <=150)
    
                    this.renderProducts([...priceFilter])
            }else if(click.value == '151') {
                priceFilter = items.filter(produto => 
                    produto.price >=150 && produto.price <=300)
    
                    this.renderProducts([...priceFilter])
            }else if(click.value == '301') {
                priceFilter = items.filter(produto => 
                    produto.price >=301 && produto.price <=500)
    
                    this.renderProducts([...priceFilter])
            }else if(click.value =='1') {
                priceFilter = items.filter(produto => 
                    produto.price > 1)
    
                    this.renderProducts([...priceFilter])
            }
            
            
            
            
            console.log(priceFilter)   
        });
        
    }
}



const mostrar = new Products(products);



mostrar;








