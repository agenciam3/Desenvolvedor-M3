var accordion = document.getElementById('accordion');
var list = document.getElementById('list-item');
var itemList = list.getElementsByClassName('item-sort');
var aux = accordion.innerHTML;
var sortOptionSelect = null;

// OPEN AND CLOSE ACCORDION WHEN WINDOW WIDTH IS LARGER TO 640PX
accordion.addEventListener("click", function(){
    if(window.innerWidth > "640"){
        if(list.style.display == "none" || list.style.display == ""){
            list.style.display = "block";
        } else {
            list.style.display = "none";
        }
    } 
});

// CLOSE ACCORDION WHEN CLICK OUT OF ELEMENT 
accordion.addEventListener("blur", function(){
    if(list.style.display == "block"){
        list.style.display = "none";
    }
});

// CHANGE TITLE ACCORDION AND CLOSE OR OPEN LIST WHEN WINDOW IS SMALLER OR EQUAL TO 640PX OR LARGER THAT THE SAME
window.addEventListener("resize", function(){
    if(window.innerWidth <= "640"){
        list.style.display = "block";
        accordion.innerHTML = "ORDENAR";
    } else {
        list.style.display = "none";
        accordion.innerHTML = aux;
    }
});

/* GET THE NAME OF THE CLICKED ELEMENT AND STORE IT IN THE ACCORDION IF THE WIDTH OF THE WINDOW IS GREATER TO 640PX, 
SAVING THE NAME OF THE CLICKED ELEMENT, ELSE JUST SAVING THE NAME OF THE CLICKED ELEMENT AND DIDN'T SHOW IN ACCORDION*/
for(var i = 0; i < itemList.length; i++){
    itemList[i].addEventListener("mousedown", function(item){
        if(window.innerWidth > "640"){
            accordion.innerHTML = this.textContent;
            aux = this.textContent;
        } else {
            aux = this.textContent;
            sortSecret.style.display = "none";
            renderProduct.style.display = "block";
        }

        sortOptionSelect = item.target.innerHTML;
        products.itens = sortProducts(products.itens)

        console.log(products.itens);

        if(document.getElementById("section-products")){
            document.getElementById("section-products").remove();
        }
        if(document.querySelector('#render-container > div')){
            document.querySelector('#render-container > div').remove();
        }
        renderProducts();
    });
}

function sortProducts(listProduct) {

    if (sortOptionSelect) {
        listProduct.sort((a, b) => {
            priceA = a.price.replace("R$ ", ""); 
            priceB = b.price.replace("R$ ", "");
            priceA = parseFloat(priceA);
            priceB = parseFloat(priceB);

            console.log(sortOptionSelect);

            if (sortOptionSelect === 'Menor preço') {
                if(priceA > priceB){
                    return 1;
                } else if(priceA < priceB){
                    return -1;
                } else {
                    return 0;
                }
            } else if (sortOptionSelect === "Maior preço") {
                if(priceA > priceB){
                    return -1;
                } else if(priceA < priceB){
                    return 1;
                } else {
                    return 0;
                }
            } else {
                var convertA = new Date(a.dateInsert);
                var convertB = new Date(b.dateInsert);
                if(convertA > convertB){
                    return -1;
                } else if(convertA < convertB) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });
    }

    return listProduct;
}