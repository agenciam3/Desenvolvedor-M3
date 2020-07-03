var colors_loaded;
function renderColors(){
    var all_colors = document.getElementsByClassName('side_bar_colors');
    for(colors_loaded = 0; colors_loaded < 5; colors_loaded++){
        all_colors[colors_loaded].style.display = 'block';
    }
}

renderColors();

function show_more_colors(){
    var all_colors = document.getElementsByClassName('side_bar_colors');
    var side_bar_more_colors = document.getElementById('side_bar_more_colors');
    var qtd_colors  = document.getElementsByClassName('side_bar_colors').length;
    for(colors_loaded; colors_loaded < qtd_colors; colors_loaded++){
        all_colors[colors_loaded].style.display = 'block';
    }
    if (colors_loaded = qtd_colors){
        side_bar_more_colors.style.display = 'none';
    }
}
