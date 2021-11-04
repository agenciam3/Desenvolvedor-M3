from flask import Flask, send_from_directory, request, jsonify
from json import loads

app = Flask(__name__)

listItems = [
    {"id":"CLOT-001", "price":28, "installments": 3, "image":"imagens/img_2.png", "thumb": "imagens/thumbnail/img_2.png", "name":"CAMISETA MESCLA", "sizes":["P","M","G"], "colors":["green", "red", "black", "white"] },
    {"id":"CLOT-002", "price":398, "installments": 5, "image":"imagens/img_3.png", "thumb": "imagens/thumbnail/img_3.png", "name":"SAIA EM COURO", "sizes":["t36","t38","t40","t42", "t44"], "colors":["wine", "gray", "black", "orange"]},
    {"id":"CLOT-003", "price":398, "installments": 5, "image":"imagens/img_4.png", "thumb": "imagens/thumbnail/img_4.png", "name":"CARDIGAN TIGRE", "sizes":["M","G","GG", "U"], "colors":["green", "red", "gray", "white", "pink", "blue"]},
    {"id":"CLOT-004", "price":99.9, "installments": 3, "image":"imagens/img_5.png", "thumb": "imagens/thumbnail/img_5.png", "name":"CARDIGAN OFF WHITE", "sizes":["P","M"], "colors":["wine", "gray", "black", "orange"]},
    {"id":"CLOT-005", "price":129.9, "installments": 3, "image":"imagens/img_6.png", "thumb": "imagens/thumbnail/img_6.png ","name":"BODY LEOPARDO", "sizes":["G", "GG", "U"], "colors":["green", "red", "gray", "blue"] },
    {"id":"CLOT-006", "price":398, "installments": 5, "image":"imagens/img_7.png", "thumb": "imagens/thumbnail/img_7.png", "name":"CASACO PELOS", "sizes":["P","M","GG" ], "colors":["green", "red", "gray", "blue"]},
    {"id":"CLOT-007", "price":120, "installments": 3, "image":"imagens/img_8.png", "thumb": "imagens/thumbnail/img_8.png", "name":"CROPPED STRIPES", "sizes":["P","M","G","GG","U"], "colors":["wine", "gray", "black", "orange"]},
    {"id":"CLOT-008", "price":398, "installments": 5, "image":"imagens/img_9.png", "thumb": "imagens/thumbnail/img_9.png", "name":"CAMISA TRANSPARENTE", "sizes":["t36","t38","t40","t42", "t44"], "colors":["green", "red", "gray", "blue"]},
    {"id":"CLOT-009", "price":99, "installments": 3, "image":"imagens/img_10.png", "thumb": "imagens/thumbnail/img_10.png", "name":"POCHETE CLUTCH", "sizes":[], "colors":["black"] }
]


@app.route("/", methods=["GET"])
def index():
    with open("index.html", encoding="utf-8") as file:
        if request.method == "GET":
            return file.read()

@app.route('/js/<path:path>', methods=["GET"])
def send_js(path):
    if request.method == "GET":
        return send_from_directory('js', path)

@app.route('/css/<path:path>', methods=["GET"])
def send_css(path):
    if request.method == "GET":
        return send_from_directory('css', path)

@app.route('/imagens/<path:path>', methods=["GET"])
def send_img(path):
    if request.method == "GET":
        return send_from_directory('imagens', path)

@app.route('/ordered/<int:order>/<int:fromID>/<int:step>', methods=["GET", "POST"])
def get_items(order, fromID, step):
    priceFunc = {
        "bt0": lambda x: x < 50,
        "bt50": lambda x: 51 < x < 150,
        "bt150": lambda x: 151 < x < 300,
        "bt300": lambda x: 301 < x < 500,
        "any": lambda x: 1 < x
    }
    if request.method == "POST":
        data = loads(request.data)
        # Filtro OR
        filtered = []
        for param in data["sizes"]:
            filtered.append([product for product in listItems if param in product["sizes"]])
        for param in data["prices"]:
            filtered.append([product for product in listItems if priceFunc[param](product["price"])])
        for param in data["colors"]:
            filtered.append([product for product in listItems if param in product["colors"]])
        productData = []
        for i in [item for temp in filtered for item in temp ]:
            if i not in productData:
                productData.append(i)
    else:
        productData = listItems

    has_more = True if (fromID + step) < len(productData) else False
    if fromID >= len(productData):
        products = {"success": True, "has_more": has_more, "items":[]}
    elif order == 1:
        products = {"success": True, "has_more": has_more, "items": sorted(productData, key=lambda x: x["price"])[fromID:fromID+step]}
    elif order == 2:
        products = {"success": True, "has_more": has_more, "items": sorted(productData, key=lambda x: x["price"], reverse=True)[fromID:fromID+step]}
    else:
        products = {"success": True, "has_more": has_more, "items": productData[fromID:fromID+step]}
    
    
    return jsonify(products)

@app.route('/calculator/', methods=["POST"])
def calculate():
    data = loads(request.data)
    if not data:
        return "{\"success\": false, \"items\": []}"
    listProducts = [ obj for obj in listItems if obj["id"] in data.keys() ]
    for i in range(len(listProducts)):
        qnt = data[ listProducts[i]["id"] ]
        listProducts[i]["quantity"] = qnt
        listProducts[i]["subtotal"] = qnt * listProducts[i]["price"]
    
    response = {
        "items": listProducts,
        "success": True,
        "subtotal": {
            "installments": max([ product["installments"] for product in listProducts ]),
            "price": sum([product["subtotal"] for product in listProducts])
        }
    }
    return response


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7777)