async function fetchProductJSON(url) {
  const options = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  const response = await fetch(url, options);
  if (response.ok) {
    console.log(response);
    const product = response.json();
    return product;
  } else {
    return `Error: ${response.status}`;
  }
}

export default fetchProductJSON;
