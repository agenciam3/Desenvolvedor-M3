class Produtos{
    constructor(){
        this.produtos=[] 
        this.filtrado=[]
        this.color=''
        this.size=''
        this._inscritos=[]        
    }

    inscrever(func){        
        this._inscritos.push(func);
    }
    desinscrever(func){
        this._inscritos = this._inscritos.filter(f => f !== func);
    }
    notificar(){
        this._inscritos.forEach(func =>{
            console.log(this.produtos)
            console.log(this.filtrado)
            func(this.filtrado)
        } );
    }   
    setProdutos(valor){
        this.produtos=valor
    }
    resetFiltro(){
        this.filtrado=this.produtos
        this.notificar()
    }
    setColor(color){        
        this.color=color.charAt(0).toUpperCase() + color.slice(1);        
        this.filtrado=this.produtos.filter(produto => produto.color.includes(this.color))            
        this.notificar();
    }
    setSize(valor){
        switch (parseInt(valor)) {
            case 11:
                this.size='40'
                break;
            case 10:
                this.size='38'
                break;
            case 9:
                this.size='36'
                break;
            case 8:
                this.size='40'
                break;
            case 7:
                this.size='38'
                break;
            case 6:
                this.size='36'
                break;
            case 5:
                this.size='U'
                break;
            case 4:
                this.size='GG'
                break;
            case 3:
                this.size='G'
                break;
            case 2:
                this.size='M'
                break;
            case 1:
                this.size='P'
                break;
            default:
                this.size='' 
                break;       
        }        
        let prods = []
        
            this.produtos.forEach(element => {
                if(element.size.length>1){
                    if (element.size[0]===this.size||element.size[1]===this.size){
                        prods.push(element)
                    }
                }else{
                    prods=this.produtos.filter(produto => produto.size.includes(this.size))
                }            
            });        
        this.filtrado =  prods;
        this.notificar();
    }
    setPrice(){
        
    }
}
export default Produtos;