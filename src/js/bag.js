//Produtos no carrinho
bag_products = {};

//Função para carregamento inicial dos produtos no carrinho
function loadBagProducts(){
    let products = localStorage.getItem("m3_products");

    //Caso não haja produtos salvos, é criado um objeto vazio para o armazenamento
    if(!products){
        bag_products.amount = 0;
        bag_products.total = 0;
        bag_products.products = [];
        localStorage.setItem("m3_products", JSON.stringify(bag_products));
    }else{
        //Caso contrario é carregado para a variavel
        bag_products = JSON.parse(products);
    }
    //Atualiza o valor mostrado
    updateBag();
}

//Função atualiza o valor mostrado da quantidade de produtos no carrinho
function updateBag(){
    let element = document.getElementById("bag-count");
    element.innerHTML = `${bag_products.total}`;
}

//Função adiciona um novo item ao carrinho
function addProduct(id, amount){

    //Adiciona o item ao objeto
    bag_products.products.push({
        id: id,
        amount: amount
    });
    //Atualiza o total
    bag_products.total += amount;

    //Armazena as informações do carrinho
    localStorage.setItem("m3_products", JSON.stringify(bag_products));
    alert("Produto adicionado ao carrinho!");

    //Atualiza o valor mostrado
    updateBag();
}

loadBagProducts();