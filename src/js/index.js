//import api from './api';
import filtrarMob from './filtrarMob';
import setCores from './setCores';
import setPrecos from './setPrecos';
import setProducts from './setProducts';
import setTamanhos from './setTamanhos';

let lista;

function api() {

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
      const optForm = document.querySelector(".opt-filters");

      //FUNÇÃO SET ATTR
      function setAttributes(el, attributes) {
        Object.keys(attributes).forEach(attr => {
          el.setAttribute(attr, attributes[attr]);
        });
      }

      //CORES
      setCores(lista, setAttributes);

      //TAMANHOS
      setTamanhos(lista, optForm);

      //PREÇOS
      setPrecos(optForm, setAttributes);

      //PRODUTOS
      setProducts(lista);

      //takeVar(lista);

      renderMobContent(lista, setAttributes);

    });
}

window.addEventListener('load', function () {
  api();
});

function renderMobContent(val, val2) {
  const varFunc = val;
  const helperFunction = val2;
  //console.log(varFunc, helperFunction);

  //VERIFICAR LARGURA DA TELA
  let viewportWidth = window.innerWidth;

  if (viewportWidth <= 1024) {

    //BUTTONS
    const btHolder = document.createElement("div");
    btHolder.classList.add("filtrar-ord");

    const filterBtn = document.createElement("button");
    const target = document.querySelector(".filters-title-page");
    target.after(btHolder);

    filterBtn.setAttribute("type", "button");
    filterBtn.classList.add("mob-filtrar");
    filterBtn.innerHTML = "Filtrar";
    btHolder.appendChild(filterBtn);
    filterBtn.addEventListener("click", function (e) {
      e.preventDefault();
      filtrarMob(varFunc, helperFunction, lista);
    });
    btHolder.appendChild(filterBtn);

    const orderBtn = document.createElement("button");
    orderBtn.setAttribute("type", "button");
    orderBtn.classList.add("mob-ordenar");
    orderBtn.innerHTML = "Ordenar";
    target.after(orderBtn);
    btHolder.appendChild(orderBtn);
  } else {
    //console.log("oi")
  }

}


