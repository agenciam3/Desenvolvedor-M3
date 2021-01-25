var titleContainerSize = document.getElementById("title-container-size");
var containerSizeSecret = document.getElementById("container-size-secret");
var filterSizeInput = document.getElementsByClassName("filter-size-input");
var sizesSelected = [];

// OPEN OR CLOSE THE DIV THAT HIDDEN SIZES IN THE CLICK WHEN WIDTH WINDOW IS SMALLER OR EQUAL TO 640PX
titleContainerSize.addEventListener("click", function(){
    if(window.innerWidth <= "640"){
        document.getElementById("title-size").classList.toggle("active");
        if(containerSizeSecret.style.display == "none" || containerSizeSecret.style.display == ""){
            containerSizeSecret.style.display = "flex";
        } else {
            containerSizeSecret.style.display = "none";
        }
    }
});

window.addEventListener("resize", function(){
    if(window.innerWidth > "640"){
        containerSizeSecret.style.display = "flex";
    } else {
        containerSizeSecret.style.display = "none";
    }
});

for(var i = 0; i < filterSizeInput.length; i++){
    filterSizeInput[i].addEventListener("click", function(){
        if(sizesSelected.includes(this.value)){
            var index = sizesSelected.indexOf(this.value);
            if (index > -1) {
                sizesSelected.splice(index, 1);
                if(window.innerWidth >= "640"){
                    filter();
                }
            }
        } else {
            sizesSelected.push(this.value);
            if(window.innerWidth >= "640"){
                filter();
            }
        }
    });
}