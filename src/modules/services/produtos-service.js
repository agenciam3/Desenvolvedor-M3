export class ProdutosService{

    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }

    async getProdutos(){
        const req = await fetch(this.baseUrl);
        return await req.json();
    }
}