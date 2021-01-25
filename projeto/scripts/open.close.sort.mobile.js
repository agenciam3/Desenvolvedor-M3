var optionSort = document.getElementById('sort-mobile');
var sortSecret = document.getElementById('sort-secret');
var timesIcon = document.getElementById('close-sort');
var renderProduct = document.getElementById('render-container');

window.addEventListener("resize", function(){
    if(window.innerWidth > "640"){
        renderProduct.style.display = "block";
        sortSecret.style.display = "flex";
    } else {
        sortSecret.style.display = "none";
    }
});

optionSort.addEventListener("click", function() {
    sortSecret.style.display = "block";
    renderProduct.style.display = "none";
});

timesIcon.addEventListener("click", function(){
    sortSecret.style.display = "none";
    renderProduct.style.display = "block";
});
