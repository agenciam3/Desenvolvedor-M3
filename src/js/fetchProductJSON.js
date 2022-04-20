let lastData = [];

async function fetchProductJSON(url) {
  const options = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };
  localStorage.setItem("lastURL", url);
  const response = await fetch(url, options);
  if (response.ok) {
    const data = await response.json();
    lastData = localStorage.setItem("lastData", JSON.stringify(data));
    return data;
  } else {
    return `Error: ${response.status}`;
  }
}

export default fetchProductJSON;
