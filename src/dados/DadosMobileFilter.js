class DadosMobileFilter{
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
    openFilter(){
        console.log('click')
        this.close=false
        this.notificar()
    }
    closeFilter(){                
        this.close=true;        
        this.notificar()
    }
}

export default DadosMobileFilter;