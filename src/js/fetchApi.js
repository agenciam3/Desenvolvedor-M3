async function fetchApi() {
  const option = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  try {
    let response = await fetch(
      "http://localhost:5000/products/?_page=1&_limit=9",
      option
    );
    return response.json;
  } catch (error) {
    console.log(error);
  }
}

export default fetchApi;
