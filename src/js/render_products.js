
//pega a ordem
function update() {
    var select = document.getElementById('ordenar');
    var option = select.options[select.selectedIndex].value;
    return option;
    
    
}


function main(){
    // option = update()
    // ordenarPor(option)
    fetch('http://localhost:3000/items').then(res => res.json()).then(data =>{

        option = update()

        if(option == "menor"){
            data.sort(function(a, b){
                if(a.preco < b.preco){
                    return -1;
                } else{
                    return true;
                }
            });
        }
        else if(option == "maior"){
            data.sort(function(a, b){
                if(a.preco > b.preco){
                    return -1;
                } else{
                    return true;
                }
            });
        }
        else{
                return true;
            }
        

        var containerProducts = document.getElementById('products');    
            data.map((val)=>{
            containerProducts.innerHTML += `
                <div class = "product">
                    <img src="${val.img}"/>
                    <p>${val.nome}</p>
                    <p style="font-weight: bold">${val.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
                    <p>${val.condicao}</P>
                    <a key="${val.id}" href="#">Adicionar ao carrinho</a>
                </div>
            `
        })

        updateCart = () =>{
           
           data.map((val) =>{
                if(val.quantidade > 0){
                  let carrinho = [val.nome, val.quantidade]
                  console.log(carrinho)
                }
            })

      
            
            
        }
        
        var links = document.getElementsByTagName('a');
        
        for(var i = 0; i < links.length; i++){
            links[i].addEventListener("click", function(){
                
                let key = this.getAttribute('key');
                data[key].quantidade++;
        
                updateCart();
                return false;
            })
        }
    }).catch() 
    
    
}

main()




