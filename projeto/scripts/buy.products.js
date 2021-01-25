function buyProducts(){
    var buy = document.getElementsByClassName("buy-container");
    var bag = document.getElementById("bag");
    var a;

    for(var i = 0; i < buy.length; i++){
        buy[i].addEventListener("click", function(){
            var a = parseInt(bag.innerHTML);
            bag.innerHTML = a += 1;
        });
    }
    
}
