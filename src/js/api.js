const BASE_URL = "http://localhost:5000/products";

const createRequest = (url) => {
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
};

export const api = () => JSON.parse(createRequest(BASE_URL));
