//  URL da API de produtos
const api = `http://localhost:5000/products`

//  Função para mostrar mais cores
const viewColors = () =>{
    document.querySelector('#view-more').style.display = 'none'
    document.querySelector('.colors-invisible').style.display = 'flex'
}

//  Função para criar os Cards das imagens
const criarCard = ( img, titleProduct, priceProduct, installmentsProduct, installmentsPriceProduct, index ) =>{
    const card = document.createElement('div')
    card.innerHTML =`
        <div class="card" data-index=${index}>
            <img src=".${img}" alt="Foto modelo">
            <p class="card-title-product">${titleProduct}</p>
            <p class="card-price">R$ ${priceProduct.toFixed(2)}</p>
            <p class="card-installments"> até ${installmentsProduct}x de R$${installmentsPriceProduct}</p>
            <button class="card-btn-buy" onclick="addCarry()">COMPRAR</button>
        </div>
        `
    document.querySelector('.box-images').appendChild(card);
}

//  Requisão API produtos
async function produtos(){
    await fetch(api).then(res => res.json()).then(res => {
        let response = res
        response.slice(0, 9).map((item, index) =>{
            return criarCard(item.image, item.name, item.price, item.parcelamento[0], item.parcelamento[1], index)
        })
        // CARREGAR MAIS -> Adiciona uma função de onCLick ao butão 'CARREGAR MAIS', onde irá mostrar todos os produtos disponíveis
        document.querySelector('.btn-carry').addEventListener('click', () =>{
            document.querySelector('.box-images').innerHTML=''
            response.map((item,index) =>{
                criarCard(item.image, item.name, item.price, item.parcelamento[0], item.parcelamento[1], index)
                document.querySelector('.btn-carry').style.display = 'none'
                document.querySelector('.btn-less').style.display = 'flex'
            })
})

        //  MOSTRAR MENOS -> Adiciona uma função de onclick ao butão de "Mostrar Menos"
        document.querySelector('.btn-less').addEventListener('click', () =>{
            document.querySelector('.box-images').innerHTML = ''
            
            response.slice(0, 9).map((item,index) =>{
                criarCard(item.image, item.name, item.price, item.parcelamento[0], item.parcelamento[1], index)
                document.querySelector('.btn-less').style.display = 'none'
                document.querySelector('.btn-carry').style.display = 'flex'
            })
        })

       
    })
}

produtos()



//  Função para vericiar checkbox e filtrar pela cor ou preço;
const checkBox = () =>{
    const checkbox = document.querySelectorAll('input')
        checkbox.forEach(element => {
            if(element.checked === true){
                async function filtro(){
                    await fetch(api)
                        .then(res=> res.json())
                        .then(res =>{
                            const response = res.slice(0, 9)
                            document.querySelector('.box-images').innerHTML = ''
                            response.forEach(item =>{
                                if(element.value === item.color){
                                let filtro = response.filter(item => item.color == `${element.value}` )
                                document.querySelector('.box-images').innerHTML = ''
                                let itens = []
                                itens.push(filtro)
                                itens[0].map((item,index) =>{
                                    criarCard(item.image, item.name, item.price, item.parcelamento[0], item.parcelamento[1], index)
                                })
                            }else if(element.value <= 50){
                                let filtro = response.filter(item => item.price <= 50)
                                document.querySelector('.box-images').innerHTML = '';
                                let itens = []
                                itens.push(filtro)
                                itens[0].map((item, index) =>{
                                    criarCard(item.image, item.name, item.price, item.parcelamento[0], item.parcelamento[1], index)
                                })
                            } else if(element.value >= 51 && element.value <= 150){
                                let filtro = response.filter(item => item.price >= 51 && item.price<= 150)
                                document.querySelector('.box-images').innerHTML = '';
                                let itens = []
                                itens.push(filtro)
                                itens[0].map((item, index) =>{
                                    criarCard(item.image, item.name, item.price, item.parcelamento[0], item.parcelamento[1], index)
                                })
                            } else if(element.value >=151 && element.value <= 300){
                                let filtro = response.filter(item => item.price >= 151 && item.price <= 300)
                                document.querySelector('.box-images').innerHTML = '';
                                let itens = []
                                itens.push(filtro)
                                itens[0].map((item, index) =>{
                                    criarCard(item.image, item.name, item.price, item.parcelamento[0], item.parcelamento[1], index)
                                })
                            } else if(element.value >=301 && element.value <=500){
                                let filtro = response.filter(item => item.price >= 301 && item.price <= 500)
                                document.querySelector('.box-images').innerHTML = '';
                                let itens = []
                                itens.push(filtro)
                                itens[0].map((item, index) =>{
                                    criarCard(item.image, item.name, item.price, item.parcelamento[0], item.parcelamento[1], index)
                                })
                            } else if(element.value > 500){
                                let filtro = response.filter(item => item.price > 500)
                                document.querySelector('.box-images').innerHTML = '';
                                let itens = []
                                itens.push(filtro)
                                itens[0].map((item, index) =>{
                                    criarCard(item.image, item.name, item.price, item.parcelamento[0], item.parcelamento[1], index)
                                })
                            }  
                            })      
                    })
                }
                filtro()
            }
    });
}

//  Função para verificar elemento clicado e filtrar por tamanho;
function sizes(classe){
    document.querySelector(`${classe}`).addEventListener('click', (e)=>{
        async function size(){
            await fetch(api)
            .then(res => res.json())
            .then(res => {
                const response = res.slice(0, 9)
                const value = e.target.innerHTML
                response.forEach(item =>{
                    if(value === item.size[0] || value === item.size[1]){
                        const filtro = response.filter(item => item.size[0] === value || item.size[1] === value)
                        document.querySelector('.box-images').innerHTML = ''
                        let itens = []
                        itens.push(filtro)
                        itens[0].map((item, index) =>{
                            criarCard(item.image, item.name, item.price, item.parcelamento[0], item.parcelamento[1], index)
                        })
                    }
                })
            })

            //  Altera cor do tamanho selecionado/dinâmico
            const tamanhos = document.querySelectorAll('[data-indice]')
            tamanhos.forEach(item =>{
                item.style.color = 'rgba(0, 0, 0, 0.5)'
            })
            e.target.style.color = '#000'            
        }
       
        size()
    })
}

sizes('.box-sizes')
//Chama a mesma função pro mobile, reaproveitamento de código trocando o parâmetro da função de evento, mesmo conceito de props para componentes do REACT;
sizes('.box-sizes-mobile')


//  Simulação de adição ao carrinho ao clicar em comprar
const addCarry = () =>{
    const number = document.querySelector('.number')
    number.style.display = 'flex'
    number.innerHTML = Number(++number.innerHTML)
}

//  Função para abrir modal mobile de Ordenar ao clicar em Ordenar

const openModalOrder = () =>{
    document.querySelector('#ordernar').addEventListener('click', () =>{
        document.querySelector('.container-order-mobile').style.left = '0'
    })
}
openModalOrder();

//  Função para fechar modal mobile de Ordenar ao clicar no X

const closeModalOrder = () =>{
    document.querySelector('.box-bars-mobile').addEventListener('click', ()=>{
        document.querySelector('.container-order-mobile').style.left = '100%'
    })
}
closeModalOrder();

//  Função para abrir modal filtros ao clicar em Filtros

const openModalFilter = () =>{
    document.querySelector('#filtrar').addEventListener('click', ()=>{
        document.querySelector('.container-filter-mobile').style.left = '0'
    })
}
openModalFilter();

//  Função para fechar modal filtros ao clicar no X

const closeModalFilter = () =>{
    document.querySelector('.box-bars-mobile-filter').addEventListener('click', ()=>{
        document.querySelector('.container-filter-mobile').style.left = '100%'
    })
}
closeModalFilter();

//  Função para abrir e retrair filtros

const openFilters = (click, onde) =>{
    //  declaro uma variável como falso, e vou setando os estados dela de acordo com a ação para mudar de forma dinâmica
    let isOpen = false
    document.querySelector(`${click}`).addEventListener('click', ()=>{
        if(isOpen !== false){
            document.querySelector(`${onde}`).style.display = 'none'
            isOpen = false
        }else{
            document.querySelector(`${onde}`).style.display = 'flex'
            isOpen = true
        }
        if(isOpen === true){
            document.querySelector('.btn-aplicar-mobile').style.display = 'flex'
        }else if(isOpen === false && isOpen == false){
            document.querySelector('.btn-aplicar-mobile').style.display = 'none'
        }
    })
} 

//  Aqui temos mais um exemplo de função com parâmetros ( ou props do REACT ), onde podemos apenas alterar seus valores para reutilizar em partes do código que exigem mesm funcionalidade;
openFilters('.arrow-mobile', '.colors-visible-mobile');
openFilters('#arrow', '.box-sizes-mobile');
openFilters('#arrow-price', '.box-prices-mobile');

//  Função para fechar modal ao aplicar filtro

function closeModal(){
    document.querySelector('.container-filter-mobile').style.left = '100%'
}

//  Função Limpar campo ao clicar em limpar

function clearModal(){
    const limparSize = document.querySelectorAll('[data-indice]')
    limparSize.forEach(item=>{
        item.style.color = 'rgba(0, 0, 0, 0.5)'
    })

    const limparCheck = document.querySelectorAll('.check')
    limparCheck.forEach(item=>{
        item.checked = false
    })
}