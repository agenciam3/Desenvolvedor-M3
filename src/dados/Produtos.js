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
    setProdutos(valor){
        this.produtos=valor
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
    
        this.notificar();  
    }

    // OLD
    resetFiltro(){  
        if(this.resetColor===true){            
            this.resetColor=false
        }
        if(this.resetSize===true){            
            this.resetSize=false
        }        
        this.count=this.count-1        
        this.filtrado=this.historico[this.historico.length-1]     
        this.historico.pop()
        // if(this.count===0){       
        //     this.filtrado=this.historico[this.historico.length-1]     
        // }else if(this.count>=1){       
        //     this.filtrado=this.historico[this.historico.length-1]     
        //     this.historico.pop()
        // }
        
        this.notificar()
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
    setOrder(valor){        
        console.log(valor)
    }
}
export default Produtos;