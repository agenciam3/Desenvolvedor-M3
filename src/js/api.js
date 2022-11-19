async function getProducts(limit, offset) {
  const serverurl = process.env.SERVER_API;

  // should send limit and offset to the server, but it's not implemented :(

  const response = await fetch(
    `${serverurl}/products?_page=${offset}&_limit=${limit}`
  );
  const data = await response.json();

  return data;
}

export { getProducts };
