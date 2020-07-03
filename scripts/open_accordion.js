function openAccordion(accordion_id){
    var acc = document.getElementById(accordion_id);
    var acc_open_close = acc.nextElementSibling;
    if (acc_open_close.style.display === "block") {
        acc_open_close.style.display = "none";
    }else {
        acc_open_close.style.display = "block";
    }
    
}

function mbOpenAccordion (accordion_id){
    var accordion = document.getElementById(accordion_id);

    var more_icon = accordion.getElementsByClassName('more_option_icon')[0];
    var less_icon = accordion.getElementsByClassName('less_option_icon')[0];
    
    
    if(more_icon.style.display === "none" && less_icon.style.display === "block"){
        more_icon.style.display = "block";
        less_icon.style.display = "none";
    }else{
        more_icon.style.display = "none";
        less_icon.style.display = "block";

    }   

    openAccordion(accordion_id);
    
}