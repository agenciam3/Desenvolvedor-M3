import setCores from './setCores';
import setPrecos from './setPrecos';
import setProducts from './setProducts';
import setTamanhos from './setTamanhos';

export default function api() {
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

      lista = data

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
      setPrecos(lista, setAttributes);

      //PRODUTOS
      setProducts(lista);
    });

}