const APIURL = "http://localhost:5000/products";

// const getProducts = () => {
//   axios
//     .get(APIURL)
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => console.log(error));
// };
// getProducts();

// --------- ACESSANDO O FORM COLORS COM OS INPUTS DE CADA COR
const colors = document.querySelectorAll("#colors");
const newColors = colors.map(element => console.log(element))
console.log(colors[0]);

function newColor(colorSelected) {
  return colorSelected
}
