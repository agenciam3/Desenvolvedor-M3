import createList from "./CreateList";
import { API, url } from "./Api";

export const renderList = async () => {
    const list = await API(url);
     list.map((key,index) => {
        if( index < 9) {
            createList(key)
        } 
     })
}