/* UMA TENTATIVA DE FAZER O BOTÃO REPETIR / DUPLICAR A DIV QUE ESTÁ COM OS ITENS
 const rep = document.getElementById("button");
const divRep = document.querySelector(".models1");

function repetir() {
    rep.addEventListener('click',()=>{
        divRep.style.display = 'flex'
    });
}; */


const c = (el)=>document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

let modalQt = 1;
let modalKey = 0;
let cart = [];

//usei a função .map para mapear o clotheJson
clotheJson.map((item, index)=>{

    let clotheItem = c ('.models .clothe-item').cloneNode(true);
    // Preecher as informações em clothe-item

    clotheItem.setAttribute('data-key', index);
    clotheItem.querySelector('.clothe-item--img img').src = item.img;
    clotheItem.querySelector('.clothe-item--name').innerHTML = item.name;
    clotheItem.querySelector('.clothe-item--desc').innerHTML = item.description;
    clotheItem.querySelector('.clothe-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    clotheItem.querySelector('.clothe-item--name').innerHTML = item.name;

    clotheItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.clothe-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;

        c('.clotheBig img').src = clotheJson[key].img;
        c('.clotheInfo h1').innerHTML = clotheJson[key].name;
        c('.clotheInfo--desc').innerHTML = clotheJson[key].description;
        c('.clotheInfo--actualPrice').innerHTML = `R$ ${clotheJson[key].price.toFixed(2)}`;
        c('.clotheInfo--size.selected').classList.remove('selected');
        cs('.clotheInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = clotheJson[key].sizes[sizeIndex];
        });

        c('.clotheInfo--qt').innerHTML = modalQt;

        c('.clotheWindowArea').style.opacity = 0;
        c('.clotheWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.clotheWindowArea').style.opacity = 1;
        },200);
    });


    clotheItem.querySelector('.clothe-item--add').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.clothe-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;

        c('.clotheBig img').src = clotheJson[key].img;
        c('.clotheInfo h1').innerHTML = clotheJson[key].name;
        c('.clotheInfo--desc').innerHTML = clotheJson[key].description;
        c('.clotheInfo--actualPrice').innerHTML = `R$ ${clotheJson[key].price.toFixed(2)}`;
        c('.clotheInfo--size.selected').classList.remove('selected');
        cs('.clotheInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = clotheJson[key].sizes[sizeIndex];
        });

        c('.clotheInfo--qt').innerHTML = modalQt;

        c('.clotheWindowArea').style.opacity = 0;
        c('.clotheWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.clotheWindowArea').style.opacity = 1;
        },200);
    });

    c('.clothe-area').append( clotheItem );
});



// eventos do modal

function closeModal() {
    c('.clotheWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.clotheWindowArea').style.display = 'none';
    },500)
}

cs ('.clotheInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=> {
    item.addEventListener('click', closeModal);
});


c('.clotheInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1) {
        modalQt --;
        c('.clotheInfo--qt').innerHTML = modalQt;
    }
});

c('.clotheInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.clotheInfo--qt').innerHTML = modalQt;
});

cs('.clotheInfo--size').forEach((size, sizeIndex)=>{
   size.addEventListener('click', (e)=>{
      c('.clotheInfo--size.selected').classList.remove('selected');
      size.classList.add('selected');
   });
});

c('.clotheInfo--addButton').addEventListener('click',()=>{
    let size = parseInt(c('.clotheInfo--size.selected').getAttribute('data-key'));
    let identifier = clotheJson[modalKey].id+'@'+size;
    let key = cart.findIndex((item)=>item.identifier == identifier);
    if(key > -1) {
            cart[key].qt += modalQt;
    } else {
            cart.push({
            identifier,
            id:clotheJson[modalKey].id,
            size:size,
            qt:modalQt 
        });
    }
    updateCart();
    closeModal();

});


c('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0) {
    c('aside').style.left = '0vw';
    }
});

c('.menu-closer').addEventListener('click', ()=>{
    c('aside.show').style.width = '0vw';
})

function updateCart() {
    c('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0) {
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart) {
            let clotheItem = clotheJson.find((item)=>item.id == cart[i].id);
            subtotal += clotheItem.price * cart[i].qt;


            let cartItem = c('.models .cart--item').cloneNode(true);

            let clotheSizeName;
            switch(cart[i].size) {
                case 0:
                    clotheSizeName = 'P';
                    break;
                case 1:
                    clotheSizeName = 'M';
                    break;
                case 2:
                    clotheSizeName = 'G';
                    break;
            }
            let clotheName = `${clotheItem.name} (${clotheSizeName})`;

            cartItem.querySelector('img').src = clotheItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = clotheName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                }else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });

            c('.cart').append(cartItem);
            }

            desconto = subtotal * 0.1;
            total = subtotal - desconto;

            c('.subtotal span:last-child').innerHTML =`R$ ${subtotal.toFixed(2)}`;
            c('.desconto span:last-child').innerHTML =`R$ ${desconto.toFixed(2)}`;
            c('.total span:last-child').innerHTML =`R$ ${total.toFixed(2)}`;

    }else {
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
}


//FUNÇÕES QUE UTILIZEI NO FINAL PARA FAZER AÇOES COMO FECHAR FILTRAGEM, ORDENAR E ETC...

function openOrder() {
    addEventListener('click', ()=>{
   c('.ordener').style.display = 'block';
})
}

function closeOrder() {
    addEventListener('click', ()=>{
   c('.ordener').style.display = 'none';
})
}

function openFiltrar() {
    addEventListener('click', ()=> {
        c('.filter').style.display = 'block';
    })
}
function closeFilter() {
    addEventListener('click', ()=> {
        c('.filter').style.display = 'none';
})
}

function openInputs() {
    addEventListener('click', ()=> {
        c('.filter-inputs').style.display = 'block';
    })
}

function openSizes() {
    addEventListener('click', ()=> {
        c('.filter-sizes').style.display = 'block';
    })
}

function openPrices() {
    addEventListener('click', ()=> {
        c('.filter-prices').style.display = 'block';
    })
}



