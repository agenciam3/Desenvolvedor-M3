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

    open_accordion(accordion_id);
    
}