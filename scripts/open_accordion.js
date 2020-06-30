function open_accordion(accordion_id){
    var acc = document.getElementById(accordion_id);
    var acc_open_close = acc.nextElementSibling;
    if (acc_open_close.style.display === "block") {
        acc_open_close.style.display = "none";
    }else {
        acc_open_close.style.display = "block";
    }
    
}