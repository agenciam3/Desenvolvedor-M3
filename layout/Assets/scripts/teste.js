


let estoqueM3 = 
[
    {id:1, produto:'CAMISA MESCLA', informacoes:{ preco: 28.00, cor: 'Cinza' } }, 
    {id:2, produto:'SAIA EM COURO', informacoes:{ preco: 398.00, cor: 'Laranja'} },
    {id:3, produto:'CARDIGAN TIGRE', informacoes:{ preco: 398.00, cor: 'Laranja'} },
    {id:4, produto:'CARDIGAN OFF WHITE', informacoes:{ preco: 99.00, cor: 'Branco'} },
    {id:5, produto:'BODY LEOPARDO', informacoes:{ preco: 129.00, cor: 'Amarelo'} },
    {id:6, produto:'CASACO PELOS', informacoes:{ preco: 398.00, cor: 'Rosa'} },
    {id:7, produto:'CROPPED STRIPES', informacoes:{ preco: 120.00, cor: 'Vermelho'} },
    {id:8, produto:'CAMISA TRANSPARENT', informacoes:{ preco: 398.00, cor: 'Preto'} },
    {id:9, produto:'POCHETE CLUTCH',informacoes:{ preco: 99.00, cor: 'Branco'} },
]

estoqueM3.forEach((item, index) => {
    console.log(item, index)
})


// console.log(estoqueM3.map((item, index) => {
//     nome = item.nome,
//     id = index,
//     salario = item.salario
// }));

