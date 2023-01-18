export function ajaxReqProducts() {
    const req = {
        url: "http://localhost:5000/products",
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            return data.responseJSON;
        }
    }

    return $.ajax(req);
}