async function getProducts(limit, offset) {
  const serverurl = process.env.SERVER_API;

  // should send limit and offset to the server, but it's not implemented :(

  const response = await fetch(`${serverurl}/products`);
  const data = await response.json();

  return data.splice(offset, limit);
}

export { getProducts };
