var titlecontainerPrice = document.getElementById("title-container-price");
var containerPriceSecret = document.getElementById("container-price-secret");
var filterPriceInput = document.getElementsByClassName("filter-price-input");
var priceSelected = null;

// OPEN OR CLOSE THE DIV THAT HIDDEN SIZES IN THE CLICK WHEN WIDTH WINDOW IS SMALLER OR EQUAL TO 640PX
titlecontainerPrice.addEventListener("click", function(){
    if(window.innerWidth <= "640"){
        document.getElementById("title-price").classList.toggle("active");
        if(containerPriceSecret.style.display == "none" || containerPriceSecret.style.display == ""){
            containerPriceSecret.style.display = "block";
        } else {
            containerPriceSecret.style.display = "none";
        }
    }
});

window.addEventListener("resize", function(){
    if(window.innerWidth > "640"){
        containerPriceSecret.style.display = "block";
    } else {
        containerPriceSecret.style.display = "none";
    }
});

for(var i = 0; i < filterPriceInput.length; i++){
    filterPriceInput[i].addEventListener("click", function(){
        if(priceSelected == this.value){
            this.checked = false;
            priceSelected = null;
            if(window.innerWidth >= "640"){
                filter();
            }
        } else {
            priceSelected = this.value;
            this.checked = true;
            if(window.innerWidth >= "640"){
                filter();
            }
        }
    });
}
