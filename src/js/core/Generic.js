
export default function Generic() {
    return {
        exists_id_on_document: (element_id) => {
            let el = document.getElementById(element_id);
            if(el){
                return el;
            } else {
                return null;
            }
        }
    }
}