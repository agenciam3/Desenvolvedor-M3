
export default function Generic() {
    return {
        exists_id_on_document: (element_id_or_class) => {
            let el = document.getElementById(element_id_or_class);
            if(el){
                return el;
            } else {
                return null;
            }
        }
    }
}