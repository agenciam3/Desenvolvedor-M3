import setCoresMob from "./setCoresMob";
import setTamanhosMob from "./setTamanhosMob";
import setPrecosMob from "./setPrecosMob";

export default function filtrarMob(varFunc, helperFunction, lista) {
  const holder = document.querySelector(".container");
  const mobMenu = document.createElement("div");
  mobMenu.classList.add("menu-filtrar-mob");

  //FILTRAR
  const filtrarBtn = document.createElement("div");
  filtrarBtn.classList.add("filtrar");

  const titleFiltrar = document.createElement("span");
  titleFiltrar.innerHTML = "FILTRAR";

  const x = document.createElement("img");
  x.src = '../img/x-fechar.png';
  x.setAttribute("width", "18");
  x.setAttribute("height", "18");
  x.addEventListener("click", function () {
    mobMenu.remove();
  });
  filtrarBtn.appendChild(x);

  filtrarBtn.appendChild(titleFiltrar);
  filtrarBtn.appendChild(x);
  mobMenu.appendChild(filtrarBtn);

  //CORES
  const coresBtn = document.createElement("div");
  const containerCor = document.createElement("div");
  containerCor.classList.add("container-cor");

  coresBtn.appendChild(containerCor);
  coresBtn.classList.add("cores");
  let currClassCor = "cores";

  containerCor.addEventListener("click", function () {
    if (currClassCor === "cores") {
      coresBtn.classList.remove('cores');
      coresBtn.classList.add('cores-opened');
      currClassCor = "cores-opened";
    } else {
      currClassCor = "cores";
      coresBtn.classList.remove('cores-opened');
      coresBtn.classList.add('cores');
    }

  });

  const titleCores = document.createElement("span");
  titleCores.innerHTML = "CORES";

  const arrow = document.createElement("img");
  arrow.src = '../img/arrow.png';
  filtrarBtn.appendChild(arrow);

  containerCor.appendChild(titleCores);
  containerCor.appendChild(arrow);
  mobMenu.appendChild(coresBtn);

  const coresOpt = document.createElement("div");
  coresOpt.classList.add("opt-filters");
  coresBtn.appendChild(coresOpt);

  setCoresMob(varFunc, helperFunction, coresOpt);

  //TAMANHOS
  const tamBtn = document.createElement("div");
  const containerTam = document.createElement("div");
  containerTam.classList.add("container-tam");
  tamBtn.appendChild(containerTam);

  tamBtn.classList.add("tamanhos");
  let currClassTam = "tamanhos";
  containerTam.addEventListener("click", function () {
    console.log("tam")
    if (currClassTam === "tamanhos") {
      tamBtn.classList.remove('tamanhos');
      tamBtn.classList.add('tamanhos-opened');
      tamBtn.appendChild(tamOpt);
      currClassTam = "tamanhos-opened";
    } else {
      currClassTam = "tamanhos";
      tamBtn.classList.remove('tamanhos-opened');
      tamBtn.classList.add('tamanhos');
      tamOpt.remove()
    }

  });

  const titleTam = document.createElement("span");
  titleTam.innerHTML = "TAMANHOS";

  const arrow2 = document.createElement("img");
  arrow2.src = '../img/arrow.png';

  containerTam.appendChild(titleTam);
  containerTam.appendChild(arrow2);
  mobMenu.appendChild(tamBtn);

  const tamOpt = document.createElement("div");
  tamOpt.classList.add("opt-filters");
  //tamBtn.appendChild(tamOpt);

  setTamanhosMob(lista, tamOpt);

  //PREÇOS
  const prBtn = document.createElement("div");
  prBtn.classList.add("precos");
  const containerPr = document.createElement("div");
  containerPr.classList.add("container-pr");
  prBtn.appendChild(containerPr);

  prBtn.classList.add("precos");
  let currClassPr = "precos";
  containerPr.addEventListener("click", function () {
    console.log("pr")
    if (currClassPr === "precos") {
      prBtn.classList.remove('precos');
      prBtn.classList.add('precos-opened');
      prBtn.appendChild(prOpt);
      currClassPr = "precos-opened";
    } else {
      currClassPr = "precos";
      prBtn.classList.remove('precos-opened');
      prBtn.classList.add('precos');
      prOpt.remove()
    }

  });

  const titlePr = document.createElement("span");
  titlePr.innerHTML = "FAIXA DE PREÇO";

  const arrow3 = document.createElement("img");
  arrow3.src = '../img/arrow.png';

  containerPr.appendChild(titlePr);
  containerPr.appendChild(arrow3);
  mobMenu.appendChild(prBtn);

  const prOpt = document.createElement("div");
  prOpt.classList.add("opt-filters");
  prBtn.appendChild(prOpt);

  setPrecosMob(prOpt, helperFunction);

  //BOTÕES APLICAR E LIMPAR
  const btHolder = document.createElement("div");
  btHolder.classList.add("bt-holder");

  const btAplicar = document.createElement("button");
  btAplicar.setAttribute("type", "button");
  btAplicar.classList.add("bt-aplicar");
  btAplicar.innerHTML = "APLICAR";
  btAplicar.addEventListener("click", function () {
    this.classList.add("selected");
    btLimpar.classList.remove("selected");
  });
  btHolder.appendChild(btAplicar);

  const btLimpar = document.createElement("button");
  btLimpar.setAttribute("type", "button");
  btLimpar.classList.add("bt-limpar");
  btLimpar.innerHTML = "LIMPAR";
  btLimpar.addEventListener("click", function () {
    this.classList.add("selected");
    btAplicar.classList.remove("selected");
  });
  btHolder.appendChild(btLimpar);

  mobMenu.appendChild(btHolder);


  holder.appendChild(mobMenu);

  //console.log(tamOpt);
}