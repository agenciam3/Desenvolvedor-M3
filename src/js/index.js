//babel bug fix
import("babel-core/register");
import("babel-polyfill");


let products = [];self
let url = "http://localhost:5500/products";
async function getProducts(url){ 
    let response = await fetch(url);
    let data = await response.json();
    
    data.forEach(element => {
        products.push(element); 
    }); 
    return products;
}

(async function () {
    let promise = await getProducts(url);
})
