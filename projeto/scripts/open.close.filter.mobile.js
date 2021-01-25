var optionFilter = document.getElementById('filter-mobile');
var filterSecret = document.getElementById('filter-secret');
var timesIcon = document.getElementById('close-filter');
var renderProduct = document.getElementById('render-container');

window.addEventListener("resize", function(){
    if(window.innerWidth > "640"){
        renderProduct.style.display = "block";
        filterSecret.style.display = "block";
        filter();
    } else {
        filterSecret.style.display = "none";
        renderProduct.style.display = "block";
    }
});

optionFilter.addEventListener("click", function(){
    filterSecret.style.display = "block";
    renderProduct.style.display = "none";
});

timesIcon.addEventListener("click", function(){
    filterSecret.style.display = "none";
    renderProduct.style.display = "block";
});
