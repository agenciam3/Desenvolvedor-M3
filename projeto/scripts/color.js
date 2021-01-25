var titleContainerColor = document.getElementById("title-container-color");
var containerColor = document.getElementById("container-color-secret");
var link = document.getElementById("expansion-color");
var secretColor = document.getElementById("color-secret");
var filterColorInput = document.getElementsByClassName("filter-color-input");
var colorsSelected = [];

// OPEN OR CLOSE THE DIV THAT HIDDEN COLORS IN THE CLICK WHEN WIDTH WINDOW IS SMALLER OR EQUAL TO 640PX
titleContainerColor.addEventListener("click", function(){
    if(window.innerWidth <= "640"){
        document.getElementById("title-color").classList.toggle("active");
        if(containerColor.style.display == "none" || containerColor.style.display == ""){
            containerColor.style.display = "block";
        } else {
            containerColor.style.display = "none";
        }
    }
});

window.addEventListener("resize", function(){
    if(window.innerWidth > "640"){
        containerColor.style.display = "block";
    } else {
        containerColor.style.display = "none";
    }
});

// OPEN DIV THAT HIDDEN COLORS AND HIDDEN LINK 
link.addEventListener("click", function(){
    secretColor.style.display = "block";
    link.style.display = "none";
});

for(var i = 0; i < filterColorInput.length; i++){
    filterColorInput[i].addEventListener("click", function(){
        if(colorsSelected.includes(this.value)){
            var index = colorsSelected.indexOf(this.value);
            if (index > -1) {
                colorsSelected.splice(index, 1);
                if(window.innerWidth >= "640"){
                    filter();
                }
            }
        } else {
            colorsSelected.push(this.value);
            if(window.innerWidth >= "640"){
                filter();
            }
        }
    });
}
