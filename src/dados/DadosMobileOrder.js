class DadosMobileOrder{
    constructor(){        
        this.close=false
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
            func(this.close);
        }); 
    }
    openOrder(){
        this.close=false
        this.notificar()
    }
    closeOrder(){                
        this.close=true;        
        this.notificar()
    }
}

export default DadosMobileOrder;