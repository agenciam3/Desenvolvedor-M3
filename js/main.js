import Catalogo from "./catalogo.js";


var dadosProdutos; 

//pegar json
await fetch("../produtos.json")
    .then((resp) =>{
        return resp.json();
    })
    .then((data) => {
        dadosProdutos = data;
    }) 


console.log(dadosProdutos);
//instanciar catalogo
const catalogo = new Catalogo(dadosProdutos)
