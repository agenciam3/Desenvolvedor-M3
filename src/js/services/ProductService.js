import showcase from "../ASP/showcase.js";

let PRODUCTS_ELEMENTS;
let PAGE_FILTERS = {colors_name:[], sizes:[], price_range:[], orderBy: 'recent'};
export default function ProductService(){
    
    return {
        load: () => {
            return new Promise((resolve, reject) => {
                showcase(0, 10, PAGE_FILTERS).then((result) => {
                    PRODUCTS_ELEMENTS = result;
                    resolve(PRODUCTS_ELEMENTS);
                });
                
            });
        },
        loadMore: () => {
            return new Promise((resolve, reject) => {
                if(PRODUCTS_ELEMENTS != undefined){
                    showcase(PRODUCTS_ELEMENTS.pagination.final_range, 10, PAGE_FILTERS).then((result) => {
                        PRODUCTS_ELEMENTS.data = [...PRODUCTS_ELEMENTS.data, ...result.data];
                        PRODUCTS_ELEMENTS.pagination = result.pagination;
                        resolve(PRODUCTS_ELEMENTS);
                        
                    });
                }
                
            })
        },
        hasMorePages: () => {
            return PRODUCTS_ELEMENTS.pagination.hasMorePages;
        }
    }
}