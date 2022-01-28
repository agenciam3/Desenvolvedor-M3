const items = [{
    "id": 0,
    "name": "CAMISETA MESCLA",
    "price": "R$28",
    "parcel": "até 3x de R$9,33",
    "size": ["P", "M", "G", "GG", "U"],
    "color": ["Amarelo", "Azul", "Laranja"],
    "img": "assets/img_2.png "
}, {

    "id": 1,
    "name": "SAIA EM COURO",
    "price": "R$398",
    "parcel": "até 5x de R$30,00",
    "size": ["38", "40", "42", "44", "46"],
    "color": ["Cinza", "Laranja"],
    "img": "assets/img_3.png "
}, {

    "id": 2,
    "name": "SAIA EM COURO",
    "price": "R$R$ 398,00",
    "parcel": "até 5x de R$30,00",
    "size": ["P", "M", "G", "GG", "U"],
    "color": ["Amarelo", "Azul", "Laranja"],
    "img": "assets/img_3.png "
}, {

    "id": 3,
    "name": "CARDIGAN TIGRE",
    "price": "R$398",
    "parcel": "até 5x de R$30,00",
    "size": ["38", "40", "42", "44", "46"],
    "color": ["Cinza", "Laranja"],
    "img": "assets/img_4.png "
}, {

    "id": 4,
    "name": "CARDIGAN OFF WHITE",
    "price": "R$99",
    "parcel": "até 3x de R$33,30",
    "size": ["P", "M", "G", "GG", "U"],
    "color": ["Amarelo", "Azul", "Laranja"],
    "img": "assets/img_5.png "
}, {

    "id": 5,
    "name": "BODY LEOPARDO",
    "price": "R$ 129,90",
    "parcel": "até 3x de R$43,43",
    "size": ["38", "40", "42", "44", "46"],
    "color": ["Cinza", "Laranja"],
    "img": "assets/img_6.png"
}, {

    "id": 6,
    "name": "CASACO PELOS",
    "price": "R$398",
    "parcel": "até 5x de R$30,00",
    "size": ["P", "M", "G", "GG", "U"],
    "color": ["Amarelo", "Azul", "Laranja"],
    "img": "assets/img_7.png"
}, {
    "id": 7,
    "name": "CROPPED STRIPES",
    "price": "R$ 120,00",
    "parcel": "até 3x de R$40,00",
    "size": ["P", "M", "G", "GG", "U"],
    "color": ["Amarelo", "Azul", "Laranja"],
    "img": "assets/img_8.png"
}, {

    "id": 8,
    "name": "CAMISA TRANSPARENTE",
    "price": "R$398",
    "parcel": "até 5x de R$30,00",
    "size": ["P", "M", "G", "GG", "U"],
    "color": ["Amarelo", "Azul", "Laranja"],
    "img": "assets/img_9.png"
}];
inicializarLoja = () => {
    var containerProdutos = document.getElementById('items');
    items.map((val) => {
        // console.log(val.name)
        containerProdutos.innerHTML +=`
            <section class="subcontainer-grid">
                 <img src="`+val.img+`" alt="Blusas ">
                <caption>
                    <p>`+val.name+`</p>
                    <p class="preco ">`+val.price+`,00</p>
                    <p>`+val.parcel+`,00</p>
                     <button  key="`+val.id+`" type="submit " class="botao-comprar " >comprar</button>
                </caption>
            </section>

         `
        atualizarCarrinho=()=>{
        //      itemsCarrinho.innerHTML +=
        //     `
        //     <div class="circulo-de-contagem" id="contador-item"></div>
        //     `
        // 
        console.log(items)
}
        var itemsCarrinho = document.getElementsByTagName('buttom');
        for(i=0; i<itemsCarrinho.length;i++){
            itemsCarrinho[i]=addEventListener("click", function(){
                let key =this.getAttribute('key');
                // incrementando ao carrinho, os produtos ao serem adicionados pelas chaves
                // a partir do momento em que o evento for "escutado"
                items[key].quantidade++;
                atualizarCarrinho();
            })
        }

        
    })
}
inicializarLoja();