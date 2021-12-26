class Cart{
    constructor(){        
        this.unidades=0;
        this._inscritos = [];
    }

    inscrever(func){
        this._inscritos.push(func);
    }

    desinscrever(func){
        this._inscritos = this._inscritos.filter(f => f !== func);
    }

    notificar(){
        this._inscritos.forEach(func =>{
            func(this.unidades);
        } );
    }
    get(){
        return this.unidades
    }
    add(){
        this.unidades=this.unidades+1;
        console.log(this.unidades)
        this.notificar();
    }
}

export default Cart;