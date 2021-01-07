
var express = require('express');

//http://localhost:8080/index.html?tamanho=p&tamanho=m

// Node js basico só para abrir o servidor
app = express();
app.use('/', express.static(__dirname + '/'));
app.listen(8080);
