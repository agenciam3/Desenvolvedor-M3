export const url = "http://localhost:5000/products";

const getAsync = async (url) => {
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch(err){
        console.log(err);
    }
};  

export const API = url => getAsync(url);







