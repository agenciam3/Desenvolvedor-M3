
window.addEventListener('load', function () {
  let lista;


  lista = fetch("http://localhost:5000/products")
    .then((res) => {
      if (!res) {
        throw new Error("Sem dados");
      } else {
        return res.json();
      }
    })
    .then(function (data) {

      lista = data;
      const filterLeft = document.querySelector(".filters");
      const ulList = document.createElement("ul");
      ulList.setAttribute("id", "colors");
      filterLeft.appendChild(ulList);

      let repeatedColors = [];
      let unique = [];

      function deleteEquals() {
        let j = 1;

        for (let i = 0; i < lista.length; i++) {
          //console.log(lista[i].color)
          if (lista[i].color != lista[j].color) {
            //console.log(lista[i].color);
            unique.push(lista[i].color);
            //console.log("rep", repeatedColors);
            j++
            //console.log("i", i),
            //console.log("j", j)
          } else {
            repeatedColors.push(lista[i].color);
            //console.log("uniq", unique);
          }
        }
      }
      deleteEquals();

      unique.map(u => {
        const li = document.createElement("li");
        li.classList.add("list-item");
        li.innerHTML = u;
        ulList.appendChild(li);
      });

      let teste = [];

      lista.map(item => {
        item.size.forEach(s => {
          teste.push(s);
        })
      })
      console.log(teste)

      //Tamanhos
      var uniqueSizes = teste.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      })

      const ulSizes = document.createElement("ul");
      const titleSize = document.createElement("h2");
      titleSize.innerHTML = "Tamanhos";
      ulSizes.setAttribute("id", "sizes");
      filterLeft.appendChild(titleSize);
      filterLeft.appendChild(ulSizes);

      uniqueSizes.map(un => {
        const liSizes = document.createElement("li");
        liSizes.classList.add("list-sizes");
        liSizes.innerHTML = un;
        ulSizes.appendChild(liSizes);
      })

      //PRODUTOS
      const prodContainer = document.querySelector(".products");
      lista.map(item => {
        const prod = document.createElement("div");
        prod.classList.add("prod-card");

        const prodImg = document.createElement('img');
        prodImg.setAttribute("src", item.image);
        prod.appendChild(prodImg);

        const prodName = document.createElement("h4");
        prodName.classList.add("prod-name");
        prodName.innerHTML = item.name;
        prod.appendChild(prodName);

        const prodPrice = document.createElement("h4");
        prodPrice.classList.add("prod-price");
        prodPrice.innerHTML = `R$ ${item.price}`;
        prod.appendChild(prodPrice);

        const prodInstallments = document.createElement("h4");
        prodInstallments.classList.add("prod-install");
        prodInstallments.innerHTML = `Até ${item.parcelamento[0]}x de ${item.parcelamento[1]}`;
        prod.appendChild(prodInstallments);

        const buyBtn = document.createElement("button");
        buyBtn.classList.add("buy-btn");
        buyBtn.setAttribute("type", "button");
        buyBtn.innerHTML = "COMPRAR";
        prod.appendChild(buyBtn);

        prodContainer.appendChild(prod);
      })

    });



});




