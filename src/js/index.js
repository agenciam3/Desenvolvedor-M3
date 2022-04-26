const fetchApi = () => {
  const url = `http://localhost:5000/products`;

  fetch(url).then((response) => response.json());
};

fetchApi();

console.log("Dev m3");
