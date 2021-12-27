class Produtos{
    constructor(){
        this.resetColor=false
        this.resetSize=false
        this.produtos=[] 
        this.historico=[]
        this.filtrado=[]
        this.color=''
        this.size=''
        this.order=''
        this.count=0
        this.price=[false,false]
        this._inscritos=[]             
    }

    
    inscrever(func){     
        this.historico.push(this.produtos)
        this.filtrado=this.produtos
        this._inscritos.push(func);
    }
    desinscrever(func){
        this._inscritos =this.produtos 
        this._inscritos.filter(f => f !== func);
    }
    notificar(){
        this._inscritos.forEach(func =>{            
            func(this.filtrado)
        } );
    }
 
    setOrder(valor){        
        this.order=valor
        this.ordenar()
        this.notificar()  
    }

    ordenar(){
        if(this.order==='Menor preço'){
            this.menorPreco()
        }else if(this.order==='Maior preço'){
            this.maiorPreco()
        }else{
            this.maisRecente()
        }
    }
    maisRecente(){
        let n = this.filtrado.length
        for (let i = 0; i < n - 1; i++){
            let min_idx = i

            for (let j = i + 1; j < n; j++){
                let data = new Date(this.filtrado[j].date)
                let data2 =  new Date(this.filtrado[min_idx].date)
                if (data < data2){
                    min_idx = j;
                }
            }
            let temp = this.filtrado[min_idx];
            this.filtrado[min_idx] = this.filtrado[i];
            this.filtrado[i] = temp;            
        }
        this.filtrado.forEach(element => {
            console.log(element.date)
        });              
    }
    menorPreco(){
        let n = this.filtrado.length
        for (let i = 0; i < n - 1; i++){
            let min_idx = i

            for (let j = i + 1; j < n; j++){
                if (this.filtrado[j].price < this.filtrado[min_idx].price)
                    min_idx = j;
            }
            let temp = this.filtrado[min_idx];
            this.filtrado[min_idx] = this.filtrado[i];
            this.filtrado[i] = temp;            
        }
        this.filtrado.forEach(element => {
            console.log(element.price)
        });              
    }
    maiorPreco(){
        let n = this.filtrado.length
        for (let i = 0; i < n - 1; i++){
            let max_idx = i

            for (let j = i + 1; j < n; j++){
                if (this.filtrado[j].price > this.filtrado[max_idx].price)
                    max_idx = j;
            }
            let temp = this.filtrado[max_idx];
            this.filtrado[max_idx] = this.filtrado[i];
            this.filtrado[i] = temp;            
        }
        this.filtrado.forEach(element => {
            console.log(element.price)
        });              
    }
    setProdutos(valor){
        this.produtos=valor
    }  
    changeTop(){
        this.notificar()
    }  
    filtrar(){    
        this.filtrado=this.produtos                      
        if(this.color!==''){
            this.filtrado=this.filtrado.filter(produto => produto.color.includes(this.color))            
        }
        
        if(this.size!==''){
            let prods = []        
            this.filtrado.forEach(element => {
                if(element.size.length>1){
                    if (element.size[0]===this.size||element.size[1]===this.size){
                        prods.push(element)
                    }
                }else{
                    prods=this.filtrado.filter(produto => produto.size.includes(this.size))                    
                }            
            });                
            this.filtrado =  prods;
        }        
        if(this.price[0]!==false){            
            this.filtrado=this.filtrado.filter(produto => produto.price >= this.price[0] && produto.price <= this.price[1])
        }        
        if(this.order!==''){
            this.ordenar();
        }
        this.notificar();  
    }

    setColor(color){            
        this.color=color.charAt(0).toUpperCase() + color.slice(1);                            
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
            case 0:
                this.size='' 
                break;       
        }                                                         
    }
    setPrice(valor){               
        switch (valor) {
            case '50':
                this.price=[0,50]
                break;
            case '150':
                this.price=[51,150]
                break;
            case '300':
                this.price=[151,300]
                break;
            case '500':
                this.price=[301,500]
                break;   
            case '>500':
                this.price=[501,10000]
                break; 
            case '':
                this.price=[false,false] 
                break;                                    
        }                                   
    }    
}
export default Produtos;