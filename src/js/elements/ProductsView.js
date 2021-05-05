export default function ProductsView() {
    return {
        print: (div_id = '', array_of_string = [], callback) => {
            let container = Generic().exists_id_on_document(div_id);
            if(container){
                container.innerHTML = '';
                array_of_string.forEach((color) => {
                    container.innerHTML += getColorCheckboxHTML(color);
                });
                var allElements = document.getElementsByClassName("color_checkbox");
                for(let i=0; i < allElements.length; i++){
                    
                }
                
            }
        }
    }
}


// allElements[i].addEventListener("click", function() {
//     click(allElements[i], allElements, true, callback)
// });