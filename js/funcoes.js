
const itens = [
  
    {
            id: 0,
            nome: "Camiseta Mescla",
            preco: "28,00",
            quantidade: 0,
            opcoes: [
                { Tamanho: "Pequena,Medio,Grande" }
            ],
            img: "imagens/img_2.png",
            descricao: "Esta é uma camiseta cinza incrível"
        },
        {
          id: 1,
            nome: "Saia em Couro",
            preco: "398,00",
            quantidade: 0,
            opcoes: [
                { Tamanho: "unico" },
                { Cor: "Preta" },
            ],
            img: "imagens/img_3.png",
            descricao: "Saia em Couro de Otima Qualidade"
        },
        {
          id: 3,
            nome: "Cardigan Tigre",
            preco: "398,00",
            quantidade: 0,
            opcoes: [
                { Tamanho: "Pequeno,Medio,Grande" }
            ],
            img: "imagens/img_4.png",
            descricao: "Casaco com Lindos Detalhes"
        },
        {
          id: 4,
            nome: "Cardigan White",
            preco: "99,90",
            quantidade: 0,
            opcoes: [
                { Tamanho: "unico" },
                { Cor: "Preta,Branca" },
            ],
            img: "imagens/img_5.png",
            descricao: "Cardigan Tecido de Otima Qualidade"
        },
        {
            id: 5,
            nome: "Body Leopardo",
            preco: "129,90",
            quantidade: 0,
            opcoes: [
                { Tamanho: "unico" },
            ],
            img: "imagens/img_6.png",
            descricao: "Body de Otima Qualidade"
        },
        {
            id: 6,
            nome: "Casaco Pelos",
            preco: "398,00",
            quantidade: 0,
            opcoes: [
                { Tamanho: "Pequeno,Medio,Grande,Extra Grande" },
            ],
            img: "imagens/img_7.png",
            descicao: "Casaco Tecido de Otima Qualidade,Quentinho!"
        },
        {
            id: 7,
            nome: "Croppped Stripes",
            preco: "120,00",
            quantidade: 0,
            opcoes: [
                { Tamanho: "Pequeno,Medio,Grande,Extra Grande" },
            ],
            img: "imagens/img_8.png",
            descicao: "Cropped lindo e confortavél"
        },
        {
            id: 8,
            nome: "Camiseta Transparente",
            preco: "398,00",
            quantidade: 0,
            opcoes: [
                { Tamanho: "Pequeno,Medio,Grande" },
            ],
            img: "imagens/img_9.png",
            descicao: "Camiseta confortavél"
        },
        {
            id: 9,
            nome: "Pochete Clucth",
            preco: "99,00",
            quantidade: 0,
            opcoes: [
                { Tamanho: "Unico" },
            ],
            img: "imagens/img_10.png",
            descicao: "Pochete Linda"
        }

    ]


inicializaLoja = () => {
  var containerProdutos = document.querySelector('.galeria');
  itens.map((val)=>{
    console.log(val.nome,)

    containerProdutos.innerHTML += `
    
    <div class = "item">
    <img src="`+val.img+`" />
    <h2>`+val.nome+`</h2>
    <p>`+val.preco+`</p>
    <input key="`+val.id+`" href="#" type="submit" name="acao" value="comprar">
    
    </div>
    `
  })

}

inicializaLoja();

atualizarcarrinho = () => {
    console.log(itens);
    var containercarrinho = document.getElementById('carrinho');
    containercarrinho.innerHTML = '';
    itens.map((val)=>{
        if(val.quantidade > 0){

            containercarrinho.innerHTML += `
            <div class = "info-single-checkout">
            <p style="float:left;">Produto: `+val.nome+`</p>
            <p style="float:right;">Quantidade: `+val.quantidade+`</p>
            <div style="clear:both"></div>
            <hr>
            
            </div>

            `
        }

    })

}

var links = document.getElementsByTagName('submit');

for(var i = 0; i < links.length; i++){
    links[i].addEventListener("click",function(){
        let key = this.getAttribute('key');
        itens[key].quantidade++;
        atualizarcarrinho();
        return false;
    })
}