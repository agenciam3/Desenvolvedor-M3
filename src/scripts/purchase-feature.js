// Funcionalidades para adição de produtos ao 'carrinho'

// Busca o produto com base no id passado pelo botão 'Comprar'
function findProduct(productId) {
    const url = `http://localhost:5555/products?id=${productId}`;
    
    fetch(url)
    .then(response => response.json())
    .then(result => {
        const product = result[0];
        addToBag(product);
    })
    .catch(error => console.error(`Erro ao buscar o produto para adição ao carrinho.\nError: ${error}`));
}

// Adiciona o produto ao 'carrinho'
function addToBag(product) {
    const url = 'http://localhost:5555/bag-items';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        if(response.status === 201) {
            console.info('Produto adicionado ao carrinho.')
        }
        else {
            throw Error;
        }
    })
    .catch(error => {
        console.error(`Erro ao adicionar o produto ao carrinho.`);
        alert('Este produto já foi adicionado ao carrinho.')
    });

    updateBag();
}

// Atualiza o número de produtos no 'carrinho'
function updateBag() {
    const url = 'http://localhost:5555/bag-items';

    fetch(url)
    .then(response => response.json())
    .then(result => {
        const bagItems = document.getElementById('bag-items');
        const items = result.length;

        bagItems.textContent = items;
    });
}

updateBag();
