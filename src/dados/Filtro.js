class Filtro{
    constructor(){
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
            func(this.unidades);
        } );
    }   
    setColor(color){
        this.color=color.charAt(0).toUpperCase() + color.slice(1);
        console.log(this.color)
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
        console.log(this.size)
        this.notificar();
    }

    get(color){
        return this.color
    }
}

export default Filtro;